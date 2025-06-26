import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useDatabase } from '../hooks/useDatabase';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  age?: number;
  avatar: string;
  healthData?: any;
  consultations?: any[];
  yogaSessions?: any[];
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await loadUserData(session.user.id);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await loadUserData(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserData = async (userId: string) => {
    try {
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      if (userData) {
        // Load health data
        const { data: healthData } = await supabase
          .from('health_data')
          .select('*')
          .eq('user_id', userId)
          .eq('date', new Date().toISOString().split('T')[0])
          .single();

        // Load consultations
        const { data: consultations } = await supabase
          .from('consultations')
          .select('*')
          .eq('user_id', userId)
          .order('date', { ascending: true });

        // Load yoga sessions
        const { data: yogaSessions } = await supabase
          .from('yoga_sessions')
          .select('*')
          .eq('user_id', userId)
          .order('date', { ascending: true });

        setCurrentUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          age: userData.age,
          avatar: userData.avatar || userData.name.split(' ').map((n: string) => n.charAt(0)).join('').toUpperCase(),
          healthData: healthData ? {
            steps: healthData.steps,
            heartRate: healthData.heart_rate,
            sleep: healthData.sleep_hours,
            water: healthData.water_glasses,
            weight: healthData.weight
          } : { steps: 0, heartRate: 0, sleep: 0, water: 0, weight: 0 },
          consultations: consultations || [],
          yogaSessions: yogaSessions || []
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        await loadUserData(data.user.id);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: Partial<User>, password: string): Promise<boolean> => {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email!,
        password
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: userData.email!,
            name: userData.name!,
            phone: userData.phone,
            age: userData.age,
            avatar: userData.name?.split(' ').map(n => n.charAt(0)).join('').toUpperCase()
          });

        if (profileError) throw profileError;

        await loadUserData(authData.user.id);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!currentUser) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({
          name: userData.name,
          phone: userData.phone,
          age: userData.age,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentUser.id);

      if (error) throw error;

      setCurrentUser({ ...currentUser, ...userData });
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  const addConsultation = async (consultation: any) => {
    if (!currentUser) return;

    try {
      const { error } = await supabase
        .from('consultations')
        .insert({
          user_id: currentUser.id,
          doctor_name: consultation.doctor,
          date: consultation.date,
          time: consultation.time,
          type: consultation.type
        });

      if (error) throw error;

      // Reload user data to get updated consultations
      await loadUserData(currentUser.id);
    } catch (error) {
      console.error('Add consultation error:', error);
    }
  };

  const addYogaSession = async (session: any) => {
    if (!currentUser) return;

    try {
      const { error } = await supabase
        .from('yoga_sessions')
        .insert({
          user_id: currentUser.id,
          instructor: session.instructor,
          session_name: session.session,
          date: session.date,
          time: session.time,
          type: session.type
        });

      if (error) throw error;

      // Reload user data to get updated sessions
      await loadUserData(currentUser.id);
    } catch (error) {
      console.error('Add yoga session error:', error);
    }
  };

  const updateHealthData = async (healthData: any) => {
    if (!currentUser) return;

    try {
      const { error } = await supabase
        .from('health_data')
        .upsert({
          user_id: currentUser.id,
          steps: healthData.steps,
          heart_rate: healthData.heartRate,
          sleep_hours: healthData.sleep,
          water_glasses: healthData.water,
          weight: healthData.weight,
          date: new Date().toISOString().split('T')[0]
        });

      if (error) throw error;

      // Update current user state
      setCurrentUser({
        ...currentUser,
        healthData: {
          steps: healthData.steps,
          heartRate: healthData.heartRate,
          sleep: healthData.sleep,
          water: healthData.water,
          weight: healthData.weight
        }
      });
    } catch (error) {
      console.error('Update health data error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
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