// // import heroImage from '@/assets/hero-seaweed.jpg';
// import { Button } from '@/components/ui/button';
// import { ArrowDown } from 'lucide-react';
// import Logo from '@/assets/Logo.jpg';

// const HeroSection = () => {
//   const scrollToNext = () => {
//     const timelineElement = document.getElementById('timeline');
//     if (timelineElement) {
//       timelineElement.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
//       {/* Background Video - Place your video file in the public/ folder (e.g., public/background.mp4) and update the src below if needed */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover z-0"
//         src="/background.mp4"
//       />

//       {/* Floating particles animation */}
//       <div className="absolute inset-0 z-5">
//         <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary-light/40 rounded-full animate-bounce delay-1000"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/15 rounded-full animate-pulse delay-2000"></div>
//         <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-primary-light/30 rounded-full animate-bounce delay-3000"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
//         <div className="max-w-5xl mx-auto">
//           {/* Enhanced BioLabMate Title with Better Visibility */}
//           <div className="relative mb-8">
//             <h1 className="relative text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
//               <span className="block text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] drop-shadow-[0_0_40px_rgba(0,0,0,0.6)] [text-shadow:_0_0_30px_rgba(0,0,0,0.9),_0_0_60px_rgba(0,0,0,0.7)] animate-pulse">
//                 BioLabMate
//               </span>
//             </h1>
//           </div>
          
//           <p className="text-2xl sm:text-3xl lg:text-4xl text-white mb-10 font-light leading-relaxed drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] [text-shadow:_0_0_20px_rgba(0,0,0,0.9)]">
//             Pioneering the Future of Sustainable Materials
//           </p>
//           <p className="text-xl sm:text-2xl text-white mb-16 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] [text-shadow:_0_0_15px_rgba(0,0,0,0.9)]">
//             Developing biodegradable plastic and innovative lab materials from seaweed, 
//             creating a cleaner tomorrow for our planet.
//           </p>

//           {/* Removed Meet Our Team, Get In Touch, and scroll down button */}
//         </div>
//       </div>

//       {/* Scroll indicator removed */}
//     </section>
//   );
// };

// export default HeroSection;





















// // Scratch-off effect. intially
// import { useRef, useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { ArrowDown } from 'lucide-react';
// import Logo from '@/assets/Logo.jpg';
// import oceanWaste from '@/assets/Calculator.jpg'; // overlay image

// const HeroSection = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

//   // initialize the overlay once loaded
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const container = containerRef.current;
//     if (!canvas || !container) return;

//     const context = canvas.getContext('2d');
//     if (!context) return;

//     const img = new Image();
//     img.src = oceanWaste;
//     img.onload = () => {
//       canvas.width = container.clientWidth;
//       canvas.height = container.clientHeight;
//       context.drawImage(img, 0, 0, canvas.width, canvas.height);
//     };

//     setCtx(context);

//     const handleResize = () => {
//       if (!context) return;
//       canvas.width = container.clientWidth;
//       canvas.height = container.clientHeight;
//       context.drawImage(img, 0, 0, canvas.width, canvas.height);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // scratch effect logic
//   const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isDrawing || !ctx) return;
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     ctx.globalCompositeOperation = 'destination-out';
//     const radius = 50; // scratch size
//     const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
//     gradient.addColorStop(0, 'rgba(0,0,0,1)');
//     gradient.addColorStop(1, 'rgba(0,0,0,0)');
//     ctx.fillStyle = gradient;
//     ctx.beginPath();
//     ctx.arc(x, y, radius, 0, Math.PI * 2, false);
//     ctx.fill();
//   };

//   const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
//     if (!ctx) return;
//     const touch = e.touches[0];
//     const rect = canvasRef.current!.getBoundingClientRect();
//     const x = touch.clientX - rect.left;
//     const y = touch.clientY - rect.top;

//     ctx.globalCompositeOperation = 'destination-out';
//     const radius = 40;
//     const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
//     gradient.addColorStop(0, 'rgba(0,0,0,1)');
//     gradient.addColorStop(1, 'rgba(0,0,0,0)');
//     ctx.fillStyle = gradient;
//     ctx.beginPath();
//     ctx.arc(x, y, radius, 0, Math.PI * 2, false);
//     ctx.fill();
//   };

