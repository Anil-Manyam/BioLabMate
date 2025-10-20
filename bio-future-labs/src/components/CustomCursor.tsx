// import React, { useEffect, useRef } from 'react';

// interface CustomCursorProps {
//   videoSrc?: string;
// }

// export default function CustomCursor({ videoSrc = '/background.mp4' }: CustomCursorProps) {
//   const cursorRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     const cursor = cursorRef.current;
//     const video = videoRef.current;
    
//     if (!cursor || !video) return;

//     let isMoving = false;
//     let hideTimeout: NodeJS.Timeout;

//     const handleMouseMove = (e: MouseEvent) => {
//       const { clientX: x, clientY: y } = e;
      
//       // Update cursor position
//       cursor.style.left = `${x}px`;
//       cursor.style.top = `${y}px`;
      
//       // Show cursor and video
//       if (!isMoving) {
//         cursor.style.opacity = '1';
//         video.play().catch(() => {});
//         isMoving = true;
//       }
      
//       // Clear existing timeout
//       clearTimeout(hideTimeout);
      
//       // Hide cursor after 2 seconds of inactivity
//       hideTimeout = setTimeout(() => {
//         cursor.style.opacity = '0';
//         video.pause();
//         isMoving = false;
//       }, 2000);
//     };

//     const handleMouseEnter = () => {
//       cursor.style.opacity = '1';
//       video.play().catch(() => {});
//     };

//     const handleMouseLeave = () => {
//       cursor.style.opacity = '0';
//       video.pause();
//       isMoving = false;
//       clearTimeout(hideTimeout);
//     };

//     const handleMouseDown = () => {
//       cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
//     };

//     const handleMouseUp = () => {
//       cursor.style.transform = 'translate(-50%, -50%) scale(1)';
//     };

//     // Add event listeners
//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseenter', handleMouseEnter);
//     document.addEventListener('mouseleave', handleMouseLeave);
//     document.addEventListener('mousedown', handleMouseDown);
//     document.addEventListener('mouseup', handleMouseUp);

//     // Cleanup
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseenter', handleMouseEnter);
//       document.removeEventListener('mouseleave', handleMouseLeave);
//       document.removeEventListener('mousedown', handleMouseDown);
//       document.removeEventListener('mouseup', handleMouseUp);
//       clearTimeout(hideTimeout);
//     };
//   }, []);

//   return (
//     <>
//       {/* Hide default cursor */}
//       <style>{`
//         * {
//           cursor: none !important;
//         }
//         a, button, [role="button"], input, textarea, select {
//           cursor: none !important;
//         }
        
//         /* Mobile devices - show default cursor */
//         @media (max-width: 768px) {
//           * {
//             cursor: auto !important;
//           }
//         }
//       `}</style>
      
//       {/* Custom cursor - only show on desktop */}
//       <div
//         ref={cursorRef}
//         className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-0 transition-opacity duration-300 hidden md:block"
//         style={{
//           transform: 'translate(-50%, -50%)',
//           mixBlendMode: 'difference'
//         }}
//       >
//         {/* Outer ring */}
//         <div className="absolute inset-0 w-20 h-20 border-2 border-white/30 rounded-full animate-spin-slow" 
//              style={{ animation: 'spin 8s linear infinite' }} />
        
//         {/* Inner video circle */}
//         <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/50 backdrop-blur-sm">
//           <video
//             ref={videoRef}
//             src={videoSrc}
//             className="w-full h-full object-cover"
//             loop
//             muted
//             playsInline
//             preload="metadata"
//           />
          
//           {/* Overlay effect */}
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 mix-blend-overlay" />
//         </div>
        
//         {/* Center dot */}
//         <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
//       </div>
//     </>
//   );
// }
























// import React, { useEffect, useRef, useState } from 'react';

// interface CustomCursorProps {
//   videoSrc?: string;
// }

// export default function CustomCursor({ videoSrc = '/background.mp4' }: CustomCursorProps) {
//   const cursorRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [cursorMode, setCursorMode] = useState<'default' | 'clickable' | 'profile'>('default');
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     const cursor = cursorRef.current;
//     if (!cursor) return;

//     let hideTimeout: NodeJS.Timeout | null = null;

//     const handleMouseMove = (e: MouseEvent) => {
//       const { clientX, clientY } = e;
//       cursor.style.transform = `translate(${clientX}px, ${clientY}px) translate(-50%, -50%)`;

//       if (!visible) setVisible(true);
//       if (hideTimeout) clearTimeout(hideTimeout);

//       const target = e.target as HTMLElement;

//       // Detect cursor mode based on hovered element
//       if (target.closest('a, button, [role="button"], input, textarea, select')) {
//         setCursorMode('clickable');
//       } else if (target.closest('.profile-img')) {
//         setCursorMode('profile');
//       } else {
//         setCursorMode('default');
//       }

