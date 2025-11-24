import React, { useState } from 'react';
import { X, Loader2, LogIn, Mail, Lock, UserPlus, User as UserIcon } from 'lucide-react';
import { authService } from '../services/authService';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Only for registration
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let user;
      if (isLogin) {
        user = await authService.login(email, password);
      } else {
        if (!name.trim()) {
            throw new Error('Введите ваше имя');
        }
        user = await authService.register(name, email, password);
      }
      onLoginSuccess(user);
      onClose();
      // Reset fields
      setEmail('');
      setPassword('');
      setName('');
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-brand-grey w-full max-w-md rounded-2xl shadow-2xl border border-white/10 overflow-hidden relative z-10 p-8 transition-all">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-brand-black rounded-full flex items-center justify-center mb-4 border border-brand-lime/30">
            {isLogin ? (
                <LogIn size={32} className="text-brand-lime" />
            ) : (
                <UserPlus size={32} className="text-brand-lime" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? 'Вход в кабинет' : 'Регистрация'}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {isLogin ? 'С возвращением!' : 'Начните свой путь сегодня'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {!isLogin && (
            <div className="space-y-1 animate-in fade-in slide-in-from-top-4 duration-300">
                <label className="text-sm font-medium text-gray-300 ml-1">Имя</label>
                <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-brand-black border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-brand-lime focus:ring-1 focus:ring-brand-lime outline-none transition-all"
                    placeholder="Иван Иванов"
                    required={!isLogin}
                />
                </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-black border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-brand-lime focus:ring-1 focus:ring-brand-lime outline-none transition-all"
                placeholder="user@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300 ml-1">Пароль</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-black border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-brand-lime focus:ring-1 focus:ring-brand-lime outline-none transition-all"
                placeholder="••••••"
                required
                minLength={6}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded border border-red-500/20">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-lime hover:bg-brand-limeHover text-brand-black font-bold py-3 rounded-lg transition-all flex justify-center items-center gap-2 mt-6"
          >
            {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Войти' : 'Создать аккаунт')}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          <button onClick={toggleMode} className="text-brand-lime hover:underline font-bold">
            {isLogin ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;