import React, { useState } from 'react';
import { X, Loader2, Sparkles, Copy, CheckCircle } from 'lucide-react';
import { generateWorkoutPlan } from '../services/geminiService';
import { TrainingGoal, FitnessLevel } from '../types';
import ReactMarkdown from 'react-markdown';

interface AiCoachProps {
  isOpen: boolean;
  onClose: () => void;
}

const AiCoach: React.FC<AiCoachProps> = ({ isOpen, onClose }) => {
  const [goal, setGoal] = useState<TrainingGoal>(TrainingGoal.WeightLoss);
  const [level, setLevel] = useState<FitnessLevel>(FitnessLevel.Beginner);
  const [duration, setDuration] = useState<number>(45);
  const [equipment, setEquipment] = useState<string>('Тренажерный зал');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setPlan(null);
    const result = await generateWorkoutPlan(goal, level, duration, equipment);
    setPlan(result);
    setLoading(false);
  };

  const handleCopy = () => {
    if (plan) {
      navigator.clipboard.writeText(plan);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-brand-grey w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-brand-lime/30 overflow-hidden relative flex flex-col md:flex-row">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
        >
          <X size={24} />
        </button>

        {/* Left Side - Controls */}
        <div className="w-full md:w-1/3 p-6 bg-brand-dark border-r border-white/5 overflow-y-auto">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-brand-lime" />
            <h2 className="text-2xl font-bold text-white">AI Тренер</h2>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Цель</label>
              <select 
                value={goal}
                onChange={(e) => setGoal(e.target.value as TrainingGoal)}
                className="w-full bg-brand-black border border-white/10 rounded p-3 text-white focus:border-brand-lime outline-none"
              >
                {Object.values(TrainingGoal).map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Уровень</label>
              <select 
                value={level}
                onChange={(e) => setLevel(e.target.value as FitnessLevel)}
                className="w-full bg-brand-black border border-white/10 rounded p-3 text-white focus:border-brand-lime outline-none"
              >
                {Object.values(FitnessLevel).map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Время (минут)</label>
              <input 
                type="number" 
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full bg-brand-black border border-white/10 rounded p-3 text-white focus:border-brand-lime outline-none"
                min="15"
                max="180"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Оборудование</label>
              <input 
                type="text" 
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                className="w-full bg-brand-black border border-white/10 rounded p-3 text-white focus:border-brand-lime outline-none"
                placeholder="Например: Гантели, Турник"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-brand-lime hover:bg-brand-limeHover text-brand-black font-bold py-3 rounded transition-colors flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Составить план'}
            </button>
          </div>
        </div>

        {/* Right Side - Output */}
        <div className="w-full md:w-2/3 p-6 bg-brand-grey overflow-y-auto min-h-[300px] flex flex-col">
          {plan ? (
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                <h3 className="text-xl font-bold text-brand-lime">Ваша программа</h3>
                <button 
                  onClick={handleCopy}
                  className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
                >
                  {copied ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
                  {copied ? 'Скопировано' : 'Копировать'}
                </button>
              </div>
              <div className="prose prose-invert prose-lime max-w-none text-sm md:text-base">
                <ReactMarkdown>{plan}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
              <div className="w-20 h-20 bg-brand-black rounded-full flex items-center justify-center mb-4">
                <Sparkles size={40} className="text-brand-lime opacity-50" />
              </div>
              <p>Выберите параметры слева и нажмите "Составить план", <br/>чтобы получить персональную программу от AI.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiCoach;