// import { useState } from 'react';
// import { journeyData } from '@/content/journeyData';
// import { Trophy, Rocket, Globe, Landmark, ShieldCheck } from 'lucide-react';

// //  Background image for the section
// import JourneyBg from '@/assets/1.jpg';

// //  Journey images
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










// // journey with unifined admin pannel

// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Trophy, Rocket, ShieldCheck, Globe, Landmark } from 'lucide-react';

// // Icon mapping
// const iconMap: { [key: string]: React.ComponentType<any> } = {
//   Trophy,
//   Rocket,
//   ShieldCheck,
//   Globe,
//   Landmark,
// };

// interface Milestone {
//   id: string;
//   title: string;
//   description: string;
//   year: number;
//   category: string;
//   is_major: boolean;
//   order_index: number;
// }

// interface JourneyYear {
//   year: number;
//   items: Milestone[];
// }

// const JourneySection: React.FC = () => {
//   const [milestones, setMilestones] = useState<Milestone[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchMilestones();
//   }, []);

//   const fetchMilestones = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/milestones`);
      
//       if (!response.ok) {
//         throw new Error(`Failed to fetch milestones: ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log('Fetched milestones:', data);
      
//       if (Array.isArray(data)) {
//         // Sort by year descending (already done by backend, but ensure it)
//         const sorted = data.sort((a, b) => b.year - a.year);
//         setMilestones(sorted);
//       } else {
//         console.error('Milestones data is not an array:', data);
//         setMilestones([]);
//       }
//     } catch (error) {
//       console.error('Error fetching milestones:', error);
//       setError(error instanceof Error ? error.message : 'Failed to load journey milestones');
//       setMilestones([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Group milestones by year
//   const groupedByYear = (): JourneyYear[] => {
//     const grouped: { [key: number]: Milestone[] } = {};
    
//     milestones.forEach(milestone => {
//       if (!grouped[milestone.year]) {
//         grouped[milestone.year] = [];
//       }
//       grouped[milestone.year].push(milestone);
//     });
    
//     // Convert to array and sort by year descending
//     return Object.keys(grouped)
//       .map(year => ({
//         year: parseInt(year),
//         items: grouped[parseInt(year)]
//       }))
//       .sort((a, b) => b.year - a.year);
//   };

//   // Get icon for milestone based on title keywords
//   const getIconForMilestone = (title: string): React.ComponentType<any> => {
//     if (title.toLowerCase().includes('winner') || title.toLowerCase().includes('award')) {
//       return Trophy;
//     }
//     if (title.toLowerCase().includes('accelerator')) {
//       return Rocket;
//     }
//     if (title.toLowerCase().includes('program')) {
//       return ShieldCheck;
//     }
//     if (title.toLowerCase().includes('international') || title.toLowerCase().includes('blue')) {
//       return Globe;
//     }
//     if (title.toLowerCase().includes('parliament') || title.toLowerCase().includes('committee')) {
//       return Landmark;
//     }
//     return Trophy; // Default
//   };

//   if (loading) {
//     return (
//       <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="journey">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
//             <p className="text-xl text-gray-600">
//               Milestones and achievements that define our path to sustainable innovation
//             </p>
//           </div>
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="journey">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
//             <p className="text-xl text-gray-600">
//               Milestones and achievements that define our path to sustainable innovation
//             </p>
//           </div>
//           <div className="text-center py-20">
//             <div className="text-red-600 mb-4">
//               <p className="text-lg font-medium">Unable to load journey milestones</p>
//               <p className="text-sm text-gray-600 mt-2">{error}</p>
//             </div>
//             <button
//               onClick={fetchMilestones}
//               className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (!milestones || milestones.length === 0) {
//     return (
//       <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="journey">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
//             <p className="text-xl text-gray-600">
//               Milestones and achievements that define our path to sustainable innovation
//             </p>
//           </div>
//           <div className="text-center py-20">
//             <p className="text-gray-600">No milestones found. Check back soon!</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   const journeyYears = groupedByYear();

//   return (
//     <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="journey">
//       <div className="container mx-auto px-4">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Our Journey
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Milestones and achievements that define our path to sustainable innovation
//           </p>
//         </motion.div>

//         {/* Timeline */}
//         <div className="max-w-5xl mx-auto">
//           {journeyYears.map((yearData, yearIndex) => (
//             <motion.div
//               key={yearData.year}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: yearIndex * 0.1 }}
//               className="mb-16 last:mb-0"
//             >
//               {/* Year Badge */}
//               <div className="flex items-center mb-8">
//                 <div className="bg-primary text-white px-6 py-3 rounded-full text-2xl font-bold shadow-lg">
//                   {yearData.year}
//                 </div>
//                 <div className="flex-1 h-1 bg-gradient-to-r from-primary to-transparent ml-4"></div>
//               </div>

