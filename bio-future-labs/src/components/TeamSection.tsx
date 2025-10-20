// import { Card, CardContent } from '@/components/ui/card';
// import { Linkedin, Mail } from 'lucide-react';
// import Sanjay from '@/assets/Sanjay.jpg';
// import Sarika from '@/assets/Sarika.jpg';
// import Gordon from '@/assets/Gordon.jpg';
// import Vaibhav from '@/assets/Vaibhav.jpg';
// import Anil from '@/assets/Anil.jpg';
// import TeamBackground from '@/assets/Team_background.jpg';
// import { useEffect, useState, useRef } from 'react';
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';

// const TeamSection = () => {
//   const teamMembers = [
//     {
//       name: 'Dr.Sarika Kumari',
//       role: 'CEO/Co-Founder',
//       bio: 'Co-founder of BioLabMate with expertise in biotechnology, biomaterials, and advanced R&D, holding a Ph.D. in Biochemistry.',
//       image: Sarika,
//       linkedin: 'https://www.linkedin.com/in/sarikakum/',
//       email: ' biolabmatecomposite@gmail.com'
//     },
//     {
//       name: 'Sanjay Dubey',
//       role: ' CTO/Co-Founder',
//       bio: 'Chemical Engineer at BioLabMate specializing in product development, process optimization, and business growth initiatives.',
//       image: Sanjay,
//       linkedin: 'https://www.linkedin.com/in/snjaykdubey/',
//       email: ' biolabmatecomposite@gmail.com'
//     },
//     {
//       name: 'Dr. Gordon Slade',
//       role: 'Aquaculture Advisor',
//       bio: 'Advisor at BioLabMate with extensive leadership in fisheries, aquaculture, and ocean industries, guiding strategy, partnerships, and sustainability.',
//       image: Gordon,
//       linkedin: 'https://www.linkedin.com/in/gordon-slade-cm-onl-lld-frcgs-b9478854/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=ca',
//       email: ' biolabmatecomposite@gmail.com'
//     },
//     {
//       name: 'Anil Manyam',
//       role: 'Software Developer (Intern)',
//       bio: 'Software Developer at BioLabMate, contributing to the design and development of dynamic web applications and digital platforms that enhance user experience and performance',
//       image: Anil,
//       linkedin: 'https://www.linkedin.com/in/anil-manyam-698662248/',
//       email: ' anilmanyam.630@gmail.com'
//     },
//     {
//       name: 'Vaibhav Thummar',
//       role: 'Software Engineer(Intern)',
//       bio: 'Software Developer at BioLabMate, creating impactful websites and software solutions while managing web content and digital development.',
//       image: Vaibhav,
//       linkedin: 'https://www.linkedin.com/in/vaibhav-thummar-951498249/',
//       email: ' vaibhav.it178@gmail.com'
//     }
//   ];

//   const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

//   // Auto-sliding functionality
//   useEffect(() => {
//     if (!carouselApi) return;
    
//     setCurrentIndex(carouselApi.selectedScrollSnap());
//     const onSelect = () => setCurrentIndex(carouselApi.selectedScrollSnap());
//     carouselApi.on('select', onSelect);

//     // Auto-slide every 4 seconds when not hovered (only if not at the end)
//     const startAutoSlide = () => {
//       if (!isHovered) {
//         autoSlideRef.current = setInterval(() => {
//           const currentIndex = carouselApi.selectedScrollSnap();
//           const totalSlides = carouselApi.scrollSnapList().length;
          
//           if (currentIndex < totalSlides - 1) {
//             carouselApi.scrollNext();
//           } else {
//             // Reset to first slide when reaching the end
//             carouselApi.scrollTo(0);
//           }
//         }, 4000);
//       }
//     };

//     startAutoSlide();

//     return () => {
//       carouselApi.off('select', onSelect);
//       if (autoSlideRef.current) {
//         clearInterval(autoSlideRef.current);
//       }
//     };
//   }, [carouselApi, isHovered]);

