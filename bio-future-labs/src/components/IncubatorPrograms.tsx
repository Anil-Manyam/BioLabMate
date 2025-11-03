// "use client";

// import React, { useEffect, useRef } from 'react';
// import { Award, Star } from 'lucide-react';
// import Image1 from '@/assets/Bioenterprise_logo.png';
// import Image2 from '@/assets/Emera_ideahub_logo.png';
// import Image3 from '@/assets/Foresight_logo.png';
// import Image4 from '@/assets/genesis_logo.png';
// import Image5 from '@/assets/Lab2Market_Logo.png';
// import Image6 from '@/assets/NRC_canada.png';
// import Image7 from '@/assets/ocean_startup_project_logo_.png';

// const IncubatorPrograms = () => {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const scrollContainer = scrollRef.current;
//     if (!scrollContainer) return;

//     let animationId: number;
//     let scrollPosition = 0;
//     const scrollSpeed = 1; // pixels per frame

//     const animate = () => {
//       scrollPosition += scrollSpeed;
      
//       // Reset position when we've scrolled the full width of the duplicated content
//       const containerWidth = scrollContainer.scrollWidth / 2;
//       if (scrollPosition >= containerWidth) {
//         scrollPosition = 0;
//       }
      
//       scrollContainer.scrollLeft = scrollPosition;
//       animationId = requestAnimationFrame(animate);
//     };

//     animationId = requestAnimationFrame(animate);

//     return () => {
//       if (animationId) {
//         cancelAnimationFrame(animationId);
//       }
//     };
//   }, []);

//   const logos = [
//     { src: Image1, alt: 'Incubator Partner 1' },
//     { src: Image2, alt: 'Incubator Partner 2' },
//     { src: Image3, alt: 'Incubator Partner 3' },
//     { src: Image4, alt: 'Incubator Partner 4' },
//     { src: Image5, alt: 'Incubator Partner 5' },
//     { src: Image6, alt: 'Incubator Partner 6' },
//     { src: Image7, alt: 'Incubator Partner 7' },
//   ];

//   return (
//     <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
//       {/* Background decoration */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute top-10 left-20 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
//         <div className="absolute bottom-10 right-20 w-80 h-80 bg-secondary rounded-full blur-3xl"></div>
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <Award className="w-8 h-8 text-primary" />
//             <h2 className="text-3xl md:text-4xl font-bold text-foreground">
//               Incubator Programs
//             </h2>
//             <Star className="w-8 h-8 text-primary" />
//           </div>
//           <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
//             Proud partners with leading incubator programs that support our mission
//           </p>
//         </div>

//         {/* Logo Scrolling Container */}
//         <div className="relative">
//           {/* Gradient overlays for smooth fade effect */}
//           <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
//           <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
          
//           {/* Scrolling logos */}
//           <div 
//             ref={scrollRef}
//             className="flex items-center gap-12 overflow-hidden"
//             style={{ scrollBehavior: 'auto' }}
//           >
//             {/* First set of logos */}
//             {logos.map((logo, index) => (
//               <div
//                 key={`first-${index}`}
//                 className="flex-shrink-0 group"
//               >
//                 <div className="w-40 h-28 md:w-48 md:h-32 lg:w-56 lg:h-36 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center p-4 border border-primary/10 hover:border-primary/30">
//                   <img
//                     src={logo.src}
//                     alt={logo.alt}
//                     className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105"
//                   />
//                 </div>
//               </div>
//             ))}
            
//             {/* Duplicate set for seamless loop */}
//             {logos.map((logo, index) => (
//               <div
//                 key={`second-${index}`}
//                 className="flex-shrink-0 group"
//               >
//                 <div className="w-40 h-28 md:w-48 md:h-32 lg:w-56 lg:h-36 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center p-4 border border-primary/10 hover:border-primary/30">
//                   <img
//                     src={logo.src}
//                     alt={logo.alt}
//                     className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Bottom accent line */}
//         <div className="mt-8 flex justify-center">
//           <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default IncubatorPrograms;
















// new design without any background
import React, { useEffect, useRef, useState } from 'react';
import { Award, Star, Sparkles, TrendingUp } from 'lucide-react';
import Image1 from '@/assets/Bioenterprise_logo.png';
import Image2 from '@/assets/Emera_ideahub_logo.png';
import Image3 from '@/assets/Foresight_logo.png';
import Image4 from '@/assets/genesis_logo.png';
import Image5 from '@/assets/Lab2Market_Logo.png';
import Image6 from '@/assets/NRC_canada.png';
import Image7 from '@/assets/ocean_startup_project_logo_.png';

const IncubatorPrograms = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationIdRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const logos = [
    { src: Image1, alt: 'Bioenterprise', name: 'Bioenterprise' },
    { src: Image2, alt: 'Emera IdeaHub', name: 'Emera IdeaHub' },
    { src: Image3, alt: 'Foresight', name: 'Foresight' },
    { src: Image4, alt: 'Genesis', name: 'Genesis' },
    { src: Image5, alt: 'Lab2Market', name: 'Lab2Market' },
    { src: Image6, alt: 'NRC Canada', name: 'NRC Canada' },
    { src: Image7, alt: 'Ocean Startup Project', name: 'Ocean Startup Project' },
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
    // Clear any existing timeout
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    // Pause the rotation
    setIsPaused(true);

    // Set a timeout to auto-resume after 3 seconds
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
      resumeTimeoutRef.current = null;
    }, 3000);
  };

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
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

        {/* Rotating Marquee */}
        <div className="relative">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent dark:from-slate-900 dark:via-slate-900/80 z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent dark:from-slate-900 dark:via-slate-900/80 z-10 pointer-events-none"></div>
          
          {/* Scrolling container */}
          <div 
            ref={scrollRef}
            className="flex items-center gap-8 overflow-hidden py-4"
            style={{ scrollBehavior: 'auto' }}
          >
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 group"
                onClick={handleCardClick}
              >
                <div className="relative w-48 h-40 md:w-56 md:h-44 lg:w-64 lg:h-48 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center justify-center p-6 border border-slate-200 dark:border-slate-700 overflow-hidden group-hover:-translate-y-2 cursor-pointer">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-500"></div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                  
                  {/* Logo */}
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain relative z-10 transition-all duration-500 group-hover:scale-110 filter grayscale-[30%] group-hover:grayscale-0"
                  />
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Partner name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-b-2xl">
                    <span className="text-sm font-semibold text-white block text-center">
                      {logo.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
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

        {/* Bottom decoration */}
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