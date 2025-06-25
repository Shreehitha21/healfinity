import React, { useState } from 'react';
import { Calendar, Clock, User, Star, Play, CheckCircle, Heart, Zap } from 'lucide-react';

interface YogaSessionsProps {
  onBookSession: (session: any) => void;
  bookedSessions: any[];
}

const YogaSessions: React.FC<YogaSessionsProps> = ({ onBookSession, bookedSessions }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState('all');

  const instructors = [
    {
      id: 1,
      name: 'Maya Patel',
      specialty: 'Hatha Yoga',
      rating: 4.9,
      experience: '8 years',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Certified yoga instructor specializing in traditional Hatha yoga and meditation.',
      languages: ['English', 'Hindi'],
      price: 'Free'
    },
    {
      id: 2,
      name: 'Alex Johnson',
      specialty: 'Vinyasa Flow',
      rating: 4.8,
      experience: '6 years',
      image: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Dynamic Vinyasa flow instructor focused on strength and flexibility.',
      languages: ['English'],
      price: 'Free'
    },
    {
      id: 3,
      name: 'Priya Sharma',
      specialty: 'Restorative Yoga',
      rating: 4.7,
      experience: '10 years',
      image: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Expert in restorative yoga and stress relief techniques.',
      languages: ['English', 'Hindi', 'Sanskrit'],
      price: 'Free'
    }
  ];

  const yogaTypes = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' },
    { id: 'restorative', name: 'Restorative' },
  ];

  const timeSlots = [
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM',
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
  ];

  const sessions = [
    {
      id: 1,
      title: 'Morning Energizer Flow',
      instructor: 'Maya Patel',
      level: 'beginner',
      duration: '45 mins',
      type: 'Hatha Yoga',
      description: 'Start your day with gentle stretches and breathing exercises.',
      benefits: ['Increased Energy', 'Better Flexibility', 'Stress Relief']
    },
    {
      id: 2,
      title: 'Power Vinyasa',
      instructor: 'Alex Johnson',
      level: 'intermediate',
      duration: '60 mins',
      type: 'Vinyasa Flow',
      description: 'Dynamic flow sequence to build strength and endurance.',
      benefits: ['Strength Building', 'Cardiovascular Health', 'Mental Focus']
    },
    {
      id: 3,
      title: 'Evening Relaxation',
      instructor: 'Priya Sharma',
      level: 'beginner',
      duration: '30 mins',
      type: 'Restorative Yoga',
      description: 'Gentle poses and meditation to unwind after a long day.',
      benefits: ['Deep Relaxation', 'Better Sleep', 'Stress Reduction']
    }
  ];

  const filteredSessions = sessions.filter(session => {
    if (selectedLevel === 'all') return true;
    return session.level === selectedLevel;
  });

  const handleBooking = () => {
    if (selectedInstructor && selectedDate && selectedTime) {
      const instructor = instructors.find(i => i.id === selectedInstructor);
      const session = filteredSessions.find(s => s.instructor === instructor?.name);
      
      const newSession = {
        id: Date.now(),
        instructor: instructor?.name,
        session: session?.title || 'Yoga Session',
        date: selectedDate,
        time: selectedTime,
        type: session?.type || 'Yoga',
        status: 'confirmed'
      };
      
      onBookSession(newSession);
      
      alert(`🧘‍♀️ Yoga Session Booked Successfully!\n\nInstructor: ${instructor?.name}\nSession: ${session?.title}\nDate: ${selectedDate}\nTime: ${selectedTime}\n\nYou will receive a confirmation email with the session link.`);
      
      // Reset form
      setSelectedInstructor(null);
      setSelectedDate('');
      setSelectedTime('');
    } else {
      alert('❌ Please select an instructor, date, and time slot to book your yoga session.');
    }
  };

  const joinSession = (session: any) => {
    alert(`🧘‍♀️ Joining yoga session: ${session.session}\n\nInstructor: ${session.instructor}\nTime: ${session.time}\n\nNote: This is a demo - actual sessions would connect to a live yoga platform.`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Yoga Sessions</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join live yoga sessions with certified instructors for all skill levels.
        </p>
      </div>

      {/* Booked Sessions */}
      {bookedSessions.length > 0 && (
        <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Your Upcoming Sessions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookedSessions.map((session) => (
              <div key={session.id} className="bg-white/50 rounded-lg p-4 border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{session.session}</h3>
                      <p className="text-sm text-gray-600">{session.instructor}</p>
                      <p className="text-sm text-gray-600">{session.date} at {session.time}</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {session.status}
                  </div>
                </div>
                <button 
                  onClick={() => joinSession(session)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:shadow-md transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Join Session</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Session Level Filter */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Choose Your Level</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {yogaTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedLevel(type.id)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                selectedLevel === type.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white/50 hover:bg-white/70'
              }`}
            >
              <span className={`font-medium ${selectedLevel === type.id ? 'text-purple-700' : 'text-gray-700'}`}>
                {type.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Available Sessions */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Available Sessions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map((session) => (
            <div key={session.id} className="bg-white/50 rounded-lg p-6 border border-white/20 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{session.title}</h3>
                    <p className="text-sm text-gray-600">{session.instructor}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  session.level === 'beginner' ? 'bg-green-100 text-green-700' :
                  session.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {session.level}
                </div>
              </div>

              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{session.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{session.duration}</span>
                  </div>
                  <span className="font-medium text-purple-600">{session.type}</span>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
                  <div className="flex flex-wrap gap-2">
                    {session.benefits.map((benefit, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  const instructor = instructors.find(i => i.name === session.instructor);
                  setSelectedInstructor(instructor?.id || null);
                }}
                className={`w-full py-2 px-4 rounded-lg transition-all duration-200 font-medium ${
                  selectedInstructor === instructors.find(i => i.name === session.instructor)?.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/70 text-gray-700 hover:bg-white/90'
                }`}
              >
                {selectedInstructor === instructors.find(i => i.name === session.instructor)?.id 
                  ? 'Selected' : 'Select Session'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Instructor Selection */}
      {selectedInstructor && (
        <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Instructor</h2>
          {instructors.filter(instructor => instructor.id === selectedInstructor).map((instructor) => (
            <div key={instructor.id} className="bg-white/50 rounded-lg p-6 border border-white/20">
              <div className="flex items-start space-x-4">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{instructor.name}</h3>
                  <p className="text-purple-600 font-medium mb-2">{instructor.specialty}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span>{instructor.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>{instructor.experience}</span>
                    </div>
                    <span className="text-green-600 font-medium">{instructor.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{instructor.bio}</p>
                  <div className="flex flex-wrap gap-1">
                    {instructor.languages.map((lang, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Date and Time Selection */}
      {selectedInstructor && (
        <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Select Date & Time</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Times</label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 text-sm rounded-lg border transition-all duration-200 ${
                      selectedTime === time
                        ? 'border-purple-500 bg-purple-500 text-white'
                        : 'border-gray-200 bg-white/50 hover:bg-white/70'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleBooking}
            className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
          >
            Book Yoga Session
          </button>
        </div>
      )}
    </div>
  );
};

export default YogaSessions;