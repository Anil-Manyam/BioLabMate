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




// CustomCursor.tsx - FIXED to prioritize data-cursor attribute

// import React, { useEffect, useRef, useState } from 'react';

// interface CustomCursorProps {
//   videoSrc?: string;
// }

// type CursorMode = 'default' | 'clickable' | 'profile' | 'nav' | 'text';

// export default function CustomCursor({ videoSrc = '/background.mp4' }: CustomCursorProps) {
//   const cursorRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [cursorMode, setCursorMode] = useState<CursorMode>('default');
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

//       // FIXED: Check data-cursor attribute FIRST with proper traversal
//       // This checks the element itself AND all parent elements up the tree
//       let currentElement: HTMLElement | null = target;
//       let dataCursor: CursorMode | null = null;
      
//       // Traverse up the DOM tree to find data-cursor attribute
//       while (currentElement && currentElement !== document.body) {
//         const cursorAttr = currentElement.getAttribute('data-cursor');
//         if (cursorAttr) {
//           dataCursor = cursorAttr as CursorMode;
//           break;
//         }
//         currentElement = currentElement.parentElement;
//       }

//       // If data-cursor is found, use it immediately (highest priority)
//       if (dataCursor) {
//         setCursorMode(dataCursor);
//       }
//       // Otherwise, check for specific element types
//       else if (target.closest('.profile-img')) {
//         setCursorMode('profile');
//       } else if (target.closest('nav, .navbar, .navigation, .menu')) {
//         setCursorMode('nav');
//       } else if (target.closest('a, button, [role="button"], input, textarea, select')) {
//         setCursorMode('clickable');
//       } else if (target.closest('p, span, h1, h2, h3, h4, h5, h6')) {
//         // FIXED: Only set text mode if NOT inside a clickable element
//         const isInsideClickable = target.closest('[data-cursor="clickable"], a, button, [role="button"]');
//         if (!isInsideClickable) {
//           setCursorMode('text');
//         } else {
//           setCursorMode('clickable');
//         }
//       } else {
//         setCursorMode('default');
//       }

//       setVisible(true);
//     };

//     const handleMouseEnter = () => setVisible(true);
//     const handleMouseLeave = () => setVisible(false);

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseenter', handleMouseEnter);
//     document.addEventListener('mouseleave', handleMouseLeave);

//     // Smooth animation loop
//     let animationFrame: number;
//     const render = () => {
//       const speed = 0.2; // lower = smoother
//       cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * speed;
//       cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * speed;

//       cursor.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`;
//       animationFrame = requestAnimationFrame(render);
//     };

//     animationFrame = requestAnimationFrame(render);

//     return () => {
//       cancelAnimationFrame(animationFrame);
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseenter', handleMouseEnter);
//       document.removeEventListener('mouseleave', handleMouseLeave);
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
//           * {
//             cursor: auto !important;
//           }
//         }
//       `}</style>

//       <div
//         ref={cursorRef}
//         aria-hidden
//         className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center cursor-transition"
//         style={{
//           opacity: visible ? 1 : 0,
//           mixBlendMode: cursorMode === 'profile' ? 'normal' : 'difference',
//           transition: 'opacity 0.25s ease-out',
//         }}
//       >
//         {/* Default large video cursor */}
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

//         {/* Text hover: magnified video */}
//         {cursorMode === 'text' && (
//           <div
//             className="w-28 h-28 rounded-full overflow-hidden border border-white/60 backdrop-blur-md cursor-transition"
//             style={{ animation: 'magnify 0.22s ease forwards' }}
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

//         {/* Clickable elements: small white dot */}
//         {cursorMode === 'clickable' && (
//           <div className="w-5 h-5 bg-white rounded-full shadow-lg cursor-transition"></div>
//         )}

//         {/* Navigation: small clean dot */}
//         {cursorMode === 'nav' && (
//           <div className="w-6 h-6 bg-white rounded-full shadow-md cursor-transition"></div>
//         )}

//         {/* Profile hover: circular gradient + text */}
//         {cursorMode === 'profile' && (
//           <div
//             className="relative w-18 h-18 md:w-24 md:h-24 rounded-full flex items-center justify-center cursor-transition shadow-[0_10px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10"
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
//       </div>
//     </>
//   );
// }







// // transparent background capture version on hover text
// import React, { useEffect, useRef, useState } from 'react';

// interface CustomCursorProps {
//   videoSrc?: string;
// }

// type CursorMode = 'default' | 'clickable' | 'profile' | 'nav' | 'text';