//   return (
//     <section
//       id="hero"
//       ref={containerRef}
//       className="relative h-screen flex items-center justify-center overflow-hidden"
//     >
//       {/* Background Video */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover z-0"
//         src="/background.mp4"
//       />

//       {/* Content */}
//       <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
//         <div className="max-w-5xl mx-auto">
//           <div className="relative mb-8">
//             <h1 className="relative text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
//               <span className="block text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] [text-shadow:_0_0_40px_rgba(0,0,0,0.6)] animate-pulse">
//                 BioLabMate
//               </span>
//             </h1>
//           </div>
//           <p className="text-2xl sm:text-3xl lg:text-4xl text-white mb-10 font-light leading-relaxed drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
//             Pioneering the Future of Sustainable Materials
//           </p>
//           <p className="text-xl sm:text-2xl text-white mb-16 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
//             Developing biodegradable plastic and innovative lab materials from seaweed,
//             creating a cleaner tomorrow for our planet.
//           </p>
//         </div>
//       </div>

//       {/* Scratch-off overlay */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 z-20 cursor-crosshair"
//         onMouseDown={() => setIsDrawing(true)}
//         onMouseUp={() => setIsDrawing(false)}
//         onMouseLeave={() => setIsDrawing(false)}
//         onMouseMove={handleMouseMove}
//         onTouchMove={handleTouchMove}
//       />
//     </section>
//   );
// };

// export default HeroSection;









// // Scratch-off effect only nav bar under clearing 

// import { useRef, useEffect, useState } from 'react';
// import oceanWaste from '@/assets/Calculator.jpg'; // Ocean waste overlay image

// const HeroSection = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
//   const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
//   const [cursorSize, setCursorSize] = useState(25);
//   const [isScratching, setIsScratching] = useState(false);
//   const lastPos = useRef<{ x: number; y: number } | null>(null);
//   const [hasClearedNav, setHasClearedNav] = useState(false);

//   // Initialize overlay
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const container = containerRef.current;
//     if (!canvas || !container) return;

//     const context = canvas.getContext('2d');
//     if (!context) return;

//     const img = new Image();
//     img.src = oceanWaste;
//     img.onload = () => {
//       canvas.width = container.clientWidth;
//       canvas.height = container.clientHeight;
//       context.drawImage(img, 0, 0, canvas.width, canvas.height);
//     };

//     setCtx(context);

//     const handleResize = () => {
//       if (!context) return;
//       canvas.width = container.clientWidth;
//       canvas.height = container.clientHeight;
//       context.drawImage(img, 0, 0, canvas.width, canvas.height);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const scratch = (x: number, y: number, radius: number) => {
//     if (!ctx) return;
//     ctx.globalCompositeOperation = 'destination-out';
//     const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
//     gradient.addColorStop(0, 'rgba(0,0,0,1)');
//     gradient.addColorStop(1, 'rgba(0,0,0,0)');
//     ctx.fillStyle = gradient;
//     ctx.beginPath();
//     ctx.arc(x, y, radius, 0, Math.PI * 2, false);
//     ctx.fill();
//   };

//   const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current;
//     if (!canvas || !ctx) return;

//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     setCursorPos({ x, y });

//     if (isDrawing) {
//       setIsScratching(true);
//       const radius = cursorSize * 1.2;
//       const last = lastPos.current;

//       if (last) {
//         const dx = x - last.x;
//         const dy = y - last.y;
//         const dist = Math.sqrt(dx * dx + dy * dy);
//         const steps = Math.ceil(dist / 5);
//         for (let i = 0; i < steps; i++) {
//           const newX = last.x + (dx * i) / steps;
//           const newY = last.y + (dy * i) / steps;
//           scratch(newX, newY, radius);
//         }
//       } else {
//         scratch(x, y, radius);
//       }
//       lastPos.current = { x, y };
//       checkScratchProgress();
//     } else {
//       lastPos.current = null;
//     }
//   };

