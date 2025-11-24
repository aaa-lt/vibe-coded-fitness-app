import React from 'react';
import { Dumbbell, Users, Clock, Zap, HeartPulse, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Dumbbell size={32} />,
    title: 'Кардиозона',
    description: 'Беговые дорожки, эллиптические тренажеры и велотренажеры для развития выносливости и эффективного жиросжигания.'
  },
  {
    icon: <Users size={32} />,
    title: 'Силовая Зона',
    description: 'Тренажер Смита, силовая станция, тренажеры для жима ногами, сгибания и разгибания ног, тяги верхнего и нижнего блоков, кроссовер для комплексной проработки всех групп мышц.'
  },
  {
    icon: <Zap size={32} />,
    title: 'Персональные Тренировки',
    description: 'Профессиональные тренеры помогут составить индивидуальную программу тренировок и достичь ваших целей.'
  },
  {
    icon: <Clock size={32} />,
    title: 'Гибкий График',
    description: 'Разовые посещения и пакеты из 4-х или 8-ми посещений для тех, кто предпочитает гибкий график тренировок.'
  },
  {
    icon: <HeartPulse size={32} />,
    title: 'Льготные Абонементы',
    description: 'Специальные предложения для студентов и семейные абонементы для пар по выгодным ценам.'
  },
  {
    icon: <Trophy size={32} />,
    title: 'Дополнительные Услуги',
    description: 'Аренда полотенца и шкафчика для личных вещей для максимального комфорта во время тренировок.'
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-brand-dark relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wide mb-4">
            Наши <span className="text-brand-lime">Услуги</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Современное оборудование и профессиональный подход для достижения ваших целей.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group bg-brand-grey p-8 rounded-xl border border-white/5 hover:border-brand-lime/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(163,230,53,0.2)]"
            >
              <div className="w-14 h-14 bg-brand-black rounded-lg flex items-center justify-center text-brand-lime mb-6 group-hover:bg-brand-lime group-hover:text-brand-black transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;