// import Navigation from '@/components/Navigation';
// import HeroSection from '@/components/HeroSection';
// import CircularJourneyTimeline from '@/components/CircularJourneyTimeline';
// import TeamSection from '@/components/TeamSection';
// import IncubatorPrograms from '@/components/IncubatorPrograms';
// import ContactSection from '@/components/ContactSection';
// import Footer from '@/components/Footer';
// import { Button } from '@/components/ui/button';
// import { Calculator } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import CircularJourneyCarousel from '../components/CircularJourneyCarousel';
// const Index = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation />
//       <HeroSection />
//       <section className="py-0">
//         {/* <CircularJourneyTimeline /> */}
//         <CircularJourneyCarousel />
//       </section>
      
//       {/* Sustainability Calculator Section */}
//       {/* <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
//             Calculate Your Lab's Environmental Impact
//           </h2>
//           <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
//             Discover how much plastic waste your lab generates and learn about opportunities to reduce your environmental footprint with our comprehensive sustainability calculator.
//           </p>
//           <Button 
//             onClick={() => navigate('/sustainability-calculator')}
//             size="lg"
//             className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
//           >
//             <Calculator className="w-5 h-5 mr-2" />
//             Sustainability Calculator
//           </Button>
//         </div>
//       </section>
//        */}
//       <TeamSection />
//       <IncubatorPrograms />
//       <ContactSection />
//       <Footer />
//     </div>
//   );
// };

// export default Index;







// // common video background for all sections
// import Navigation from '@/components/Navigation';
// import HeroSection from '@/components/HeroSection';
// import SemiCircleJourney from '@/components/CircularJourneyCarousel.tsx';
// import TeamSection from '@/components/TeamSection';
// import IncubatorPrograms from '@/components/IncubatorPrograms';
// import ContactSection from '@/components/ContactSection';
// import Footer from '@/components/Footer';
// import { Button } from '@/components/ui/button';
// import { Calculator } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const Index = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-background relative">
//       {/* Fixed Video Background for All Sections */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="fixed inset-0 w-full h-full object-cover z-0"
//         src="/background.mp4"
//       />

//       {/* Overlay to darken video slightly for better text readability */}
//       <div className="fixed inset-0 bg-black/20 z-0" />
      
//       {/* All content with relative positioning */}
//       <div className="relative z-10">
//         <Navigation />
//         <HeroSection />
        
//         {/* Semi Circle Journey Section */}
//         <section className="py-0">
//           <SemiCircleJourney />
//         </section>
        
//         {/* Sustainability Calculator Section */}
//         <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
//           <div className="max-w-4xl mx-auto text-center">
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
//               Calculate Your Lab's Environmental Impact
//             </h2>
//             <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
//               Discover how much plastic waste your lab generates and learn about opportunities to reduce your environmental footprint with our comprehensive sustainability calculator.
//             </p>
//             <Button 
//               onClick={() => navigate('/sustainability-calculator')}
//               size="lg"
//               className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
//             >
//               <Calculator className="w-5 h-5 mr-2" />
//               Sustainability Calculator
//             </Button>
//           </div>
//         </section>

//         <TeamSection />
//         <IncubatorPrograms />
//         <ContactSection />
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Index;



// // general fade in/out transtion effect between sections
// import { useNavigate } from 'react-router-dom';
// import Navigation from '@/components/Navigation';
// import HeroSection from '@/components/HeroSection';
// import CircularJourneyCarousel from '@/components/CircularJourneyCarousel';
// import TeamSection from '@/components/TeamSection';
// import IncubatorPrograms from '@/components/IncubatorPrograms';
// import ContactSection from '@/components/ContactSection';
// import Footer from '@/components/Footer';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { useEffect } from 'react';

// /**
//  *   Reusable AnimatedSection component
//  * Adds smooth fade/slide transition when a section enters/leaves the viewport.
//  */
// const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
//   const controls = useAnimation();
//   const [ref, inView] = useInView({
//     threshold: 0.25, // Trigger animation when 25% of section is visible
//     triggerOnce: false,
//   });

//   useEffect(() => {
//     if (inView) {
//       controls.start({
//         opacity: 1,
//         y: 0,
//         transition: { duration: 0.8, ease: 'easeOut' },
//       });
//     } else {
//       controls.start({
//         opacity: 0,
//         y: 80,
//         transition: { duration: 0.8, ease: 'easeOut' },
//       });
//     }
//   }, [controls, inView]);

//   return (
//     <motion.section
//       ref={ref}
//       initial={{ opacity: 0, y: 80 }}
//       animate={controls}
//       className="relative w-full"
//     >
//       {children}
//     </motion.section>
//   );
// };

// const Index = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-background overflow-x-hidden">
//       <Navigation />

//       {/*   Each section wrapped in AnimatedSection */}
//       <AnimatedSection>
//         <HeroSection />
//       </AnimatedSection>

//       <AnimatedSection>
//         <CircularJourneyCarousel />
//       </AnimatedSection>