//   // Pause auto-slide on hover
//   const handleMouseEnter = () => {
//     setIsHovered(true);
//     if (autoSlideRef.current) {
//       clearInterval(autoSlideRef.current);
//     }
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   return (
//     <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
//       {/* Background image */}
//       <div className="absolute left-0 top-0 bottom-0 z-0 pointer-events-none">
//         <img
//           src={TeamBackground}
//           alt="Team background"
//           className="h-4/5 w-auto object-contain opacity-80"
//           style={{ objectPosition: 'left', maxWidth: '60%' }}
//         />
//       </div>
//       {/* Background decoration */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
//       </div>

//       <div className="max-w-6xl mx-auto relative z-10">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 relative">
//             Meet Our Team
//             <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full animate-pulse"></div>
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
//             Our passionate team of scientists and innovators dedicated to creating a sustainable future.
//           </p>
//         </div>

//         <Carousel 
//           className="max-w-6xl mx-auto px-2" 
//           opts={{ 
//             align: 'center', 
//             loop: false,
//             duration: 20,
//             skipSnaps: false
//           }} 
//           setApi={setCarouselApi}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <CarouselContent>
//             {teamMembers.map((member, index) => {
//               const isActive = index === currentIndex;
//               return (
//                 <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/2 lg:basis-1/2 xl:basis-1/2">
//                   <Card
//                     className={`group transition-all duration-700 ease-out shadow-soft bg-gradient-card relative overflow-hidden border-2 border-transparent mx-2 cursor-pointer ${
//                       isActive ? 'scale-100 shadow-xl' : 'scale-[0.95] hover:scale-[0.98]'
//                     }`}
//                     onClick={() => carouselApi?.scrollTo(index)}
//                   >
//                     {/* Animated background gradient */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                     <CardContent className={`p-8 relative z-10`}>
//                       <div className="text-center">
//                         <div className={`relative mx-auto mb-6 w-36 h-36 rounded-full overflow-hidden ring-4 transition-all duration-300 ${
//                           isActive ? 'ring-primary/40' : 'ring-primary/15'
//                         }`}>
//                           <img
//                             src={member.image}
//                             alt={member.name}
//                             className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? 'scale-100' : 'scale-[1.03]'}`}
//                           />
//                           <div className={`absolute inset-0 bg-gradient-primary transition-opacity duration-300 ${isActive ? 'opacity-10' : 'opacity-0'}`}></div>
//                         </div>
//                         <h3 className={`text-3xl font-bold mb-3 transition-colors duration-300 ${isActive ? 'text-foreground group-hover:text-primary' : 'text-foreground/80'}`}>
//                           {member.name}
//                         </h3>
//                         <p className={`font-semibold mb-6 text-lg transition-transform duration-300 ${isActive ? 'text-primary group-hover:scale-105' : 'text-primary/70'}`}>
//                           {member.role}
//                         </p>
//                         <p className={`mb-6 leading-relaxed text-base transition-colors duration-300 ${isActive ? 'text-muted-foreground group-hover:text-foreground' : 'text-muted-foreground/80'}`}>
//                           {member.bio}
//                         </p>
//                         <div className="flex justify-center space-x-6">
//                           <a
//                             href={member.linkedin}
//                             className={`p-3 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${isActive ? 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground' : 'bg-primary/5 text-primary/70 hover:bg-primary/10 hover:text-primary'}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
//                             <Linkedin size={24} />
//                           </a>
//                           <a
//                             href={`mailto:${member.email}`}
//                             className={`p-3 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${isActive ? 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground' : 'bg-primary/5 text-primary/70 hover:bg-primary/10 hover:text-primary'}`}
//                           >
//                             <Mail size={24} />
//                           </a>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </CarouselItem>
//               );
//             })}
//           </CarouselContent>
//           <CarouselPrevious className="hidden sm:flex hover:scale-110 transition-transform duration-300" />
//           <CarouselNext className="hidden sm:flex hover:scale-110 transition-transform duration-300" />
          
//           {/* Custom navigation dots */}
//           <div className="flex justify-center mt-6 space-x-2">
//             {teamMembers.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => carouselApi?.scrollTo(index)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   index === currentIndex 
//                     ? 'bg-primary scale-125' 
//                     : 'bg-gray-300 hover:bg-primary/50 hover:scale-110'
//                 }`}
//               />
//             ))}
//           </div>
//         </Carousel>
//       </div>
//     </section>
//   );
// };

// export default TeamSection;








// // Code with small profile photos 
// import { Card } from '@/components/ui/card';
// import { Linkedin, Mail, X } from 'lucide-react';
// import Sanjay from '@/assets/Sanjay.jpg';
// import Sarika from '@/assets/Sarika.jpg';
// import Gordon from '@/assets/Gordon.jpg';
// import Vaibhav from '@/assets/Vaibhav.jpg';
// import Anil from '@/assets/Anil.jpg';
// import TeamBackground from '@/assets/Team_background.jpg';
// import { useEffect, useState, useRef } from 'react';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
//   type CarouselApi
// } from '@/components/ui/carousel';
// import { motion, AnimatePresence } from 'framer-motion';

// const TeamSection = () => {
//   const teamMembers = [
//     {
//       name: 'Dr.Sarika Kumari',
//       role: 'CEO/Co-Founder',
//       bio: 'Co-founder of BioLabMate with expertise in biotechnology, biomaterials, and advanced R&D, holding a Ph.D. in Biochemistry.',
//       image: Sarika,
//       linkedin: 'https://www.linkedin.com/in/sarikakum/',
//       email: 'biolabmatecomposite@gmail.com'
//     },
//     {
//       name: 'Sanjay Dubey',
//       role: 'CTO/Co-Founder',
//       bio: 'Chemical Engineer at BioLabMate specializing in product development, process optimization, and business growth initiatives.',
//       image: Sanjay,
//       linkedin: 'https://www.linkedin.com/in/snjaykdubey/',
//       email: 'biolabmatecomposite@gmail.com'
//     },
//     {
//       name: 'Dr. Gordon Slade',
//       role: 'Aquaculture Advisor',
//       bio: 'Advisor at BioLabMate with extensive leadership in fisheries, aquaculture, and ocean industries, guiding strategy, partnerships, and sustainability.',
//       image: Gordon,
//       linkedin: 'https://www.linkedin.com/in/gordon-slade-cm-onl-lld-frcgs-b9478854/',
//       email: 'biolabmatecomposite@gmail.com'
//     },
//     {
//       name: 'Anil Manyam',
//       role: 'Software Developer (Intern)',
//       bio: 'Software Developer at BioLabMate, contributing to the design and development of dynamic web applications and digital platforms.',
//       image: Anil,
//       linkedin: 'https://www.linkedin.com/in/anil-manyam-698662248/',
//       email: 'anilmanyam.630@gmail.com'
//     },
//     {
//       name: 'Vaibhav Thummar',
//       role: 'Software Engineer(Intern)',
//       bio: 'Software Developer at BioLabMate, creating impactful websites and software solutions while managing web content and digital development.',
//       image: Vaibhav,
//       linkedin: 'https://www.linkedin.com/in/vaibhav-thummar-951498249/',
//       email: 'vaibhav.it178@gmail.com'
//     }
//   ];

//   const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [modalIndex, setModalIndex] = useState<number | null>(null);
//   const [hoverIndex, setHoverIndex] = useState<number | null>(null);

//   // Use safe timer types for browser
//   const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   // Auto-slide functions
//   const startAutoSlide = () => {
//     if (!carouselApi || modalIndex !== null) return;
//     if (autoSlideRef.current) clearInterval(autoSlideRef.current);

//     autoSlideRef.current = setInterval(() => {
//       const totalSlides = carouselApi.scrollSnapList().length;
//       const current = carouselApi.selectedScrollSnap();
//       if (current < totalSlides - 1) {
//         carouselApi.scrollNext();
//       } else {
//         carouselApi.scrollTo(0);
//       }
//     }, 2000);
//   };

//   const pauseAutoSlide = () => {
//     if (autoSlideRef.current) clearInterval(autoSlideRef.current);
//     if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
//     resumeTimeoutRef.current = setTimeout(() => startAutoSlide(), 7000);
//   };

//   useEffect(() => {
//     if (!carouselApi) return;
//     const onSelect = () => setCurrentIndex(carouselApi.selectedScrollSnap());
//     carouselApi.on('select', onSelect);

//     startAutoSlide();

//     return () => {
//       carouselApi.off('select', onSelect);
//       if (autoSlideRef.current) clearInterval(autoSlideRef.current);
//       if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
//     };
//   }, [carouselApi, modalIndex]);

//   const openModal = (index: number) => {
//     setModalIndex(index);
//     pauseAutoSlide();
//   };

//   const closeModal = () => {
//     setModalIndex(null);
//     startAutoSlide();
//   };

//   return (
//     <section
//       id="team"
//       className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50"
//     >
//       {/* Background */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <img
//           src={TeamBackground}
//           alt="Team background"
//           className="w-full h-full object-cover opacity-20"
//         />
//       </div>

//       <div className="max-w-6xl mx-auto relative z-10">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
//         </div>

//         <Carousel
//           className="max-w-6xl mx-auto px-2 cursor-pointer"
//           opts={{ align: 'center', loop: false, duration: 20, skipSnaps: false }}
//           setApi={setCarouselApi}
//           onMouseEnter={pauseAutoSlide}
//           onMouseLeave={startAutoSlide}
//         >
//           <CarouselContent>
//             {teamMembers.map((member, index) => (
//               <CarouselItem key={index} className="sm:basis-1/1 md:basis-1/2 lg:basis-1/3 px-2">
//                 <Card
//                   className="group relative cursor-pointer transition-all duration-700 ease-out shadow-soft overflow-hidden border-2 border-transparent profile-img"
//                   onClick={() => openModal(index)}
//                   onMouseEnter={() => setHoverIndex(index)}
//                   onMouseLeave={() => setHoverIndex(null)}
//                 >
//                   <img
//                     src={member.image}
//                     alt={member.name}
//                     className={`profile-img w-full h-80 object-cover transition-all duration-500 ${
//                       hoverIndex === index ? 'grayscale brightness-75' : ''
//                     }`}
//                   />
//                   <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white text-center py-3 text-lg font-semibold pointer-events-none">
//                     {member.role}
//                   </div>
//                 </Card>
//               </CarouselItem>
//             ))}
//           </CarouselContent>

//           <CarouselPrevious className="hidden sm:flex hover:scale-110 transition-transform duration-300" />
//           <CarouselNext className="hidden sm:flex hover:scale-110 transition-transform duration-300" />
//         </Carousel>
//       </div>

//       {/* Profile modal */}
//       <AnimatePresence>
//         {modalIndex !== null && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//             onClick={closeModal}
//           >
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               transition={{ duration: 0.4 }}
//               className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden relative"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
//                 onClick={closeModal}
//               >
//                 <X size={24} />
//               </button>
//               <img
//                 src={teamMembers[modalIndex].image}
//                 alt={teamMembers[modalIndex].name}
//                 className="w-full h-80 object-cover"
//               />
//               <div className="p-6">
//                 <h3 className="text-2xl font-bold mb-2">{teamMembers[modalIndex].name}</h3>
//                 <p className="font-semibold mb-4 text-primary">{teamMembers[modalIndex].role}</p>
//                 <p className="mb-4 text-gray-700">{teamMembers[modalIndex].bio}</p>
//                 <div className="flex space-x-4">
//                   <a
//                     href={teamMembers[modalIndex].linkedin}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-primary hover:text-primary-dark"
//                   >
//                     <Linkedin size={24} />
//                   </a>
//                   <a
//                     href={`mailto:${teamMembers[modalIndex].email}`}
//                     className="text-primary hover:text-primary-dark"
//                   >
//                     <Mail size={24} />
//                   </a>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// };

// export default TeamSection;








// Final code with taller profile photos and improved modal
// import { Card } from '@/components/ui/card';
// import { Linkedin, Mail, X } from 'lucide-react';
// import Sanjay from '@/assets/Sanjay.jpg';
// import Sarika from '@/assets/Sarika.jpg';
// import Gordon from '@/assets/Gordon.jpg';
// import Vaibhav from '@/assets/Vaibhav.jpg';
// import Anil from '@/assets/Anil.jpg';
// import TeamBackground from '@/assets/Team_background.jpg';
// import { useEffect, useState, useRef } from 'react';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
//   type CarouselApi
// } from '@/components/ui/carousel';
// import { motion, AnimatePresence } from 'framer-motion';

// const TeamSection = () => {
//   const teamMembers = [
//     {
//       name: 'Dr.Sarika Kumari',
//       role: 'CEO/Co-Founder',
//       bio: 'Co-founder of BioLabMate with expertise in biotechnology, biomaterials, and advanced R&D, holding a Ph.D. in Biochemistry.',
//       image: Sarika,
//       linkedin: 'https://www.linkedin.com/in/sarikakum/',
//       email: 'biolabmatecomposite@gmail.com'
//     },
//     {
//       name: 'Sanjay Dubey',
//       role: 'CTO/Co-Founder',
//       bio: 'Chemical Engineer at BioLabMate specializing in product development, process optimization, and business growth initiatives.',
//       image: Sanjay,
//       linkedin: 'https://www.linkedin.com/in/snjaykdubey/',
//       email: 'biolabmatecomposite@gmail.com'
//     },
//     {
//       name: 'Dr. Gordon Slade',
//       role: 'Aquaculture Advisor',
//       bio: 'Advisor at BioLabMate with extensive leadership in fisheries, aquaculture, and ocean industries, guiding strategy, partnerships, and sustainability.',
//       image: Gordon,
//       linkedin: 'https://www.linkedin.com/in/gordon-slade-cm-onl-lld-frcgs-b9478854/',
//       email: 'biolabmatecomposite@gmail.com'
//     },
//     {
//       name: 'Anil Manyam',
//       role: 'Software Developer (Intern)',
//       bio: 'Software Developer at BioLabMate, contributing to the design and development of dynamic web applications and digital platforms.',
//       image: Anil,
//       linkedin: 'https://www.linkedin.com/in/anil-manyam-698662248/',
//       email: 'anilmanyam.630@gmail.com'
//     },
//     {
//       name: 'Vaibhav Thummar',
//       role: 'Software Engineer(Intern)',
//       bio: 'Software Developer at BioLabMate, creating impactful websites and software solutions while managing web content and digital development.',
//       image: Vaibhav,
//       linkedin: 'https://www.linkedin.com/in/vaibhav-thummar-951498249/',
//       email: 'vaibhav.it178@gmail.com'
//     }
//   ];

//   const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [modalIndex, setModalIndex] = useState<number | null>(null);
//   const [hoverIndex, setHoverIndex] = useState<number | null>(null);

//   // Use safe timer types for browser
//   const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   // Auto-slide functions
//   const startAutoSlide = () => {
//     if (!carouselApi || modalIndex !== null) return;
//     if (autoSlideRef.current) clearInterval(autoSlideRef.current);

//     autoSlideRef.current = setInterval(() => {
//       const totalSlides = carouselApi.scrollSnapList().length;
//       const current = carouselApi.selectedScrollSnap();
//       if (current < totalSlides - 1) {
//         carouselApi.scrollNext();
//       } else {
//         carouselApi.scrollTo(0);
//       }
//     }, 2000);
//   };

//   const pauseAutoSlide = () => {
//     if (autoSlideRef.current) clearInterval(autoSlideRef.current);
//     if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
//     resumeTimeoutRef.current = setTimeout(() => startAutoSlide(), 7000);
//   };

//   useEffect(() => {
//     if (!carouselApi) return;
//     const onSelect = () => setCurrentIndex(carouselApi.selectedScrollSnap());
//     carouselApi.on('select', onSelect);

//     startAutoSlide();

//     return () => {
//       carouselApi.off('select', onSelect);
//       if (autoSlideRef.current) clearInterval(autoSlideRef.current);
//       if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
//     };
//   }, [carouselApi, modalIndex]);

//   const openModal = (index: number) => {
//     setModalIndex(index);
//     pauseAutoSlide();
//   };

//   const closeModal = () => {
//     setModalIndex(null);
//     startAutoSlide();
//   };

//   return (
//     <section
//       id="team"
//       className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50"
//     >
//       {/* Background */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <img
//           src={TeamBackground}
//           alt="Team background"
//           className="w-full h-full object-cover opacity-20"
//         />
//       </div>

//       <div className="max-w-6xl mx-auto relative z-10">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
//         </div>

//         <Carousel
//           className="max-w-6xl mx-auto px-2 cursor-pointer"
//           opts={{ align: 'center', loop: false, duration: 20, skipSnaps: false }}
//           setApi={setCarouselApi}
//           onMouseEnter={pauseAutoSlide}
//           onMouseLeave={startAutoSlide}
//         >
//           <CarouselContent>
//             {teamMembers.map((member, index) => (
//               <CarouselItem key={index} className="sm:basis-1/1 md:basis-1/2 lg:basis-1/3 px-2">
//                 <Card
//                   className="group relative cursor-pointer transition-all duration-700 ease-out shadow-soft overflow-hidden border-2 border-transparent profile-img"
//                   onClick={() => openModal(index)}
//                   onMouseEnter={() => setHoverIndex(index)}
//                   onMouseLeave={() => setHoverIndex(null)}
//                 >
//                   {/* Taller profile image */}
//                   <img
//                     src={member.image}
//                     alt={member.name}
//                     className={`profile-img w-full h-[24rem] md:h-[28rem] object-cover transition-all duration-500 ${
//                       hoverIndex === index ? 'grayscale brightness-75' : ''
//                     }`}
//                   />

//                   {/* Bottom role strip */}
//                   <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white text-center p-3 sm:p-4 pointer-events-none">
//                     <p className="font-bold text-white text-lg leading-tight">
//                       {member.name}
//                     </p>
//                     <p className="mt-1 text-white/90 text-xs sm:text-sm font-medium">
//                       {member.role}
//                     </p>
//                   </div>
//                 </Card>
//               </CarouselItem>
//             ))}
//           </CarouselContent>

//           <CarouselPrevious className="hidden sm:flex hover:scale-110 transition-transform duration-300" />
//           <CarouselNext className="hidden sm:flex hover:scale-110 transition-transform duration-300" />
//         </Carousel>
//       </div>

//       {/* Profile modal (centered vertical layout like the reference) */}
//       <AnimatePresence>
//         {modalIndex !== null && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//             onClick={closeModal}
//             aria-modal="true"
//             role="dialog"
//           >
//             <motion.div
//               initial={{ scale: 0.96, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.96, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="relative w-full max-w-2xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 className="absolute top-3 right-3 z-10 text-gray-600 hover:text-gray-900"
//                 onClick={closeModal}
//                 aria-label="Close"
//               >
//                 <X size={24} />
//               </button>

//               <div className="bg-emerald-50 rounded-2xl shadow-2xl px-6 py-10 sm:px-10 text-center max-h-[85vh] overflow-y-auto">
//                 {/* Circular avatar */}
//                 <div className="flex justify-center">
//                   <img
//                     src={teamMembers[modalIndex].image}
//                     alt={teamMembers[modalIndex].name}
//                     className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover ring-4 ring-emerald-300 shadow-md"
//                   />
//                 </div>

//                 {/* Name and role */}
//                 <h3 className="mt-6 text-3xl font-extrabold text-gray-900">
//                   {teamMembers[modalIndex].name}
//                 </h3>
//                 <p className="mt-2 text-xl font-semibold text-emerald-600">
//                   {teamMembers[modalIndex].role}
//                 </p>

//                 {/* Bio */}
//                 <p className="mt-6 text-gray-700 leading-relaxed max-w-2xl mx-auto">
//                   {teamMembers[modalIndex].bio}
//                 </p>

//                 {/* Actions */}
//                 <div className="mt-8 flex items-center justify-center gap-4">
//                   <a
//                     href={teamMembers[modalIndex].linkedin}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label="LinkedIn"
//                     className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center hover:bg-emerald-200 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-emerald-50"
//                   >
//                     <Linkedin size={22} />
//                   </a>
//                   <a
//                     href={`mailto:${teamMembers[modalIndex].email}`}
//                     aria-label="Email"
//                     className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center hover:bg-emerald-200 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-emerald-50"
//                   >
//                     <Mail size={22} />
//                   </a>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// };

// export default TeamSection;








// // Final code with taller profile photos and improved modal
// import { Card } from '@/components/ui/card';
// import { Linkedin, Mail, X } from 'lucide-react';
// import Sanjay from '@/assets/Sanjay.jpg';
// import Sarika from '@/assets/Sarika.jpg';
// import Gordon from '@/assets/Gordon.jpg';
// import Vaibhav from '@/assets/Vaibhav.jpg';
// import Anil from '@/assets/Anil.jpg';
// import TeamBackground from '@/assets/Team_background.jpg';
// import { useEffect, useState, useRef } from 'react';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
//   type CarouselApi
// } from '@/components/ui/carousel';
// import { motion, AnimatePresence } from 'framer-motion';

// const TeamSection = () => {
//   const teamMembers = [
//     {
//       name: 'Dr.Sarika Kumari',
//       role: 'CEO/Co-Founder',
//       bio: 'Co-founder of BioLabMate with expertise in biotechnology, biomaterials, and advanced R&D, holding a Ph.D. in Biochemistry.',
//       image: Sarika,
//       linkedin: 'https://www.linkedin.com/in/sarikakum/',
//       email: 'biolabmatecomposite@gmail.com'
//     },
//     {
//       name: 'Sanjay Dubey',
//       role: 'CTO/Co-Founder',
//       bio: 'Chemical Engineer at BioLabMate specializing in product development, process optimization, and business growth initiatives.',
//       image: Sanjay,
//       linkedin: 'https://www.linkedin.com/in/snjaykdubey/',
//       email: 'biolabmatecomposite@gmail.com'
//     },
//     {
//       name: 'Dr. Gordon Slade',
//       role: 'Aquaculture Advisor',
//       bio: 'Advisor at BioLabMate with extensive leadership in fisheries, aquaculture, and ocean industries, guiding strategy, partnerships, and sustainability.',
//       image: Gordon,
//       linkedin: 'https://www.linkedin.com/in/gordon-slade-cm-onl-lld-frcgs-b9478854/',
//       email: 'biolabmatecomposite@gmail.com'
//     },
//     {
//       name: 'Anil Manyam',
//       role: 'Software Developer (Intern)',
//       bio: 'Software Developer at BioLabMate, contributing to the design and development of dynamic web applications and digital platforms.',
//       image: Anil,
//       linkedin: 'https://www.linkedin.com/in/anil-manyam-698662248/',
//       email: 'anilmanyam.630@gmail.com'
//     },
//     {
//       name: 'Vaibhav Thummar',
//       role: 'Software Engineer(Intern)',
//       bio: 'Software Developer at BioLabMate, creating impactful websites and software solutions while managing web content and digital development.',
//       image: Vaibhav,
//       linkedin: 'https://www.linkedin.com/in/vaibhav-thummar-951498249/',
//       email: 'vaibhav.it178@gmail.com'
//     }
//   ];

//   const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [modalIndex, setModalIndex] = useState<number | null>(null);
//   const [hoverIndex, setHoverIndex] = useState<number | null>(null);

//   // Use safe timer types for browser
//   const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   // Auto-slide functions
//   const startAutoSlide = () => {
//     if (!carouselApi || modalIndex !== null) return;
//     if (autoSlideRef.current) clearInterval(autoSlideRef.current);

//     autoSlideRef.current = setInterval(() => {
//       const totalSlides = carouselApi.scrollSnapList().length;
//       const current = carouselApi.selectedScrollSnap();
//       if (current < totalSlides - 1) {
//         carouselApi.scrollNext();
//       } else {
//         carouselApi.scrollTo(0);
//       }
//     }, 2000);
//   };

//   const pauseAutoSlide = () => {
//     if (autoSlideRef.current) clearInterval(autoSlideRef.current);
//     if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
//     resumeTimeoutRef.current = setTimeout(() => startAutoSlide(), 7000);
//   };

//   useEffect(() => {
//     if (!carouselApi) return;
//     const onSelect = () => setCurrentIndex(carouselApi.selectedScrollSnap());
//     carouselApi.on('select', onSelect);

//     startAutoSlide();

//     return () => {
//       carouselApi.off('select', onSelect);
//       if (autoSlideRef.current) clearInterval(autoSlideRef.current);
//       if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
//     };
//   }, [carouselApi, modalIndex]);

//   // Keyboard arrow navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (!carouselApi || modalIndex !== null) return;

//       if (e.key === 'ArrowRight') {
//         e.preventDefault();
//         pauseAutoSlide();
//         carouselApi.scrollNext();
//       } else if (e.key === 'ArrowLeft') {
//         e.preventDefault();
//         pauseAutoSlide();
//         carouselApi.scrollPrev();
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [carouselApi, modalIndex]);

