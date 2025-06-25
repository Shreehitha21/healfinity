import React, { useState } from 'react';
import { User, Edit3, Save, Camera, Settings, Bell, Shield, Heart, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { currentUser, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || 'John Doe',
    email: currentUser?.email || 'john.doe@email.com',
    phone: currentUser?.phone || '+1 (555) 123-4567',
    age: currentUser?.age?.toString() || '32',
    height: '5\'10"',
    weight: currentUser?.healthData?.weight?.toString() + ' lbs' || '154 lbs',
    bloodType: 'O+',
    allergies: 'Peanuts, Shellfish',
    medications: 'None',
    emergencyContact: 'Jane Doe - +1 (555) 987-6543',
    medicalConditions: 'None reported',
    fitnessGoal: 'Maintain current weight and improve cardiovascular health',
  });

  const [preferences, setPreferences] = useState({
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
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (currentUser) {
      updateUser({
        name: formData.name,
        phone: formData.phone,
        age: parseInt(formData.age),
      });
      setIsEditing(false);
      alert('✅ Profile updated successfully!');
    }
  };

  const handlePreferenceChange = (category: 'notifications' | 'privacy', field: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const healthStats = [
    { label: 'Total Consultations', value: currentUser?.consultations?.length?.toString() || '0', icon: Heart, color: 'from-red-500 to-pink-500' },
    { label: 'Remedies Tried', value: '8', icon: Activity, color: 'from-green-500 to-emerald-500' },
    { label: 'Days Active', value: '45', icon: User, color: 'from-blue-500 to-indigo-500' },
    { label: 'Health Score', value: '92', icon: Shield, color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Health Profile</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Manage your personal information, health data, and application preferences.
        </p>
      </div>

      {/* Profile Overview */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-8 border border-white/20">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {currentUser?.avatar || 'JD'}
            </div>
            <button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow">
              <Camera className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentUser?.name || 'User'}</h2>
                <p className="text-gray-600 mb-1">{currentUser?.email || 'user@email.com'}</p>
                <p className="text-gray-600">{currentUser?.phone || 'No phone number'}</p>
              </div>
              <button
                onClick={() => {
                  if (isEditing) {
                    handleSave();
                  } else {
                    setIsEditing(true);
                  }
                }}
                className="mt-4 md:mt-0 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-md transition-all duration-200"
              >
                {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
              </button>
            </div>

            {/* Health Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {healthStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white/50 rounded-lg p-4 text-center border border-white/20">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Personal Information
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Full Name', field: 'name', type: 'text' },
              { label: 'Email Address', field: 'email', type: 'email' },
              { label: 'Phone Number', field: 'phone', type: 'tel' },
              { label: 'Age', field: 'age', type: 'number' },
              { label: 'Height', field: 'height', type: 'text' },
              { label: 'Weight', field: 'weight', type: 'text' },
            ].map((field) => (
              <div key={field.field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                {isEditing && ['name', 'phone', 'age'].includes(field.field) ? (
                  <input
                    type={field.type}
                    value={formData[field.field as keyof typeof formData]}
                    onChange={(e) => handleInputChange(field.field, e.target.value)}
                    className="w-full p-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                    {formData[field.field as keyof typeof formData]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Medical Information */}
        <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Heart className="w-5 h-5 mr-2" />
            Medical Information
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Blood Type', field: 'bloodType', type: 'text' },
              { label: 'Known Allergies', field: 'allergies', type: 'text' },
              { label: 'Current Medications', field: 'medications', type: 'text' },
              { label: 'Medical Conditions', field: 'medicalConditions', type: 'text' },
              { label: 'Emergency Contact', field: 'emergencyContact', type: 'text' },
              { label: 'Fitness Goal', field: 'fitnessGoal', type: 'textarea' },
            ].map((field) => (
              <div key={field.field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                {isEditing ? (
                  field.type === 'textarea' ? (
                    <textarea
                      value={formData[field.field as keyof typeof formData]}
                      onChange={(e) => handleInputChange(field.field, e.target.value)}
                      rows={3}
                      className="w-full p-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.field as keyof typeof formData]}
                      onChange={(e) => handleInputChange(field.field, e.target.value)}
                      className="w-full p-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                    {formData[field.field as keyof typeof formData]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Notification Preferences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Health Notifications</h3>
            <div className="space-y-3">
              {[
                { key: 'appointments', label: 'Appointment Reminders' },
                { key: 'medications', label: 'Medication Reminders' },
                { key: 'healthTips', label: 'Daily Health Tips' },
                { key: 'yoga', label: 'Yoga Session Alerts' },
                { key: 'diet', label: 'Diet Recommendations' },
              ].map((notification) => (
                <div key={notification.key} className="flex items-center justify-between">
                  <span className="text-gray-700">{notification.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.notifications[notification.key as keyof typeof preferences.notifications]}
                      onChange={(e) => handlePreferenceChange('notifications', notification.key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Privacy Settings</h3>
            <div className="space-y-3">
              {[
                { key: 'shareHealthData', label: 'Share Health Data with Partners' },
                { key: 'publicProfile', label: 'Make Profile Public' },
                { key: 'dataAnalytics', label: 'Allow Data for Health Analytics' },
              ].map((privacy) => (
                <div key={privacy.key} className="flex items-center justify-between">
                  <span className="text-gray-700">{privacy.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.privacy[privacy.key as keyof typeof preferences.privacy]}
                      onChange={(e) => handlePreferenceChange('privacy', privacy.key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* App Settings */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          App Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => alert('📊 Health data export feature coming soon!')}
            className="p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-all duration-200 text-left border border-white/20"
          >
            <Shield className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="font-medium text-gray-900 mb-1">Export Health Data</h3>
            <p className="text-sm text-gray-600">Download your health information</p>
          </button>
          
          <button 
            onClick={() => alert('💾 Backup settings feature coming soon!')}
            className="p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-all duration-200 text-left border border-white/20"
          >
            <Heart className="w-8 h-8 text-red-500 mb-3" />
            <h3 className="font-medium text-gray-900 mb-1">Backup Settings</h3>
            <p className="text-sm text-gray-600">Manage data backup preferences</p>
          </button>
          
          <button 
            onClick={() => alert('🔒 Account security settings coming soon!')}
            className="p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-all duration-200 text-left border border-white/20"
          >
            <User className="w-8 h-8 text-green-500 mb-3" />
            <h3 className="font-medium text-gray-900 mb-1">Account Security</h3>
            <p className="text-sm text-gray-600">Password and security settings</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;