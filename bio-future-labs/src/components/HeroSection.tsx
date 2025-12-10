import React from 'react';
const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/background.mp4"
      />
      <div className="absolute inset-0 bg-green-500 bg-opacity-10 z-10" />

    
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-5xl mx-auto">
   
          <h1
            className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-white/95 mb-8 animate-pulse"
            style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)',
            }}
          >
            BIOLABMATE
          </h1>
          <p
            className="text-2xl sm:text-3xl lg:text-4xl text-white/90 mb-10 font-light leading-relaxed"
            style={{
              textShadow: '0 1px 8px rgba(0, 0, 0, 0.5)',
            }}
          >
            Pioneering the Future of Sustainable Materials
          </p>
          <p
            className="text-xl sm:text-2xl text-white/90 mb-16 max-w-3xl mx-auto leading-relaxed"
            style={{
              textShadow: '0 1px 6px rgba(0, 0, 0, 0.6)',
            }}
          >
            Developing biodegradable plastic and innovative lab materials from seaweed,
            creating a cleaner tomorrow for our planet.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