//       <AnimatedSection>
//         <TeamSection />
//       </AnimatedSection>

//       <AnimatedSection>
//         <IncubatorPrograms />
//       </AnimatedSection>

//       <AnimatedSection>
//         <ContactSection />
//       </AnimatedSection>

//       <Footer />
//     </div>
//   );
// };

// export default Index;



// good transtion effect between sections
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import CircularJourneyCarousel from '@/components/CircularJourneyCarousel';
import TeamSection from '@/components/TeamSection';
import IncubatorPrograms from '@/components/IncubatorPrograms';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

/**
 * 🌟 AnimatedSection with parallax, rotation, and blur effects
 * Gives a cinematic scroll transition between each section
 */
const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
          duration: 1,
          ease: [0.25, 0.1, 0.25, 1],
        },
      });
    } else {
      controls.start({
        opacity: 0,
        y: 120,
        rotateX: -10,
        scale: 0.98,
        filter: 'blur(6px)',
        transition: {
          duration: 1,
          ease: [0.25, 0.1, 0.25, 1],
        },
      });
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 120, rotateX: -10, scale: 0.98, filter: 'blur(6px)' }}
      animate={controls}
      className="relative w-full will-change-transform"
      style={{
        transformOrigin: 'center top',
        perspective: 1000,
      }}
    >
      {children}
    </motion.section>
  );
};

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden scroll-smooth">
      <Navigation />

      {/* Hero Section */}
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>

      {/* Journey Section */}
      <AnimatedSection>
        <CircularJourneyCarousel />
      </AnimatedSection>

      {/* Team Section */}
      <AnimatedSection>
        <TeamSection />
      </AnimatedSection>

      {/* Incubator Programs */}
      <AnimatedSection>
        <IncubatorPrograms />
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection>
        <ContactSection />
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default Index;



// // good transtion effect between sections along with video background
// import { useNavigate } from 'react-router-dom';
// import Navigation from '@/components/Navigation';
// import HeroSection from '@/components/HeroSection';
// import CircularJourneyCarousel from '@/components/CircularJourneyCarousel';
// import TeamSection from '@/components/TeamSection';
// import IncubatorPrograms from '@/components/IncubatorPrograms';
// import ContactSection from '@/components/ContactSection';
// import Footer from '@/components/Footer';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { useEffect } from 'react';

// /**
//  * 🌟 AnimatedSection with cinematic transition
//  * Includes 3D rotation, blur, scale, and fade for smooth section transitions
//  */
// const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
//   const controls = useAnimation();
//   const [ref, inView] = useInView({
//     threshold: 0.05, // Trigger animation when 5% of section is visible
//     triggerOnce: false,
//   });

//   useEffect(() => {
//     if (inView) {
//       controls.start({
//         opacity: 1,
//         y: 0,
//         rotateX: 0,
//         scale: 1,
//         filter: 'blur(0px)',
//         transition: {
//           duration: 1.2,
//           ease: [0.25, 0.1, 0.25, 1],
//         },
//       });
//     } else {
//       controls.start({
//         opacity: 0,
//         y: 120,
//         rotateX: -10,
//         scale: 0.98,
//         filter: 'blur(6px)',
//         transition: {
//           duration: 1.2,
//           ease: [0.25, 0.1, 0.25, 1],
//         },
//       });
//     }
//   }, [controls, inView]);

//   return (
//     <motion.section
//       ref={ref}
//       initial={{ opacity: 0, y: 120, rotateX: -10, scale: 0.98, filter: 'blur(6px)' }}
//       animate={controls}
//       className="relative w-full will-change-transform z-10"
//       style={{
//         transformOrigin: 'center top',
//         perspective: 1000,
//       }}
//     >
//       {children}
//     </motion.section>
//   );
// };

// const Index = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="relative min-h-screen overflow-x-hidden text-white">
//       {/* 🎥 Fullscreen video background */}
//       <video
//         className="fixed top-0 left-0 w-full h-full object-cover -z-10"
//         src="/background.mp4"   // 🔁 Place your background video here (e.g., public/videos/home-bg.mp4)
//         autoPlay
//         loop
//         muted
//         playsInline
//       />

//       {/* 🌫️ Optional dark overlay for readability */}
//       <div className="fixed top-0 left-0 w-full h-full bg-black/40 -z-10"></div>

//       {/* 🧭 Navigation always on top */}
//       <Navigation />

//       {/* Sections with smooth transitions */}
//       <AnimatedSection>
//         <HeroSection />
//       </AnimatedSection>

//       <AnimatedSection>
//         <CircularJourneyCarousel />
//       </AnimatedSection>

//       <AnimatedSection>
//         <TeamSection />
//       </AnimatedSection>

//       <AnimatedSection>
//         <IncubatorPrograms />
//       </AnimatedSection>

//       <AnimatedSection>
//         <ContactSection />
//       </AnimatedSection>

//       <Footer />
//     </div>
//   );
// };

// export default Index;
