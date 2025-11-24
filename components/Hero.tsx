import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity } from 'lucide-react';

interface HeroProps {
  onOpenAi: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenAi }) => {
  return (
    <section id="about" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Gym Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 z-20 relative pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-brand-lime text-brand-black px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
                Современный Тренажерный Зал
              </span>
              <span className="text-gray-300 text-sm uppercase tracking-widest">Барановичи</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              ДОСТУПНОЕ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-white">
                КОМФОРТНОЕ ПРОСТРАНСТВО
              </span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl border-l-4 border-brand-lime pl-6">
              Современный, доступный и технически оснащенный тренажерный зал для жителей Барановичей. 
              Каждый клиент, независимо от уровня подготовки, сможет комфортно и эффективно 
              работать над своим телом и здоровьем в дружелюбной и поддерживающей обстановке.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#pricing"
                className="group flex items-center justify-center gap-3 bg-white text-brand-black px-8 py-4 rounded font-bold transition-all hover:bg-gray-200"
              >
                Выбрать абонемент
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={onOpenAi}
                className="flex items-center justify-center gap-3 border border-brand-lime text-brand-lime px-8 py-4 rounded font-bold hover:bg-brand-lime hover:text-brand-black transition-all"
              >
                <Activity />
                Персональные Тренировки
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;