//       hideTimeout = setTimeout(() => setVisible(false), 2000);
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseenter', () => setVisible(true));
//     document.addEventListener('mouseleave', () => setVisible(false));

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseenter', () => setVisible(true));
//       document.removeEventListener('mouseleave', () => setVisible(false));
//       if (hideTimeout) clearTimeout(hideTimeout);
//     };
//   }, [visible]);

//   // Handle video playback per mode
//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     if (cursorMode === 'default') {
//       video.play().catch(() => {});
//     } else {
//       video.pause();
//     }
//   }, [cursorMode]);

//   return (
//     <>
//       <style>{`
//         * {
//           cursor: none !important;
//         }
//         @media (max-width: 768px) {
//           * {
//             cursor: auto !important;
//           }
//         }
//         .cursor-transition {
//           transition: all 0.25s ease;
//         }
//       `}</style>

//       <div
//         ref={cursorRef}
//         className={`fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center cursor-transition`}
//         style={{
//           opacity: visible ? 1 : 0,
//           transition: 'opacity 0.3s ease, transform 0.08s linear',
//           mixBlendMode: cursorMode === 'profile' ? 'normal' : 'difference',
//         }}
//       >
//         {/* Default video cursor */}
//         {cursorMode === 'default' && (
//           <div className="w-16 h-16 rounded-full overflow-hidden border border-white/40 backdrop-blur-sm scale-100 cursor-transition">
//             <video
//               ref={videoRef}
//               src={videoSrc}
//               className="w-full h-full object-cover"
//               loop
//               muted
//               playsInline
//               preload="metadata"
//             />
//           </div>
//         )}

//         {/* Clickable small dot */}
//         {cursorMode === 'clickable' && (
//           <div className="w-4 h-4 bg-white/90 rounded-full scale-100 shadow-md cursor-transition" />
//         )}

//         {/* Profile “View Profile” cursor */}
//         {cursorMode === 'profile' && (
//           <div className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium shadow-lg cursor-transition">
//             View Profile
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
















// // original custom cursor effect
// import React, { useEffect, useRef, useState } from 'react';

// interface CustomCursorProps {
//   videoSrc?: string;
// }

// export default function CustomCursor({ videoSrc = '/background.mp4' }: CustomCursorProps) {
//   const cursorRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const [cursorMode, setCursorMode] = useState<'default' | 'clickable' | 'profile' | 'nav' | 'text'>('default');
//   const [visible, setVisible] = useState(true);

//   // For smooth movement
//   const mousePos = useRef({ x: 0, y: 0 });
//   const cursorPos = useRef({ x: 0, y: 0 });

//   useEffect(() => {
//     const cursor = cursorRef.current;
//     if (!cursor) return;

//     const handleMouseMove = (e: MouseEvent) => {
//       mousePos.current.x = e.clientX;
//       mousePos.current.y = e.clientY;

//       const target = e.target as HTMLElement;

//       if (target.closest('nav, .navbar, .navigation, .menu')) {
//         setCursorMode('nav');
//       } else if (target.closest('a, button, [role="button"], input, textarea, select')) {
//         setCursorMode('clickable');
//       } else if (target.closest('.profile-img')) {
//         setCursorMode('profile');
//       } else if (target.closest('p, span, h1, h2, h3, h4, h5, h6')) {
//         setCursorMode('text');
//       } else {
//         setCursorMode('default');
//       }

//       setVisible(true);
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseenter', () => setVisible(true));
//     document.addEventListener('mouseleave', () => setVisible(false));

//     // Smooth animation loop
//     let animationFrame: number;
//     const render = () => {
//       const speed = 0.2; // lower = smoother
//       cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * speed;
//       cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * speed;

//       cursor.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`;
//       animationFrame = requestAnimationFrame(render);
//     };
//     render();

//     return () => {
//       cancelAnimationFrame(animationFrame);
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseenter', () => setVisible(true));
//       document.removeEventListener('mouseleave', () => setVisible(false));
//     };
//   }, []);

//   // Control video playback based on mode
//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;
//     if (cursorMode === 'default' || cursorMode === 'text') {
//       video.play().catch(() => {});
//     } else {
//       video.pause();
//     }
//   }, [cursorMode]);

//   return (
//     <>
//       <style>{`
//         * {
//           cursor: none !important;
//         }
//         @media (max-width: 768px) {
//           * { cursor: auto !important; }
//         }

//         .cursor-transition {
//           transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
//           will-change: transform, opacity, width, height;
//         }

//         @keyframes magnify {
//           0% { transform: scale(1); }
//           100% { transform: scale(1.3); }
//         }
//       `}</style>

//       <div
//         ref={cursorRef}
//         className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center cursor-transition"
//         style={{
//           opacity: visible ? 1 : 0,
//           mixBlendMode: cursorMode === 'profile' ? 'normal' : 'difference',
//           transition: 'opacity 0.3s ease-out',
//         }}
//       >
//         {/* Default large video cursor */}
//         {cursorMode === 'default' && (
//           <div className="w-24 h-24 rounded-full overflow-hidden border border-white/40 backdrop-blur-sm cursor-transition scale-100">
//             <video
//               ref={videoRef}
//               src={videoSrc}
//               className="w-full h-full object-cover"
//               loop
//               muted
//               playsInline
//               preload="metadata"
//             />
//           </div>
//         )}