//   const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
//     const touch = e.touches[0];
//     if (!ctx) return;
//     const rect = canvasRef.current!.getBoundingClientRect();
//     const x = touch.clientX - rect.left;
//     const y = touch.clientY - rect.top;
//     scratch(x, y, cursorSize * 1.2);
//     checkScratchProgress();
//   };

//   const startDrawing = () => {
//     setIsDrawing(true);
//     setCursorSize(60);
//   };

//   const stopDrawing = () => {
//     setIsDrawing(false);
//     setCursorSize(25);
//     setIsScratching(false);
//     lastPos.current = null;
//   };

//   // ✅ Calculate how much of the overlay has been erased
//   const checkScratchProgress = () => {
//     const canvas = canvasRef.current;
//     if (!canvas || !ctx || hasClearedNav) return;

//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const pixels = imageData.data;
//     let transparent = 0;

//     for (let i = 3; i < pixels.length; i += 4) {
//       if (pixels[i] < 128) transparent++;
//     }

//     const percent = (transparent / (pixels.length / 4)) * 100;

//     if (percent > 80) {
//       clearNavigationBarArea();
//       setHasClearedNav(true);
//     }
//   };

//   // ✅ Smooth fade out effect only under the navigation bar area
//   const clearNavigationBarArea = () => {
//     const canvas = canvasRef.current;
//     if (!canvas || !ctx) return;
//     const navHeight = 100; // adjust depending on navbar height
//     const fadeSteps = 30;
//     let step = 0;

//     const fadeInterval = setInterval(() => {
//       step++;
//       ctx.clearRect(0, 0, canvas.width, navHeight);
//       ctx.fillStyle = `rgba(0,0,0,${0.4 - step / fadeSteps})`;
//       ctx.globalCompositeOperation = 'destination-out';
//       ctx.fillRect(0, 0, canvas.width, navHeight);
//       if (step >= fadeSteps) clearInterval(fadeInterval);
//     }, 30);
//   };

//   return (
//     <section
//       id="hero"
//       ref={containerRef}
//       className="relative h-screen flex items-center justify-center overflow-hidden"
//     >
//       {/* Background Video */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover z-0"
//         src="/background.mp4"
//       />

//       {/* Content */}
//       <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
//         <div className="max-w-5xl mx-auto">
//           <div className="relative mb-8">
//             <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
//               <span className="block text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] [text-shadow:_0_0_40px_rgba(0,0,0,0.6)] animate-pulse">
//                 BioLabMate
//               </span>
//             </h1>
//           </div>
//           <p className="text-2xl sm:text-3xl lg:text-4xl text-white mb-10 font-light leading-relaxed drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
//             Pioneering the Future of Sustainable Materials
//           </p>
//           <p className="text-xl sm:text-2xl text-white mb-16 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
//             Developing biodegradable plastic and innovative lab materials from seaweed,
//             creating a cleaner tomorrow for our planet.
//           </p>
//         </div>
//       </div>

//       {/* Scratch overlay */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 z-20 cursor-none"
//         onMouseDown={startDrawing}
//         onMouseUp={stopDrawing}
//         onMouseLeave={stopDrawing}
//         onMouseMove={handleMouseMove}
//         onTouchStart={startDrawing}
//         onTouchEnd={stopDrawing}
//         onTouchMove={handleTouchMove}
//       />

//       {/* Custom cursor */}
//       <div
//         className={`absolute z-30 pointer-events-none transition-all duration-150 ease-out ${
//           isScratching ? 'scale-110' : ''
//         }`}
//         style={{
//           left: cursorPos.x - cursorSize / 2,
//           top: cursorPos.y - cursorSize / 2,
//           width: cursorSize,
//           height: cursorSize,
//           borderRadius: '50%',
//           background:
//             isDrawing
//               ? 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 60%, transparent 100%)'
//               : 'rgba(255,255,255,0.2)',
//           boxShadow: isDrawing
//             ? '0 0 25px 10px rgba(255,255,255,0.2)'
//             : '0 0 10px 2px rgba(255,255,255,0.1)',
//           transform: 'translate(-50%, -50%)',
//         }}
//       />
//     </section>
//   );
// };

// export default HeroSection;





// // Scratch-off effect with auto-clear at 80% - left click + hover
// import { useRef, useEffect, useState } from 'react';
// import oceanWaste from '@/assets/Calculator.jpg'; // Ocean waste overlay image

