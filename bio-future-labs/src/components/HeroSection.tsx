// import heroImage from '@/assets/hero-seaweed.jpg';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Logo from '@/assets/Logo.jpg';

const HeroSection = () => {
  const scrollToNext = () => {
    const timelineElement = document.getElementById('timeline');
    if (timelineElement) {
      timelineElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video - Place your video file in the public/ folder (e.g., public/background.mp4) and update the src below if needed */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/background.mp4"
      />

      {/* Floating particles animation */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary-light/40 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/15 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-primary-light/30 rounded-full animate-bounce delay-3000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced BioLabMate Title with Better Visibility */}
          <div className="relative mb-8">
            <h1 className="relative text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="block text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] drop-shadow-[0_0_40px_rgba(0,0,0,0.6)] [text-shadow:_0_0_30px_rgba(0,0,0,0.9),_0_0_60px_rgba(0,0,0,0.7)] animate-pulse">
                BioLabMate
              </span>
            </h1>
          </div>
          
          <p className="text-2xl sm:text-3xl lg:text-4xl text-white mb-10 font-light leading-relaxed drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] [text-shadow:_0_0_20px_rgba(0,0,0,0.9)]">
            Pioneering the Future of Sustainable Materials
          </p>
          <p className="text-xl sm:text-2xl text-white mb-16 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] [text-shadow:_0_0_15px_rgba(0,0,0,0.9)]">
            Developing biodegradable plastic and innovative lab materials from seaweed, 
            creating a cleaner tomorrow for our planet.
          </p>

          {/* Removed Meet Our Team, Get In Touch, and scroll down button */}
        </div>
      </div>

      {/* Scroll indicator removed */}
    </section>
  );
};

export default HeroSection;