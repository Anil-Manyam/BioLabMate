import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calculator, FileText, Download, Plus, Trash2, PieChart, BarChart3 } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import CalculatorImage from '@/assets/Calculator.jpg';

interface OrganizationInfo {
  institutionName: string;
  labType: string;
  department: string;
  website: string;
}

interface ClientInfo {
  clientName: string;
  labPosition: string;
  email: string;
  telephone: string;
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
  incineration: number;
  other: number;
}

interface OtherMethodInfo {
  methodName: string;
}

const SustainabilityCalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [organizationInfo, setOrganizationInfo] = useState<OrganizationInfo>({
    institutionName: '',
    labType: '',
    department: '',
    website: ''
  });
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    clientName: '',
    labPosition: '',
    email: '',
    telephone: ''
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
    incineration: 0,
    other: 0
  });
  const [otherMethodInfo, setOtherMethodInfo] = useState<OtherMethodInfo>({
    methodName: ''
  });
  const [dataAgreement, setDataAgreement] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const plasticTypes = ['PET', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS', 'Other'];
  const itemOptions = ['Test Tubes', 'Pipettes', 'Petri Dishes', 'Beakers', 'Flasks', 'Syringes', 'Gloves', 'Other'];

  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!organizationInfo.institutionName.trim()) newErrors.institutionName = 'University/Institution name is required';
        if (!organizationInfo.labType) newErrors.labType = 'Lab type is required';
        break;
      case 2:
        if (!clientInfo.clientName.trim()) newErrors.clientName = 'Client name is required';
        if (!clientInfo.labPosition.trim()) newErrors.labPosition = 'Lab position is required';
        if (!clientInfo.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(clientInfo.email)) newErrors.email = 'Invalid email format';
        break;
      case 3:
        if (!labRequirements.labType) newErrors.labType = 'Lab type is required';
        if (!labRequirements.wasteManagement) newErrors.wasteManagement = 'Waste management requirements are required';
        if (!dataAgreement) newErrors.dataAgreement = 'You must agree to the data usage terms to proceed';
        break;
      case 4:
        if (plasticItems.length === 0) newErrors.plasticItems = 'At least one plastic item is required';
        else {
          // Validate that all plastic items have required fields
          plasticItems.forEach((item, index) => {
            if (!item.plasticType) newErrors[`plasticType_${index}`] = 'Plastic type is required';
            if (!item.item) newErrors[`item_${index}`] = 'Item is required';
            if (item.weight <= 0) newErrors[`weight_${index}`] = 'Weight must be greater than 0';
          });
        }
        break;
      case 5:
        const total = wastePercentages.recycled + wastePercentages.reuse + wastePercentages.disposal + wastePercentages.incineration + wastePercentages.other;
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
    return 100 - (wastePercentages.recycled + wastePercentages.reuse + wastePercentages.disposal + wastePercentages.incineration + wastePercentages.other);
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
      { name: 'Incineration', value: wastePercentages.incineration, color: '#f59e0b' },
      { name: otherMethodInfo.methodName || 'Other Methods', value: wastePercentages.other, color: '#8b5cf6' },
      { name: 'Total Plastic Waste', value: remainingPercentage, color: '#6b7280' }
    ];
    
    // Filter out zero values to avoid overlapping labels
    return data.filter(item => item.value > 0);
  };

  const generateBarChartData = () => {
    // Group plastic items by type and sum their weights
    const plasticTypeData = plasticItems.reduce((acc, item) => {
      if (item.plasticType && item.weight > 0) {
        if (acc[item.plasticType]) {
          acc[item.plasticType] += item.weight;
        } else {
          acc[item.plasticType] = item.weight;
        }
      }
      return acc;
    }, {} as Record<string, number>);

    // Convert to array format for the bar chart
    return Object.entries(plasticTypeData).map(([plasticType, weight]) => ({
      plasticType,
      weight: parseFloat(weight.toFixed(2))
    }));
  };

  const chartRef = useRef<HTMLDivElement>(null);

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
        <h2 style="font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Organization Information</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
          <div style="background: #f8fafc; padding: 10px; border-radius: 5px; border-left: 3px solid #3b82f6;">
            <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Institution Name</div>
            <div style="font-size: 14px; color: #1f2937; margin-top: 2px;">${organizationInfo.institutionName}</div>
          </div>
          <div style="background: #f8fafc; padding: 10px; border-radius: 5px; border-left: 3px solid #3b82f6;">
            <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Lab Type</div>
            <div style="font-size: 14px; color: #1f2937; margin-top: 2px;">${organizationInfo.labType}</div>
          </div>
          <div style="background: #f8fafc; padding: 10px; border-radius: 5px; border-left: 3px solid #3b82f6;">
            <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Department</div>
            <div style="font-size: 14px; color: #1f2937; margin-top: 2px;">${organizationInfo.department || 'Not specified'}</div>
          </div>
          <div style="background: #f8fafc; padding: 10px; border-radius: 5px; border-left: 3px solid #3b82f6;">
            <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Website</div>
            <div style="font-size: 14px; color: #1f2937; margin-top: 2px;">${organizationInfo.website || 'Not specified'}</div>
          </div>
        </div>
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
            <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</div>
            <div style="font-size: 14px; color: #1f2937; margin-top: 2px;">${clientInfo.email}</div>
          </div>
          <div style="background: #f8fafc; padding: 10px; border-radius: 5px; border-left: 3px solid #3b82f6;">
            <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Telephone</div>
            <div style="font-size: 14px; color: #1f2937; margin-top: 2px;">${clientInfo.telephone || 'Not specified'}</div>
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
        <h2 style="font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Plastic Type Summary</h2>
        <div style="background: #f8fafc; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          ${(() => {
            const barChartData = generateBarChartData();
            return barChartData.map((item, index) => `
              <div style="margin-bottom: 5px; padding: 5px 0; border-bottom: 1px solid #e5e7eb;">
                ${index + 1}. ${item.plasticType}: ${item.weight} kg
              </div>
            `).join('');
          })()}
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
             <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Incineration</div>
             <div style="font-size: 14px; color: #1f2937; margin-top: 2px;">${wastePercentages.incineration}%</div>
           </div>
           <div style="background: #f8fafc; padding: 10px; border-radius: 5px; border-left: 3px solid #3b82f6;">
             <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">${otherMethodInfo.methodName || 'Other Methods'}</div>
             <div style="font-size: 14px; color: #1f2937; margin-top: 2px;">${wastePercentages.other}%</div>
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
             <div style="background: #f59e0b; color: white; padding: 5px 10px; border-radius: 5px;">Incineration: ${wastePercentages.incineration}%</div>
             <div style="background: #8b5cf6; color: white; padding: 5px 10px; border-radius: 5px;">${otherMethodInfo.methodName || 'Other Methods'}: ${wastePercentages.other}%</div>
             <div style="background: #6b7280; color: white; padding: 5px 10px; border-radius: 5px;">Total Plastic Waste: ${remainingPercentage.toFixed(1)}%</div>
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

      <div style="margin-bottom: 25px;">
        <h2 style="font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">📘 Calculation Standards & Methodology</h2>
        <div style="background: #f8fafc; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
            <div style="background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #3b82f6;">
              <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Emission Factors</div>
              <div style="font-size: 12px; color: #1f2937; margin-top: 2px;">Based on average life-cycle assessment (LCA) studies from the European Commission (PlasticsEurope 2022) and US EPA WARM model (2023).</div>
            </div>
            <div style="background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #3b82f6;">
              <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Carbon Intensity Values</div>
              <div style="font-size: 12px; color: #1f2937; margin-top: 2px;">Fixed averages are derived from median estimates across multiple peer-reviewed LCAs for PET, HDPE, PVC, LDPE, PP, and PS.</div>
            </div>
            <div style="background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #3b82f6;">
              <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Scope</div>
              <div style="font-size: 12px; color: #1f2937; margin-top: 2px;">Includes emissions from production, transport, and typical disposal (landfill or incineration). Recycling impacts are not included in the base factors.</div>
            </div>
            <div style="background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #3b82f6;">
              <div style="font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Comparisons</div>
              <div style="font-size: 12px; color: #1f2937; margin-top: 2px;">Values are expressed as kg CO₂ equivalent per kg of plastic to ensure consistency across types.</div>
            </div>
          </div>
          <div style="background: #dbeafe; padding: 10px; border-radius: 5px; border-left: 4px solid #3b82f6;">
            <div style="font-weight: bold; color: #1e40af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Offsets Reference</div>
            <div style="font-size: 12px; color: #1e40af; margin-top: 2px;">For context on avoided emissions, global offset benchmarks are taken from Gold Standard and Verra averages (2022–2023).</div>
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Organization Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="institutionName">University/Institution (Lab Name) *</Label>
                  <Input
                    id="institutionName"
                    value={organizationInfo.institutionName}
                    onChange={(e) => setOrganizationInfo({ ...organizationInfo, institutionName: e.target.value })}
                    className={errors.institutionName ? 'border-red-500' : ''}
                    placeholder="Enter university or institution name"
                  />
                  {errors.institutionName && <p className="text-red-500 text-sm mt-1">{errors.institutionName}</p>}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="labType">Type of Lab *</Label>
                  <Select value={organizationInfo.labType} onValueChange={(value) => setOrganizationInfo({ ...organizationInfo, labType: value })}>
                    <SelectTrigger className={errors.labType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select lab type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="research">Research Lab</SelectItem>
                      <SelectItem value="medical">Medical Lab</SelectItem>
                      <SelectItem value="industrial">Industrial Lab</SelectItem>
                      <SelectItem value="clinical">Clinical Lab</SelectItem>
                      <SelectItem value="hospital">Hospital</SelectItem>
                      <SelectItem value="private-company">Private Company</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.labType && <p className="text-red-500 text-sm mt-1">{errors.labType}</p>}
                </div>
                <div>
                  <Label htmlFor="department">Department (if applicable)</Label>
                  <Input
                    id="department"
                    value={organizationInfo.department}
                    onChange={(e) => setOrganizationInfo({ ...organizationInfo, department: e.target.value })}
                    placeholder="Enter department name"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Lab/Organization Website (if applicable)</Label>
                  <Input
                    id="website"
                    type="url"
                    value={organizationInfo.website}
                    onChange={(e) => setOrganizationInfo({ ...organizationInfo, website: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    value={clientInfo.clientName}
                    onChange={(e) => setClientInfo({ ...clientInfo, clientName: e.target.value })}
                    className={errors.clientName ? 'border-red-500' : ''}
                    placeholder="Enter client name"
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
                    placeholder="Enter lab position"
                  />
                  {errors.labPosition && <p className="text-red-500 text-sm mt-1">{errors.labPosition}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    className={errors.email ? 'border-red-500' : ''}
                    placeholder="Enter email address"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="telephone">Telephone Number (if applicable)</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    value={clientInfo.telephone}
                    onChange={(e) => setClientInfo({ ...clientInfo, telephone: e.target.value })}
                    placeholder="Enter telephone number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="w-full max-w-2xl mx-auto">
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
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="dataAgreement"
                    checked={dataAgreement}
                    onChange={(e) => setDataAgreement(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div>
                    <label htmlFor="dataAgreement" className="text-sm font-medium text-gray-900">
                      I agree that this data is provided for calculation purposes only and may be used by BioLabMate to estimate lab plastic waste and identify suitable sustainability solutions.
                    </label>
                    {errors.dataAgreement && <p className="text-red-500 text-sm mt-1">{errors.dataAgreement}</p>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="w-full max-w-4xl mx-auto">
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
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      case 5:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Waste Management Percentages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="incineration">Incineration Percentage (%)</Label>
                  <Input
                    id="incineration"
                    type="number"
                    min="0"
                    max="100"
                    value={wastePercentages.incineration}
                    onChange={(e) => setWastePercentages({ ...wastePercentages, incineration: Number(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="other">Other Methods Percentage (%)</Label>
                  <Input
                    id="other"
                    type="number"
                    min="0"
                    max="100"
                    value={wastePercentages.other}
                    onChange={(e) => setWastePercentages({ ...wastePercentages, other: Number(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="otherMethodName">Other Method Type</Label>
                  <Input
                    id="otherMethodName"
                    type="text"
                    value={otherMethodInfo.methodName}
                    onChange={(e) => setOtherMethodInfo({ ...otherMethodInfo, methodName: e.target.value })}
                    placeholder="e.g., Composting, Anaerobic Digestion"
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

      case 6:
        return (
          <Card className="w-full max-w-6xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
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

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Waste Management Pie Chart */}
                <div className="bg-white p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Waste Management Distribution
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={generatePieChartData()}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
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
                          wrapperStyle={{ fontSize: '12px' }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Plastic Type Bar Chart */}
                <div className="bg-white p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Plastic Type Usage Analysis
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={generateBarChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="plasticType" 
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                          label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value} kg`, 'Weight']}
                          labelFormatter={(label) => `Plastic Type: ${label}`}
                        />
                        <Bar 
                          dataKey="weight" 
                          fill="#3b82f6" 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  📘 Calculation Standards & Methodology
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Emission Factors</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Based on average life-cycle assessment (LCA) studies from the European Commission (PlasticsEurope 2022) and US EPA WARM model (2023).
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Carbon Intensity Values</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Fixed averages are derived from median estimates across multiple peer-reviewed LCAs for PET, HDPE, PVC, LDPE, PP, and PS.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Scope</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Includes emissions from production, transport, and typical disposal (landfill or incineration). Recycling impacts are not included in the base factors.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Comparisons</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Values are expressed as kg CO₂ equivalent per kg of plastic to ensure consistency across types.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold text-blue-900 mb-2">Offsets Reference</h4>
                    <p className="text-sm text-blue-800">
                      For context on avoided emissions, global offset benchmarks are taken from Gold Standard and Verra averages (2022–2023).
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 7:
        return (
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Final Report
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Sustainability Report Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Organization Information</h4>
                    <p><strong>Institution:</strong> {organizationInfo.institutionName}</p>
                    <p><strong>Lab Type:</strong> {organizationInfo.labType}</p>
                    <p><strong>Department:</strong> {organizationInfo.department || 'Not specified'}</p>
                    <p><strong>Website:</strong> {organizationInfo.website || 'Not specified'}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Client Information</h4>
                    <p><strong>Name:</strong> {clientInfo.clientName}</p>
                    <p><strong>Position:</strong> {clientInfo.labPosition}</p>
                    <p><strong>Email:</strong> {clientInfo.email}</p>
                    <p><strong>Telephone:</strong> {clientInfo.telephone || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Plastic Waste Breakdown</h4>
                  <div className="space-y-1">
                    {plasticItems.map((item, index) => (
                      <p key={item.id}>
                        {index + 1}. {item.item} ({item.plasticType}): {item.weight.toFixed(2)} kg
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-semibold text-blue-900">Total Waste</h5>
                    <p className="text-2xl font-bold text-blue-600">{calculateTotalWeight().toFixed(2)} kg</p>
                  </div>

                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h5 className="font-semibold text-purple-900">Total CO2 Emissions</h5>
                    <p className="text-2xl font-bold text-purple-600">{calculateTotalCarbonEmissions().toFixed(2)} kg</p>
                  </div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={CalculatorImage}
          alt="Calculator Background"
          className="w-full h-full object-cover animate-pulse"
          style={{ animationDuration: '20s', opacity: 0.9 }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white/30 to-green-50/40"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 drop-shadow-sm">Sustainability Calculator</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6 drop-shadow-sm">
            Calculate your lab's plastic waste impact and discover opportunities for sustainability improvements.
          </p>
          <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-lg p-6 max-w-3xl mx-auto shadow-lg">
            <h3 className="font-semibold text-blue-900 mb-2">How to use this calculator:</h3>
            <ol className="text-left text-blue-800 space-y-1 text-sm">
              <li>1. Enter your client and lab information</li>
              <li>2. Specify your lab type and waste management requirements</li>
              <li>3. Add all plastic items used in your lab with their weights</li>
              <li>4. Input your current waste management percentages</li>
              <li>5. Review results and download your sustainability report</li>
            </ol>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">{currentStep} of {totalSteps}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {renderStep()}

        <div className="flex justify-between mt-8">
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
    </div>
  );
};

export default SustainabilityCalculator;