// const HeroSection = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
//   const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
//   const [cursorSize, setCursorSize] = useState(25);
//   const [isScratching, setIsScratching] = useState(false);
//   const lastPos = useRef<{ x: number; y: number } | null>(null);
//   const [hasClearedAll, setHasClearedAll] = useState(false);

//   // Initialize overlay
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const container = containerRef.current;
//     if (!canvas || !container) return;

//     const context = canvas.getContext('2d');
//     if (!context) return;

//     const img = new Image();
//     img.src = oceanWaste;
//     img.onload = () => {
//       canvas.width = container.clientWidth;
//       canvas.height = container.clientHeight;
//       context.drawImage(img, 0, 0, canvas.width, canvas.height);
//     };

//     setCtx(context);

//     const handleResize = () => {
//       if (!context) return;
//       canvas.width = container.clientWidth;
//       canvas.height = container.clientHeight;
//       context.drawImage(img, 0, 0, canvas.width, canvas.height);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Scratch drawing
//   const scratch = (x: number, y: number, radius: number) => {
//     if (!ctx) return;
//     ctx.globalCompositeOperation = 'destination-out';
//     const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
//     gradient.addColorStop(0, 'rgba(0,0,0,1)');
//     gradient.addColorStop(1, 'rgba(0,0,0,0)');
//     ctx.fillStyle = gradient;
//     ctx.beginPath();
//     ctx.arc(x, y, radius, 0, Math.PI * 2, false);
//     ctx.fill();
//   };

//   const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current;
//     if (!canvas || !ctx) return;

//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     setCursorPos({ x, y });

//     if (isDrawing) {
//       setIsScratching(true);
//       const radius = cursorSize * 1.2;
//       const last = lastPos.current;

//       if (last) {
//         const dx = x - last.x;
//         const dy = y - last.y;
//         const dist = Math.sqrt(dx * dx + dy * dy);
//         const steps = Math.ceil(dist / 5);
//         for (let i = 0; i < steps; i++) {
//           const newX = last.x + (dx * i) / steps;
//           const newY = last.y + (dy * i) / steps;
//           scratch(newX, newY, radius);
//         }
//       } else {
//         scratch(x, y, radius);
//       }
//       lastPos.current = { x, y };
//       checkScratchProgress();
//     } else {
//       lastPos.current = null;
//     }
//   };

//   const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
//     const touch = e.touches[0];
//     if (!ctx) return;
//     const rect = canvasRef.current!.getBoundingClientRect();
//     const x = touch.clientX - rect.left;
//     const y = touch.clientY - rect.top;
//     scratch(x, y, cursorSize * 1.2);
//     checkScratchProgress();
//   };

//   const startDrawing = () => {
//     setIsDrawing(true);
//     setCursorSize(60);
//   };

//   const stopDrawing = () => {
//     setIsDrawing(false);
//     setCursorSize(25);
//     setIsScratching(false);
//     lastPos.current = null;
//   };

//   // ✅ Check scratch progress and auto-clear at 80%
//   const checkScratchProgress = () => {
//     const canvas = canvasRef.current;
//     if (!canvas || !ctx || hasClearedAll) return;

//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const pixels = imageData.data;
//     let transparent = 0;

//     for (let i = 3; i < pixels.length; i += 4) {
//       if (pixels[i] < 128) transparent++;
//     }

//     const percent = (transparent / (pixels.length / 4)) * 100;

//     if (percent > 80) {
//       fadeOutOverlay();
//       setHasClearedAll(true);
//     }
//   };

//   // ✅ Smoothly fade out entire overlay when 80% scratched
//   const fadeOutOverlay = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     let opacity = 1;
//     const fadeStep = 0.05; // smaller = smoother
//     const fadeInterval = setInterval(() => {
//       opacity -= fadeStep;
//       if (opacity <= 0) {
//         opacity = 0;
//         clearInterval(fadeInterval);
//       }
//       canvas.style.opacity = opacity.toString();
//     }, 50);
//   };