//   const openModal = (index: number) => {
//     setModalIndex(index);
//     pauseAutoSlide();
//   };

//   const closeModal = () => {
//     setModalIndex(null);
//     startAutoSlide();
//   };

//   return (
//     <section
//       id="team"
//       className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50"
//     >
//       {/* Background */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <img
//           src={TeamBackground}
//           alt="Team background"
//           className="w-full h-full object-cover opacity-20"
//         />
//       </div>

//       <div className="max-w-6xl mx-auto relative z-10">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
//         </div>

//         <Carousel
//           className="max-w-6xl mx-auto px-2 cursor-pointer"
//           opts={{ align: 'center', loop: false, duration: 20, skipSnaps: false }}
//           setApi={setCarouselApi}
//         >
//           <CarouselContent>
//             {teamMembers.map((member, index) => (
//               <CarouselItem key={index} className="sm:basis-1/1 md:basis-1/2 lg:basis-1/3 px-2">
//                 <Card
//                   className="group relative cursor-pointer transition-all duration-700 ease-out shadow-soft overflow-hidden border-2 border-transparent profile-img"
//                   onClick={() => openModal(index)}
//                   onMouseEnter={() => setHoverIndex(index)}
//                   onMouseLeave={() => setHoverIndex(null)}
//                 >
//                   {/* Taller profile image */}
//                   <img
//                     src={member.image}
//                     alt={member.name}
//                     className={`profile-img w-full h-[24rem] md:h-[28rem] object-cover transition-all duration-500 ${
//                       hoverIndex === index ? 'grayscale brightness-75' : ''
//                     }`}
//                   />

