import React, { useState, useEffect } from 'react';
import { Menu, X, Hexagon, Zap, LogIn, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../types';

interface NavbarProps {
  onOpenAi: () => void;
  user: User | null;
  onOpenAuth: () => void;
  onOpenDashboard: () => void;
  onGoHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenAi, user, onOpenAuth, onOpenDashboard, onGoHome }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'О нас', href: '#about' },
    { name: 'Услуги', href: '#features' },
    { name: 'Тренеры', href: '#trainers' },
    { name: 'Цены', href: '#pricing' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-brand-black/90 backdrop-blur-md py-4 shadow-lg border-b border-white/10' : 'bg-brand-black/50 backdrop-blur-sm py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <button onClick={onGoHome} className="flex items-center gap-2 group focus:outline-none">
            <div className="relative w-10 h-10 flex items-center justify-center">
                <Hexagon className="w-full h-full text-brand-lime stroke-[2.5] fill-brand-dark group-hover:fill-brand-lime/20 transition-colors" />
                <span className="absolute text-white font-black text-lg -mt-1 ml-0.5 italic">A</span>
                <span className="absolute -bottom-1 right-0 text-brand-lime font-bold text-xs">+</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">
                Fit<span className="text-brand-lime">A+</span>
            </span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                // If on dashboard, we need to go home first
                // This is a simple implementation, ideally we'd use a router
                if (window.location.hash !== link.href && onGoHome) {
                   onGoHome();
                }
              }}
              className="text-sm font-semibold text-gray-300 hover:text-brand-lime transition-colors uppercase tracking-wide"
            >
              {link.name}
            </a>
          ))}
          
          <button
            onClick={onOpenAi}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold transition-all"
          >
            <Zap size={16} className="text-brand-lime" />
            Персональные Тренировки
          </button>

          {user ? (
            <button
              onClick={onOpenDashboard}
              className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-brand-grey border border-white/10 rounded-full hover:border-brand-lime transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-brand-lime text-brand-black flex items-center justify-center overflow-hidden">
                 {user.avatar ? (
                   <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                 ) : (
                   <UserIcon size={18} />
                 )}
              </div>
              <span className="text-sm font-bold text-white group-hover:text-brand-lime">{user.workoutsLeft} Трен.</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 bg-brand-lime hover:bg-brand-limeHover text-brand-black px-5 py-2 rounded-full font-bold transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(163,230,53,0.4)]"
            >
              <LogIn size={18} />
              Войти
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-dark border-t border-white/10 overflow-hidden absolute top-full w-full left-0"
          >
            <div className="flex flex-col p-6 gap-4 shadow-2xl">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    onGoHome();
                    setMobileMenuOpen(false);
                  }}
                  className="text-lg font-medium text-white hover:text-brand-lime"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  onOpenAi();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-brand-lime font-bold py-2"
              >
                <Zap size={18} /> Персональные Тренировки
              </button>
              
              <div className="border-t border-white/10 my-2"></div>

              {user ? (
                <button
                  onClick={() => {
                    onOpenDashboard();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex justify-center items-center gap-2 bg-brand-grey text-white py-3 rounded font-bold border border-white/10"
                >
                   <UserIcon size={18} /> Личный Кабинет
                </button>
              ) : (
                <button
                  onClick={() => {
                    onOpenAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="mt-2 w-full flex justify-center items-center gap-2 bg-brand-lime text-brand-black py-3 rounded font-bold"
                >
                  <LogIn size={18} /> Войти
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;