//               {/* Milestones for this year */}
//               <div className="space-y-8">
//                 {yearData.items.map((milestone, itemIndex) => {
//                   const IconComponent = getIconForMilestone(milestone.title);
                  
//                   return (
//                     <motion.div
//                       key={milestone.id}
//                       initial={{ opacity: 0, x: -30 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
//                       className="flex gap-6 group"
//                     >
//                       {/* Icon */}
//                       <div className="flex-shrink-0">
//                         <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
//                           milestone.is_major 
//                             ? 'bg-gradient-to-br from-primary to-blue-600 text-white' 
//                             : 'bg-white border-2 border-primary text-primary'
//                         }`}>
//                           <IconComponent className="w-8 h-8" />
//                         </div>
//                       </div>

//                       {/* Content */}
//                       <div className="flex-1 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
//                         {/* Category Badge */}
//                         <div className="mb-3">
//                           <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wide">
//                             {milestone.category}
//                           </span>
//                         </div>

//                         {/* Title */}
//                         <h3 className="text-xl font-bold text-gray-900 mb-3">
//                           {milestone.title}
//                         </h3>

//                         {/* Description */}
//                         <p className="text-gray-600 leading-relaxed">
//                           {milestone.description}
//                         </p>

//                         {/* Major indicator */}
//                         {milestone.is_major && (
//                           <div className="mt-4 flex items-center text-primary text-sm font-medium">
//                             <Trophy className="w-4 h-4 mr-1" />
//                             <span>Major Milestone</span>
//                           </div>
//                         )}
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* NO CTA SECTION - REMOVED */}

//       </div>
//     </section>
//   );
// };

// export default JourneySection;




// circular journey carousel with unifed Admin pannel + continuous clockwise rotation
import React, { useEffect, useState, useRef } from "react";
import { Trophy, Rocket, ShieldCheck, Globe, Landmark } from "lucide-react";
import JourneyBg from "@/assets/1.jpg";
import Journey1 from "@/assets/1.jpg";
import Journey2 from "@/assets/2.jpg";
import Journey3 from "@/assets/3.jpg";
import Journey4 from "@/assets/4.jpg";
import Journey5 from "@/assets/5.jpg";
import Journey6 from "@/assets/6.jpg";

const iconMap: { [key: string]: any } = {
  Trophy,
  Rocket,
  Globe,
  Landmark,
  ShieldCheck,
};

interface Milestone {
  id: string;
  title: string;
  description: string;
  year: number;
  category: string;
  is_major: boolean;
  order_index: number;
}

