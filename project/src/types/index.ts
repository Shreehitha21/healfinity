export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  avatar: string;
  healthData: HealthData;
  consultations: Consultation[];
  yogaSessions: YogaSession[];
  symptoms: Symptom[];
  preferences: UserPreferences;
}

export interface HealthData {
  steps: number;
  heartRate: number;
  sleep: number;
  water: number;
  weight: number;
}

export interface Consultation {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'video' | 'phone' | 'chat';
  status: 'confirmed' | 'pending' | 'completed';
  notes?: string;
}

export interface YogaSession {
  id: string;
  instructor: string;
  session: string;
  date: string;
  time: string;
  type: string;
  status: 'confirmed' | 'pending' | 'completed';
}

export interface Symptom {
  id: string;
  date: string;
  symptom: string;
  severity: 'Low' | 'Medium' | 'High';
  notes: string;
}

export interface UserPreferences {
  notifications: {
    appointments: boolean;
    medications: boolean;
    healthTips: boolean;
    yoga: boolean;
    diet: boolean;
  };
  privacy: {
    shareHealthData: boolean;
    publicProfile: boolean;
    dataAnalytics: boolean;
  };
}

export interface Disease {
  id: string;
  name: string;
  symptoms: string[];
  traditionalRemedies: Remedy[];
  modernTreatments: ModernTreatment[];
  severity: 'Mild' | 'Moderate' | 'Severe';
  category: string;
}

export interface Remedy {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  preparation: string[];
  benefits: string[];
  rating: number;
  reviews: number;
  prepTime: string;
  difficulty: string;
  tips: string[];
}

export interface ModernTreatment {
  id: string;
  type: 'medication' | 'procedure' | 'therapy';
  name: string;
  description: string;
  effectiveness: number;
  sideEffects: string[];
  duration: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  distance: number;
  specialties: string[];
  emergency: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}