//         {/* Text hover: magnified video */}
//         {cursorMode === 'text' && (
//           <div
//             className="w-28 h-28 rounded-full overflow-hidden border border-white/60 backdrop-blur-md cursor-transition"
//             style={{ animation: 'magnify 0.25s ease forwards' }}
//           >
//             <video
//               ref={videoRef}
//               src={videoSrc}
//               className="w-full h-full object-cover scale-110"
//               loop
//               muted
//               playsInline
//               preload="metadata"
//             />
//           </div>
//         )}

//         {/* Clickable elements: larger smooth dot */}
//         {cursorMode === 'clickable' && (
//           <div className="w-7 h-7 bg-white/90 rounded-full shadow-md cursor-transition" />
//         )}

//         {/* Navigation: small clean dot */}
//         {cursorMode === 'nav' && (
//           <div className="w-5 h-5 bg-white/80 rounded-full shadow-sm cursor-transition" />
//         )}

//         {/* Profile hover: “View Profile” */}
//         {cursorMode === 'profile' && (
//           <div className="px-5 py-3 rounded-full bg-black text-white text-base font-medium shadow-lg cursor-transition">
//             View Profile
//           </div>
//         )}
//       </div>
//     </>
//   );
// }














import React, { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  videoSrc?: string;
}

type CursorMode = 'default' | 'clickable' | 'profile' | 'nav' | 'text';

export default function CustomCursor({ videoSrc = '/background.mp4' }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [visible, setVisible] = useState(true);

  // For smooth movement
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      const target = e.target as HTMLElement;
      const dataCursor = (target.closest('[data-cursor]') as HTMLElement | null)?.getAttribute('data-cursor') as CursorMode | null;

      // Give profile precedence so it wins over links/buttons within the card
      if (dataCursor === 'profile' || target.closest('.profile-img')) {
        setCursorMode('profile');
      } else if (target.closest('nav, .navbar, .navigation, .menu')) {
        setCursorMode('nav');
      } else if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setCursorMode('clickable');
      } else if (target.closest('p, span, h1, h2, h3, h4, h5, h6')) {
        setCursorMode('text');
      } else {
        setCursorMode('default');
      }

      setVisible(true);
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth animation loop
    let animationFrame: number;
    const render = () => {
      const speed = 0.2; // lower = smoother
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * speed;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * speed;

      cursor.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`;
      animationFrame = requestAnimationFrame(render);
    };
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Control video playback based on mode
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (cursorMode === 'default' || cursorMode === 'text') {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [cursorMode]);

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        @media (max-width: 768px) {
          * { cursor: auto !important; }
        }

        .cursor-transition {
          transition: all 140ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity, width, height, background;
        }

        @keyframes magnify {
          0% { transform: scale(1); }
          100% { transform: scale(1.25); }
        }
      `}</style>

      <div
        ref={cursorRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center cursor-transition"
        style={{
          opacity: visible ? 1 : 0,
          mixBlendMode: cursorMode === 'profile' ? 'normal' : 'difference',
          transition: 'opacity 0.25s ease-out',
        }}
      >
        {/* Default large video cursor */}
        {cursorMode === 'default' && (
          <div className="w-24 h-24 rounded-full overflow-hidden border border-white/40 backdrop-blur-sm cursor-transition">
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
              preload="metadata"
            />
          </div>
        )}

        {/* Text hover: magnified video */}
        {cursorMode === 'text' && (
          <div
            className="w-28 h-28 rounded-full overflow-hidden border border-white/60 backdrop-blur-md cursor-transition"
            style={{ animation: 'magnify 0.22s ease forwards' }}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-cover scale-110"
              loop
              muted
              playsInline
              preload="metadata"
            />
          </div>
        )}

        {/* Clickable elements: larger smooth dot */}
        {cursorMode === 'clickable' && (
          <div className="w-5 h-5 bg-white/90 rounded-full shadow-md cursor-transition" />
        )}

        {/* Navigation: small clean dot */}
        {cursorMode === 'nav' && (
          <div className="w-6 h-6 bg-white/80 rounded-full shadow-sm cursor-transition" />
        )}

        {/* Profile hover: circular gradient + text (like your screenshot) */}
        {cursorMode === 'profile' && (
          <div
            className="relative w-18 h-18 md:w-24 md:h-24 rounded-full flex items-center justify-center cursor-transition shadow-[0_10px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10"
            style={{
              background:
                'radial-gradient(80% 80% at 30% 30%, #6EE7F9 0%, #7C3AED 45%, #DB2777 75%, #0B1020 100%)',
            }}
          >
            <span className="text-white text-sm md:text-[15px] font-semibold tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] select-none">
              View Profile
            </span>
          </div>
        )}
      </div>
    </>
  );
}