//                   {/* Bottom role strip */}
//                   <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white text-center p-3 sm:p-4 pointer-events-none">
//                     <p className="font-bold text-white text-lg leading-tight">
//                       {member.name}
//                     </p>
//                     <p className="mt-1 text-white/90 text-xs sm:text-sm font-medium">
//                       {member.role}
//                     </p>
//                   </div>
//                 </Card>
//               </CarouselItem>
//             ))}
//           </CarouselContent>

//           <CarouselPrevious className="hidden sm:flex hover:scale-110 transition-transform duration-300" />
//           <CarouselNext className="hidden sm:flex hover:scale-110 transition-transform duration-300" />
//         </Carousel>
//       </div>

//       {/* Profile modal (centered vertical layout like the reference) */}
//       <AnimatePresence>
//         {modalIndex !== null && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//             onClick={closeModal}
//             aria-modal="true"
//             role="dialog"
//           >
//             <motion.div
//               initial={{ scale: 0.96, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.96, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="relative w-full max-w-2xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 className="absolute top-3 right-3 z-10 text-gray-600 hover:text-gray-900"
//                 onClick={closeModal}
//                 aria-label="Close"
//               >
//                 <X size={24} />
//               </button>

//               <div className="bg-emerald-50 rounded-2xl shadow-2xl px-6 py-10 sm:px-10 text-center max-h-[85vh] overflow-y-auto">
//                 {/* Circular avatar */}
//                 <div className="flex justify-center">
//                   <img
//                     src={teamMembers[modalIndex].image}
//                     alt={teamMembers[modalIndex].name}
//                     className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover ring-4 ring-emerald-300 shadow-md"
//                   />
//                 </div>

