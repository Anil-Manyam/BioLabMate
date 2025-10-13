// import React, { useRef, useEffect } from 'react';
// import { useParallax } from '@/hooks/useParallax';

// interface ParallaxSectionProps {
//   backgroundImage?: string;
//   backgroundColor?: string;
//   children: React.ReactNode;
//   className?: string;
//   speed?: number;
//   minHeight?: string;
//   overlayOpacity?: number;
//   id?: string;
// }

// const ParallaxSection: React.FC<ParallaxSectionProps> = ({
//   backgroundImage,
//   backgroundColor = 'transparent',
//   children,
//   className = '',
//   speed = 0.3,
//   minHeight = '100vh',
//   overlayOpacity = 0.4,
//   id
// }) => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const { transform } = useParallax({ speed });

//   useEffect(() => {
//     const section = sectionRef.current;
//     if (section) {
//       section.setAttribute('data-fade-observer', '');
//     }
//   }, []);

//   return (
//     <div
//       ref={sectionRef}
//       id={id}
//       className={`relative overflow-hidden ${className}`}
//       style={{ minHeight }}
//     >
//       {/* Background Layer with Parallax */}
//       {backgroundImage && (
//         <div
//           className="absolute inset-0 w-full h-full"
//           style={{
//             backgroundImage: `url(${backgroundImage})`,
//             backgroundAttachment: 'fixed',
//             backgroundPosition: 'center center',
//             backgroundRepeat: 'no-repeat',
//             backgroundSize: 'cover',
//             transform,
//             willChange: 'transform'
//           }}
//         />
//       )}
      
//       {/* Solid Color Background */}
//       {backgroundColor !== 'transparent' && !backgroundImage && (
//         <div
//           className="absolute inset-0 w-full h-full"
//           style={{ backgroundColor }}
//         />
//       )}
      
//       {/* Overlay for better text readability */}
//       {backgroundImage && overlayOpacity > 0 && (
//         <div 
//           className="absolute inset-0 bg-black"
//           style={{ opacity: overlayOpacity }}
//         />
//       )}
      
//       {/* Content Layer */}
//       <div className="relative z-10 h-full">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default ParallaxSection;


import React, { useEffect, useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number; // 0.1 to 1.0, where 1.0 is normal scroll speed
  direction?: 'up' | 'down';
  fadeEffect?: boolean;
  scaleEffect?: boolean;
}

export default function ParallaxSection({ 
  children, 
  className = "", 
  speed = 0.5,
  direction = 'up',
  fadeEffect = false,
  scaleEffect = false 
}: ParallaxSectionProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = element.offsetHeight;
      
      // Calculate scroll progress (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + elementHeight)
      ));
      
      // Calculate parallax offset
      const multiplier = direction === 'up' ? -1 : 1;
      const offset = (scrollProgress - 0.5) * 100 * (1 - speed) * multiplier;
      
      // Apply transformations
      let transform = `translateY(${offset}px)`;
      
      // Add scale effect if enabled
      if (scaleEffect) {
        const scale = 0.8 + (scrollProgress * 0.4); // Scale from 0.8 to 1.2
        transform += ` scale(${Math.max(0.8, Math.min(1.2, scale))})`;
      }
      
      element.style.transform = transform;
      
      // Apply fade effect if enabled
      if (fadeEffect) {
        const opacity = Math.max(0, Math.min(1, scrollProgress * 2 - 0.5));
        element.style.opacity = opacity.toString();
      }
    };

    // Initial call
    handleScroll();
    
    // Throttled scroll listener
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [speed, direction, fadeEffect, scaleEffect]);

  return (
    <div 
      ref={elementRef} 
      className={`will-change-transform ${className}`}
      style={{ 
        opacity: fadeEffect ? 0 : 1,
        transform: scaleEffect ? 'scale(0.8)' : 'none'
      }}
    >
      {children}
    </div>
  );
}

// Enhanced parallax hook for more complex effects
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * speed;
      element.style.transform = `translateY(${parallax}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
}

// Layered parallax component for multiple depth levels
interface LayeredParallaxProps {
  children: ReactNode;
  layers?: number;
  className?: string;
}

export function LayeredParallax({ children, layers = 3, className = "" }: LayeredParallaxProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Background layers */}
      {Array.from({ length: layers }, (_, index) => (
        <ParallaxSection
          key={index}
          speed={0.2 + (index * 0.2)}
          className={`absolute inset-0 -z-${10 + index}`}
        >
          <div 
            className={`absolute inset-0 bg-gradient-to-br opacity-${Math.max(5, 20 - index * 5)}`}
            style={{
              background: `radial-gradient(circle at ${30 + index * 20}% ${40 + index * 15}%, rgba(${
                index % 2 ? '59,130,246' : '147,51,234'
              }, 0.1), transparent 60%)`
            }}
          />
        </ParallaxSection>
      ))}
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}