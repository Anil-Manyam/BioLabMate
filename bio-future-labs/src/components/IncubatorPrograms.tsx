import React, { useEffect, useRef, useState } from 'react';
import { Award, Star, Sparkles, TrendingUp } from 'lucide-react';
import Image1 from '@/assets/Bioenterprise_logo.png';
import Image2 from '@/assets/Emera_ideahub_logo.png';
import Image3 from '@/assets/Dalhousie.png';
import Image4 from '@/assets/Memorial.png';
import Image5 from '@/assets/Lab2Market_Logo.png';
import Image6 from '@/assets/NRC_canada.png';
import Image7 from '@/assets/ocean_startup_project_logo_.png';
import Image8 from '@/assets/invest.png';
const IncubatorPrograms = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationIdRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const logos = [
    { src: Image1, alt: 'Bioenterprise', name: 'Bioenterprise' },
    { src: Image2, alt: 'Emera IdeaHub', name: 'Emera IdeaHub' },
    { src: Image3, alt: 'Dalhousie', name: 'Dalhousie University' },
    { src: Image4, alt: 'Memorial', name: 'Memorial Universisty' },
    { src: Image5, alt: 'Lab2Market', name: 'Lab2Market' },
    { src: Image6, alt: 'NRC Canada', name: 'NRC Canada' },
    { src: Image7, alt: 'Ocean Startup Project', name: 'Ocean Startup Project' },
    { src: Image8, alt: 'invest', name: 'Invest Novia Scotia' },
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 0.5;

    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollPositionRef.current += scrollSpeed;
        
        const containerWidth = scrollContainer.scrollWidth / 2;
        if (scrollPositionRef.current >= containerWidth) {
          scrollPositionRef.current = 0;
        }
        
        scrollContainer.scrollLeft = scrollPositionRef.current;
      }
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isPaused]);

  const handleCardClick = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    setIsPaused(true);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
      resumeTimeoutRef.current = null;
    }, 3000);
  };
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Our Partners
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Incubator Programs
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Collaborating with world-class incubator programs to accelerate innovation and drive scientific excellence
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-md">
              <Award className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium">7+ Partners</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-md">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Growing Network</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent dark:from-slate-900 dark:via-slate-900/80 z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent dark:from-slate-900 dark:via-slate-900/80 z-10 pointer-events-none"></div>
          <div 
            ref={scrollRef}
            className="flex items-center gap-8 overflow-hidden py-4"
            style={{ scrollBehavior: 'auto' }}
          >
            {logos.map((logo, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 group"
                onClick={handleCardClick}
              >
                <div className="relative w-48 h-40 md:w-56 md:h-44 lg:w-64 lg:h-48 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center justify-center p-6 border border-slate-200 dark:border-slate-700 overflow-hidden group-hover:-translate-y-2 cursor-pointer">

                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-500"></div>
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>

                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain relative z-10 transition-all duration-500 group-hover:scale-110 filter grayscale-[30%] group-hover:grayscale-0"
                  />
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-b-2xl">
                    <span className="text-sm font-semibold text-white block text-center">
                      {logo.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {logos.map((logo, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 group"
                onClick={handleCardClick}
              >
                <div className="relative w-48 h-40 md:w-56 md:h-44 lg:w-64 lg:h-48 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center justify-center p-6 border border-slate-200 dark:border-slate-700 overflow-hidden group-hover:-translate-y-2 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-500"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain relative z-10 transition-all duration-500 group-hover:scale-110 filter grayscale-[30%] group-hover:grayscale-0"
                  />
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-b-2xl">
                    <span className="text-sm font-semibold text-white block text-center">
                      {logo.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-20 flex justify-center items-center gap-2">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-primary/50 rounded-full"></div>
          <Star className="w-5 h-5 text-primary animate-pulse" />
          <div className="w-16 h-1 bg-gradient-to-l from-transparent via-primary to-primary/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default IncubatorPrograms;