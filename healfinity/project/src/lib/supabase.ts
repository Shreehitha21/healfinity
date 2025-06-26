import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone: string | null;
          age: number | null;
          avatar: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          phone?: string | null;
          age?: number | null;
          avatar?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          phone?: string | null;
          age?: number | null;
          avatar?: string | null;
          updated_at?: string;
        };
      };
      health_data: {
        Row: {
          id: string;
          user_id: string;
          steps: number;
          heart_rate: number;
          sleep_hours: number;
          water_glasses: number;
          weight: number;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          steps?: number;
          heart_rate?: number;
          sleep_hours?: number;
          water_glasses?: number;
          weight?: number;
          date?: string;
          created_at?: string;
        };
        Update: {
          steps?: number;
          heart_rate?: number;
          sleep_hours?: number;
          water_glasses?: number;
          weight?: number;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          item_type: 'remedy' | 'recipe' | 'yoga_session';
          item_id: string;
          item_data: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          item_type: 'remedy' | 'recipe' | 'yoga_session';
          item_id: string;
          item_data: any;
          created_at?: string;
        };
        Update: {
          item_data?: any;
        };
      };
      consultations: {
        Row: {
          id: string;
          user_id: string;
          doctor_name: string;
          date: string;
          time: string;
          type: 'video' | 'phone' | 'chat';
          status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          doctor_name: string;
          date: string;
          time: string;
          type: 'video' | 'phone' | 'chat';
          status?: 'confirmed' | 'pending' | 'completed' | 'cancelled';
          created_at?: string;
        };
        Update: {
          status?: 'confirmed' | 'pending' | 'completed' | 'cancelled';
        };
      };
      yoga_sessions: {
        Row: {
          id: string;
          user_id: string;
          instructor: string;
          session_name: string;
          date: string;
          time: string;
          type: string;
          status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          instructor: string;
          session_name: string;
          date: string;
          time: string;
          type: string;
          status?: 'confirmed' | 'pending' | 'completed' | 'cancelled';
          created_at?: string;
        };
        Update: {
          status?: 'confirmed' | 'pending' | 'completed' | 'cancelled';
        };
      };
      symptoms: {
        Row: {
          id: string;
          user_id: string;
          symptom: string;
          severity: 'Low' | 'Medium' | 'High';
          notes: string | null;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          symptom: string;
          severity: 'Low' | 'Medium' | 'High';
          notes?: string | null;
          date?: string;
          created_at?: string;
        };
        Update: {
          symptom?: string;
          severity?: 'Low' | 'Medium' | 'High';
          notes?: string | null;
        };
      };
    };
  };
}