import HeroSection from '@/components/HeroSection';
import CarrerasSection from '@/components/CarrerasSection';
import FeaturesSection from '@/components/FeaturesSection';
import NoticiasSection from '@/components/NoticiasSection';
import TestimoniosSection from '@/components/TestimoniosSection';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <CarrerasSection />
        <FeaturesSection />
        <NoticiasSection />
        <TestimoniosSection />
      </main>
      <Chatbot />
    </div>
  );
};

export default Index;
