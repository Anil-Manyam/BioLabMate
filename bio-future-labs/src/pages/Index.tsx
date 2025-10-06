import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import CircularJourneyTimeline from '@/components/CircularJourneyTimeline';
import TeamSection from '@/components/TeamSection';
import IncubatorPrograms from '@/components/IncubatorPrograms';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <CircularJourneyTimeline />
      
      {/* Sustainability Calculator Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Calculate Your Lab's Environmental Impact
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover how much plastic waste your lab generates and learn about opportunities to reduce your environmental footprint with our comprehensive sustainability calculator.
          </p>
          <Button 
            onClick={() => navigate('/sustainability-calculator')}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Sustainability Calculator
          </Button>
        </div>
      </section>
      
      <TeamSection />
      <IncubatorPrograms />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
