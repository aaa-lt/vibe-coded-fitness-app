import React from 'react';
import { Trainer } from '../types';

const trainers: Trainer[] = [
  {
    id: 1,
    name: 'Алексей Смирнов',
    specialty: 'Бодибилдинг & Силовые',
    imageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Мария Иванова',
    specialty: 'Кроссфит & Функционал',
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Дмитрий Волков',
    specialty: 'Йога & Реабилитация',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Елена Соколова',
    specialty: 'Кардио & Пилатес',
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const Trainers: React.FC = () => {
  return (
    <section id="trainers" className="py-24 bg-brand-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
             <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wide mb-2">
              Наши <span className="text-brand-lime">Тренеры</span>
            </h2>
            <p className="text-gray-400">Профессиональные тренеры для персональных тренировок.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer) => (
            <div key={trainer.id} className="group relative overflow-hidden rounded-xl">
              <div className="aspect-[3/4] w-full">
                <img 
                  src={trainer.imageUrl} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-100"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
                <p className="text-brand-lime text-sm font-medium">{trainer.specialty}</p>
              </div>
              <div className="absolute top-4 right-4 bg-brand-lime text-brand-black font-bold text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                PRO
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;