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
  const autoSlideRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const startAutoSlide = () => {
    if (!carouselApi || modalIndex !== null) return;
    if (autoSlideRef.current) cancelAnimationFrame(autoSlideRef.current);

    const animate = () => {
      const totalSlides = carouselApi.scrollSnapList().length;
      const current = carouselApi.selectedScrollSnap();

      if (current < totalSlides - 1) {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollTo(0); 
      }

      autoSlideRef.current = requestAnimationFrame(() => {
        setTimeout(() => animate(), 4500); 
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
          opts={{ align: 'center', loop: true, duration: 20 }} 
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
