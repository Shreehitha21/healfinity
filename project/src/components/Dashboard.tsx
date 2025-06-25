import React from 'react';
import { Activity, Calendar, Heart, TrendingUp, Clock, MapPin, Play, Bell, Video, Phone, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface DashboardProps {
  healthData: any;
  consultations: any[];
}

const Dashboard: React.FC<DashboardProps> = ({ healthData, consultations }) => {
  const { currentUser } = useAuth();

  // Show realistic data for new users
  const displayHealthData = {
    steps: healthData?.steps || 0,
    heartRate: healthData?.heartRate || 0,
    sleep: healthData?.sleep || 0,
    water: healthData?.water || 0
  };

  const healthMetrics = [
    { 
      label: 'Steps Today', 
      value: displayHealthData.steps > 0 ? displayHealthData.steps.toLocaleString() : 'Not tracked', 
      change: displayHealthData.steps > 0 ? '+12%' : 'Start tracking', 
      icon: Activity, 
      color: 'from-green-500 to-emerald-500' 
    },
    { 
      label: 'Heart Rate', 
      value: displayHealthData.heartRate > 0 ? `${displayHealthData.heartRate} BPM` : 'Not measured', 
      change: displayHealthData.heartRate > 0 ? 'Normal' : 'Add data', 
      icon: Heart, 
      color: 'from-red-500 to-pink-500' 
    },
    { 
      label: 'Sleep Score', 
      value: displayHealthData.sleep > 0 ? `${displayHealthData.sleep}h` : 'Not tracked', 
      change: displayHealthData.sleep > 0 ? '+5%' : 'Track sleep', 
      icon: Clock, 
      color: 'from-blue-500 to-indigo-500' 
    },
    { 
      label: 'Hydration', 
      value: displayHealthData.water > 0 ? `${displayHealthData.water}/8 cups` : '0/8 cups', 
      change: displayHealthData.water > 0 ? '75%' : 'Start tracking', 
      icon: TrendingUp, 
      color: 'from-cyan-500 to-blue-500' 
    },
  ];

  const todaySchedule = [
    { time: '9:00 AM', activity: 'Morning Yoga Session', type: 'exercise', action: () => window.open('https://www.youtube.com/watch?v=v7AYKMP6rOE', '_blank') },
    { time: '11:00 AM', activity: 'Dr. Smith Video Consultation', type: 'consultation', action: () => alert('🎥 Joining consultation with Dr. Smith...\n\nPlease wait while we connect you to the doctor.') },
    { time: '2:00 PM', activity: 'Healthy Lunch Prep', type: 'nutrition', action: () => alert('🍽️ Check the Diet & Nutrition section for healthy meal recipes and preparation instructions.') },
    { time: '6:00 PM', activity: 'Evening Meditation', type: 'wellness', action: () => window.open('https://www.youtube.com/watch?v=ZToicYcHIOU', '_blank') },
  ];

  const quickActions = [
    { title: 'Book Consultation', desc: 'Schedule with available doctors', icon: Calendar, color: 'bg-blue-500', action: () => window.location.hash = 'consultation' },
    { title: 'Find Remedies', desc: 'Search traditional treatments', icon: Heart, color: 'bg-green-500', action: () => window.location.hash = 'remedies' },
    { title: 'Track Symptoms', desc: 'Log your health data', icon: Activity, color: 'bg-purple-500', action: () => window.location.hash = 'tracking' },
    { title: 'Diet Plan', desc: 'Get personalized nutrition', icon: MapPin, color: 'bg-orange-500', action: () => window.location.hash = 'diet' },
  ];

  // Calculate health score based on available data
  const calculateHealthScore = () => {
    let score = 0;
    let factors = 0;
    
    if (displayHealthData.steps > 0) {
      score += Math.min((displayHealthData.steps / 10000) * 25, 25);
      factors++;
    }
    if (displayHealthData.heartRate > 0) {
      score += displayHealthData.heartRate >= 60 && displayHealthData.heartRate <= 100 ? 25 : 15;
      factors++;
    }
    if (displayHealthData.sleep > 0) {
      score += Math.min((displayHealthData.sleep / 8) * 25, 25);
      factors++;
    }
    if (displayHealthData.water > 0) {
      score += Math.min((displayHealthData.water / 8) * 25, 25);
      factors++;
    }
    
    return factors > 0 ? Math.round(score) : 0;
  };

  const healthScore = calculateHealthScore();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Good Morning, {currentUser?.name || 'User'}!</h1>
            <p className="text-green-100 text-lg">
              {healthScore > 0 
                ? "Your health journey continues today. You're doing great!" 
                : "Welcome to your health journey! Start by tracking your daily activities."
              }
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <div className="text-2xl font-bold">Today's Score</div>
            <div className="text-4xl font-bold">{healthScore}/100</div>
            {healthScore === 0 && (
              <div className="text-sm text-green-100 mt-1">Start tracking to see your score</div>
            )}
          </div>
        </div>
      </div>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${
                  metric.value.includes('Not') || metric.value === '0/8 cups' ? 'text-gray-500' : 'text-green-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-gray-600">{metric.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
            <Calendar className="w-5 h-5 text-gray-600" />
          </div>
          <div className="space-y-4">
            {todaySchedule.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors cursor-pointer" onClick={item.action}>
                <div className="w-2 h-12 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.activity}</div>
                  <div className="text-sm text-gray-600">{item.time}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.type === 'exercise' ? 'bg-green-100 text-green-700' :
                  item.type === 'consultation' ? 'bg-blue-100 text-blue-700' :
                  item.type === 'nutrition' ? 'bg-orange-100 text-orange-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {item.type}
                </div>
                <Play className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-all duration-200 hover:shadow-md group"
                >
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-1">{action.title}</div>
                  <div className="text-xs text-gray-600">{action.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Consultations */}
      {consultations && consultations.length > 0 && (
        <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Consultations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {consultations.slice(0, 2).map((consultation: any, index) => (
              <div key={index} className="bg-white/50 rounded-lg p-4 border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      {consultation.type === 'video' ? <Video className="w-6 h-6 text-white" /> : 
                       consultation.type === 'phone' ? <Phone className="w-6 h-6 text-white" /> : 
                       <MessageCircle className="w-6 h-6 text-white" />}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{consultation.doctor}</h3>
                      <p className="text-sm text-gray-600">{consultation.date} at {consultation.time}</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Confirmed
                  </div>
                </div>
                <button 
                  onClick={() => alert(`🎥 Joining ${consultation.type} consultation with ${consultation.doctor}...\n\nPlease wait while we connect you to the doctor.`)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:shadow-md transition-all duration-200 font-medium"
                >
                  Join Consultation
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Health Tips & Videos */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Health Tips & Wellness</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-lg p-6 text-white cursor-pointer hover:shadow-lg transition-shadow" onClick={() => alert('💧 Hydration Tip: Drink water regularly throughout the day. Aim for 8 glasses daily for optimal health.')}>
            <Bell className="w-8 h-8 mb-4" />
            <h3 className="font-bold mb-2">Hydration Reminder</h3>
            <p className="text-sm text-green-100">Learn about the benefits of proper hydration for optimal health.</p>
          </div>
          <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg p-6 text-white cursor-pointer hover:shadow-lg transition-shadow" onClick={() => window.open('https://www.youtube.com/watch?v=v7AYKMP6rOE', '_blank')}>
            <Play className="w-8 h-8 mb-4" />
            <h3 className="font-bold mb-2">Morning Yoga</h3>
            <p className="text-sm text-purple-100">Try our 15-minute morning yoga routine for better flexibility.</p>
          </div>
          <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-lg p-6 text-white cursor-pointer hover:shadow-lg transition-shadow" onClick={() => alert('❤️ Heart Health Tip: Include omega-3 rich foods like fish, walnuts, and flax seeds in your diet for cardiovascular health.')}>
            <Heart className="w-8 h-8 mb-4" />
            <h3 className="font-bold mb-2">Heart Health</h3>
            <p className="text-sm text-orange-100">Learn about omega-3 rich foods for cardiovascular health.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;