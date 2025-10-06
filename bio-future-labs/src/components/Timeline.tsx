import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Beaker, Globe } from 'lucide-react';
import JourneyBackground from '@/assets/Journey_background.jpg';

const Timeline = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const timelineItems = [
    {
      year: '2025',
      title: 'Global Expansion & Environmental Vision',
      description: 'With a mission to revolutionize sustainability, we are expanding our reach to international markets. Our biodegradable lab materials are now being introduced in eco-conscious labs across the globe.',
      icon: <Globe className="w-8 h-8" />,
      side: 'left'
    },
    {
      year: '2024',
      title: 'First Breakthrough in Bioplastic Innovation',
      description: 'After countless hours of research and experimentation, we successfully developed our first working prototype of biodegradable plastic made entirely from seaweed.',
      icon: <Leaf className="w-8 h-8" />,
      side: 'right'
    },
    {
      year: '2023',
      title: 'Laying the Foundation Through Research & Partnerships',
      description: 'Our journey began with an ambitious R&D initiative focused on unlocking the potential of marine algae. Collaborating closely with marine biology institutes and sustainability researchers, we explored novel formulations, studied biodegradation cycles.',
      icon: <Beaker className="w-8 h-8" />,
      side: 'left'
    }
    
  
  ];

  return (
    <section id="timeline" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
      {/* Background image */}
      <img
        src={JourneyBackground}
        alt="Journey background"
        className="absolute left-1/2 top-1/2 z-0 pointer-events-none"
        style={{
          transform: 'translate(-50%, -50%)',
          maxWidth: '700px',
          width: '100%',
          height: 'auto',
          opacity: 0.70,
          objectFit: 'contain',
        }}
      />
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-8 relative">
            Our Journey
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full animate-pulse"></div>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From innovative research to global impact, discover how we're transforming the future of sustainable materials.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-full bg-gradient-to-b from-primary to-secondary rounded-full shadow-soft"></div>

          {/* Timeline items */}
          <div className="space-y-20">
            {timelineItems.map((item, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div
                  key={index}
                  className={`relative flex items-center group transition-all duration-500 ease-in-out ${
                    item.side === 'left' ? 'justify-start' : 'justify-end'
                  }`}
                  style={{ minHeight: '120px' }}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full border-4 border-background shadow-lg z-20 transition-all duration-300`}
                  ></div>

                  {/* Arrow/triangle from card to timeline */}
                  <div
                    className={`absolute top-1/2 z-20 ${item.side === 'left' ? 'left-[calc(50%-20px)]' : 'right-[calc(50%-20px)]'} -translate-y-1/2`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <polygon
                        points={item.side === 'left' ? '24,12 0,0 0,24' : '0,12 24,0 24,24'}
                        fill="url(#arrow-gradient)"
                      />
                      <defs>
                        <linearGradient id="arrow-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#4f46e5" />
                          <stop offset="1" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Content card */}
                  <div
                    className={`w-full max-w-lg transition-all duration-500 ease-bounce border-2 border-transparent cursor-pointer ${
                      isExpanded
                        ? 'scale-105 shadow-2xl border-primary/40 -translate-y-2 bg-white/90' 
                        : 'shadow-lg hover:shadow-2xl bg-gradient-to-br from-background to-secondary/10'
                    } ${item.side === 'left' ? 'mr-16' : 'ml-16'} rounded-xl relative z-10`}
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    style={{
                      boxShadow: isExpanded
                        ? '0 8px 32px 0 rgba(79,70,229,0.25), 0 1.5px 6px 0 rgba(6,182,212,0.10)'
                        : undefined,
                      transition: 'box-shadow 0.3s, transform 0.3s',
                    }}
                  >
                    <CardContent className="p-8 flex flex-col gap-2">
                      <div className="flex items-center gap-6 mb-2">
                        <div className={`p-4 bg-primary/10 rounded-full text-primary transition-all duration-300 ${
                          isExpanded ? 'scale-110 bg-primary text-primary-foreground' : ''
                        }`}>
                          {item.icon}
                        </div>
                        <div className={`text-4xl font-bold text-primary transition-all duration-300 ${
                          isExpanded ? 'scale-110' : ''
                        }`}>
                          {item.year}
                        </div>
                      </div>
                      <h3 className={`text-2xl font-semibold text-foreground mb-2 transition-all duration-300 ${
                        isExpanded ? 'text-primary' : ''
                      }`}>
                        {item.title}
                      </h3>
                      {/* Expandable content */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          isExpanded ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
                        }`}
                        style={{
                          transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s',
                        }}
                      >
                        <p className="text-muted-foreground leading-relaxed text-lg">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;