//                 {/* Name and role */}
//                 <h3 className="mt-6 text-3xl font-extrabold text-gray-900">
//                   {teamMembers[modalIndex].name}
//                 </h3>
//                 <p className="mt-2 text-xl font-semibold text-emerald-600">
//                   {teamMembers[modalIndex].role}
//                 </p>

//                 {/* Bio */}
//                 <p className="mt-6 text-gray-700 leading-relaxed max-w-2xl mx-auto">
//                   {teamMembers[modalIndex].bio}
//                 </p>

//                 {/* Actions */}
//                 <div className="mt-8 flex items-center justify-center gap-4">
//                   <a
//                     href={teamMembers[modalIndex].linkedin}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label="LinkedIn"
//                     className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center hover:bg-emerald-200 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-emerald-50"
//                   >
//                     <Linkedin size={22} />
//                   </a>
//                   <a
//                     href={`mailto:${teamMembers[modalIndex].email}`}
//                     aria-label="Email"
//                     className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center hover:bg-emerald-200 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-emerald-50"
//                   >
//                     <Mail size={22} />
//                   </a>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// };

// export default TeamSection;














import { useEffect, useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Linkedin, Mail, X } from 'lucide-react';
import TeamBackground from '@/assets/Team_background.jpg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel';
import { motion, AnimatePresence } from 'framer-motion';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  email?: string;
  linkedin_url?: string;
  image_url?: string;
  department?: string;
  is_active: boolean;
}

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Timer refs
  const autoSlideRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch team members from API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/team`);
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setTeamMembers(data.filter((m) => m.is_active));
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Error fetching team');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // --- 🔁 Continuous Auto Slide (like IncubatorPrograms) ---
  const startAutoSlide = () => {
    if (!carouselApi || modalIndex !== null) return;
    if (autoSlideRef.current) cancelAnimationFrame(autoSlideRef.current);

    const animate = () => {
      const totalSlides = carouselApi.scrollSnapList().length;
      const current = carouselApi.selectedScrollSnap();

      if (current < totalSlides - 1) {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollTo(0); // seamless restart
      }

      autoSlideRef.current = requestAnimationFrame(() => {
        setTimeout(() => animate(), 4500); // smooth interval
      });
    };

    autoSlideRef.current = requestAnimationFrame(animate);
  };

  const pauseAutoSlide = () => {
    if (autoSlideRef.current) cancelAnimationFrame(autoSlideRef.current);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => startAutoSlide(), 7000);
  };

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setCurrentIndex(carouselApi.selectedScrollSnap());
    carouselApi.on('select', onSelect);
    startAutoSlide();

    return () => {
      carouselApi.off('select', onSelect);
      if (autoSlideRef.current) cancelAnimationFrame(autoSlideRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [carouselApi, modalIndex]);

  // Keyboard nav
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!carouselApi || modalIndex !== null) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        pauseAutoSlide();
        carouselApi.scrollNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        pauseAutoSlide();
        carouselApi.scrollPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [carouselApi, modalIndex]);

  const openModal = (index: number) => {
    setModalIndex(index);
    pauseAutoSlide();
  };
  const closeModal = () => {
    setModalIndex(null);
    startAutoSlide();
  };

  if (loading) {
    return (
      <section id="team" className="py-20 text-center bg-gray-50">
        <p className="text-gray-700 animate-pulse">Loading team...</p>
      </section>
    );
  }

  if (error || teamMembers.length === 0) {
    return (
      <section id="team" className="py-20 text-center bg-gray-50">
        <p className="text-red-600 font-medium">
          {error ? `Error: ${error}` : 'No team members found.'}
        </p>
      </section>
    );
  }

  return (
    <section
      id="team"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={TeamBackground}
          alt="Team background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Team
          </h2>
        </div>

        <Carousel
          className="max-w-6xl mx-auto px-2 cursor-pointer"
          opts={{ align: 'center', loop: true, duration: 20 }} // ✅ loop enabled
          setApi={setCarouselApi}
        >
          <CarouselContent>
            {teamMembers.map((member, index) => (
              <CarouselItem
                key={member.id}
                className="sm:basis-1/1 md:basis-1/2 lg:basis-1/3 px-2"
              >
                <Card
                  className="group relative cursor-pointer transition-all duration-700 ease-out shadow-soft overflow-hidden border-2 border-transparent"
                  onClick={() => openModal(index)}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  data-cursor="profile"
                >
                  <img
                    src={member.image_url || '/placeholder.png'}
                    alt={member.name}
                    className={`w-full h-[24rem] md:h-[28rem] object-cover transition-all duration-500 ${
                      hoverIndex === index ? 'grayscale brightness-75' : ''
                    }`}
                  />
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white text-center p-3 sm:p-4 pointer-events-none">
                    <p className="font-bold text-white text-lg leading-tight">
                      {member.name}
                    </p>
                    <p className="mt-1 text-white/90 text-xs sm:text-sm font-medium">
                      {member.position}
                    </p>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden sm:flex hover:scale-110 transition-transform duration-300" />
          <CarouselNext className="hidden sm:flex hover:scale-110 transition-transform duration-300" />
        </Carousel>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 z-10 text-gray-600 hover:text-gray-900"
                onClick={closeModal}
                aria-label="Close"
              >
                <X size={24} />
              </button>

              <div className="bg-emerald-50 rounded-2xl shadow-2xl px-6 py-10 sm:px-10 text-center max-h-[85vh] overflow-y-auto">
                <div className="flex justify-center">
                  <img
                    src={teamMembers[modalIndex].image_url || '/placeholder.png'}
                    alt={teamMembers[modalIndex].name}
                    className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover ring-4 ring-emerald-300 shadow-md"
                  />
                </div>

                <h3 className="mt-6 text-3xl font-extrabold text-gray-900">
                  {teamMembers[modalIndex].name}
                </h3>
                <p className="mt-2 text-xl font-semibold text-emerald-600">
                  {teamMembers[modalIndex].position}
                </p>

                <p className="mt-6 text-gray-700 leading-relaxed max-w-2xl mx-auto">
                  {teamMembers[modalIndex].bio}
                </p>

                <div className="mt-8 flex items-center justify-center gap-4">
                  {teamMembers[modalIndex].linkedin_url && (
                    <a
                      href={teamMembers[modalIndex].linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center hover:bg-emerald-200 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                      <Linkedin size={22} />
                    </a>
                  )}
                  {teamMembers[modalIndex].email && (
                    <a
                      href={`mailto:${teamMembers[modalIndex].email}`}
                      aria-label="Email"
                      className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center hover:bg-emerald-200 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                      <Mail size={22} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TeamSection;











// // team section with unifined admin pannel

// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Linkedin, Mail } from 'lucide-react';

// interface TeamMember {
//   id: string;
//   name: string;
//   position: string; // Changed from 'role' to 'position'
//   bio: string;
//   email?: string;
//   phone?: string;
//   linkedin_url?: string;
//   image_url?: string;
//   department?: string;
//   join_date?: string;
//   is_active: boolean;
//   created_at: string;
//   updated_at?: string;
// }

// const TeamSection: React.FC = () => {
//   const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchTeamMembers();
//   }, []);

//   const fetchTeamMembers = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/team`);
      
