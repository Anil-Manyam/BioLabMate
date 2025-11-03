// import { useState } from 'react';
// import { journeyData } from '@/content/journeyData';
// import { Trophy, Rocket, Globe, Landmark, ShieldCheck } from 'lucide-react';


// import JourneyBg from '@/assets/1.jpg';

// import Journey1 from '@/assets/1.jpg';
// import Journey2 from '@/assets/2.jpg';
// import Journey3 from '@/assets/3.jpg';
// import Journey4 from '@/assets/4.jpg';
// import Journey5 from '@/assets/5.jpg';
// import Journey6 from '@/assets/6.jpg';

// const iconMap: { [key: string]: any } = {
//   Trophy,
//   Rocket,
//   Globe,
//   Landmark,
//   ShieldCheck,
// };

// // Flatten journey data into a single array
// const journeyItems = journeyData.flatMap((yearData, yearIndex) =>
//   yearData.items.map((item, itemIndex) => ({
//     ...item,
//     id: `${yearData.year}-${itemIndex}`,
//     year: yearData.year,
//     index: yearIndex * yearData.items.length + itemIndex,
//   }))
// );

// const journeyImages = [Journey1, Journey2, Journey3, Journey4, Journey5, Journey6];

// const CircularJourney = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [rotation, setRotation] = useState(0);

//   const totalNodes = journeyItems.length;
//   const anglePerNode = 360 / totalNodes;

//   // 🔹 Increased radius
//   const radius = 340;

//   // Handle node click rotation
//   const handleNodeClick = (index: number) => {
//     const currentAngle = index * anglePerNode;
//     const targetAngle = 270; // top center
//     const rotationNeeded = targetAngle - currentAngle;
//     setRotation(rotationNeeded);
//     setActiveIndex(index);
//   };

//   // Node position around the circle
//   const getNodePosition = (index: number) => {
//     const angle = (index * anglePerNode) * (Math.PI / 180);
//     return {
//       x: Math.cos(angle) * radius,
//       y: Math.sin(angle) * radius,
//     };
//   };

//   const activeItem = journeyItems[activeIndex];
//   const IconComponent = iconMap[activeItem.icon || 'Trophy'];

//   return (
//     <section
//       className="relative min-h-[900px] bg-gray-900 text-gray-900 py-20 overflow-hidden bg-cover bg-center bg-fixed"
//       style={{
//         backgroundImage: `url(${JourneyBg})`,
//       }}
//     >
//       {/* Overlay for better contrast */}
//       <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

//       <div className="container mx-auto px-4 relative z-10">
//         <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
//           Our Journey
//         </h2>

//         <div className="relative w-full max-w-5xl mx-auto h-[700px] flex items-center justify-center">
//           {/* Inner Circle with Image */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="relative w-[600px] h-[600px] rounded-full border-4 border-gray-300 overflow-hidden shadow-2xl">
//               <div
//                 className="absolute inset-0 transition-opacity duration-700"
//                 style={{
//                   backgroundImage: `url(${journeyImages[activeIndex % journeyImages.length]})`,
//                   backgroundSize: 'cover',
//                   backgroundPosition: 'center',
//                 }}
//               >
//                 <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
//               </div>

//               {/* Inner content */}
//               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
//                 <div className="mb-5 w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50 border-4 border-white">
//                   <IconComponent className="w-8 h-8 text-white" />
//                 </div>

//                 <div className="mb-4 px-6 py-2 bg-blue-600 rounded-full">
//                   <span className="text-white font-bold text-lg">{activeItem.year}</span>
//                 </div>

//                 <h3 className="text-xl md:text-2xl font-bold mb-3 text-white leading-tight">
//                   {activeItem.title}
//                 </h3>
//                 <p className="text-white text-sm md:text-base leading-relaxed max-w-md">
//                   {activeItem.description}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Rotating Nodes */}
//           <div
//             className="absolute left-1/2 top-1/2 transition-transform duration-700 ease-out"
//             style={{
//               width: `${radius * 2 + 50}px`,
//               height: `${radius * 2 + 50}px`,
//               transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
//               transformOrigin: 'center center',
//             }}
//           >
//             {journeyItems.map((item, index) => {
//               const pos = getNodePosition(index);
//               const isActive = index === activeIndex;
//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => handleNodeClick(index)}
//                   className="absolute transition-all duration-500 group"
//                   style={{
//                     left: `calc(50% + ${pos.x}px)`,
//                     top: `calc(50% + ${pos.y}px)`,
//                     transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
//                   }}
//                 >
//                   <div
//                     className={`relative w-7 h-7 rounded-full border-4 ${
//                       isActive
//                         ? 'bg-blue-600 border-white shadow-lg shadow-blue-500/50 scale-125'
//                         : 'bg-gray-800 border-gray-500 hover:border-white hover:scale-110'
//                     } transition-all duration-300`}
//                   >
//                     {isActive && (
//                       <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-50" />
//                     )}
//                   </div>

//                   <div
//                     className={`absolute -top-5 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap transition-all duration-300 ${
//                       isActive
//                         ? 'text-blue-400 font-bold scale-110'
//                         : 'text-gray-300 group-hover:text-white'
//                     }`}
//                   >
//                     {String(index + 1).padStart(2, '0')}. Milestone
//                   </div>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Dotted Circle Path */}
//           <svg
//             className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
//             width={radius * 2 + 50}
//             height={radius * 2 + 50}
//           >
//             <circle
//               cx={(radius * 2 + 50) / 2}
//               cy={(radius * 2 + 50) / 2}
//               r={radius}
//               fill="none"
//               stroke="rgba(255, 255, 255, 0.3)"
//               strokeWidth="2.5"
//               strokeDasharray="8,8"
//             />
//           </svg>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CircularJourney;



















