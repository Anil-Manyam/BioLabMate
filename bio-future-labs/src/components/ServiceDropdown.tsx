import React, { useState, useRef, useEffect } from 'react';
import { X, Calculator, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Trash2, PieChart, FileText, Download } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ClientInfo {
  clientName: string;
  labPosition: string;
  labName: string;
  email: string;
}

interface LabRequirements {
  labType: string;
  wasteManagement: string;
}

interface PlasticItem {
  id: string;
  plasticType: string;
  item: string;
  weight: number;
}

interface WastePercentages {
  recycled: number;
  reuse: number;
  disposal: number;
  burn: number;
}

interface ServiceDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLDivElement>;
}

const ServiceDropdown: React.FC<ServiceDropdownProps> = ({ isOpen, onClose, triggerRef }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    clientName: '',
    labPosition: '',
    labName: '',
    email: ''
  });
  const [labRequirements, setLabRequirements] = useState<LabRequirements>({
    labType: '',
    wasteManagement: ''
  });
  const [plasticItems, setPlasticItems] = useState<PlasticItem[]>([]);
  const [wastePercentages, setWastePercentages] = useState<WastePercentages>({
    recycled: 0,
    reuse: 0,
    disposal: 0,
    burn: 0
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const plasticTypes = ['PET', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS', 'Other'];
  const itemOptions = ['Test Tubes', 'Pipettes', 'Petri Dishes', 'Beakers', 'Flasks', 'Syringes', 'Gloves', 'Other'];

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current && 
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!clientInfo.clientName.trim()) newErrors.clientName = 'Client name is required';
        if (!clientInfo.labPosition.trim()) newErrors.labPosition = 'Lab position is required';
        if (!clientInfo.labName.trim()) newErrors.labName = 'Lab name is required';
        if (!clientInfo.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(clientInfo.email)) newErrors.email = 'Invalid email format';
        break;
      case 2:
        if (!labRequirements.labType) newErrors.labType = 'Lab type is required';
        if (!labRequirements.wasteManagement) newErrors.wasteManagement = 'Waste management requirements are required';
        break;
      case 3:
        if (plasticItems.length === 0) newErrors.plasticItems = 'At least one plastic item is required';
        else {
          plasticItems.forEach((item, index) => {
            if (!item.plasticType) newErrors[`plasticType_${index}`] = 'Plastic type is required';
            if (!item.item) newErrors[`item_${index}`] = 'Item is required';
            if (item.weight <= 0) newErrors[`weight_${index}`] = 'Weight must be greater than 0';
          });
        }
        break;
      case 4:
        const total = wastePercentages.recycled + wastePercentages.reuse + wastePercentages.disposal + wastePercentages.burn;
        if (total > 100) newErrors.percentages = 'Total percentage cannot exceed 100%';
        if (total < 0) newErrors.percentages = 'Total percentage cannot be negative';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const addPlasticItem = () => {
    const newItem: PlasticItem = {
      id: Date.now().toString(),
      plasticType: '',
      item: '',
      weight: 1
    };
    setPlasticItems([...plasticItems, newItem]);
  };

  const updatePlasticItem = (id: string, field: keyof PlasticItem, value: string | number) => {
    setPlasticItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const removePlasticItem = (id: string) => {
    setPlasticItems(prev => prev.filter(item => item.id !== id));
  };

  const calculateTotalWeight = () => {
    return plasticItems.reduce((total, item) => total + item.weight, 0);
  };

  const calculateRemainingPercentage = () => {
    return 100 - (wastePercentages.recycled + wastePercentages.reuse + wastePercentages.disposal + wastePercentages.burn);
  };

  const calculateTotalCarbonEmissions = () => {
    const carbonEmissionFactors = {
      'PET': 4.5,
      'HDPE': 2.1,
      'PVC': 3.0,
      'LDPE': 2.2,
      'PP': 2.0,
      'PS': 3.2,
      'Other': 2.5
    };

    return plasticItems.reduce((total, item) => {
      const factor = carbonEmissionFactors[item.plasticType as keyof typeof carbonEmissionFactors] || 2.5;
      return total + (item.weight * factor);
    }, 0);
  };

  const generatePieChartData = () => {
    const totalWeight = calculateTotalWeight();
    const remainingPercentage = calculateRemainingPercentage();
    
    const data = [
      { name: 'Recycled', value: wastePercentages.recycled, color: '#10b981' },
      { name: 'Reused', value: wastePercentages.reuse, color: '#3b82f6' },
      { name: 'Disposed', value: wastePercentages.disposal, color: '#ef4444' },
      { name: 'Burned', value: wastePercentages.burn, color: '#f59e0b' },
      { name: 'Total Plastic Waste', value: remainingPercentage, color: '#8b5cf6' }
    ];
    
    // Filter out zero values to avoid overlapping labels
    return data.filter(item => item.value > 0);
  };

  const downloadPDF = async () => {
    const totalWeight = calculateTotalWeight();
    const totalCarbonEmissions = calculateTotalCarbonEmissions();
    const remainingPercentage = calculateRemainingPercentage();

    // Create a temporary div for the report
    const reportDiv = document.createElement('div');
    reportDiv.style.position = 'absolute';
    reportDiv.style.left = '-9999px';
    reportDiv.style.top = '0';
    reportDiv.style.width = '800px';
    reportDiv.style.padding = '40px';
    reportDiv.style.backgroundColor = 'white';
    reportDiv.style.fontFamily = 'Arial, sans-serif';
    reportDiv.style.color = '#333';
    reportDiv.style.lineHeight = '1.6';

    // Create the report content
    reportDiv.innerHTML = `
      <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #3b82f6; padding-bottom: 20px;">
        <div style="font-size: 24px; font-weight: bold; color: #3b82f6; margin-bottom: 5px;">BioLabMate</div>
        <div style="font-size: 28px; font-weight: bold; color: #1f2937; margin-bottom: 10px;">Sustainability Calculator Report</div>
        <div style="font-size: 14px; color: #6b7280;">Generated on ${new Date().toLocaleDateString()}</div>
      </div>

      <div style="margin-bottom: 25px;">
        <h2 style="font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Client Information</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
          <div style="background: #f8fafc; padding: 10px; border-radius: 5px; border-left: 3px solid #3b82f6;">
            <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Client Name</div>
            <div style="font-size: 14px; color: #1f2937; margin-top: 2px;">${clientInfo.clientName}</div>
          </div>
          <div style="background: #f8fafc; padding: 10px; border-radius: 5px; border-left: 3px solid #3b82f6;">
            <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Lab Position</div>
            <div style="font-size: 14px; color: #1f2937; margin-top: 2px;">${clientInfo.labPosition}</div>
          </div>
          <div style="background: #f8fafc; padding: 10px; border-radius: 5px; border-left: 3px solid #3b82f6;">
            <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Lab Name</div>
            <div style="font-size: 14px; color: #1f2937; margin-top: 2px;">${clientInfo.labName}</div>
          </div>
          <div style="background: #f8fafc; padding: 10px; border-radius: 5px; border-left: 3px solid #3b82f6;">
            <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</div>
            <div style="font-size: 14px; color: #1f2937; margin-top: 2px;">${clientInfo.email}</div>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 25px;">
        <h2 style="font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Lab Requirements</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
          <div style="background: #f8fafc; padding: 10px; border-radius: 5px; border-left: 3px solid #3b82f6;">
            <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Lab Type</div>
            <div style="font-size: 14px; color: #1f2937; margin-top: 2px;">${labRequirements.labType}</div>
          </div>
          <div style="background: #f8fafc; padding: 10px; border-radius: 5px; border-left: 3px solid #3b82f6;">
            <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Waste Management</div>
            <div style="font-size: 14px; color: #1f2937; margin-top: 2px;">${labRequirements.wasteManagement}</div>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 25px;">
        <h2 style="font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Plastic Waste Analysis</h2>
        <div style="background: #f8fafc; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          ${plasticItems.map((item, index) => `
            <div style="margin-bottom: 5px; padding: 5px 0; border-bottom: 1px solid #e5e7eb;">
              ${index + 1}. ${item.item} (${item.plasticType}): ${item.weight.toFixed(2)} kg
            </div>
          `).join('')}
        </div>
      </div>

      <div style="margin-bottom: 25px;">
        <h2 style="font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Waste Management Breakdown</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
          <div style="background: #f8fafc; padding: 10px; border-radius: 5px; border-left: 3px solid #3b82f6;">
            <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Recycled</div>
            <div style="font-size: 14px; color: #1f2937; margin-top: 2px;">${wastePercentages.recycled}%</div>
          </div>
          <div style="background: #f8fafc; padding: 10px; border-radius: 5px; border-left: 3px solid #3b82f6;">
            <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Reused</div>
            <div style="font-size: 14px; color: #1f2937; margin-top: 2px;">${wastePercentages.reuse}%</div>
          </div>
          <div style="background: #f8fafc; padding: 10px; border-radius: 5px; border-left: 3px solid #3b82f6;">
            <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Disposed</div>
            <div style="font-size: 14px; color: #1f2937; margin-top: 2px;">${wastePercentages.disposal}%</div>
          </div>
          <div style="background: #f8fafc; padding: 10px; border-radius: 5px; border-left: 3px solid #3b82f6;">
            <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Burned</div>
            <div style="font-size: 14px; color: #1f2937; margin-top: 2px;">${wastePercentages.burn}%</div>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 25px;">
        <h2 style="font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Waste Management Visualization</h2>
        <div style="background: #f3f4f6; border: 2px dashed #d1d5db; border-radius: 10px; padding: 40px; text-align: center; margin: 20px 0; color: #6b7280;">
          <div style="font-size: 16px; font-weight: bold; margin-bottom: 10px; color: #374151;">Waste Management Distribution</div>
          <div style="font-size: 14px; margin-bottom: 15px;">Pie chart showing the breakdown of waste management methods</div>
          <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 10px; font-size: 12px;">
            <div style="background: #10b981; color: white; padding: 5px 10px; border-radius: 5px;">Recycled: ${wastePercentages.recycled}%</div>
            <div style="background: #3b82f6; color: white; padding: 5px 10px; border-radius: 5px;">Reused: ${wastePercentages.reuse}%</div>
            <div style="background: #ef4444; color: white; padding: 5px 10px; border-radius: 5px;">Disposed: ${wastePercentages.disposal}%</div>
            <div style="background: #f59e0b; color: white; padding: 5px 10px; border-radius: 5px;">Burned: ${wastePercentages.burn}%</div>
            <div style="background: #8b5cf6; color: white; padding: 5px 10px; border-radius: 5px;">Total Plastic Waste: ${remainingPercentage.toFixed(1)}%</div>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 25px;">
        <h2 style="font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Environmental Impact Summary</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
          <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 20px; border-radius: 10px; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; margin-bottom: 5px;">${totalWeight.toFixed(2)} kg</div>
            <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.9;">Total Plastic Waste</div>
          </div>
          <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 20px; border-radius: 10px; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; margin-bottom: 5px;">${totalCarbonEmissions.toFixed(2)} kg</div>
            <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.9;">Total CO2 Emissions</div>
          </div>
        </div>
      </div>

      <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        <div>This report was generated by BioLabMate's Sustainability Calculator</div>
        <div style="margin-top: 5px;">For more information, visit our website or contact our team</div>
        <div style="margin-top: 10px; font-style: italic; color: #9ca3af;">
          Note: The figures and calculations provided in this report are estimates based on standard industry data. 
          Actual values may vary depending on specific materials, environmental conditions, and laboratory practices. 
          This report is intended for educational and planning purposes only.
        </div>
      </div>
    `;

    // Add the report div to the document
    document.body.appendChild(reportDiv);

    try {
      // Capture the report as canvas
      const canvas = await html2canvas(reportDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Download the PDF
      pdf.save('sustainability-report.pdf');

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      // Clean up
      document.body.removeChild(reportDiv);
    }
  };

  const renderCalculatorStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="w-5 h-5" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    value={clientInfo.clientName}
                    onChange={(e) => setClientInfo({ ...clientInfo, clientName: e.target.value })}
                    className={errors.clientName ? 'border-red-500' : ''}
                  />
                  {errors.clientName && <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>}
                </div>
                <div>
                  <Label htmlFor="labPosition">Lab Position *</Label>
                  <Input
                    id="labPosition"
                    value={clientInfo.labPosition}
                    onChange={(e) => setClientInfo({ ...clientInfo, labPosition: e.target.value })}
                    className={errors.labPosition ? 'border-red-500' : ''}
                  />
                  {errors.labPosition && <p className="text-red-500 text-sm mt-1">{errors.labPosition}</p>}
                </div>
                <div>
                  <Label htmlFor="labName">Lab Name *</Label>
                  <Input
                    id="labName"
                    value={clientInfo.labName}
                    onChange={(e) => setClientInfo({ ...clientInfo, labName: e.target.value })}
                    className={errors.labName ? 'border-red-500' : ''}
                  />
                  {errors.labName && <p className="text-red-500 text-sm mt-1">{errors.labName}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Lab-Specific Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="labType">Type of Lab *</Label>
                <Select value={labRequirements.labType} onValueChange={(value) => setLabRequirements({ ...labRequirements, labType: value })}>
                  <SelectTrigger className={errors.labType ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select lab type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="research">Research Lab</SelectItem>
                    <SelectItem value="clinical">Clinical Lab</SelectItem>
                    <SelectItem value="educational">Educational Lab</SelectItem>
                    <SelectItem value="industrial">Industrial Lab</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.labType && <p className="text-red-500 text-sm mt-1">{errors.labType}</p>}
              </div>
              <div>
                <Label htmlFor="wasteManagement">Specific Requirements for Waste Management *</Label>
                <Select value={labRequirements.wasteManagement} onValueChange={(value) => setLabRequirements({ ...labRequirements, wasteManagement: value })}>
                  <SelectTrigger className={errors.wasteManagement ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select waste management requirements" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Disposal</SelectItem>
                    <SelectItem value="recycling">Recycling Program</SelectItem>
                    <SelectItem value="reuse">Reuse Program</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive Waste Management</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.wasteManagement && <p className="text-red-500 text-sm mt-1">{errors.wasteManagement}</p>}
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Plastic Type, Item, and Weight Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {plasticItems.map((item, index) => (
                <div key={item.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Item {index + 1}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removePlasticItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label>Plastic Type</Label>
                      <Select value={item.plasticType} onValueChange={(value) => updatePlasticItem(item.id, 'plasticType', value)}>
                        <SelectTrigger className={errors[`plasticType_${index}`] ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select plastic type" />
                        </SelectTrigger>
                        <SelectContent>
                          {plasticTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors[`plasticType_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`plasticType_${index}`]}</p>}
                    </div>
                    <div>
                      <Label>Item</Label>
                      <Select value={item.item} onValueChange={(value) => updatePlasticItem(item.id, 'item', value)}>
                        <SelectTrigger className={errors[`item_${index}`] ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select item" />
                        </SelectTrigger>
                        <SelectContent>
                          {itemOptions.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors[`item_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`item_${index}`]}</p>}
                    </div>
                    <div>
                      <Label>Weight (kg)</Label>
                      <Input
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={item.weight}
                        onChange={(e) => updatePlasticItem(item.id, 'weight', parseFloat(e.target.value) || 0)}
                        className={errors[`weight_${index}`] ? 'border-red-500' : ''}
                        placeholder="Enter weight in kg"
                      />
                      {errors[`weight_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`weight_${index}`]}</p>}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">Weight: {item.weight.toFixed(2)} kg</Badge>
                  </div>
                </div>
              ))}
              
              <Button onClick={addPlasticItem} variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Another Item
              </Button>

              {plasticItems.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Total Weight: {calculateTotalWeight()} kg</h4>
                </div>
              )}

              {errors.plasticItems && (
                <Alert>
                  <AlertDescription>{errors.plasticItems}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Waste Management Percentages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="recycled">Recycled Percentage (%)</Label>
                  <Input
                    id="recycled"
                    type="number"
                    min="0"
                    max="100"
                    value={wastePercentages.recycled}
                    onChange={(e) => setWastePercentages({ ...wastePercentages, recycled: Number(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="reuse">Reuse Percentage (%)</Label>
                  <Input
                    id="reuse"
                    type="number"
                    min="0"
                    max="100"
                    value={wastePercentages.reuse}
                    onChange={(e) => setWastePercentages({ ...wastePercentages, reuse: Number(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="disposal">Disposal Percentage (%)</Label>
                  <Input
                    id="disposal"
                    type="number"
                    min="0"
                    max="100"
                    value={wastePercentages.disposal}
                    onChange={(e) => setWastePercentages({ ...wastePercentages, disposal: Number(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="burn">Burn Percentage (%)</Label>
                  <Input
                    id="burn"
                    type="number"
                    min="0"
                    max="100"
                    value={wastePercentages.burn}
                    onChange={(e) => setWastePercentages({ ...wastePercentages, burn: Number(e.target.value) || 0 })}
                  />
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900">
                  Remaining Percentage: {calculateRemainingPercentage().toFixed(2)}%
                </h4>
              </div>

              {errors.percentages && (
                <Alert>
                  <AlertDescription>{errors.percentages}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <PieChart className="w-5 h-5" />
                Results and Visualization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                             <div className="space-y-4">
                 <h3 className="text-lg font-semibold">Calculation Results</h3>
                 <div className="space-y-2">
                   <div className="flex justify-between">
                     <span>Total Plastic Waste:</span>
                     <Badge variant="outline">{calculateTotalWeight().toFixed(2)} kg</Badge>
                   </div>
                                     <div className="flex justify-between">
                    <span>Total Carbon Emissions:</span>
                    <Badge variant="outline" className="text-blue-600">
                      {calculateTotalCarbonEmissions().toFixed(2)} kg CO2
                    </Badge>
                  </div>
                 </div>
               </div>
              
                             <div className="h-48">
                 <ResponsiveContainer width="100%" height="100%">
                   <RechartsPieChart>
                     <Pie
                       data={generatePieChartData()}
                       cx="50%"
                       cy="50%"
                       outerRadius={60}
                       dataKey="value"
                       label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                       labelLine={true}
                     >
                       {generatePieChartData().map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                     </Pie>
                     <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                     <Legend 
                       layout="horizontal" 
                       verticalAlign="bottom" 
                       align="center"
                       wrapperStyle={{ fontSize: '11px' }}
                     />
                   </RechartsPieChart>
                 </ResponsiveContainer>
               </div>
            </CardContent>
          </Card>
        );

      case 6:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5" />
                Final Report
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Sustainability Report Summary</h3>
                <div className="space-y-2">
                  <p><strong>Client:</strong> {clientInfo.clientName}</p>
                  <p><strong>Lab:</strong> {clientInfo.labName}</p>
                  <p><strong>Total Waste:</strong> {calculateTotalWeight().toFixed(2)} kg</p>

                  <p><strong>Total CO2 Emissions:</strong> {calculateTotalCarbonEmissions().toFixed(2)} kg</p>
                </div>
              </div>

              <div className="flex justify-center">
                <Button onClick={downloadPDF} className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div 
        ref={dropdownRef}
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Sustainability Calculator</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {isCalculatorOpen ? (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-medium text-gray-700">{currentStep} of {totalSteps}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Calculator Steps */}
              {renderCalculatorStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  Back
                </Button>
                
                {currentStep < totalSteps && (
                  <Button onClick={handleNext}>
                    Next
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <Calculator className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainability Calculator</h3>
                <p className="text-gray-600 mb-6">
                  Calculate your lab's plastic waste impact and discover opportunities for sustainability improvements.
                </p>
                <Button 
                  onClick={() => setIsCalculatorOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Start Calculator
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">How to use this calculator:</h4>
                <ol className="text-left text-blue-800 space-y-1 text-sm">
                                  <li>1. Enter your client and lab information</li>
                <li>2. Specify your lab type and waste management requirements</li>
                <li>3. Add all plastic items used in your lab with their weights</li>
                <li>4. Input your current waste management percentages</li>
                <li>5. Review results and download your sustainability report</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDropdown;

