import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addConsultation: (consultation: any) => void;
  addYogaSession: (session: any) => void;
  updateHealthData: (healthData: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load users from localStorage
    const savedUsers = localStorage.getItem('healthapp_users');
    const savedCurrentUserId = localStorage.getItem('healthapp_current_user_id');
    
    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);
      setUsers(parsedUsers);
      
      // Find and set current user by ID
      if (savedCurrentUserId) {
        const user = parsedUsers.find((u: User) => u.id === savedCurrentUserId);
        if (user) {
          setCurrentUser(user);
        }
      }
    } else {
      // Initialize with demo users if no users exist
      const demoUsers: User[] = [
        {
          id: 'demo1',
          name: 'John Doe',
          email: 'john@demo.com',
          phone: '+1 (555) 123-4567',
          age: 32,
          avatar: 'JD',
          healthData: {
            steps: 8500,
            heartRate: 72,
            sleep: 7.5,
            water: 6,
            weight: 70
          },
          consultations: [],
          yogaSessions: [],
          symptoms: [],
          preferences: {
            notifications: {
              appointments: true,
              medications: true,
              healthTips: true,
              yoga: false,
              diet: true,
            },
            privacy: {
              shareHealthData: false,
              publicProfile: false,
              dataAnalytics: true,
            }
          }
        },
        {
          id: 'demo2',
          name: 'Sarah Wilson',
          email: 'sarah@demo.com',
          phone: '+1 (555) 234-5678',
          age: 28,
          avatar: 'SW',
          healthData: {
            steps: 9200,
            heartRate: 68,
            sleep: 8.0,
            water: 7,
            weight: 65
          },
          consultations: [],
          yogaSessions: [],
          symptoms: [],
          preferences: {
            notifications: {
              appointments: true,
              medications: true,
              healthTips: true,
              yoga: true,
              diet: true,
            },
            privacy: {
              shareHealthData: false,
              publicProfile: false,
              dataAnalytics: true,
            }
          }
        }
      ];
      setUsers(demoUsers);
      localStorage.setItem('healthapp_users', JSON.stringify(demoUsers));
    }
  }, []);

  const saveUsers = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    localStorage.setItem('healthapp_users', JSON.stringify(updatedUsers));
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check if user exists
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('healthapp_current_user_id', user.id);
      return true;
    }
    return false;
  };

  const register = async (userData: Partial<User>, password: string): Promise<boolean> => {
    // Check if email already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return false; // Email already exists
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      age: userData.age || 0,
      avatar: userData.name?.split(' ').map(n => n.charAt(0)).join('').toUpperCase() || 'U',
      healthData: {
        steps: 0, // Start with zero for new users
        heartRate: 0,
        sleep: 0,
        water: 0,
        weight: 0
      },
      consultations: [],
      yogaSessions: [],
      symptoms: [],
      preferences: {
        notifications: {
          appointments: true,
          medications: true,
          healthTips: true,
          yoga: false,
          diet: true,
        },
        privacy: {
          shareHealthData: false,
          publicProfile: false,
          dataAnalytics: true,
        }
      }
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    setCurrentUser(newUser);
    localStorage.setItem('healthapp_current_user_id', newUser.id);
    
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('healthapp_current_user_id');
  };

  const updateUser = (userData: Partial<User>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      setCurrentUser(updatedUser);
      
      const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
      saveUsers(updatedUsers);
    }
  };

  const addConsultation = (consultation: any) => {
    if (currentUser) {
      const newConsultation = {
        ...consultation,
        id: Date.now().toString(),
        status: 'confirmed'
      };
      
      const updatedUser = {
        ...currentUser,
        consultations: [...currentUser.consultations, newConsultation]
      };
      
      setCurrentUser(updatedUser);
      const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
      saveUsers(updatedUsers);
    }
  };

  const addYogaSession = (session: any) => {
    if (currentUser) {
      const newSession = {
        ...session,
        id: Date.now().toString(),
        status: 'confirmed'
      };
      
      const updatedUser = {
        ...currentUser,
        yogaSessions: [...(currentUser.yogaSessions || []), newSession]
      };
      
      setCurrentUser(updatedUser);
      const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
      saveUsers(updatedUsers);
    }
  };

  const updateHealthData = (healthData: any) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        healthData: { ...currentUser.healthData, ...healthData }
      };
      
      setCurrentUser(updatedUser);
      const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
      saveUsers(updatedUsers);
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      login,
      register,
      logout,
      updateUser,
      addConsultation,
      addYogaSession,
      updateHealthData
    }}>
      {children}
    </AuthContext.Provider>
  );
};