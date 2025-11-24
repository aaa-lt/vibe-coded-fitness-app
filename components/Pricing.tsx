import React from 'react';
import { Check } from 'lucide-react';
import { PricingPlan } from '../types';

const plans: PricingPlan[] = [
  {
    name: 'Дневной Абонемент',
    price: 'от 150\u00A0BYN',
    period: '/мес',
    features: ['Посещения в будние дни до 17:00', 'Доступ ко всем зонам зала', 'Кардио и силовые тренажеры', 'На 1, 3, 6 или 12 месяцев'],
    isPopular: false
  },
  {
    name: 'Безлимитный Абонемент',
    price: 'от 200\u00A0BYN',
    period: '/мес',
    features: ['Доступ ко всем зонам зала', 'В любое время работы зала', 'Кардио и силовая зоны', 'На 1, 3, 6 или 12 месяцев'],
    isPopular: true
  },
  {
    name: 'Разовые Посещения',
    price: 'от 8\u00A0BYN',
    period: '/раз',
    features: ['Разовое посещение', 'Пакеты из 4 или 8 посещений', 'Гибкий график', 'Идеально для начала'],
    isPopular: false
  }
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wide mb-4">
            Абонементы и <span className="text-brand-lime">Цены</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Выберите удобный для вас вариант: безлимитный абонемент, дневной абонемент или разовые посещения. Также доступны льготные абонементы для студентов и семейные абонементы для пар.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 ${
                plan.isPopular 
                  ? 'bg-white/5 border-brand-lime shadow-[0_0_20px_rgba(163,230,53,0.15)] scale-105 z-10' 
                  : 'bg-brand-grey border-white/5 hover:border-white/20'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-lime text-brand-black font-bold text-sm px-4 py-1 rounded-full">
                  ХИТ ПРОДАЖ
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-black text-brand-lime">{plan.price}</span>
                <span className="text-gray-400 ml-2">{plan.period}</span>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                    <Check size={18} className="text-brand-lime shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded font-bold transition-colors ${
                plan.isPopular 
                  ? 'bg-brand-lime text-brand-black hover:bg-brand-limeHover' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}>
                Выбрать абонемент
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;