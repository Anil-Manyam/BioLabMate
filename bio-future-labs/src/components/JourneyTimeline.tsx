"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Trophy, 
  FlaskConical, 
  Rocket, 
  ShieldCheck, 
  Users, 
  Globe, 
  Landmark,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { journeyData, type JourneyYear, type JourneyItem } from '@/content/journeyData';

// Static image imports for all 9 items
import img1 from "@/assets/1.jpg";
import img2 from "@/assets/2.jpg";
import img3 from "@/assets/3.jpg";
import img4 from "@/assets/4.jpg";
import img5 from "@/assets/5.jpg";
import img6 from "@/assets/6.jpg";
import img7 from "@/assets/7.jpg";
import img8 from "@/assets/8.jpg";
import img9 from "@/assets/9.jpg";

const journeyImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

interface JourneyTimelineProps {
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

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ id = "journey", className = "" }) => {
  const [activeYear, setActiveYear] = useState(2023);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [showImages, setShowImages] = useState<Set<string>>(new Set());

  // Debug logging
  useEffect(() => {
    console.log('JourneyTimeline component mounted');
    console.log('Active year:', activeYear);
  }, [activeYear]);

  const handleYearClick = (year: number) => {
    setActiveYear(year);
    // Reset expanded items and images when changing years
    setExpandedItems(new Set());
    setShowImages(new Set());
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
        // Hide image when collapsing
        setShowImages(prevImages => {
          const newImages = new Set(prevImages);
          newImages.delete(itemId);
          return newImages;
        });
      } else {
        newSet.add(itemId);
        // Show image when expanding
        setShowImages(prevImages => {
          const newImages = new Set(prevImages);
          newImages.add(itemId);
          return newImages;
        });
      }
      return newSet;
    });
  };

  const getIconComponent = (iconName?: string) => {
    if (!iconName || !(iconName in iconMap)) {
      return Trophy; // Default icon
    }
    return iconMap[iconName as keyof typeof iconMap];
  };

  const truncateDescription = (description: string, maxLength: number = 160) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trim() + '...';
  };

  // Get the selected year's data
  const selectedYearData = journeyData.find(year => year.year === activeYear);

  // Check if journeyData is available
  if (!journeyData || journeyData.length === 0) {
    return (
      <section id={id} className={`py-16 px-4 sm:px-6 lg:px-8 ${className}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              BioLabMate's Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Loading journey data...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={`py-16 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            BioLabMate's Journey
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our path from innovative startup to sustainable solutions leader
          </p>
        </div>

        {/* Year Filter Pills */}
        <div className="sticky top-20 z-10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm py-4 mb-12">
          <div className="flex justify-center space-x-4">
            {journeyData.map((yearData) => (
              <button
                key={yearData.year}
                onClick={() => handleYearClick(yearData.year)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleYearClick(yearData.year);
                  }
                }}
                className={`
                  rounded-full px-6 py-3 text-sm md:text-base font-medium transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${activeYear === yearData.year
                    ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-500 ring-offset-2'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }
                `}
                aria-label={`Show ${yearData.year} achievements`}
                aria-pressed={activeYear === yearData.year}
              >
                {yearData.year}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Year Content */}
        {selectedYearData && (
          <div className="space-y-8">
            {/* Year Header */}
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {selectedYearData.year}
              </h3>
            </div>

            {/* Cards Grid - Left, Middle, Right */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {selectedYearData.items.map((item, itemIndex) => {
                const IconComponent = getIconComponent(item.icon);
                const itemId = `${selectedYearData.year}-${itemIndex}`;
                const isExpanded = expandedItems.has(itemId);
                const shouldShowImage = showImages.has(itemId);
                
                // Calculate global index for proper image mapping
                const globalIndex = journeyData
                  .slice(0, journeyData.findIndex(y => y.year === selectedYearData.year))
                  .reduce((acc, y) => acc + y.items.length, 0) + itemIndex;
                
                const imageSrc = journeyImages[globalIndex];

                return (
                  <div
                    key={itemId}
                    className="relative"
                  >
                    {/* Card */}
                    <div className="h-full">
                      <div className="rounded-2xl shadow-md p-5 md:p-6 bg-white/80 dark:bg-neutral-900/80 backdrop-blur border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-300 h-full">
                        <div className="flex flex-col h-full">
                          {/* Icon and Title */}
                          <div className="flex items-start gap-4 mb-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {item.title}
                              </h4>
                            </div>
                          </div>

                          {/* Description */}
                          <div className="flex-1">
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              {isExpanded ? item.description : truncateDescription(item.description)}
                            </p>
                            
                            {/* Read More Button */}
                            <button
                              onClick={() => toggleExpanded(itemId)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  toggleExpanded(itemId);
                                }
                              }}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors"
                              aria-expanded={isExpanded}
                              aria-label={isExpanded ? 'Show less' : 'Read more'}
                            >
                              {isExpanded ? (
                                <>
                                  Show less
                                  <ChevronUp className="w-4 h-4" />
                                </>
                              ) : (
                                <>
                                  Read more
                                  <ChevronDown className="w-4 h-4" />
                                </>
                              )}
                            </button>

                            {/* Tags */}
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                {item.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Image - Shows only when expanded */}
                          {shouldShowImage && (
                            <div className="mt-6">
                              {imageSrc ? (
                                <img
                                  src={imageSrc}
                                  alt={`${item.title} image`}
                                  className="w-full h-48 object-cover rounded-xl shadow-md"
                                  loading="lazy"
                                  onError={(e) => {
                                    // Hide image on error and show placeholder
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                  }}
                                />
                              ) : null}
                              {/* Fallback placeholder */}
                              <div 
                                className={`w-full h-48 rounded-xl shadow-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${imageSrc ? 'hidden' : ''}`}
                                aria-hidden="true"
                              >
                                <div className="text-gray-400 dark:text-gray-500 text-sm">Image placeholder</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* No Year Selected State */}
        {!selectedYearData && (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Select a year to view our journey milestones
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default JourneyTimeline;
