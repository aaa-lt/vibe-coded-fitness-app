import React from 'react';
import { Hexagon, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <Hexagon className="w-full h-full text-brand-lime stroke-[2.5] fill-transparent" />
                    <span className="absolute text-white font-black text-sm -mt-0.5 ml-0.5 italic">A</span>
                </div>
                <span className="text-2xl font-black tracking-tighter text-white">
                    Fit<span className="text-brand-lime">A+</span>
                </span>
            </a>
            <p className="text-gray-400 max-w-sm leading-relaxed mb-6">
              Современный, доступный и комфортный тренажерный зал для жителей Барановичей, 
              ведущих активный образ жизни и заботящихся о своем здоровье.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-brand-grey flex items-center justify-center text-white hover:bg-brand-lime hover:text-brand-black transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-grey flex items-center justify-center text-white hover:bg-brand-lime hover:text-brand-black transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-grey flex items-center justify-center text-white hover:bg-brand-lime hover:text-brand-black transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase">Навигация</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-brand-lime transition-colors">О клубе</a></li>
              <li><a href="#features" className="hover:text-brand-lime transition-colors">Услуги</a></li>
              <li><a href="#trainers" className="hover:text-brand-lime transition-colors">Команда</a></li>
              <li><a href="#pricing" className="hover:text-brand-lime transition-colors">Абонементы</a></li>
              <li><a href="#" className="hover:text-brand-lime transition-colors">Вакансии</a></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase">Контакты</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-brand-lime shrink-0" />
                <span>Барановичи, <br />пер. Студенческий, 1</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-brand-lime shrink-0" />
                <span>+375 (29) 333-33-33</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-brand-lime shrink-0" />
                <span>hello@fita-plus.by</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2025 Тренажерный зал. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white">Договор оферты</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;