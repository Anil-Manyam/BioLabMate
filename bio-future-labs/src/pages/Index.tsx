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
import { useEffect, useRef } from 'react';

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
  const contactSectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); 
      
      if (hash === 'contact' && contactSectionRef.current) {
        setTimeout(() => {
          contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden scroll-smooth">
      <Navigation />
      <div id="hero">
        <AnimatedSection>
          <HeroSection />
        </AnimatedSection>
      </div>
      <AnimatedSection>
        <CircularJourneyCarousel />
      </AnimatedSection>

      <AnimatedSection>
        <TeamSection />
      </AnimatedSection>

      <AnimatedSection>
        <IncubatorPrograms />
      </AnimatedSection>
      <div id="contact" ref={contactSectionRef}>
        <AnimatedSection>
          <ContactSection />
        </AnimatedSection>
      </div>

      <Footer />
    </div>
  );
};

export default Index;