//       if (!response.ok) {
//         throw new Error(`Failed to fetch team members: ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log('Fetched team members:', data);
      
//       // Ensure data is an array
//       if (Array.isArray(data)) {
//         setTeamMembers(data);
//       } else {
//         console.error('Team data is not an array:', data);
//         setTeamMembers([]);
//       }
//     } catch (error) {
//       console.error('Error fetching team members:', error);
//       setError(error instanceof Error ? error.message : 'Failed to load team members');
//       setTeamMembers([]); // Set empty array on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <section className="py-20 bg-white" id="team">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
//             <p className="text-xl text-gray-600">
//               Meet the passionate individuals driving innovation at BioLabMate
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
//       <section className="py-20 bg-white" id="team">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
//             <p className="text-xl text-gray-600">
//               Meet the passionate individuals driving innovation at BioLabMate
//             </p>
//           </div>
//           <div className="text-center py-20">
//             <div className="text-red-600 mb-4">
//               <p className="text-lg font-medium">Unable to load team members</p>
//               <p className="text-sm text-gray-600 mt-2">{error}</p>
//             </div>
//             <button
//               onClick={fetchTeamMembers}
//               className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (!teamMembers || teamMembers.length === 0) {
//     return (
//       <section className="py-20 bg-white" id="team">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
//             <p className="text-xl text-gray-600">
//               Meet the passionate individuals driving innovation at BioLabMate
//             </p>
//           </div>
//           <div className="text-center py-20">
//             <p className="text-gray-600">No team members found. Check back soon!</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-20 bg-white" id="team">
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
//             Our Team
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Meet the passionate individuals driving innovation at BioLabMate
//           </p>
//         </motion.div>

