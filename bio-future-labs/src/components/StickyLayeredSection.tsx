import React, { useEffect, useRef, ReactNode } from 'react';

interface StickyLayeredSectionProps {
  children: ReactNode;
  className?: string;
  stickyOffset?: number; // offset from top when sticky
  layerDepth?: number; // z-index for layering
  backgroundColor?: string;
  overlayOpacity?: number;
}

export default function StickyLayeredSection({ 
  children, 
  className = "",
  stickyOffset = 0,
  layerDepth = 10,
  backgroundColor = 'rgba(15, 23, 42, 0.95)',
  overlayOpacity = 0.8
}: StickyLayeredSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate when section becomes sticky
      const shouldBeSticky = rect.top <= stickyOffset && rect.bottom > windowHeight;
      
      if (shouldBeSticky) {
        content.style.position = 'fixed';
        content.style.top = `${stickyOffset}px`;
        content.style.left = '0';
        content.style.width = '100%';
        content.style.zIndex = layerDepth.toString();
        
        // Add overlay effect based on scroll progress
        const scrollProgress = Math.min(1, (stickyOffset - rect.top) / windowHeight);
        content.style.backgroundColor = backgroundColor;
        
        // Apply scaling effect
        const scale = 1 + (scrollProgress * 0.1);
        content.style.transform = `scale(${Math.min(1.1, scale)})`;
        
      } else {
        content.style.position = 'relative';
        content.style.top = 'auto';
        content.style.left = 'auto';
        content.style.width = 'auto';
        content.style.zIndex = 'auto';
        content.style.backgroundColor = 'transparent';
        content.style.transform = 'scale(1)';
      }
    };

    // Initial call
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [stickyOffset, layerDepth, backgroundColor]);

  return (
    <div 
      ref={sectionRef}
      className={`relative ${className}`}
      style={{ minHeight: '200vh' }} // Ensure enough height for sticky effect
    >
      <div 
        ref={contentRef}
        className="transition-all duration-300 ease-out backdrop-blur-md"
        style={{
          transformOrigin: 'center center'
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Enhanced Contact Section with Layered Sticky Effect
interface LayeredContactSectionProps {
  children: ReactNode;
  className?: string;
}

export function LayeredContactSection({ children, className = "" }: LayeredContactSectionProps) {
  const layersRef = useRef<HTMLDivElement[]>([]);
  
  useEffect(() => {
    const layers = layersRef.current;
    if (!layers.length) return;

    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      
      layers.forEach((layer, index) => {
        if (layer) {
          const speed = 0.5 + (index * 0.2);
          const yPos = scrollY * speed;
          layer.style.transform = `translateY(${yPos}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background layers */}
      <div 
        ref={el => el && (layersRef.current[0] = el)}
        className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 -z-10"
      />
      <div 
        ref={el => el && (layersRef.current[1] = el)}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.1),transparent_50%)] -z-20"
      />
      <div 
        ref={el => el && (layersRef.current[2] = el)}
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(147,51,234,0.1),transparent_50%)] -z-30"
      />
      
      {/* Content */}
      <StickyLayeredSection
        stickyOffset={100}
        layerDepth={50}
        backgroundColor="rgba(15, 23, 42, 0.98)"
      >
        {children}
      </StickyLayeredSection>
    </div>
  );
}

// Utility hook for creating layered sticky effects
export function useLayeredSticky(layers: number = 3) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      
      refs.current.forEach((element, index) => {
        if (element) {
          const speed = 0.3 + (index * 0.1);
          const yPos = scrollY * speed;
          element.style.transform = `translateY(${yPos}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };
}

// Progressive reveal component with sticky behavior
interface ProgressiveRevealProps {
  children: ReactNode;
  className?: string;
  revealHeight?: number;
}

export function ProgressiveReveal({ 
  children, 
  className = "",
  revealHeight = 100 
}: ProgressiveRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate reveal progress
      const revealProgress = Math.max(0, Math.min(1,
        (windowHeight - rect.top) / revealHeight
      ));
      
      // Apply clip-path for progressive reveal
      container.style.clipPath = `inset(${(1 - revealProgress) * 100}% 0 0 0)`;
      container.style.opacity = revealProgress.toString();
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [revealHeight]);

  return (
    <div 
      ref={containerRef}
      className={`transition-all duration-300 ease-out ${className}`}
      style={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
    >
      {children}
    </div>
  );
}