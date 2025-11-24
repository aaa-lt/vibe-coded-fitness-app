import { User } from '../types';

// Keys for LocalStorage
const STORAGE_KEY_SESSION = 'fita_user_session';
const STORAGE_KEY_DB = 'fita_users_db';

// Initial mock user to populate the "Database" if empty
const INITIAL_USER: User = {
  id: '1',
  name: 'Александр Петров',
  email: 'user@fita.ru',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  subscriptionStatus: 'Active',
  planName: 'Безлимит',
  workoutsLeft: 12,
  subscriptionEnds: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(), // 14 days from now
};

// Helper to simulate DB delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to get users "DB"
const getUsersDB = (): Record<string, User & { password?: string }> => {
  const db = localStorage.getItem(STORAGE_KEY_DB);
  if (!db) {
    // Initialize DB with one user
    const initialDB = {
      'user@fita.ru': { ...INITIAL_USER, password: '123123' }
    };
    localStorage.setItem(STORAGE_KEY_DB, JSON.stringify(initialDB));
    return initialDB;
  }
  return JSON.parse(db);
};

const saveUserToDB = (user: User, password: string) => {
  const db = getUsersDB();
  db[user.email] = { ...user, password };
  localStorage.setItem(STORAGE_KEY_DB, JSON.stringify(db));
};

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    await delay(800); // Simulate network request

    const db = getUsersDB();
    const user = db[email];

    if (user && user.password === password) {
      // Remove password before returning to UI
      const { password: _, ...safeUser } = user;
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(safeUser));
      return safeUser;
    }

    throw new Error('Неверный email или пароль');
  },

  register: async (name: string, email: string, password: string): Promise<User> => {
    await delay(1000); // Simulate network request

    const db = getUsersDB();
    
    if (db[email]) {
      throw new Error('Пользователь с таким email уже существует');
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      // Random avatar generator based on name
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=a3e635&color=0f0f0f`, 
      subscriptionStatus: 'None', // New users have no sub
      planName: 'Нет активного плана',
      workoutsLeft: 0,
      subscriptionEnds: new Date().toISOString(),
    };

    saveUserToDB(newUser, password);
    
    // Auto login after register
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(newUser));
    return newUser;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem(STORAGE_KEY_SESSION);
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem(STORAGE_KEY_SESSION);
    return stored ? JSON.parse(stored) : null;
  },

  refreshUserData: async (): Promise<User | null> => {
    await delay(500);
    const session = authService.getCurrentUser();
    if (!session) return null;

    const db = getUsersDB();
    const updatedUser = db[session.email];
    
    if (updatedUser) {
      const { password: _, ...safeUser } = updatedUser;
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(safeUser));
      return safeUser;
    }
    
    return null;
  },

  updateProfile: async (email: string, updates: Partial<User>): Promise<User> => {
    await delay(600);
    const db = getUsersDB();
    const currentUser = db[email];

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    // Merge updates
    const updatedUser = { ...currentUser, ...updates };
    
    // Save to DB (preserving password)
    db[email] = updatedUser;
    localStorage.setItem(STORAGE_KEY_DB, JSON.stringify(db));

    // Update current session if it matches the user being updated
    const session = authService.getCurrentUser();
    if (session && session.email === email) {
        // Ensure we don't store the password in the session
        const { password: _, ...safeUser } = updatedUser;
        localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(safeUser));
        return safeUser;
    }

    // Return safe user object
    const { password: _, ...safeUser } = updatedUser;
    return safeUser;
  }
};