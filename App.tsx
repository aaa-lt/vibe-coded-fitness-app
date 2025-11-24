import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Trainers from './components/Trainers';
import AiCoach from './components/AiCoach';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import { authService } from './services/authService';
import { User } from './types';

const App: React.FC = () => {
  const [showAiModal, setShowAiModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentView('dashboard');
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-lime selection:text-brand-black overflow-x-hidden">
      <Navbar 
        onOpenAi={() => setShowAiModal(true)} 
        user={user}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenDashboard={() => {
          setCurrentView('dashboard');
          window.scrollTo(0, 0);
        }}
        onGoHome={() => {
          setCurrentView('home');
          window.scrollTo(0, 0);
        }}
      />
      
      <main>
        {currentView === 'home' ? (
          <>
            <Hero onOpenAi={() => setShowAiModal(true)} />
            <Features />
            <Trainers />
            <Pricing />
          </>
        ) : (
          user && (
            <Dashboard 
              user={user} 
              onLogout={handleLogout} 
              onUserUpdate={handleUserUpdate}
            />
          )
        )}
      </main>

      <AiCoach isOpen={showAiModal} onClose={() => setShowAiModal(false)} />
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onLoginSuccess={handleLoginSuccess}
      />

      <Footer />
    </div>
  );
};

export default App;