// export default function CustomCursor({ videoSrc = '/background.mp4' }: CustomCursorProps) {
//   const cursorRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const [cursorMode, setCursorMode] = useState<CursorMode>('default');
//   const [visible, setVisible] = useState(true);
//   const [bgImage, setBgImage] = useState<string>('');

//   const mousePos = useRef({ x: 0, y: 0 });
//   const cursorPos = useRef({ x: 0, y: 0 });

//   useEffect(() => {
//     // Take a screenshot-like background of the page using CSS background
//     setBgImage(getComputedStyle(document.body).backgroundImage || '');

//     const cursor = cursorRef.current;
//     if (!cursor) return;

//     const handleMouseMove = (e: MouseEvent) => {
//       mousePos.current.x = e.clientX;
//       mousePos.current.y = e.clientY;

//       const target = e.target as HTMLElement;
//       const dataCursor = (target.closest('[data-cursor]') as HTMLElement | null)?.getAttribute('data-cursor') as CursorMode | null;

//       if (dataCursor === 'profile' || target.closest('.profile-img')) {
//         setCursorMode('profile');
//       } else if (target.closest('nav, .navbar, .navigation, .menu')) {
//         setCursorMode('nav');
//       } else if (target.closest('a, button, [role="button"], input, textarea, select')) {
//         setCursorMode('clickable');
//       } else if (target.closest('p, span, h1, h2, h3, h4, h5, h6')) {
//         setCursorMode('text');
//       } else {
//         setCursorMode('default');
//       }

//       setVisible(true);
//     };

//     const handleMouseEnter = () => setVisible(true);
//     const handleMouseLeave = () => setVisible(false);

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseenter', handleMouseEnter);
//     document.addEventListener('mouseleave', handleMouseLeave);

//     let frame: number;
//     const render = () => {
//       const speed = 0.2;
//       cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * speed;
//       cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * speed;

//       cursor.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`;
//       frame = requestAnimationFrame(render);
//     };
//     frame = requestAnimationFrame(render);

//     return () => {
//       cancelAnimationFrame(frame);
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseenter', handleMouseEnter);
//       document.removeEventListener('mouseleave', handleMouseLeave);
//     };
//   }, []);

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

//         .cursor-transition {
//           transition: all 140ms cubic-bezier(0.22, 1, 0.36, 1);
//           will-change: transform, opacity, width, height, background;
//         }

//         @keyframes magnify {
//           0% { transform: scale(1); }
//           100% { transform: scale(1.25); }
//         }

//         .magnifier {
//           background-repeat: no-repeat;
//           background-size: 200%;
//           border-radius: 9999px;
//           box-shadow: 0 0 8px rgba(255,255,255,0.3);
//           overflow: hidden;
//         }
//       `}</style>

//       <div
//         ref={cursorRef}
//         aria-hidden
//         className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center cursor-transition"
//         style={{
//           opacity: visible ? 1 : 0,
//           mixBlendMode: cursorMode === 'profile' ? 'normal' : 'difference',
//           transition: 'opacity 0.25s ease-out',
//         }}
//       >
//         {/* Default: video circle */}
//         {cursorMode === 'default' && (
//           <div className="w-24 h-24 rounded-full overflow-hidden border border-white/40 backdrop-blur-sm cursor-transition">
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

//         {/* Text hover: Real magnifying glass effect */}
//         {cursorMode === 'text' && (
//           <div
//             className="w-28 h-28 border border-white/40 cursor-transition magnifier"
//             style={{
//               backgroundImage: bgImage || '',
//               backgroundColor: 'rgba(255,255,255,0.08)',
//               backgroundPosition: `${-mousePos.current.x * 1.2}px ${-mousePos.current.y * 1.2}px`,
//               backgroundSize: '200%',
//               animation: 'magnify 0.22s ease forwards',
//             }}
//           />
//         )}

//         {/* Clickable: small translucent dot */}
//         {cursorMode === 'clickable' && (
//           <div className="w-4 h-4 bg-white/80 rounded-full shadow-sm cursor-transition" />
//         )}

//         {/* Navigation: small clean dot */}
//         {cursorMode === 'nav' && (
//           <div className="w-5 h-5 bg-white/80 rounded-full shadow-sm cursor-transition" />
//         )}