//   return (
//     <section
//       id="hero"
//       ref={containerRef}
//       className="relative h-screen flex items-center justify-center overflow-hidden"
//     >
//       {/* Background Video */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover z-0"
//         src="/background.mp4"
//       />

//       {/* Content */}
//       <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
//         <div className="max-w-5xl mx-auto">
//           <div className="relative mb-8">
//             <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
//               <span className="block text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] [text-shadow:_0_0_40px_rgba(0,0,0,0.6)] animate-pulse">
//                 BioLabMate
//               </span>
//             </h1>
//           </div>
//           <p className="text-2xl sm:text-3xl lg:text-4xl text-white mb-10 font-light leading-relaxed drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
//             Pioneering the Future of Sustainable Materials
//           </p>
//           <p className="text-xl sm:text-2xl text-white mb-16 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
//             Developing biodegradable plastic and innovative lab materials from seaweed,
//             creating a cleaner tomorrow for our planet.
//           </p>
//         </div>
//       </div>

//       {/* Scratchable overlay */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 z-20 cursor-none transition-opacity duration-700 ease-out"
//         onMouseDown={startDrawing}
//         onMouseUp={stopDrawing}
//         onMouseLeave={stopDrawing}
//         onMouseMove={handleMouseMove}
//         onTouchStart={startDrawing}
//         onTouchEnd={stopDrawing}
//         onTouchMove={handleTouchMove}
//       />

//       {/* Custom cursor */}
//       <div
//         className={`absolute z-30 pointer-events-none transition-all duration-150 ease-out ${
//           isScratching ? 'scale-110' : ''
//         }`}
//         style={{
//           left: cursorPos.x - cursorSize / 2,
//           top: cursorPos.y - cursorSize / 2,
//           width: cursorSize,
//           height: cursorSize,
//           borderRadius: '50%',
//           background:
//             isDrawing
//               ? 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 60%, transparent 100%)'
//               : 'rgba(255,255,255,0.2)',
//           boxShadow: isDrawing
//             ? '0 0 25px 10px rgba(255,255,255,0.2)'
//             : '0 0 10px 2px rgba(255,255,255,0.1)',
//           transform: 'translate(-50%, -50%)',
//         }}
//       />
//     </section>
//   );
// };

// export default HeroSection;














// Scratch-off effect with auto-clear at 80% -  hover only

import { useRef, useEffect, useState } from 'react';
import oceanWaste from '@/assets/biolabmate.jpg'; // Overlay image

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasClearedAll, setHasClearedAll] = useState(false);
  const [cursorSize] = useState(65); // ✅ size of hover scratch
  const [isScratching, setIsScratching] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  // Initialize the canvas overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const img = new Image();
    img.src = oceanWaste;
    img.onload = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    setCtx(context);

    const handleResize = () => {
      if (!context) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scratch drawing function
  const scratch = (x: number, y: number) => {
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, cursorSize);
    gradient.addColorStop(0, 'rgba(0,0,0,1)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, cursorSize, 0, Math.PI * 2, false);
    ctx.fill();
  };

  // Smooth continuous scratching (for both hover and click)
  const handleScratch = (x: number, y: number) => {
    setIsScratching(true);
    const last = lastPos.current;
    if (last) {
      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.ceil(dist / 5);
      for (let i = 0; i < steps; i++) {
        const newX = last.x + (dx * i) / steps;
        const newY = last.y + (dy * i) / steps;
        scratch(newX, newY);
      }
    } else {
      scratch(x, y);
    }
    lastPos.current = { x, y };
    checkScratchProgress();
  };

  // Handle mouse movement (works even without clicking)
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCursorPos({ x, y });

    // ✅ Always scratch — hover or click both use same size
    handleScratch(x, y);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = e.touches[0];
    if (!ctx) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    handleScratch(x, y);
  };

  const startDrawing = () => setIsDrawing(true);
  const stopDrawing = () => {
    setIsDrawing(false);
    lastPos.current = null;
  };

  // Calculate how much of overlay is cleared
  const checkScratchProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || !ctx || hasClearedAll) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparent++;
    }

    const percent = (transparent / (pixels.length / 4)) * 100;
    if (percent > 1) {
      fadeOutOverlay();
      setHasClearedAll(true);
    }
  };

  // Fade-out overlay when done
  const fadeOutOverlay = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let opacity = 1;
    const fadeStep = 0.05;
    const fadeInterval = setInterval(() => {
      opacity -= fadeStep;
      if (opacity <= 0) {
        opacity = 0;
        clearInterval(fadeInterval);
      }
      canvas.style.opacity = opacity.toString();
    }, 50);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      {/* To get same video for whole home page and remove duplicate videos comment video section below */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/background.mp4"
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white drop-shadow-lg animate-pulse mb-8">
            BioLabMate
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-white mb-10 font-light leading-relaxed drop-shadow-md">
            Pioneering the Future of Sustainable Materials
          </p>
          <p className="text-xl sm:text-2xl text-white mb-16 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Developing biodegradable plastic and innovative lab materials from seaweed,
            creating a cleaner tomorrow for our planet.
          </p>
        </div>
      </div>

      {/* Scratchable overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-20 cursor-none transition-opacity duration-700 ease-out"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onMouseMove={handleMouseMove}
        onTouchStart={startDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={handleTouchMove}
      />

      {/* Custom Cursor */}
      <div
        className={`absolute z-30 pointer-events-none transition-transform duration-150 ease-out ${
          isScratching ? 'scale-105' : ''
        }`}
        style={{
          left: cursorPos.x - cursorSize / 2,
          top: cursorPos.y - cursorSize / 2,
          width: cursorSize,
          height: cursorSize,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 60%, transparent 100%)',
          boxShadow: '0 0 25px 5px rgba(255,255,255,0.1)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </section>
  );
};

