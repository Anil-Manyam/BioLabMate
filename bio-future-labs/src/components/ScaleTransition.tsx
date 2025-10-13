import React, { useEffect, useRef, ReactNode } from 'react';

interface ScaleTransitionProps {
  children: ReactNode;
  className?: string;
  scaleRange?: [number, number]; // [min, max] scale values
  triggerOffset?: number; // 0 to 1, when to start the effect
  duration?: number; // transition duration in seconds
}

export default function ScaleTransition({ 
  children, 
  className = "",
  scaleRange = [0.8, 1.2],
  triggerOffset = 0.2,
  duration = 0.6
}: ScaleTransitionProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = element.offsetHeight;
      
      // Calculate when element enters viewport
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      
      // Check if element is in viewport
      const isInViewport = elementTop < windowHeight && elementBottom > 0;
      
      if (isInViewport) {
        // Calculate progress from 0 to 1 as element moves through viewport
        const progress = Math.max(0, Math.min(1, 
          (windowHeight - elementTop) / (windowHeight + elementHeight)
        ));
        
        // Apply scale based on progress
        if (progress >= triggerOffset) {
          const adjustedProgress = (progress - triggerOffset) / (1 - triggerOffset);
          const scale = scaleRange[0] + (scaleRange[1] - scaleRange[0]) * adjustedProgress;
          
          element.style.transform = `scale(${Math.max(scaleRange[0], Math.min(scaleRange[1], scale))})`;
          element.style.opacity = Math.min(1, adjustedProgress + 0.3).toString();
        } else {
          element.style.transform = `scale(${scaleRange[0]})`;
          element.style.opacity = '0.3';
        }
      } else {
        // Reset when out of viewport
        element.style.transform = `scale(${scaleRange[0]})`;
        element.style.opacity = '0.3';
      }
    };

    // Set initial styles
    element.style.transition = `transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1), opacity ${duration}s ease`;
    element.style.transformOrigin = 'center center';
    
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
  }, [scaleRange, triggerOffset, duration]);

  return (
    <div 
      ref={elementRef} 
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

// Enhanced image scale component
interface ScaleImageProps {
  src: string;
  alt: string;
  className?: string;
  scaleRange?: [number, number];
  hoverScale?: number;
}

export function ScaleImage({ 
  src, 
  alt, 
  className = "",
  scaleRange = [0.9, 1.1],
  hoverScale = 1.05
}: ScaleImageProps) {
  return (
    <ScaleTransition scaleRange={scaleRange}>
      <div className={`overflow-hidden ${className}`}>
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
          style={{ 
            transform: `scale(${hoverScale})`,
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = `scale(${hoverScale})`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
      </div>
    </ScaleTransition>
  );
}

// Scaling text component
interface ScaleTextProps {
  children: ReactNode;
  className?: string;
  scaleRange?: [number, number];
  stagger?: boolean;
}

export function ScaleText({ 
  children, 
  className = "",
  scaleRange = [0.95, 1.02],
  stagger = false
}: ScaleTextProps) {
  return (
    <ScaleTransition 
      scaleRange={scaleRange}
      className={className}
      duration={stagger ? 0.8 : 0.6}
    >
      {children}
    </ScaleTransition>
  );
}

// Scale on hover component
interface ScaleOnHoverProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  duration?: number;
}

export function ScaleOnHover({ 
  children, 
  className = "",
  hoverScale = 1.05,
  duration = 0.3
}: ScaleOnHoverProps) {
  return (
    <div 
      className={`transform transition-transform ease-out ${className}`}
      style={{ 
        transitionDuration: `${duration}s`,
        transformOrigin: 'center center'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `scale(${hoverScale})`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {children}
    </div>
  );
}

// Staggered scale animation for multiple elements
interface StaggeredScaleProps {
  children: ReactNode[];
  className?: string;
  scaleRange?: [number, number];
  staggerDelay?: number;
}

export function StaggeredScale({ 
  children, 
  className = "",
  scaleRange = [0.9, 1.05],
  staggerDelay = 0.1
}: StaggeredScaleProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <ScaleTransition
          key={index}
          scaleRange={scaleRange}
          triggerOffset={0.2 + (index * staggerDelay)}
          duration={0.6 + (index * 0.1)}
        >
          {child}
        </ScaleTransition>
      ))}
    </div>
  );
}