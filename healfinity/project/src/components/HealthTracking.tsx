import React, { useState } from 'react';
import { Activity, Heart, TrendingUp, Calendar, Plus, Target, Award, Zap, Save, Edit3 } from 'lucide-react';

interface HealthTrackingProps {
  healthData: any;
  onUpdateHealth: (data: any) => void;
}

const HealthTracking: React.FC<HealthTrackingProps> = ({ healthData, onUpdateHealth }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [isAddingSymptom, setIsAddingSymptom] = useState(false);
  const [newSymptom, setNewSymptom] = useState({ symptom: '', severity: 'Low', notes: '' });
  const [symptoms, setSymptoms] = useState([
    { id: 1, date: '2024-01-12', symptom: 'Mild headache', severity: 'Low', notes: 'After long work session' },
    { id: 2, date: '2024-01-10', symptom: 'Back pain', severity: 'Medium', notes: 'Improved with stretching' },
    { id: 3, date: '2024-01-08', symptom: 'Fatigue', severity: 'Low', notes: 'Better after good sleep' },
  ]);
  const [isEditingMetrics, setIsEditingMetrics] = useState(false);
  const [editableMetrics, setEditableMetrics] = useState({
    steps: healthData.steps,
    heartRate: healthData.heartRate,
    sleep: healthData.sleep,
    water: healthData.water,
    weight: healthData.weight
  });

  const healthMetrics = {
    steps: { current: editableMetrics.steps, target: 10000, trend: '+12%' },
    heartRate: { current: editableMetrics.heartRate, average: 68, trend: 'Normal' },
    sleep: { current: editableMetrics.sleep, target: 8, trend: '+0.5h' },
    water: { current: editableMetrics.water, target: 8, trend: '75%' },
    calories: { current: 1850, target: 2200, trend: '-5%' },
    weight: { current: editableMetrics.weight, change: -0.3, trend: 'Decreasing' },
  };

  const weeklyData = [
    { day: 'Mon', steps: 8200, heartRate: 70, sleep: 7.2, water: 7 },
    { day: 'Tue', steps: 9100, heartRate: 68, sleep: 8.1, water: 8 },
    { day: 'Wed', steps: 7800, heartRate: 72, sleep: 6.9, water: 6 },
    { day: 'Thu', steps: 10200, heartRate: 69, sleep: 7.8, water: 8 },
    { day: 'Fri', steps: 8900, heartRate: 71, sleep: 7.5, water: 7 },
    { day: 'Sat', steps: 12000, heartRate: 65, sleep: 8.5, water: 9 },
    { day: 'Sun', steps: editableMetrics.steps, heartRate: editableMetrics.heartRate, sleep: editableMetrics.sleep, water: editableMetrics.water },
  ];

  const achievements = [
    { title: '10K Steps', desc: 'Walked 10,000 steps in a day', icon: Target, earned: editableMetrics.steps >= 10000, date: '2 days ago', progress: Math.min((editableMetrics.steps / 10000) * 100, 100) },
    { title: 'Sleep Champion', desc: '7 days of 8+ hours sleep', icon: Award, earned: false, progress: 85 },
    { title: 'Hydration Hero', desc: 'Met water goal for 5 days', icon: Zap, earned: editableMetrics.water >= 8, date: '1 week ago', progress: (editableMetrics.water / 8) * 100 },
    { title: 'Heart Healthy', desc: 'Maintained optimal heart rate', icon: Heart, earned: editableMetrics.heartRate >= 60 && editableMetrics.heartRate <= 80, progress: 60 },
  ];

  const addSymptom = () => {
    if (newSymptom.symptom.trim()) {
      const symptom = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        ...newSymptom
      };
      setSymptoms([symptom, ...symptoms]);
      setNewSymptom({ symptom: '', severity: 'Low', notes: '' });
      setIsAddingSymptom(false);
      alert('Symptom logged successfully!');
    }
  };

  const updateMetrics = () => {
    onUpdateHealth(editableMetrics);
    setIsEditingMetrics(false);
    alert('Health metrics updated successfully!');
  };

  const handleMetricChange = (metric: string, value: any) => {
    setEditableMetrics(prev => ({ ...prev, [metric]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Health Tracking</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Monitor your health metrics and track your wellness journey with comprehensive insights.
        </p>
      </div>

      {/* Period Selection */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex flex-wrap gap-2 justify-center">
          {['day', 'week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedPeriod === period
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                  : 'bg-white/50 text-gray-700 hover:bg-white/70'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Health Metrics Overview */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Health Metrics</h2>
          <button
            onClick={() => setIsEditingMetrics(!isEditingMetrics)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-md transition-all duration-200"
          >
            {isEditingMetrics ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            <span>{isEditingMetrics ? 'Save Changes' : 'Edit Metrics'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/50 rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Steps</h3>
                  <p className="text-sm text-gray-600">Daily Goal: {healthMetrics.steps.target.toLocaleString()}</p>
                </div>
              </div>
              <span className="text-sm text-green-600 font-medium">{healthMetrics.steps.trend}</span>
            </div>
            <div className="mb-4">
              {isEditingMetrics ? (
                <input
                  type="number"
                  value={editableMetrics.steps}
                  onChange={(e) => handleMetricChange('steps', parseInt(e.target.value))}
                  className="w-full text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-500 focus:outline-none"
                />
              ) : (
                <div className="text-3xl font-bold text-gray-900 mb-1">{healthMetrics.steps.current.toLocaleString()}</div>
              )}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((healthMetrics.steps.current / healthMetrics.steps.target) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {healthMetrics.steps.target - healthMetrics.steps.current > 0 
                ? `${healthMetrics.steps.target - healthMetrics.steps.current} steps to goal`
                : 'Goal achieved! 🎉'
              }
            </p>
          </div>

          <div className="bg-white/50 rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Heart Rate</h3>
                  <p className="text-sm text-gray-600">Avg: {healthMetrics.heartRate.average} BPM</p>
                </div>
              </div>
              <span className="text-sm text-blue-600 font-medium">{healthMetrics.heartRate.trend}</span>
            </div>
            {isEditingMetrics ? (
              <input
                type="number"
                value={editableMetrics.heartRate}
                onChange={(e) => handleMetricChange('heartRate', parseInt(e.target.value))}
                className="w-full text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-500 focus:outline-none mb-4"
              />
            ) : (
              <div className="text-3xl font-bold text-gray-900 mb-4">{healthMetrics.heartRate.current} BPM</div>
            )}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Resting heart rate is healthy</span>
            </div>
          </div>

          <div className="bg-white/50 rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Sleep</h3>
                  <p className="text-sm text-gray-600">Goal: {healthMetrics.sleep.target}h</p>
                </div>
              </div>
              <span className="text-sm text-green-600 font-medium">{healthMetrics.sleep.trend}</span>
            </div>
            <div className="mb-4">
              {isEditingMetrics ? (
                <input
                  type="number"
                  step="0.1"
                  value={editableMetrics.sleep}
                  onChange={(e) => handleMetricChange('sleep', parseFloat(e.target.value))}
                  className="w-full text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-500 focus:outline-none"
                />
              ) : (
                <div className="text-3xl font-bold text-gray-900 mb-1">{healthMetrics.sleep.current}h</div>
              )}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((healthMetrics.sleep.current / healthMetrics.sleep.target) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">Quality sleep achieved</p>
          </div>
        </div>

        {isEditingMetrics && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={updateMetrics}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:shadow-md transition-all duration-200 font-medium"
            >
              Update Health Metrics
            </button>
          </div>
        )}
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Weekly Progress</h2>
        <div className="grid grid-cols-7 gap-4">
          {weeklyData.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-sm font-medium text-gray-600 mb-2">{day.day}</div>
              <div className="space-y-2">
                <div className="bg-gradient-to-t from-green-500 to-emerald-500 rounded-t" 
                     style={{ height: `${(day.steps / 12000) * 60}px`, minHeight: '20px' }}>
                </div>
                <div className="text-xs text-gray-600">{(day.steps / 1000).toFixed(1)}k</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Achievements */}
        <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Achievements
          </h2>
          <div className="space-y-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  achievement.earned 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-white/50'
                }`}>
                  <div className="flex items-start space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      achievement.earned 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : 'bg-gray-300'
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{achievement.desc}</p>
                      {achievement.earned ? (
                        <span className="text-xs text-green-600 font-medium">
                          Earned {achievement.date}
                        </span>
                      ) : (
                        <div className="space-y-1">
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${achievement.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{Math.round(achievement.progress)}% complete</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Symptom Tracker */}
        <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Symptom Log
            </h2>
            <button 
              onClick={() => setIsAddingSymptom(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-md transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add Entry</span>
            </button>
          </div>

          {isAddingSymptom && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-medium text-gray-900 mb-3">Add New Symptom</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Symptom description"
                  value={newSymptom.symptom}
                  onChange={(e) => setNewSymptom({...newSymptom, symptom: e.target.value})}
                  className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newSymptom.severity}
                  onChange={(e) => setNewSymptom({...newSymptom, severity: e.target.value})}
                  className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Low">Low Severity</option>
                  <option value="Medium">Medium Severity</option>
                  <option value="High">High Severity</option>
                </select>
                <textarea
                  placeholder="Additional notes (optional)"
                  value={newSymptom.notes}
                  onChange={(e) => setNewSymptom({...newSymptom, notes: e.target.value})}
                  className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                />
                <div className="flex space-x-3">
                  <button 
                    onClick={addSymptom}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add Symptom
                  </button>
                  <button 
                    onClick={() => setIsAddingSymptom(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {symptoms.map((symptom) => (
              <div key={symptom.id} className="p-4 bg-white/50 rounded-lg border border-white/20">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{symptom.symptom}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    symptom.severity === 'Low' ? 'bg-green-100 text-green-700' :
                    symptom.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {symptom.severity}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{symptom.notes}</p>
                <span className="text-xs text-gray-500">{symptom.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTracking;