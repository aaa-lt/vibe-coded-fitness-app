import React from 'react';
import { Dumbbell, Users, Clock, Zap, HeartPulse, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Dumbbell size={32} />,
    title: 'Премиум Оборудование',
    description: 'Тренажеры TechnoGym и Hammer Strength последнего поколения для максимальной эффективности.'
  },
  {
    icon: <Users size={32} />,
    title: 'Групповые Программы',
    description: 'Более 20 направлений: от йоги и пилатеса до кроссфита и бокса.'
  },
  {
    icon: <Zap size={32} />,
    title: 'AI Технологии',
    description: 'Персональные программы тренировок, составленные искусственным интеллектом на основе ваших данных.'
  },
  {
    icon: <Clock size={32} />,
    title: '24/7 Доступ',
    description: 'Тренируйтесь когда удобно вам. Клуб открыт круглосуточно без выходных.'
  },
  {
    icon: <HeartPulse size={32} />,
    title: 'Фитнес-бар и SPA',
    description: 'Восстановите силы после тренировки в нашей сауне или выпейте протеиновый коктейль.'
  },
  {
    icon: <Trophy size={32} />,
    title: 'Соревнования',
    description: 'Регулярные внутриклубные соревнования и челленджи для поддержания мотивации.'
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-brand-dark relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wide mb-4">
            Почему <span className="text-brand-lime">FitA+</span>?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Мы создали пространство, где каждая деталь работает на ваш результат.
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