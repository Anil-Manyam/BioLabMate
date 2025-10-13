import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Mail } from 'lucide-react';
import Sanjay from '@/assets/Sanjay.jpg';
import Sarika from '@/assets/Sarika.jpg';
import Gordon from '@/assets/Gordon.jpg';
import Vaibhav from '@/assets/Vaibhav.jpg';
import Anil from '@/assets/Anil.jpg';
import TeamBackground from '@/assets/Team_background.jpg';
import { useEffect, useState, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Dr.Sarika Kumari',
      role: 'CEO/Co-Founder',
      bio: 'Co-founder of BioLabMate with expertise in biotechnology, biomaterials, and advanced R&D, holding a Ph.D. in Biochemistry.',
      image: Sarika,
      linkedin: 'https://www.linkedin.com/in/sarikakum/',
      email: ' biolabmatecomposite@gmail.com'
    },
    {
      name: 'Sanjay Dubey',
      role: ' CTO/Co-Founder',
      bio: 'Chemical Engineer at BioLabMate specializing in product development, process optimization, and business growth initiatives.',
      image: Sanjay,
      linkedin: 'https://www.linkedin.com/in/snjaykdubey/',
      email: ' biolabmatecomposite@gmail.com'
    },
    {
      name: 'Dr. Gordon Slade',
      role: 'Aquaculture Advisor',
      bio: 'Advisor at BioLabMate with extensive leadership in fisheries, aquaculture, and ocean industries, guiding strategy, partnerships, and sustainability.',
      image: Gordon,
      linkedin: 'https://www.linkedin.com/in/gordon-slade-cm-onl-lld-frcgs-b9478854/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=ca',
      email: ' biolabmatecomposite@gmail.com'
    },
    {
      name: 'Anil Manyam',
      role: 'Software Developer (Intern)',
      bio: 'Software Developer at BioLabMate, contributing to the design and development of dynamic web applications and digital platforms that enhance user experience and performance',
      image: Anil,
      linkedin: 'https://www.linkedin.com/in/anil-manyam-698662248/',
      email: ' anilmanyam.630@gmail.com'
    },
    {
      name: 'Vaibhav Thummar',
      role: 'Software Engineer(Intern)',
      bio: 'Software Developer at BioLabMate, creating impactful websites and software solutions while managing web content and digital development.',
      image: Vaibhav,
      linkedin: 'https://www.linkedin.com/in/vaibhav-thummar-951498249/',
      email: ' vaibhav.it178@gmail.com'
    }
  ];

  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-sliding functionality
  useEffect(() => {
    if (!carouselApi) return;
    
    setCurrentIndex(carouselApi.selectedScrollSnap());
    const onSelect = () => setCurrentIndex(carouselApi.selectedScrollSnap());
    carouselApi.on('select', onSelect);

    // Auto-slide every 4 seconds when not hovered (only if not at the end)
    const startAutoSlide = () => {
      if (!isHovered) {
        autoSlideRef.current = setInterval(() => {
          const currentIndex = carouselApi.selectedScrollSnap();
          const totalSlides = carouselApi.scrollSnapList().length;
          
          if (currentIndex < totalSlides - 1) {
            carouselApi.scrollNext();
          } else {
            // Reset to first slide when reaching the end
            carouselApi.scrollTo(0);
          }
        }, 4000);
      }
    };

    startAutoSlide();

    return () => {
      carouselApi.off('select', onSelect);
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [carouselApi, isHovered]);

  // Pause auto-slide on hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
      {/* Background image */}
      <div className="absolute left-0 top-0 bottom-0 z-0 pointer-events-none">
        <img
          src={TeamBackground}
          alt="Team background"
          className="h-4/5 w-auto object-contain opacity-80"
          style={{ objectPosition: 'left', maxWidth: '60%' }}
        />
      </div>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 relative">
            Meet Our Team
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full animate-pulse"></div>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our passionate team of scientists and innovators dedicated to creating a sustainable future.
          </p>
        </div>

        <Carousel 
          className="max-w-6xl mx-auto px-2" 
          opts={{ 
            align: 'center', 
            loop: false,
            duration: 20,
            skipSnaps: false
          }} 
          setApi={setCarouselApi}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CarouselContent>
            {teamMembers.map((member, index) => {
              const isActive = index === currentIndex;
              return (
                <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/2 lg:basis-1/2 xl:basis-1/2">
                  <Card
                    className={`group transition-all duration-700 ease-out shadow-soft bg-gradient-card relative overflow-hidden border-2 border-transparent mx-2 cursor-pointer ${
                      isActive ? 'scale-100 shadow-xl' : 'scale-[0.95] hover:scale-[0.98]'
                    }`}
                    onClick={() => carouselApi?.scrollTo(index)}
                  >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardContent className={`p-8 relative z-10`}>
                      <div className="text-center">
                        <div className={`relative mx-auto mb-6 w-36 h-36 rounded-full overflow-hidden ring-4 transition-all duration-300 ${
                          isActive ? 'ring-primary/40' : 'ring-primary/15'
                        }`}>
                          <img
                            src={member.image}
                            alt={member.name}
                            className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? 'scale-100' : 'scale-[1.03]'}`}
                          />
                          <div className={`absolute inset-0 bg-gradient-primary transition-opacity duration-300 ${isActive ? 'opacity-10' : 'opacity-0'}`}></div>
                        </div>
                        <h3 className={`text-3xl font-bold mb-3 transition-colors duration-300 ${isActive ? 'text-foreground group-hover:text-primary' : 'text-foreground/80'}`}>
                          {member.name}
                        </h3>
                        <p className={`font-semibold mb-6 text-lg transition-transform duration-300 ${isActive ? 'text-primary group-hover:scale-105' : 'text-primary/70'}`}>
                          {member.role}
                        </p>
                        <p className={`mb-6 leading-relaxed text-base transition-colors duration-300 ${isActive ? 'text-muted-foreground group-hover:text-foreground' : 'text-muted-foreground/80'}`}>
                          {member.bio}
                        </p>
                        <div className="flex justify-center space-x-6">
                          <a
                            href={member.linkedin}
                            className={`p-3 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${isActive ? 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground' : 'bg-primary/5 text-primary/70 hover:bg-primary/10 hover:text-primary'}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Linkedin size={24} />
                          </a>
                          <a
                            href={`mailto:${member.email}`}
                            className={`p-3 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${isActive ? 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground' : 'bg-primary/5 text-primary/70 hover:bg-primary/10 hover:text-primary'}`}
                          >
                            <Mail size={24} />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex hover:scale-110 transition-transform duration-300" />
          <CarouselNext className="hidden sm:flex hover:scale-110 transition-transform duration-300" />
          
          {/* Custom navigation dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => carouselApi?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-gray-300 hover:bg-primary/50 hover:scale-110'
                }`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TeamSection;