// 5. journey through time - horizontal scroll with auto and user interaction detection
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  Trophy,
  Rocket,
  Globe,
  Landmark,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { journeyData } from "@/content/journeyData";
import Bg2023 from "@/assets/1.jpg";
import Bg2024 from "@/assets/2.jpg";
import Bg2025 from "@/assets/3.jpg";

const iconMap: { [key: string]: any } = {
  Trophy,
  Rocket,
  Globe,
  Landmark,
  ShieldCheck,
};

const backgroundMap: Record<number, string> = {
  2023: Bg2023,
  2024: Bg2024,
  2025: Bg2025,
};

const TimePortalJourney = () => {
  const [activeYearIndex, setActiveYearIndex] = useState(0);
  const [autoMode, setAutoMode] = useState(true);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const scrollRef = useRef<HTMLDivElement>(null);

  const totalYears = journeyData.length;
  const currentYearData = journeyData[activeYearIndex];
  const currentBg =
    backgroundMap[currentYearData.year] ||
    Object.values(backgroundMap)[activeYearIndex % totalYears];

  // --- 🧭 Navigation Helpers ---
  const goNext = () => {
    setActiveYearIndex((prev) => (prev + 1) % totalYears);
  };
  const goPrev = () => {
    setActiveYearIndex((prev) => (prev - 1 + totalYears) % totalYears);
  };

  // --- 🧠 Auto transition logic ---
  useEffect(() => {
    const interval = setInterval(() => {
      if (!autoMode) return;
      goNext();
    }, 4000); // every 5s
    return () => clearInterval(interval);
  }, [autoMode]);

  // --- 🎮 User interaction detection ---
  const handleUserIntervention = () => {
    setAutoMode(false);
    setLastInteraction(Date.now());
  };

  // Restart auto-mode after 7s of inactivity
  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() - lastInteraction > 5000) {
        setAutoMode(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [lastInteraction]);

  // --- 📜 Internal scroll only ---
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const preventScroll = (e: WheelEvent) => {
      if (scrollRef.current && scrollRef.current.contains(e.target as Node)) {
        e.stopPropagation();
      }
    };
    window.addEventListener("wheel", preventScroll, { passive: false });
    return () => window.removeEventListener("wheel", preventScroll);
  }, []);

  // --- ⌨️ Keyboard navigation ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleUserIntervention();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <section
      id="journey"
      className="relative h-[100vh] overflow-hidden bg-black text-white"
      onWheel={handleUserIntervention}
      onTouchStart={handleUserIntervention}
      onMouseMove={handleUserIntervention}
    >
      {/* Background that changes per year */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBg}
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url(${currentBg})`,
            filter: "brightness(0.35) blur(1px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      {/* Subtle rotating conic gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 animate-[spin_25s_linear_infinite] bg-[conic-gradient(from_0deg,rgba(0,100,255,0.1),transparent_50%,rgba(180,100,255,0.1))]" />
      </div>

      {/* Inner scrollable content */}
      <div
        ref={scrollRef}
        className="relative h-full overflow-y-auto snap-y snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="flex flex-col items-center justify-center min-h-full">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 tracking-wider">
            Our Journey Through Time
          </h2>

          {/* Year and Milestones */}
          <div className="relative w-full flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentYearData.year}
                initial={{ opacity: 0, scale: 0.8, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -100 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center justify-center"
              >
                {/* Pulsing ring */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute w-[400px] h-[400px] rounded-full border border-blue-400/30 blur-xl"
                />

                {/* Year */}
                <motion.h3
                  className="text-6xl font-extrabold text-blue-400 drop-shadow-[0_0_20px_rgba(0,0,255,0.6)] mb-10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {currentYearData.year}
                </motion.h3>

                {/* Milestone Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl px-6 z-10">
                  {currentYearData.items.map((item, i) => {
                    const IconComponent = iconMap[item.icon || "Trophy"];
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: i * 0.3 }}
                        className="relative p-6 rounded-2xl bg-white/15 border border-blue-500/30 
                          shadow-[0_0_30px_rgba(50,100,255,0.4)] hover:shadow-[0_0_50px_rgba(100,150,255,0.7)] 
                          backdrop-blur-lg transition-all duration-700"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border border-white/30">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="text-lg font-bold text-blue-300 uppercase tracking-wider">
                            Milestone {i + 1}
                          </h4>
                        </div>
                        <h5 className="text-xl font-semibold text-white mb-2 leading-snug">
                          {item.title}
                        </h5>
                        <p className="text-gray-200 text-sm leading-relaxed">
                          {item.description}
                        </p>

                        {item.tags && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          handleUserIntervention();
          goPrev();
        }}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full border border-blue-400/40 shadow-lg transition-all"
      >
        <ChevronLeft className="text-blue-300 w-6 h-6" />
      </button>

      <button
        onClick={() => {
          handleUserIntervention();
          goNext();
        }}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full border border-blue-400/40 shadow-lg transition-all"
      >
        <ChevronRight className="text-blue-300 w-6 h-6" />
      </button>

      {/* Year Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {journeyData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              handleUserIntervention();
              setActiveYearIndex(idx);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              idx === activeYearIndex
                ? "bg-blue-400 scale-125 shadow-[0_0_10px_rgba(100,150,255,0.8)]"
                : "bg-gray-600 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default TimePortalJourney;

