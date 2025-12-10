import React, { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  videoSrc?: string;
  waveIntensity?: number; 
  cursorSize?: number; 
}

type CursorMode =
  | 'default'
  | 'clickable'
  | 'profile'
  | 'nav'
  | 'text';

export default function CustomCursor({
  videoSrc = '/background.mp4',
  waveIntensity = 60, // Default 60% intensity
  cursorSize = 60, // Default 100% size (48px)
}: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const magnifierRef = useRef<HTMLDivElement>(null);

  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [visible, setVisible] = useState(true);

  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const waveOpacity = (waveIntensity / 100).toFixed(2);
  const baseCursorSize = 48;
  const calculatedSize = (baseCursorSize * cursorSize) / 100;
  const halfSize = calculatedSize / 2;

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      const target = e.target as HTMLElement;

      let current: HTMLElement | null = target;
      let dataCursor: CursorMode | null = null;

      while (current && current !== document.body) {
        const attr = current.getAttribute('data-cursor');
        if (attr) {
          dataCursor = attr as CursorMode;
          break;
        }
        current = current.parentElement;
      }

      if (dataCursor) {
        setCursorMode(dataCursor);
      } else if (target.closest('.profile-img')) {
        setCursorMode('profile');
      } else if (target.closest('nav, .navbar, .navigation, .menu')) {
        setCursorMode('nav');
      } else if (
        target.closest(
          'a, button, [role="button"], input, textarea, select'
        )
      ) {
        setCursorMode('clickable');
      } else if (
        target.closest('p, span, h1, h2, h3, h4, h5, h6')
      ) {
        const insideClickable = target.closest(
          '[data-cursor="clickable"], a, button, [role="button"]'
        );
        if (!insideClickable) setCursorMode('text');
        else setCursorMode('clickable');
      } else {
        setCursorMode('default');
      }

      setVisible(true);
    };

    const handleEnter = () => setVisible(true);
    const handleLeave = () => setVisible(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleEnter);
    document.addEventListener('mouseleave', handleLeave);

    let frame: number;
    const animate = () => {
      const speed = 0.2;
      cursorPos.current.x +=
        (mousePos.current.x - cursorPos.current.x) * speed;
      cursorPos.current.y +=
        (mousePos.current.y - cursorPos.current.y) * speed;

      cursor.style.transform = `
        translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)
        translate(-50%, -50%)
      `;

      if (cursorMode === 'text' && magnifierRef.current) {
        const magnifier = magnifierRef.current;
        const x = mousePos.current.x;
        const y = mousePos.current.y;

        magnifier.style.left = `${-x + halfSize}px`;
        magnifier.style.top = `${-y + halfSize}px`;
      }

      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleEnter);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [cursorMode, halfSize]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (cursorMode === 'default') {
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

        /* 🌊 WAVE RIPPLE EFFECT ANIMATION */
        @keyframes waveRipple {
          0% {
            transform: scale(1);
            opacity: ${waveOpacity};
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        /* Text inversion inside magnifier */
        .magnifier-content * {
          filter: invert(1) hue-rotate(180deg) !important;
        }
      `}</style>

      <div
        ref={cursorRef}
        aria-hidden
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:flex items-center justify-center"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.25s ease-out',
          mixBlendMode: cursorMode === 'profile' ? 'normal' : 'difference',
        }}
      >
        {/* DEFAULT → VIDEO */}
        {cursorMode === 'default' && (
          <div className="w-24 h-24 rounded-full overflow-hidden border border-white/40 backdrop-blur-sm">
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

        {/* CLICKABLE */}
        {cursorMode === 'clickable' && (
          <div className="w-5 h-5 bg-white rounded-full shadow-lg"></div>
        )}

        {/* NAV */}
        {cursorMode === 'nav' && (
          <div className="w-6 h-6 bg-white rounded-full shadow-md"></div>
        )}

        {/* PROFILE */}
        {cursorMode === 'profile' && (
          <div
            className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10"
            style={{
              background:
                'radial-gradient(80% 80% at 30% 30%, #6EE7F9 0%, #7C3AED 45%, #DB2777 75%, #0B1020 100%)',
            }}
          >
            <div className="text-white text-xs md:text-sm font-semibold text-center px-2">
              View Profile
            </div>
          </div>
        )}

        {cursorMode === 'text' && (
          <div 
            className="relative" 
            style={{ 
              width: `${calculatedSize}px`, 
              height: `${calculatedSize}px` 
            }}
          >
            {/* Wave Ring 1 */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                border: `2px solid rgba(16, 219, 121, ${waveOpacity})`,
                animation: 'waveRipple 2s ease-out infinite',
                animationDelay: '0s',
              }}
            />

            {/* Wave Ring 2 */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                border: `2px solid rgba(16, 219, 121, ${waveOpacity})`,
                animation: 'waveRipple 2s ease-out infinite',
                animationDelay: '0.5s',
              }}
            />

            {/* Wave Ring 3 */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                border: `2px solid rgba(16, 219, 121, ${waveOpacity})`,
                animation: 'waveRipple 2s ease-out infinite',
                animationDelay: '1s',
              }}
            />

            {/* Wave Ring 4 */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                border: `2px solid rgba(16, 219, 121, ${waveOpacity})`,
                animation: 'waveRipple 2s ease-out infinite',
                animationDelay: '1.5s',
              }}
            />

            {/* Main Glass Cursor */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                background: 'rgba(173, 216, 230, 0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(135, 206, 250, 0.4)',
                boxShadow: 'inset 0 0 20px rgba(173, 216, 230, 0.1)',
              }}
            >
              {/* Magnified content layer with inverted colors */}
              <div
                ref={magnifierRef}
                className="magnifier-content absolute rounded-full"
                style={{
                  width: '200vw',
                  height: '200vh',
                  position: 'absolute',
                  filter: 'invert(1)',
                  mixBlendMode: 'difference',
                }}
              >
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}












// import React, { useEffect, useRef, useState } from 'react';

// interface CustomCursorProps {
//   videoSrc?: string;
// }

// type CursorMode =
//   | 'default'
//   | 'clickable'
//   | 'profile'
//   | 'nav'
//   | 'text';

// export default function CustomCursor({
//   videoSrc = '/background.mp4',
// }: CustomCursorProps) {
//   const cursorRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const [cursorMode, setCursorMode] = useState<CursorMode>('default');
//   const [visible, setVisible] = useState(true);

//   const mousePos = useRef({ x: 0, y: 0 });
//   const cursorPos = useRef({ x: 0, y: 0 });

//   // ------------------------------------------------------
//   // MOVEMENT + HOVER LOGIC
//   // ------------------------------------------------------
//   useEffect(() => {
//     const cursor = cursorRef.current;
//     if (!cursor) return;

//     const handleMouseMove = (e: MouseEvent) => {
//       mousePos.current.x = e.clientX;
//       mousePos.current.y = e.clientY;

//       const target = e.target as HTMLElement;

//       // 1. Check data-cursor
//       let current: HTMLElement | null = target;
//       let dataCursor: CursorMode | null = null;

//       while (current && current !== document.body) {
//         const attr = current.getAttribute('data-cursor');
//         if (attr) {
//           dataCursor = attr as CursorMode;
//           break;
//         }
//         current = current.parentElement;
//       }

//       if (dataCursor) {
//         setCursorMode(dataCursor);
//       }

//       // 2. Profile
//       else if (target.closest('.profile-img')) {
//         setCursorMode('profile');
//       }

//       // 3. Navigation
//       else if (target.closest('nav, .navbar, .navigation, .menu')) {
//         setCursorMode('nav');
//       }

//       // 4. Clickable
//       else if (
//         target.closest(
//           'a, button, [role="button"], input, textarea, select'
//         )
//       ) {
//         setCursorMode('clickable');
//       }

//       // 5. TEXT (ocean ripple)
//       else if (
//         target.closest('p, span, h1, h2, h3, h4, h5, h6')
//       ) {
//         const insideClickable = target.closest(
//           '[data-cursor="clickable"], a, button, [role="button"]'
//         );
//         if (!insideClickable) setCursorMode('text');
//         else setCursorMode('clickable');
//       }

//       // 6. Default
//       else {
//         setCursorMode('default');
//       }

//       setVisible(true);
//     };

//     const handleEnter = () => setVisible(true);
//     const handleLeave = () => setVisible(false);

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseenter', handleEnter);
//     document.addEventListener('mouseleave', handleLeave);

//     // Smooth follow
//     let frame: number;
//     const animate = () => {
//       const speed = 0.2;
//       cursorPos.current.x +=
//         (mousePos.current.x - cursorPos.current.x) * speed;
//       cursorPos.current.y +=
//         (mousePos.current.y - cursorPos.current.y) * speed;

//       cursor.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`;
//       frame = requestAnimationFrame(animate);
//     };
//     animate();

//     return () => {
//       cancelAnimationFrame(frame);
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseenter', handleEnter);
//       document.removeEventListener('mouseleave', handleLeave);
//     };
//   }, []);

//   // ------------------------------------------------------
//   // VIDEO PLAY / PAUSE
//   // ------------------------------------------------------
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
//         * { cursor: none !important; }
//         @media (max-width: 768px) {
//           * { cursor: auto !important; }
//         }

//         /* Ocean Ripple Animation */
//         @keyframes oceanRipple {
//           0% {
//             transform: scale(0.4);
//             opacity: 0.5;
//           }
//           70% {
//             transform: scale(1.4);
//             opacity: 0.15;
//           }
//           100% {
//             transform: scale(2);
//             opacity: 0;
//           }
//         }
//       `}</style>

//       <div
//         ref={cursorRef}
//         aria-hidden
//         className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:flex items-center justify-center"
//         style={{
//           opacity: visible ? 1 : 0,
//           transition: 'opacity 0.25s ease-out',
//           mixBlendMode: cursorMode === 'profile' ? 'normal' : 'difference',
//         }}
//       >
//         {/* DEFAULT → VIDEO CURSOR */}
//         {cursorMode === 'default' && (
//           <div className="w-24 h-24 rounded-full overflow-hidden border border-white/40 backdrop-blur-sm">
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

//         {/* CLICKABLE → WHITE DOT */}
//         {cursorMode === 'clickable' && (
//           <div className="w-5 h-5 bg-white rounded-full shadow-lg"></div>
//         )}

//         {/* NAV → SMALL DOT */}
//         {cursorMode === 'nav' && (
//           <div className="w-6 h-6 bg-white rounded-full shadow-md"></div>
//         )}

//         {/* PROFILE → GRADIENT BUBBLE */}
//         {cursorMode === 'profile' && (
//           <div
//             className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10"
//             style={{
//               background:
//                 'radial-gradient(80% 80% at 30% 30%, #6EE7F9 0%, #7C3AED 45%, #DB2777 75%, #0B1020 100%)',
//             }}
//           >
//             <div className="text-white text-xs md:text-sm font-semibold text-center px-2">
//               View Profile
//             </div>
//           </div>
//         )}

//         {/* TEXT → OCEAN RIPPLE EFFECT */}
//         {cursorMode === 'text' && (
//           <div
//             className="relative w-10 h-10 rounded-full"
//             style={{
//               border: '2px solid rgba(180,220,255,0.55)',
//               background: 'rgba(150,200,255,0.10)',
//               backdropFilter: 'blur(4px)',
//             }}
//           >
//             {/* Ripple ring */}
//             <div
//               className="absolute inset-0 rounded-full"
//               style={{
//                 border: '2px solid rgba(150,200,255,0.45)',
//                 animation: 'oceanRipple 1.4s ease-out infinite',
//               }}
//             ></div>

//             {/* Second ripple, staggered */}
//             <div
//               className="absolute inset-0 rounded-full"
//               style={{
//                 border: '2px solid rgba(150,200,255,0.25)',
//                 animation: 'oceanRipple 1.4s ease-out infinite',
//                 animationDelay: '0.35s',
//               }}
//             ></div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