const CircularJourneyFromDB: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0); // start with 0° so top node is first

  const journeyImages = [Journey1, Journey2, Journey3, Journey4, Journey5, Journey6];
  const radius = 340;

  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);
  const userInteractionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUserInteractingRef = useRef(false);

  useEffect(() => {
    fetchMilestones();
  }, []);

  const fetchMilestones = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/milestones`);
      if (!response.ok) throw new Error(`Failed to fetch milestones: ${response.status}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        const sorted = data.sort((a, b) => a.order_index - b.order_index);
        setMilestones(sorted);
      } else {
        setMilestones([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load milestones");
      setMilestones([]);
    } finally {
      setLoading(false);
    }
  };

  const getIconForMilestone = (title: string): React.ComponentType<any> => {
    if (title.toLowerCase().includes("winner") || title.toLowerCase().includes("award")) return Trophy;
    if (title.toLowerCase().includes("accelerator")) return Rocket;
    if (title.toLowerCase().includes("program")) return ShieldCheck;
    if (title.toLowerCase().includes("international") || title.toLowerCase().includes("blue")) return Globe;
    if (title.toLowerCase().includes("parliament") || title.toLowerCase().includes("committee")) return Landmark;
    return Trophy;
  };

  const getNodePosition = (index: number) => {
    const totalNodes = milestones.length;
    const anglePerNode = 360 / totalNodes;
    // Start from top (0°)
    const angle = (90 + index * anglePerNode) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  const handleNodeClick = (index: number) => {
    stopAutoRotationTemporarily();
    setActiveIndex(index);
    updateRotation(index);
  };

  // Active node always moves to 0° (top)
  const updateRotation = (index: number) => {
    const totalNodes = milestones.length;
    const anglePerNode = 360 / totalNodes;
    // Keep rotating clockwise continuously
    const newRotation = 0 + index * anglePerNode;
    setRotation(newRotation);
  };

  /** ---------- AUTO ROTATION CLOCKWISE ---------- **/
  useEffect(() => {
    if (!milestones.length) return;

    const startAutoRotate = () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);

      autoRotateRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const next = (prev + 1) % milestones.length;
          // Increase rotation angle clockwise continuously
          setRotation((prevRot) => prevRot + 360 / milestones.length);
          return next;
        });
      }, 3000); // rotate every 3s
    };

    startAutoRotate();
    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
      if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
    };
  }, [milestones]);

  const stopAutoRotationTemporarily = () => {
    if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);

    isUserInteractingRef.current = true;

    userInteractionTimeoutRef.current = setTimeout(() => {
      isUserInteractingRef.current = false;
      const totalNodes = milestones.length;
      if (totalNodes > 0) {
        autoRotateRef.current = setInterval(() => {
          setActiveIndex((prev) => {
            const next = (prev + 1) % totalNodes;
            setRotation((prevRot) => prevRot + 360 / totalNodes);
            return next;
          });
        }, 3000);
      }
    }, 5000);
  };

  /** ---------- UI STATES ---------- **/
  if (loading) {
    return (
      <section className="py-32 flex justify-center items-center bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-32 text-center bg-black text-white">
        <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
        <p className="text-red-400 mb-6">Failed to load milestones: {error}</p>
        <button
          onClick={fetchMilestones}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </section>
    );
  }

  if (!milestones.length) {
    return (
      <section className="py-32 text-center bg-black text-white">
        <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
        <p className="text-gray-400">No milestones available yet.</p>
      </section>
    );
  }

  const activeItem = milestones[activeIndex];
  const IconComponent = getIconForMilestone(activeItem.title);

  return (
    <section
      className="relative min-h-[900px] bg-gray-900 text-gray-900 py-20 overflow-hidden bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${JourneyBg})` }}
      onMouseEnter={stopAutoRotationTemporarily}
      onTouchStart={stopAutoRotationTemporarily}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
          Our Journey
        </h2>

        <div className="relative w-full max-w-5xl mx-auto h-[700px] flex items-center justify-center">
          {/* Inner Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[600px] h-[600px] rounded-full border-4 border-gray-300 overflow-hidden shadow-2xl">
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                  backgroundImage: `url(${journeyImages[activeIndex % journeyImages.length]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <div className="mb-5 w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50 border-4 border-white">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="mb-4 px-6 py-2 bg-blue-600 rounded-full">
                  <span className="text-white font-bold text-lg">{activeItem.year}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-white leading-tight">
                  {activeItem.title}
                </h3>
                <p className="text-white text-sm md:text-base leading-relaxed max-w-md">
                  {activeItem.description}
                </p>
              </div>
            </div>
          </div>

          {/* Orbiting Nodes */}
          <div
            className="absolute left-1/2 top-1/2 transition-transform duration-1000 ease-linear"
            style={{
              width: `${radius * 2 + 50}px`,
              height: `${radius * 2 + 50}px`,
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              transformOrigin: "center center",
            }}
          >
            {milestones.map((item, index) => {
              const pos = getNodePosition(index);
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNodeClick(index)}
                  className="absolute transition-all duration-500 group cursor-pointer"
                  style={{
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% - ${pos.y}px)`, // flipped for top-based alignment
                    transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
                  }}
                >
                  <div
                    className={`relative w-7 h-7 rounded-full border-4 ${
                      isActive
                        ? "bg-blue-600 border-white shadow-lg shadow-blue-500/50 scale-125"
                        : "bg-gray-800 border-gray-500 hover:border-white hover:scale-110"
                    } transition-all duration-300`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-50" />
                    )}
                  </div>
                  <div
                    className={`absolute -top-5 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? "text-blue-400 font-bold scale-110"
                        : "text-gray-300 group-hover:text-white"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}. Milestone
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dotted Orbit Path */}
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            width={radius * 2 + 50}
            height={radius * 2 + 50}
          >
            <circle
              cx={(radius * 2 + 50) / 2}
              cy={(radius * 2 + 50) / 2}
              r={radius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2.5"
              strokeDasharray="8,8"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default CircularJourneyFromDB;















// import { useState } from 'react';
// import { journeyData } from '@/content/journeyData';
// import { Trophy, Rocket, Globe, Landmark, ShieldCheck } from 'lucide-react';

// // ✅ Background image for the section
// import JourneyBg from '@/assets/1.jpg';

// // ✅ Journey images
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
//     const radius = 300; // 🔹 smaller radius for compact layout
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
//             <div className="relative w-[450px] h-[450px] rounded-full border-4 border-gray-300 overflow-hidden shadow-2xl">
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
//             className="absolute left-1/2 top-1/2 w-[650px] h-[650px] transition-transform duration-700 ease-out"
//             style={{
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
//                     className={`relative w-10 h-10 rounded-full border-4 ${
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
//                     className={`absolute -top-10 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap transition-all duration-300 ${
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
//             className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] pointer-events-none"
//           >
//             <circle
//               cx="325"
//               cy="325"
//               r="300"
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
