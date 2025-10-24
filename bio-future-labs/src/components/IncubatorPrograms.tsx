"use client";

import React, { useEffect, useRef } from 'react';
import { Award, Star } from 'lucide-react';
import Image1 from '@/assets/Bioenterprise_logo.png';
import Image2 from '@/assets/Emera_ideahub_logo.png';
import Image3 from '@/assets/Foresight_logo.png';
import Image4 from '@/assets/genesis_logo.png';
import Image5 from '@/assets/Lab2Market_Logo.png';
import Image6 from '@/assets/NRC_canada.png';
import Image7 from '@/assets/ocean_startup_project_logo_.png';

const IncubatorPrograms = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 1; // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when we've scrolled the full width of the duplicated content
      const containerWidth = scrollContainer.scrollWidth / 2;
      if (scrollPosition >= containerWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const logos = [
    { src: Image1, alt: 'Incubator Partner 1' },
    { src: Image2, alt: 'Incubator Partner 2' },
    { src: Image3, alt: 'Incubator Partner 3' },
    { src: Image4, alt: 'Incubator Partner 4' },
    { src: Image5, alt: 'Incubator Partner 5' },
    { src: Image6, alt: 'Incubator Partner 6' },
    { src: Image7, alt: 'Incubator Partner 7' },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Incubator Programs
            </h2>
            <Star className="w-8 h-8 text-primary" />
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Proud partners with leading incubator programs that support our mission
          </p>
        </div>

        {/* Logo Scrolling Container */}
        <div className="relative">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrolling logos */}
          <div 
            ref={scrollRef}
            className="flex items-center gap-12 overflow-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="w-40 h-28 md:w-48 md:h-32 lg:w-56 lg:h-36 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center p-4 border border-primary/10 hover:border-primary/30">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {logos.map((logo, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="w-40 h-28 md:w-48 md:h-32 lg:w-56 lg:h-36 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center p-4 border border-primary/10 hover:border-primary/30">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="mt-8 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default IncubatorPrograms;
