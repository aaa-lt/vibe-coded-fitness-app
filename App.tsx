import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Trainers from './components/Trainers';
import AiCoach from './components/AiCoach';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [showAiModal, setShowAiModal] = useState(false);

  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-lime selection:text-brand-black overflow-x-hidden">
      <Navbar onOpenAi={() => setShowAiModal(true)} />
      
      <main>
        <Hero onOpenAi={() => setShowAiModal(true)} />
        <Features />
        <AiCoach isOpen={showAiModal} onClose={() => setShowAiModal(false)} />
        <Trainers />
        <Pricing />
      </main>

      <Footer />
    </div>
  );
};

export default App;