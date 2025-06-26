import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useDatabase = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Health Data Operations
  const saveHealthData = async (healthData: any) => {
    if (!currentUser) return;
    
    setLoading(true);
    setError(null);
    
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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getHealthData = async () => {
    if (!currentUser) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('health_data')
        .select('*')
        .eq('user_id', currentUser.id)
        .eq('date', new Date().toISOString().split('T')[0])
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      
      return data ? {
        steps: data.steps,
        heartRate: data.heart_rate,
        sleep: data.sleep_hours,
        water: data.water_glasses,
        weight: data.weight
      } : null;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Favorites Operations
  const addToFavorites = async (itemType: 'remedy' | 'recipe' | 'yoga_session', itemId: string, itemData: any) => {
    if (!currentUser) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('favorites')
        .insert({
          user_id: currentUser.id,
          item_type: itemType,
          item_id: itemId,
          item_data: itemData
        });
      
      if (error) throw error;
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (itemType: 'remedy' | 'recipe' | 'yoga_session', itemId: string) => {
    if (!currentUser) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', currentUser.id)
        .eq('item_type', itemType)
        .eq('item_id', itemId);
      
      if (error) throw error;
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getFavorites = async (itemType?: 'remedy' | 'recipe' | 'yoga_session') => {
    if (!currentUser) return [];
    
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('favorites')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false });
      
      if (itemType) {
        query = query.eq('item_type', itemType);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = async (itemType: 'remedy' | 'recipe' | 'yoga_session', itemId: string) => {
    if (!currentUser) return false;
    
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', currentUser.id)
        .eq('item_type', itemType)
        .eq('item_id', itemId)
        .single();
      
      return !!data;
    } catch {
      return false;
    }
  };

  // Consultation Operations
  const saveConsultation = async (consultation: any) => {
    if (!currentUser) return;
    
    setLoading(true);
    setError(null);
    
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
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getConsultations = async () => {
    if (!currentUser) return [];
    
    try {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('date', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (err: any) {
      setError(err.message);
      return [];
    }
  };

  // Yoga Session Operations
  const saveYogaSession = async (session: any) => {
    if (!currentUser) return;
    
    setLoading(true);
    setError(null);
    
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
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getYogaSessions = async () => {
    if (!currentUser) return [];
    
    try {
      const { data, error } = await supabase
        .from('yoga_sessions')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('date', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (err: any) {
      setError(err.message);
      return [];
    }
  };

  // Symptom Operations
  const saveSymptom = async (symptom: any) => {
    if (!currentUser) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('symptoms')
        .insert({
          user_id: currentUser.id,
          symptom: symptom.symptom,
          severity: symptom.severity,
          notes: symptom.notes,
          date: symptom.date || new Date().toISOString().split('T')[0]
        });
      
      if (error) throw error;
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getSymptoms = async () => {
    if (!currentUser) return [];
    
    try {
      const { data, error } = await supabase
        .from('symptoms')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (err: any) {
      setError(err.message);
      return [];
    }
  };

  return {
    loading,
    error,
    saveHealthData,
    getHealthData,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    isFavorite,
    saveConsultation,
    getConsultations,
    saveYogaSession,
    getYogaSessions,
    saveSymptom,
    getSymptoms
  };
};