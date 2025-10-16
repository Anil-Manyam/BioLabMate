import { useState } from 'react';
import { journeyData } from '@/content/journeyData';
import { Trophy, Rocket, Globe, Landmark, ShieldCheck } from 'lucide-react';

// ✅ Background image for the section
import JourneyBg from '@/assets/1.jpg';

// ✅ Journey images
import Journey1 from '@/assets/1.jpg';
import Journey2 from '@/assets/2.jpg';
import Journey3 from '@/assets/3.jpg';
import Journey4 from '@/assets/4.jpg';
import Journey5 from '@/assets/5.jpg';
import Journey6 from '@/assets/6.jpg';

const iconMap: { [key: string]: any } = {
  Trophy,
  Rocket,
  Globe,
  Landmark,
  ShieldCheck,
};

// Flatten journey data into a single array
const journeyItems = journeyData.flatMap((yearData, yearIndex) =>
  yearData.items.map((item, itemIndex) => ({
    ...item,
    id: `${yearData.year}-${itemIndex}`,
    year: yearData.year,
    index: yearIndex * yearData.items.length + itemIndex,
  }))
);

const journeyImages = [Journey1, Journey2, Journey3, Journey4, Journey5, Journey6];

const CircularJourney = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  const totalNodes = journeyItems.length;
  const anglePerNode = 360 / totalNodes;

  // 🔹 Increased radius
  const radius = 340;

  // Handle node click rotation
  const handleNodeClick = (index: number) => {
    const currentAngle = index * anglePerNode;
    const targetAngle = 270; // top center
    const rotationNeeded = targetAngle - currentAngle;
    setRotation(rotationNeeded);
    setActiveIndex(index);
  };

  // Node position around the circle
  const getNodePosition = (index: number) => {
    const angle = (index * anglePerNode) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  const activeItem = journeyItems[activeIndex];
  const IconComponent = iconMap[activeItem.icon || 'Trophy'];

  return (
    <section
      className="relative min-h-[900px] bg-gray-900 text-gray-900 py-20 overflow-hidden bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${JourneyBg})`,
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
          Our Journey
        </h2>

        <div className="relative w-full max-w-5xl mx-auto h-[700px] flex items-center justify-center">
          {/* Inner Circle with Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[600px] h-[600px] rounded-full border-4 border-gray-300 overflow-hidden shadow-2xl">
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                  backgroundImage: `url(${journeyImages[activeIndex % journeyImages.length]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              </div>

              {/* Inner content */}
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

          {/* Rotating Nodes */}
          <div
            className="absolute left-1/2 top-1/2 transition-transform duration-700 ease-out"
            style={{
              width: `${radius * 2 + 50}px`,
              height: `${radius * 2 + 50}px`,
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              transformOrigin: 'center center',
            }}
          >
            {journeyItems.map((item, index) => {
              const pos = getNodePosition(index);
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNodeClick(index)}
                  className="absolute transition-all duration-500 group"
                  style={{
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% + ${pos.y}px)`,
                    transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
                  }}
                >
                  <div
                    className={`relative w-7 h-7 rounded-full border-4 ${
                      isActive
                        ? 'bg-blue-600 border-white shadow-lg shadow-blue-500/50 scale-125'
                        : 'bg-gray-800 border-gray-500 hover:border-white hover:scale-110'
                    } transition-all duration-300`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-50" />
                    )}
                  </div>

                  <div
                    className={`absolute -top-5 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? 'text-blue-400 font-bold scale-110'
                        : 'text-gray-300 group-hover:text-white'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}. Milestone
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dotted Circle Path */}
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

export default CircularJourney;





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