export default HeroSection;






// // along with all above - text in glassy look.

// import { useRef, useEffect, useState } from 'react';
// import oceanWaste from '@/assets/biolabmate.jpg'; // Overlay image

// const HeroSection = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
//   const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [hasClearedAll, setHasClearedAll] = useState(false);
//   const [cursorSize] = useState(65);
//   const [isScratching, setIsScratching] = useState(false);
//   const lastPos = useRef<{ x: number; y: number } | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const container = containerRef.current;
//     if (!canvas || !container) return;

//     const context = canvas.getContext('2d');
//     if (!context) return;

//     const img = new Image();
//     img.src = oceanWaste;
//     img.onload = () => {
//       canvas.width = container.clientWidth;
//       canvas.height = container.clientHeight;
//       context.drawImage(img, 0, 0, canvas.width, canvas.height);
//     };

//     setCtx(context);

//     const handleResize = () => {
//       if (!context) return;
//       canvas.width = container.clientWidth;
//       canvas.height = container.clientHeight;
//       context.drawImage(img, 0, 0, canvas.width, canvas.height);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const scratch = (x: number, y: number) => {
//     if (!ctx) return;
//     ctx.globalCompositeOperation = 'destination-out';
//     const gradient = ctx.createRadialGradient(x, y, 0, x, y, cursorSize);
//     gradient.addColorStop(0, 'rgba(0,0,0,1)');
//     gradient.addColorStop(1, 'rgba(0,0,0,0)');
//     ctx.fillStyle = gradient;
//     ctx.beginPath();
//     ctx.arc(x, y, cursorSize, 0, Math.PI * 2, false);
//     ctx.fill();
//   };

//   const handleScratch = (x: number, y: number) => {
//     setIsScratching(true);
//     const last = lastPos.current;
//     if (last) {
//       const dx = x - last.x;
//       const dy = y - last.y;
//       const dist = Math.sqrt(dx * dx + dy * dy);
//       const steps = Math.ceil(dist / 5);
//       for (let i = 0; i < steps; i++) {
//         const newX = last.x + (dx * i) / steps;
//         const newY = last.y + (dy * i) / steps;
//         scratch(newX, newY);
//       }
//     } else {
//       scratch(x, y);
//     }
//     lastPos.current = { x, y };
//     checkScratchProgress();
//   };

//   const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     setCursorPos({ x, y });
//     handleScratch(x, y);
//   };

//   const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
//     const touch = e.touches[0];
//     if (!ctx) return;
//     const rect = canvasRef.current!.getBoundingClientRect();
//     const x = touch.clientX - rect.left;
//     const y = touch.clientY - rect.top;
//     handleScratch(x, y);
//   };