//         {/* Profile hover: gradient with “View Profile” text */}
//         {cursorMode === 'profile' && (
//           <div
//             className="relative w-18 h-18 md:w-24 md:h-24 rounded-full flex items-center justify-center cursor-transition shadow-[0_10px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10"
//             style={{
//               background:
//                 'radial-gradient(80% 80% at 30% 30%, #6EE7F9 0%, #7C3AED 45%, #DB2777 75%, #0B1020 100%)',
//             }}
//           >
//             <span className="text-white text-sm md:text-[15px] font-semibold tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] select-none">
//               View Profile
//             </span>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }












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
//       } else if (target.closest('.profile-img')) {
//         setCursorMode('profile');
//       } else if (target.closest('nav, .navbar, .navigation, .menu')) {
//         setCursorMode('nav');
//       } else if (
//         target.closest(
//           'a, button, [role="button"], input, textarea, select'
//         )
//       ) {
//         setCursorMode('clickable');
//       } else if (
//         target.closest('p, span, h1, h2, h3, h4, h5, h6')
//       ) {
//         const insideClickable = target.closest(
//           '[data-cursor="clickable"], a, button, [role="button"]'
//         );
//         if (!insideClickable) setCursorMode('text');
//         else setCursorMode('clickable');
//       } else {
//         setCursorMode('default');
//       }

//       setVisible(true);
//     };

//     const handleEnter = () => setVisible(true);
//     const handleLeave = () => setVisible(false);

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseenter', handleEnter);
//     document.addEventListener('mouseleave', handleLeave);

//     let frame: number;
//     const animate = () => {
//       const speed = 0.2;
//       cursorPos.current.x +=
//         (mousePos.current.x - cursorPos.current.x) * speed;
//       cursorPos.current.y +=
//         (mousePos.current.y - cursorPos.current.y) * speed;

//       cursor.style.transform = `
//         translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)
//         translate(-50%, -50%)
//       `;
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

//         /* 🌱 ECO-GLOW PULSE ANIMATION */
//         @keyframes ecoPulse {
//           0% {
//             transform: scale(0.85);
//             box-shadow: 0 0 6px rgba(0, 255, 140, 0.35),
//                         0 0 12px rgba(0, 255, 140, 0.20),
//                         0 0 22px rgba(0, 255, 140, 0.10);
//           }
//           50% {
//             transform: scale(1);
//             box-shadow: 0 0 12px rgba(0, 255, 140, 0.55),
//                         0 0 22px rgba(0, 255, 140, 0.35),
//                         0 0 32px rgba(0, 255, 140, 0.20);
//           }
//           100% {
//             transform: scale(0.85);
//             box-shadow: 0 0 6px rgba(0, 255, 140, 0.35),
//                         0 0 12px rgba(0, 255, 140, 0.20),
//                         0 0 22px rgba(0, 255, 140, 0.10);
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
//         {/* DEFAULT → VIDEO */}
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

//         {/* CLICKABLE */}
//         {cursorMode === 'clickable' && (
//           <div className="w-5 h-5 bg-white rounded-full shadow-lg"></div>
//         )}

//         {/* NAV */}
//         {cursorMode === 'nav' && (
//           <div className="w-6 h-6 bg-white rounded-full shadow-md"></div>
//         )}

//         {/* PROFILE */}
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

//         {/* 🌿 TEXT → ECO-GLOW PULSE */}
//         {cursorMode === 'text' && (
//           <div
//             className="w-10 h-10 rounded-full backdrop-blur-sm"
//             style={{
//               border: '1px solid rgba(0, 255, 140, 0.45)',
//               background:
//                 'radial-gradient(circle, rgba(0,255,140,0.12) 0%, rgba(0,255,140,0.03) 70%, transparent 100%)',
//               animation: 'ecoPulse 1.8s ease-in-out infinite',
//             }}
//           ></div>
//         )}
//       </div>
//     </>
//   );
// }


































import React, { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  videoSrc?: string;
  waveIntensity?: number; // 0-100, controls wave color opacity
  cursorSize?: number; // 0-100, controls cursor size (default 100% = 48px)
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

  // Calculate wave opacity based on intensity percentage
  const waveOpacity = (waveIntensity / 100).toFixed(2);
  
  // Calculate cursor size in pixels (base size = 48px at 100%)
  const baseCursorSize = 48;
  const calculatedSize = (baseCursorSize * cursorSize) / 100;
  const halfSize = calculatedSize / 2;

  // ------------------------------------------------------
  // MOVEMENT + HOVER LOGIC
  // ------------------------------------------------------
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

      // Update magnifier position
      if (cursorMode === 'text' && magnifierRef.current) {
        const magnifier = magnifierRef.current;
        const x = mousePos.current.x;
        const y = mousePos.current.y;
        
        // Set transform to show content at cursor position
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

  // ------------------------------------------------------
  // VIDEO PLAY / PAUSE
  // ------------------------------------------------------
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

        {/* 🔍 TEXT → BLUE GLASSMORPHIC MAGNIFYING GLASS WITH WAVE EFFECT */}
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
                {/* The actual page content will be captured here via CSS */}
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
