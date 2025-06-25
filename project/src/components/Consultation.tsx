import React, { useState } from 'react';
import { Video, Calendar, Clock, User, Star, Phone, MessageCircle, CheckCircle, Play, ExternalLink } from 'lucide-react';

interface ConsultationProps {
  onBookConsultation: (consultation: any) => void;
  consultations: any[];
}

const Consultation: React.FC<ConsultationProps> = ({ onBookConsultation, consultations }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState<'video' | 'phone' | 'chat'>('video');
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'General Medicine',
      rating: 4.9,
      reviews: 156,
      experience: '12 years',
      languages: ['English', 'Spanish'],
      availability: 'Available Today',
      price: 'Free',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Specializes in holistic health approach combining traditional and modern medicine.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Integrative Medicine',
      rating: 4.8,
      reviews: 203,
      experience: '15 years',
      languages: ['English', 'Mandarin'],
      availability: 'Available Tomorrow',
      price: 'Free',
      image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Expert in combining Eastern and Western medical practices for optimal health outcomes.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Nutrition & Wellness',
      rating: 4.7,
      reviews: 98,
      experience: '8 years',
      languages: ['English', 'Spanish', 'Portuguese'],
      availability: 'Available This Week',
      price: 'Free',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Focuses on preventive care through nutrition and lifestyle modifications.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleBooking = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      const doctor = doctors.find(d => d.id === selectedDoctor);
      const newConsultation = {
        id: Date.now(),
        doctor: doctor?.name,
        date: selectedDate,
        time: selectedTime,
        type: consultationType,
        status: 'confirmed'
      };
      
      onBookConsultation(newConsultation);
      setShowBookingSuccess(true);
      
      // Show success message
      alert(`🎉 Appointment Booked Successfully!\n\nDoctor: ${doctor?.name}\nDate: ${selectedDate}\nTime: ${selectedTime}\nType: ${consultationType}\n\nYou will receive a confirmation email shortly with meeting details.`);
      
      // Reset form
      setTimeout(() => {
        setSelectedDoctor(null);
        setSelectedDate('');
        setSelectedTime('');
        setShowBookingSuccess(false);
      }, 3000);
    } else {
      alert('❌ Please select a doctor, date, and time slot to book your appointment.');
    }
  };

  const joinConsultation = (consultation: any) => {
    alert(`🎥 Joining ${consultation.type} consultation with ${consultation.doctor}...\n\nPlease wait while we connect you to the doctor.\n\nNote: This is a demo - actual video calls would be integrated with a real telehealth platform.`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Video Consultations</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with qualified healthcare professionals from the comfort of your home.
        </p>
      </div>

      {/* Booking Success Message */}
      {showBookingSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-900 mb-2">Consultation Booked Successfully!</h3>
          <p className="text-green-700">You will receive a confirmation email shortly with meeting details.</p>
        </div>
      )}

      {/* Upcoming Consultations */}
      {consultations.length > 0 && (
        <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Upcoming Consultations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {consultations.map((consultation) => (
              <div key={consultation.id} className="bg-white/50 rounded-lg p-4 border border-white/20">
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
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    consultation.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {consultation.status}
                  </div>
                </div>
                <button 
                  onClick={() => joinConsultation(consultation)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:shadow-md transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Join Consultation</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Consultation Type Selection */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Choose Consultation Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { type: 'video', icon: Video, title: 'Video Call', desc: 'Face-to-face consultation' },
            { type: 'phone', icon: Phone, title: 'Phone Call', desc: 'Voice-only consultation' },
            { type: 'chat', icon: MessageCircle, title: 'Text Chat', desc: 'Written consultation' },
          ].map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.type}
                onClick={() => setConsultationType(option.type as any)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  consultationType === option.type
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white/50 hover:bg-white/70'
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-3 ${consultationType === option.type ? 'text-blue-500' : 'text-gray-600'}`} />
                <h3 className="font-medium text-gray-900 mb-1">{option.title}</h3>
                <p className="text-sm text-gray-600">{option.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Doctor Selection */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Available Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className={`bg-white/50 rounded-lg p-6 border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                selectedDoctor === doctor.id ? 'border-blue-500 bg-blue-50' : 'border-white/20 hover:border-blue-200'
              }`}
              onClick={() => setSelectedDoctor(doctor.id)}
            >
              <div className="text-center mb-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                />
                <h3 className="font-bold text-gray-900">{doctor.name}</h3>
                <p className="text-blue-600 font-medium">{doctor.specialty}</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span>{doctor.rating}</span>
                    <span className="text-gray-600 ml-1">({doctor.reviews})</span>
                  </div>
                  <span className="text-green-600 font-medium">{doctor.price}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  <span>{doctor.experience} experience</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>{doctor.availability}</span>
                </div>

                <p className="text-gray-600 text-xs leading-relaxed">{doctor.bio}</p>

                <div className="flex flex-wrap gap-1">
                  {doctor.languages.map((lang, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {lang}
                    </span>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`👨‍⚕️ Dr. ${doctor.name}\n\nSpecialty: ${doctor.specialty}\nExperience: ${doctor.experience}\nRating: ${doctor.rating}/5\n\n${doctor.bio}\n\nLanguages: ${doctor.languages.join(', ')}`);
                  }}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>View Profile</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Date and Time Selection */}
      {selectedDoctor && (
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
                className="w-full p-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        ? 'border-blue-500 bg-blue-500 text-white'
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
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
          >
            Book Consultation
          </button>
        </div>
      )}
    </div>
  );
};

export default Consultation;