//   const startDrawing = () => setIsDrawing(true);
//   const stopDrawing = () => {
//     setIsDrawing(false);
//     lastPos.current = null;
//   };

//   const checkScratchProgress = () => {
//     const canvas = canvasRef.current;
//     if (!canvas || !ctx || hasClearedAll) return;

//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const pixels = imageData.data;
//     let transparent = 0;

//     for (let i = 3; i < pixels.length; i += 4) {
//       if (pixels[i] < 128) transparent++;
//     }

//     const percent = (transparent / (pixels.length / 4)) * 100;
//     if (percent > 80) {
//       fadeOutOverlay();
//       setHasClearedAll(true);
//     }
//   };

//   const fadeOutOverlay = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     let opacity = 1;
//     const fadeStep = 0.05;
//     const fadeInterval = setInterval(() => {
//       opacity -= fadeStep;
//       if (opacity <= 0) {
//         opacity = 0;
//         clearInterval(fadeInterval);
//       }
//       canvas.style.opacity = opacity.toString();
//     }, 50);
//   };

//   return (
//     <section
//       id="hero"
//       ref={containerRef}
//       className="relative h-screen flex items-center justify-center overflow-hidden"
//     >
//       {/* Background Video */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover z-0"
//         src="/background.mp4"
//       />

//       {/* ✅ Glassy Text Only */}
//       <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
//         <div className="max-w-5xl mx-auto">
//           <h1
//             className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8"
//             style={{
//               color: 'rgba(255, 255, 255, 0.6)',
//               backdropFilter: 'blur(12px)',
//               WebkitBackdropFilter: 'blur(12px)',
//               textShadow:
//                 '0 0 25px rgba(255,255,255,0.3), 0 0 50px rgba(255,255,255,0.1)',
//               WebkitTextStroke: '1px rgba(255,255,255,0.3)',
//             }}
//           >
//             BioLabMate
//           </h1>

//           <p
//             className="text-2xl sm:text-3xl lg:text-4xl font-light mb-10 leading-relaxed"
//             style={{
//               color: 'rgba(255, 255, 255, 0.5)',
//               backdropFilter: 'blur(10px)',
//               WebkitBackdropFilter: 'blur(10px)',
//               textShadow:
//                 '0 0 20px rgba(255,255,255,0.25), 0 0 40px rgba(255,255,255,0.1)',
//             }}
//           >
//             Pioneering the Future of Sustainable Materials
//           </p>

//           <p
//             className="text-xl sm:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed"
//             style={{
//               color: 'rgba(255, 255, 255, 0.45)',
//               backdropFilter: 'blur(8px)',
//               WebkitBackdropFilter: 'blur(8px)',
//               textShadow:
//                 '0 0 15px rgba(255,255,255,0.2), 0 0 25px rgba(255,255,255,0.05)',
//             }}
//           >
//             Developing biodegradable plastic and innovative lab materials from seaweed,
//             creating a cleaner tomorrow for our planet.
//           </p>
//         </div>
//       </div>

//       {/* Scratchable overlay */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 z-20 cursor-none transition-opacity duration-700 ease-out"
//         onMouseDown={startDrawing}
//         onMouseUp={stopDrawing}
//         onMouseLeave={stopDrawing}
//         onMouseMove={handleMouseMove}
//         onTouchStart={startDrawing}
//         onTouchEnd={stopDrawing}
//         onTouchMove={handleTouchMove}
//       />

//       {/* Custom Cursor */}
//       <div
//         className={`absolute z-30 pointer-events-none transition-transform duration-150 ease-out ${
//           isScratching ? 'scale-105' : ''
//         }`}
//         style={{
//           left: cursorPos.x - cursorSize / 2,
//           top: cursorPos.y - cursorSize / 2,
//           width: cursorSize,
//           height: cursorSize,
//           borderRadius: '50%',
//           background:
//             'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 60%, transparent 100%)',
//           boxShadow: '0 0 25px 5px rgba(255,255,255,0.1)',
//           transform: 'translate(-50%, -50%)',
//         }}
//       />
//     </section>
//   );
// };

// export default HeroSection;

