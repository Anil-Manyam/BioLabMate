"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, 
  FlaskConical, 
  Rocket, 
  ShieldCheck, 
  Users, 
  Globe, 
  Landmark,
  X,
  ChevronRight,
  Sparkles,
  Award
} from 'lucide-react';
import { journeyData, type JourneyYear, type JourneyItem } from '@/content/journeyData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import img1 from "@/assets/1.jpg";
import img2 from "@/assets/2.jpg";

interface CircularJourneyTimelineProps {
  id?: string;
  className?: string;
}

const iconMap = {
  Trophy,
  FlaskConical,
  Rocket,
  ShieldCheck,
  Users,
  Globe,
  Landmark,
};

const CircularJourneyTimeline: React.FC<CircularJourneyTimelineProps> = ({ 
  id = "journey", 
  className = "" 
}) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getIconComponent = (iconName?: string) => {
    if (!iconName || !(iconName in iconMap)) {
      return Trophy;
    }
    return iconMap[iconName as keyof typeof iconMap];
  };

  const handleCardClick = (year: number) => {
    setSelectedYear(selectedYear === year ? null : year);
    setIsModalOpen(true);
    setCurrentItemIndex(0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedYear(null);
  };

  const selectedYearData = journeyData.find(year => year.year === selectedYear);

  // Auto-rotation effect
  useEffect(() => {
    autoRotateRef.current = setInterval(() => {
      setRotationAngle(prev => (prev + 1) % 360);
    }, 50);

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, []);

  // Calculate positions for cards around a circle with dynamic rotation
  const getCirclePosition = (index: number, total: number) => {
    const baseAngle = (index * 360) / total - 90; // Start from top
    const currentAngle = baseAngle + rotationAngle;
    const radius = 160; // Reduced distance from center for tighter layout
    const x = Math.cos((currentAngle * Math.PI) / 180) * radius;
    const y = Math.sin((currentAngle * Math.PI) / 180) * radius;
    return { x, y, angle: currentAngle };
  };



  return (
    <section id={id} className={`py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${className}`}>
      {/* Background Images */}
      <div className="absolute inset-0 pointer-events-none">
                 {/* Left background image */}
         <div className="absolute left-0 top-0 bottom-0 w-1/2">
           <img
             src={img1}
             alt="Journey background left"
             className="h-full w-full object-cover opacity-60"
             style={{ objectPosition: 'left center' }}
           />
           {/* Gradient overlay for better text readability */}
           <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-transparent"></div>
         </div>
         
         {/* Right background image */}
         <div className="absolute right-0 top-0 bottom-0 w-1/2">
           <img
             src={img2}
             alt="Journey background right"
             className="h-full w-full object-cover opacity-60"
             style={{ objectPosition: 'right center' }}
           />
           {/* Gradient overlay for better text readability */}
           <div className="absolute inset-0 bg-gradient-to-l from-background/50 via-transparent to-transparent"></div>
         </div>
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary/30 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary/25 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-primary/35 rounded-full animate-bounce delay-3000"></div>
        <div className="absolute top-3/4 left-1/2 w-1 h-1 bg-primary/20 rounded-full animate-pulse delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Journey
            </h2>
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Discover the milestones that shaped BioLabMate's path to innovation
          </p>
        </div>

        {/* Circular Timeline Container */}
        <div 
          ref={containerRef}
          className="relative flex items-center justify-center min-h-[450px] bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-full mx-auto"
          style={{ width: '450px', height: '450px' }}
        >


          {/* Center Logo/Icon with enhanced effects */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 w-36 h-36 rounded-full bg-primary/20 blur-xl animate-pulse"></div>
              
              {/* Main center circle */}
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary via-primary-light to-primary-dark flex items-center justify-center shadow-2xl border-4 border-white/30 backdrop-blur-sm">
                <Globe className="w-14 h-14 text-white animate-spin-slow" />
                
                {/* Floating particles around center */}
                <div className="absolute -top-2 -left-2 w-3 h-3 bg-white/60 rounded-full animate-bounce"></div>
                <div className="absolute -top-2 -right-2 w-2 h-2 bg-white/40 rounded-full animate-bounce delay-300"></div>
                <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-white/50 rounded-full animate-bounce delay-600"></div>
                <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-white/30 rounded-full animate-bounce delay-900"></div>
              </div>
            </div>
          </div>

          {/* Year Cards with enhanced animations */}
          {journeyData.map((yearData, index) => {
            const position = getCirclePosition(index, journeyData.length);
            const isSelected = selectedYear === yearData.year;
            const isHovered = hoveredYear === yearData.year;
            
            return (
                             <div
                 key={yearData.year}
                 className="absolute z-30 cursor-pointer group"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onClick={() => handleCardClick(yearData.year)}
                onMouseEnter={() => setHoveredYear(yearData.year)}
                onMouseLeave={() => setHoveredYear(null)}
              >
                
                <div className={`
                  w-24 h-24 md:w-28 md:h-28 rounded-full shadow-xl hover:shadow-2xl transition-all duration-500
                  ${isSelected ? 'scale-125 ring-4 ring-primary shadow-primary/50' : 'hover:scale-110'}
                  ${isHovered ? 'ring-2 ring-primary/50' : ''}
                  bg-gradient-to-br from-card via-card to-card/95 backdrop-blur-sm border-2 border-primary/20
                  hover:border-primary/40 group-hover:bg-gradient-to-br group-hover:from-primary/10 group-hover:via-card group-hover:to-primary/5
                  flex flex-col items-center justify-center relative overflow-hidden
                `}>
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-2 left-2 w-4 h-4 border border-primary/20 rounded-full"></div>
                    <div className="absolute bottom-2 right-2 w-3 h-3 border border-primary/20 rounded-full"></div>
                  </div>
                  
                  <div className="text-lg md:text-xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform duration-300">
                    {yearData.year}
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    {yearData.items.length} milestone{yearData.items.length > 1 ? 's' : ''}
                  </div>
                  
                  {/* Animated chevron */}
                  <ChevronRight className={`w-4 h-4 text-muted-foreground group-hover:text-primary transition-all duration-300 ${
                    isHovered ? 'translate-x-1' : ''
                  }`} />
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Modal */}
        {isModalOpen && selectedYear && selectedYearData && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-card rounded-3xl shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-300">
              {/* Modal Header with gradient */}
              <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border-b border-border p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                        {selectedYearData.year} Journey
                      </h3>
                      <p className="text-muted-foreground">Milestones and achievements</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeModal}
                    className="hover:bg-muted rounded-full p-2 transition-all duration-300"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                {/* Progress indicator */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>{currentItemIndex + 1} of {selectedYearData.items.length}</span>
                  </div>
                  <Progress value={(currentItemIndex + 1) / selectedYearData.items.length * 100} className="h-2" />
                </div>
              </div>

              {/* Modal Content with carousel */}
              <div className="p-6">
                <div className="relative">
                  {selectedYearData.items.map((item, itemIndex) => {
                    const IconComponent = getIconComponent(item.icon);
                    const isActive = itemIndex === currentItemIndex;
                    
                    return (
                      <div
                        key={itemIndex}
                        className={`transition-all duration-500 ${
                          isActive ? 'opacity-100 translate-x-0' : 'opacity-0 absolute inset-0 translate-x-full'
                        }`}
                      >
                        <Card className="shadow-soft hover:shadow-hover transition-all duration-300 border-2 border-primary/10">
                          <CardContent className="p-8">
                            <div className="flex items-start gap-6">
                              <div className="flex-shrink-0">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg">
                                  <IconComponent className="w-8 h-8 text-primary" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-xl font-semibold text-foreground mb-4 leading-tight">
                                  {item.title}
                                </h4>
                                <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                                  {item.description}
                                </p>
                                {item.tags && item.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-2">
                                    {item.tags.map((tag, tagIndex) => (
                                      <Badge
                                        key={tagIndex}
                                        variant="secondary"
                                        className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation controls */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentItemIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentItemIndex === 0}
                    className="flex items-center gap-2"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Previous
                  </Button>
                  
                  <div className="flex gap-2">
                    {selectedYearData.items.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentItemIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentItemIndex 
                            ? 'bg-primary scale-125' 
                            : 'bg-muted hover:bg-primary/50'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => setCurrentItemIndex(prev => Math.min(selectedYearData.items.length - 1, prev + 1))}
                    disabled={currentItemIndex === selectedYearData.items.length - 1}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CircularJourneyTimeline;