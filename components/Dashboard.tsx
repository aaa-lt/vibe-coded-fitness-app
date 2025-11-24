import React, { useState } from 'react';
import { User } from '../types';
import { Calendar, Dumbbell, TrendingUp, Clock, CreditCard, LogOut, User as UserIcon, Settings, X, Camera, RefreshCw, Loader2, Save } from 'lucide-react';
import { authService } from '../services/authService';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onUserUpdate: (user: User) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onUserUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Edit State
  const [editName, setEditName] = useState(user.name);
  const [editAvatar, setEditAvatar] = useState(user.avatar || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleLogout = () => {
    authService.logout();
    onLogout();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const openEditModal = () => {
    setEditName(user.name);
    setEditAvatar(user.avatar || '');
    setIsEditModalOpen(true);
  };

  const generateRandomAvatar = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    const newAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(editName)}&background=${randomColor}&color=fff&size=256`;
    setEditAvatar(newAvatar);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
        const updatedUser = await authService.updateProfile(user.email, {
            name: editName,
            avatar: editAvatar
        });
        onUserUpdate(updatedUser);
        setIsEditModalOpen(false);
    } catch (error) {
        console.error("Failed to update profile", error);
        alert("Не удалось обновить профиль");
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black pt-24 pb-12 px-6 relative">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer" onClick={openEditModal}>
                <div className="w-16 h-16 rounded-full bg-brand-grey border-2 border-brand-lime overflow-hidden">
                {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-lime">
                    <UserIcon size={32} />
                    </div>
                )}
                </div>
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Settings size={20} className="text-white" />
                </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-black text-white">Личный Кабинет</h1>
              <div className="flex items-center gap-2">
                  <p className="text-gray-400">Добро пожаловать, <span className="text-white font-semibold">{user.name}</span></p>
                  <button onClick={openEditModal} className="text-gray-500 hover:text-brand-lime transition-colors">
                      <Settings size={16} />
                  </button>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-4 py-2 rounded border border-white/10 hover:border-white/30"
          >
            <LogOut size={18} />
            Выйти
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Workouts Left - Main Card */}
          <div className="bg-brand-grey rounded-2xl p-8 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Dumbbell size={100} />
            </div>
            <div className="relative z-10">
              <h3 className="text-gray-400 font-medium mb-2">Осталось тренировок</h3>
              <div className="text-6xl font-black text-brand-lime mb-2">
                {user.workoutsLeft}
              </div>
              <div className="text-sm text-gray-500">
                Доступно по абонементу
              </div>
            </div>
            <div className="mt-6 w-full bg-brand-black h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-lime" 
                style={{ width: `${Math.min((user.workoutsLeft / 15) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Subscription Info */}
          <div className="bg-brand-grey rounded-2xl p-8 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="text-brand-lime" size={24} />
                <h3 className="text-xl font-bold text-white">Ваш абонемент</h3>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{user.planName}</div>
              <div className={`inline-block px-2 py-0.5 rounded text-xs font-bold uppercase ${
                user.subscriptionStatus === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {user.subscriptionStatus === 'Active' ? 'Активен' : 'Истек'}
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Истекает:</span>
                <span className="text-white font-mono">{formatDate(user.subscriptionEnds)}</span>
              </div>
            </div>
          </div>

           {/* Activity Stats (Dummy Data) */}
           <div className="bg-brand-grey rounded-2xl p-8 border border-white/5">
             <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="text-brand-lime" size={24} />
                <h3 className="text-xl font-bold text-white">Активность</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Посещений за месяц</span>
                  <span className="text-white font-bold">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Ср. время тренировки</span>
                  <span className="text-white font-bold">55 мин</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Текущий стрик</span>
                  <span className="text-brand-lime font-bold">3 дня 🔥</span>
                </div>
              </div>
           </div>
        </div>

        {/* Recent Visits */}
        <div className="bg-brand-dark rounded-2xl p-8 border border-white/5">
          <h3 className="text-xl font-bold text-white mb-6">История посещений</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-brand-black rounded-lg border border-white/5 hover:border-brand-lime/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-brand-grey flex items-center justify-center text-brand-lime">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium">Силовая тренировка</div>
                    <div className="text-xs text-gray-500">Зона свободных весов</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white">Вчера</div>
                  <div className="text-xs text-gray-500">18:30 - 20:00</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
            <div className="bg-brand-grey w-full max-w-md rounded-2xl shadow-2xl border border-white/10 relative z-10 p-6 overflow-hidden">
                <button 
                    onClick={() => setIsEditModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <X size={24} />
                </button>
                
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Settings size={20} className="text-brand-lime" />
                    Настройки профиля
                </h2>

                <form onSubmit={handleSaveProfile} className="space-y-6">
                    {/* Avatar Preview & Controls */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-24 h-24 rounded-full bg-brand-black border-2 border-brand-lime overflow-hidden">
                            {editAvatar ? (
                                <img src={editAvatar} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-brand-lime">
                                    <UserIcon size={40} />
                                </div>
                            )}
                        </div>
                        <button 
                            type="button"
                            onClick={generateRandomAvatar}
                            className="text-xs flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-white transition-colors"
                        >
                            <RefreshCw size={12} />
                            Случайный аватар
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Ваше имя</label>
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="w-full bg-brand-black border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-brand-lime outline-none"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Ссылка на аватар</label>
                            <div className="relative">
                                <Camera className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                <input
                                    type="text"
                                    value={editAvatar}
                                    onChange={(e) => setEditAvatar(e.target.value)}
                                    placeholder="https://..."
                                    className="w-full bg-brand-black border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-brand-lime outline-none text-sm"
                                />
                            </div>
                            <p className="text-[10px] text-gray-500 mt-1">Вставьте прямую ссылку на изображение (jpg, png)</p>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsEditModalOpen(false)}
                            className="flex-1 py-2.5 rounded-lg font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex-1 py-2.5 rounded-lg font-bold bg-brand-lime text-brand-black hover:bg-brand-limeHover transition-colors flex justify-center items-center gap-2"
                        >
                            {isSaving ? <Loader2 size={18} className="animate-spin" /> : (
                                <>
                                    <Save size={18} />
                                    Сохранить
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;