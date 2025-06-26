import React, { useState, useEffect } from 'react';
import { Bell, Home, Heart, Video, Apple, BookOpen, User, Menu, X, Search, LogOut, Zap, Star } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Dashboard from './components/Dashboard';
import Remedies from './components/Remedies';
import Consultation from './components/Consultation';
import HealthTracking from './components/HealthTracking';
import DietRecommendations from './components/DietRecommendations';
import Profile from './components/Profile';
import Notifications from './components/Notifications';
import DiseaseSearch from './components/DiseaseSearch';
import YogaSessions from './components/YogaSessions';
import Favorites from './components/Favorites';

type Page = 'dashboard' | 'remedies' | 'consultation' | 'tracking' | 'diet' | 'profile' | 'search' | 'yoga' | 'favorites';

function AppContent() {
  const { currentUser, logout, addConsultation, updateHealthData, addYogaSession, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    // Simulate periodic notifications
    const interval = setInterval(() => {
      setNotifications(prev => prev + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'search', label: 'Disease Search', icon: Search },
    { id: 'remedies', label: 'Remedies', icon: Heart },
    { id: 'consultation', label: 'Consultation', icon: Video },
    { id: 'yoga', label: 'Yoga Sessions', icon: Zap },
    { id: 'tracking', label: 'Health Tracking', icon: BookOpen },
    { id: 'diet', label: 'Diet & Nutrition', icon: Apple },
    { id: 'favorites', label: 'My Favorites', icon: Star },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard healthData={currentUser?.healthData} consultations={currentUser?.consultations || []} />;
      case 'search':
        return <DiseaseSearch />;
      case 'remedies':
        return <Remedies />;
      case 'consultation':
        return <Consultation onBookConsultation={addConsultation} consultations={currentUser?.consultations || []} />;
      case 'yoga':
        return <YogaSessions onBookSession={addYogaSession} bookedSessions={currentUser?.yogaSessions || []} />;
      case 'tracking':
        return <HealthTracking healthData={currentUser?.healthData} onUpdateHealth={updateHealthData} />;
      case 'diet':
        return <DietRecommendations />;
      case 'favorites':
        return <Favorites />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard healthData={currentUser?.healthData} consultations={currentUser?.consultations || []} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">HealthHub</h2>
          <p className="text-gray-600">Loading your health dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HealthHub</h1>
                <p className="text-xs text-gray-600">Holistic Health Management</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Welcome, {currentUser?.name}</p>
                <p className="text-xs text-gray-600">{currentUser?.email}</p>
              </div>
              <Notifications count={notifications} />
              <button
                onClick={logout}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{currentUser?.avatar}</span>
              </div>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <nav className="hidden md:flex flex-col w-64 bg-white/60 backdrop-blur-md border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id as Page)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-white/50 hover:shadow-sm'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/50">
            <div className="fixed inset-y-0 left-0 w-64 bg-white">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-gray-900">HealthHub</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                  <p className="text-xs text-gray-600">{currentUser?.email}</p>
                  <button
                    onClick={logout}
                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                  >
                    Logout
                  </button>
                </div>

                <div className="space-y-2">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setCurrentPage(item.id as Page);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                          currentPage === item.id
                            ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

function AuthWrapper() {
  const { currentUser, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">HealthHub</h2>
          <p className="text-gray-600">Initializing your health platform...</p>
        </div>
      </div>
    );
  }

  if (currentUser) {
    return <AppContent />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      {isLogin ? (
        <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AuthWrapper />
    </AuthProvider>
  );
}

export default App;