//         {/* Team Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//           {teamMembers.map((member, index) => (
//             <motion.div
//               key={member.id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
//             >
//               {/* Image Container */}
//               <div className="relative h-80 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
//                 {member.image_url ? (
//                   <img
//                     src={member.image_url}
//                     alt={member.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       // Fallback if image fails to load
//                       const target = e.currentTarget as HTMLImageElement;
//                       target.style.display = 'none';
//                       if (target.parentElement) {
//                         target.parentElement.innerHTML = `
//                           <div class="w-full h-full flex items-center justify-center">
//                             <div class="text-6xl font-bold text-primary">
//                               ${member.name.split(' ').map(n => n[0]).join('')}
//                             </div>
//                           </div>
//                         `;
//                       }
//                     }}
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center">
//                     <div className="text-6xl font-bold text-primary">
//                       {member.name.split(' ').map(n => n[0]).join('')}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Content */}
//               <div className="p-6">
//                 {/* Name and Position */}
//                 <div className="mb-4">
//                   <h3 className="text-2xl font-bold text-gray-900 mb-1">
//                     {member.name}
//                   </h3>
//                   <p className="text-primary font-semibold text-sm">
//                     {member.position}
//                   </p>
//                 </div>

//                 {/* Bio */}
//                 <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
//                   {member.bio}
//                 </p>

//                 {/* Department Badge */}
//                 {member.department && (
//                   <div className="mb-4">
//                     <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
//                       {member.department}
//                     </span>
//                   </div>
//                 )}

//                 {/* Social Links */}
//                 <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
//                   {member.linkedin_url && (
//                     <a
//                       href={member.linkedin_url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
//                       title="LinkedIn Profile"
//                     >
//                       <Linkedin className="w-5 h-5" />
//                     </a>
//                   )}
//                   {member.email && (
//                     <a
//                       href={`mailto:${member.email}`}
//                       className="flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
//                       title="Send Email"
//                     >
//                       <Mail className="w-5 h-5" />
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* NO JOIN TEAM CTA - REMOVED */}
        
//       </div>
//     </section>
//   );
// };

// export default TeamSection;