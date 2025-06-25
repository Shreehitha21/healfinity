import React, { useState } from 'react';
import { Search, MapPin, Phone, Calendar, Ambulance, Navigation, Star, Clock, Heart, Stethoscope, Leaf, ChefHat } from 'lucide-react';
import { Disease, Hospital } from '../types';

const DiseaseSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [showHospitals, setShowHospitals] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [selectedRemedy, setSelectedRemedy] = useState<any>(null);

  const diseases: Disease[] = [
    {
      id: '1',
      name: 'Common Cold',
      symptoms: ['Runny nose', 'Sneezing', 'Cough', 'Sore throat', 'Mild fever'],
      severity: 'Mild',
      category: 'Respiratory',
      traditionalRemedies: [
        {
          id: '1',
          title: 'Ginger Honey Tea',
          description: 'Warm tea with fresh ginger and honey to soothe throat and boost immunity',
          ingredients: ['Fresh ginger (1 inch)', 'Honey (2 tbsp)', 'Hot water (1 cup)', 'Lemon juice (1 tbsp)'],
          preparation: ['Grate fresh ginger', 'Boil water and add ginger', 'Steep for 5 minutes', 'Add honey and lemon'],
          benefits: ['Soothes throat', 'Reduces inflammation', 'Boosts immunity'],
          rating: 4.7,
          reviews: 156,
          prepTime: '10 mins',
          difficulty: 'Easy',
          tips: ['Use fresh ginger for best results', 'Drink warm, not hot']
        },
        {
          id: '2',
          title: 'Steam Inhalation with Eucalyptus',
          description: 'Natural decongestant using eucalyptus oil steam therapy',
          ingredients: ['Eucalyptus oil (3-4 drops)', 'Hot water (2 cups)', 'Large towel'],
          preparation: ['Boil water in large bowl', 'Add eucalyptus oil', 'Cover head with towel', 'Inhale steam for 10 minutes'],
          benefits: ['Clears congestion', 'Opens airways', 'Reduces cough'],
          rating: 4.5,
          reviews: 89,
          prepTime: '15 mins',
          difficulty: 'Easy',
          tips: ['Keep eyes closed', 'Take breaks if dizzy']
        }
      ],
      modernTreatments: [
        {
          id: '1',
          type: 'medication',
          name: 'Decongestants',
          description: 'Over-the-counter medications to reduce nasal congestion',
          effectiveness: 75,
          sideEffects: ['Drowsiness', 'Dry mouth'],
          duration: '3-5 days'
        },
        {
          id: '2',
          type: 'therapy',
          name: 'Rest and Hydration',
          description: 'Adequate rest and increased fluid intake',
          effectiveness: 80,
          sideEffects: [],
          duration: '7-10 days'
        }
      ]
    },
    {
      id: '2',
      name: 'Headache',
      symptoms: ['Head pain', 'Sensitivity to light', 'Nausea', 'Tension in neck'],
      severity: 'Mild',
      category: 'Neurological',
      traditionalRemedies: [
        {
          id: '3',
          title: 'Peppermint Oil Massage',
          description: 'Topical application of diluted peppermint oil for headache relief',
          ingredients: ['Peppermint essential oil (2 drops)', 'Carrier oil (1 tsp)', 'Clean cloth'],
          preparation: ['Mix peppermint oil with carrier oil', 'Apply to temples and forehead', 'Massage gently in circular motions', 'Rest in quiet, dark room'],
          benefits: ['Pain relief', 'Muscle relaxation', 'Cooling sensation'],
          rating: 4.6,
          reviews: 234,
          prepTime: '5 mins',
          difficulty: 'Easy',
          tips: ['Avoid contact with eyes', 'Use sparingly']
        },
        {
          id: '4',
          title: 'Lavender Compress',
          description: 'Soothing lavender compress to relieve tension headaches',
          ingredients: ['Dried lavender (2 tbsp)', 'Hot water (2 cups)', 'Clean cloth'],
          preparation: ['Steep lavender in hot water for 10 minutes', 'Strain the liquid', 'Soak cloth in lavender water', 'Apply warm compress to forehead'],
          benefits: ['Stress relief', 'Muscle relaxation', 'Aromatherapy'],
          rating: 4.4,
          reviews: 178,
          prepTime: '15 mins',
          difficulty: 'Easy',
          tips: ['Use organic lavender', 'Reapply as needed']
        }
      ],
      modernTreatments: [
        {
          id: '3',
          type: 'medication',
          name: 'Pain Relievers',
          description: 'NSAIDs or acetaminophen for pain management',
          effectiveness: 85,
          sideEffects: ['Stomach irritation', 'Liver stress (with overuse)'],
          duration: '4-6 hours'
        }
      ]
    },
    {
      id: '3',
      name: 'Digestive Issues',
      symptoms: ['Stomach pain', 'Bloating', 'Nausea', 'Indigestion', 'Gas'],
      severity: 'Mild',
      category: 'Digestive',
      traditionalRemedies: [
        {
          id: '5',
          title: 'Fennel Seed Tea',
          description: 'Traditional digestive aid using fennel seeds',
          ingredients: ['Fennel seeds (1 tsp)', 'Hot water (1 cup)', 'Honey (optional)'],
          preparation: ['Crush fennel seeds lightly', 'Pour hot water over seeds', 'Steep for 10 minutes', 'Strain and add honey if desired'],
          benefits: ['Reduces bloating', 'Aids digestion', 'Relieves gas'],
          rating: 4.8,
          reviews: 178,
          prepTime: '12 mins',
          difficulty: 'Easy',
          tips: ['Drink after meals', 'Crush seeds for better extraction']
        },
        {
          id: '6',
          title: 'Ginger Root Chew',
          description: 'Fresh ginger root to stimulate digestion and reduce nausea',
          ingredients: ['Fresh ginger root (1 inch piece)', 'Sea salt (pinch)'],
          preparation: ['Peel fresh ginger root', 'Cut into small pieces', 'Sprinkle with sea salt', 'Chew slowly after meals'],
          benefits: ['Reduces nausea', 'Stimulates digestion', 'Anti-inflammatory'],
          rating: 4.6,
          reviews: 145,
          prepTime: '2 mins',
          difficulty: 'Easy',
          tips: ['Start with small amounts', 'Use organic ginger']
        }
      ],
      modernTreatments: [
        {
          id: '4',
          type: 'medication',
          name: 'Antacids',
          description: 'Medications to neutralize stomach acid',
          effectiveness: 80,
          sideEffects: ['Constipation', 'Diarrhea'],
          duration: '2-4 hours'
        }
      ]
    },
    {
      id: '4',
      name: 'Anxiety',
      symptoms: ['Restlessness', 'Rapid heartbeat', 'Sweating', 'Difficulty concentrating'],
      severity: 'Moderate',
      category: 'Mental Health',
      traditionalRemedies: [
        {
          id: '7',
          title: 'Chamomile Tea',
          description: 'Calming herbal tea to reduce anxiety and promote relaxation',
          ingredients: ['Dried chamomile flowers (1 tbsp)', 'Hot water (1 cup)', 'Honey (optional)'],
          preparation: ['Add chamomile to hot water', 'Steep for 5-7 minutes', 'Strain and sweeten if desired', 'Drink slowly while warm'],
          benefits: ['Reduces anxiety', 'Promotes relaxation', 'Improves sleep'],
          rating: 4.9,
          reviews: 267,
          prepTime: '8 mins',
          difficulty: 'Easy',
          tips: ['Best consumed in evening', 'Use organic chamomile']
        },
        {
          id: '8',
          title: 'Breathing Exercise with Herbs',
          description: 'Deep breathing exercise enhanced with calming herbs',
          ingredients: ['Dried lavender (1 tbsp)', 'Dried chamomile (1 tbsp)', 'Small sachet'],
          preparation: ['Mix herbs in small sachet', 'Hold sachet near nose', 'Inhale deeply for 4 counts', 'Hold breath for 4 counts', 'Exhale for 6 counts'],
          benefits: ['Immediate calm', 'Reduces stress hormones', 'Improves focus'],
          rating: 4.7,
          reviews: 198,
          prepTime: '5 mins',
          difficulty: 'Easy',
          tips: ['Practice regularly', 'Use in quiet space']
        }
      ],
      modernTreatments: [
        {
          id: '5',
          type: 'therapy',
          name: 'Cognitive Behavioral Therapy',
          description: 'Professional therapy to address anxiety patterns',
          effectiveness: 90,
          sideEffects: [],
          duration: '8-12 weeks'
        }
      ]
    },
    {
      id: '5',
      name: 'High Blood Pressure',
      symptoms: ['Headaches', 'Dizziness', 'Chest pain', 'Shortness of breath'],
      severity: 'Severe',
      category: 'Cardiovascular',
      traditionalRemedies: [
        {
          id: '9',
          title: 'Garlic and Lemon Water',
          description: 'Natural remedy to help lower blood pressure',
          ingredients: ['Fresh garlic (2 cloves)', 'Lemon (1/2)', 'Warm water (1 cup)'],
          preparation: ['Crush garlic cloves', 'Squeeze lemon juice', 'Mix with warm water', 'Drink on empty stomach'],
          benefits: ['May lower BP', 'Improves circulation', 'Antioxidant properties'],
          rating: 4.3,
          reviews: 145,
          prepTime: '5 mins',
          difficulty: 'Easy',
          tips: ['Consult doctor first', 'Monitor BP regularly']
        },
        {
          id: '10',
          title: 'Hibiscus Tea',
          description: 'Herbal tea known for its blood pressure lowering properties',
          ingredients: ['Dried hibiscus flowers (2 tbsp)', 'Hot water (2 cups)', 'Honey (optional)'],
          preparation: ['Steep hibiscus in hot water for 10 minutes', 'Strain the tea', 'Add honey if desired', 'Drink twice daily'],
          benefits: ['Lowers blood pressure', 'Rich in antioxidants', 'Supports heart health'],
          rating: 4.5,
          reviews: 189,
          prepTime: '12 mins',
          difficulty: 'Easy',
          tips: ['Drink regularly for best results', 'Monitor blood pressure']
        }
      ],
      modernTreatments: [
        {
          id: '6',
          type: 'medication',
          name: 'ACE Inhibitors',
          description: 'Prescription medications to lower blood pressure',
          effectiveness: 95,
          sideEffects: ['Dry cough', 'Dizziness', 'Fatigue'],
          duration: 'Long-term'
        }
      ]
    }
  ];

  const hospitals: Hospital[] = [
    {
      id: '1',
      name: 'City General Hospital',
      address: '123 Main St, Downtown',
      phone: '+1 (555) 123-4567',
      rating: 4.5,
      distance: 2.3,
      specialties: ['Emergency', 'Cardiology', 'Internal Medicine'],
      emergency: true,
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: '2',
      name: 'St. Mary\'s Medical Center',
      address: '456 Oak Ave, Midtown',
      phone: '+1 (555) 234-5678',
      rating: 4.7,
      distance: 3.1,
      specialties: ['Neurology', 'Orthopedics', 'Emergency'],
      emergency: true,
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    {
      id: '3',
      name: 'Metro Health Clinic',
      address: '789 Pine St, Uptown',
      phone: '+1 (555) 345-6789',
      rating: 4.2,
      distance: 1.8,
      specialties: ['Family Medicine', 'Pediatrics'],
      emergency: false,
      coordinates: { lat: 40.7831, lng: -73.9712 }
    },
    {
      id: '4',
      name: 'Emergency Care Center',
      address: '321 Elm St, Westside',
      phone: '+1 (555) 456-7890',
      rating: 4.6,
      distance: 4.2,
      specialties: ['Emergency', 'Trauma', 'Critical Care'],
      emergency: true,
      coordinates: { lat: 40.7505, lng: -74.0134 }
    }
  ];

  const filteredDiseases = diseases.filter(disease =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disease.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const bookAmbulance = (hospital: Hospital) => {
    alert(`🚑 Ambulance booked from ${hospital.name}!\n\nEstimated arrival: 8-12 minutes\nContact: ${hospital.phone}\n\nEmergency services have been notified.`);
  };

  const bookAppointment = (hospital: Hospital) => {
    alert(`📅 Appointment request sent to ${hospital.name}!\n\nYou will receive a confirmation call within 30 minutes.\nContact: ${hospital.phone}`);
  };

  const getDirections = (hospital: Hospital) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${hospital.coordinates.lat},${hospital.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const openRemedyModal = (remedy: any) => {
    setSelectedRemedy(remedy);
  };

  const closeRemedyModal = () => {
    setSelectedRemedy(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Disease Search & Treatment</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Search for diseases and symptoms to find both traditional remedies and modern medical treatments.
        </p>
      </div>

      {/* Emergency Toggle */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Ambulance className="w-6 h-6 text-red-500" />
            <div>
              <h3 className="font-bold text-gray-900">Emergency Mode</h3>
              <p className="text-sm text-gray-600">Quick access to emergency services</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emergencyMode}
              onChange={(e) => setEmergencyMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search diseases, symptoms, or conditions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>
      </div>

      {/* Disease Results */}
      {searchTerm && (
        <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiseases.map((disease) => (
              <div
                key={disease.id}
                className="bg-white/50 rounded-lg p-6 border border-white/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedDisease(disease)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      disease.severity === 'Mild' ? 'bg-green-100' :
                      disease.severity === 'Moderate' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      <Stethoscope className={`w-6 h-6 ${
                        disease.severity === 'Mild' ? 'text-green-600' :
                        disease.severity === 'Moderate' ? 'text-yellow-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{disease.name}</h3>
                      <p className="text-sm text-gray-600">{disease.category}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    disease.severity === 'Mild' ? 'bg-green-100 text-green-700' :
                    disease.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {disease.severity}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Common Symptoms:</h4>
                  <div className="flex flex-wrap gap-1">
                    {disease.symptoms.slice(0, 3).map((symptom, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {symptom}
                      </span>
                    ))}
                    {disease.symptoms.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{disease.symptoms.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Traditional Remedies</span>
                    <span className="font-medium text-green-600">{disease.traditionalRemedies.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Modern Treatments</span>
                    <span className="font-medium text-blue-600">{disease.modernTreatments.length}</span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:shadow-md transition-all duration-200 font-medium">
                  View Treatments
                </button>
              </div>
            ))}
          </div>

          {filteredDiseases.length === 0 && (
            <div className="text-center py-8">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try searching for different symptoms or conditions.</p>
            </div>
          )}
        </div>
      )}

      {/* Disease Details Modal */}
      {selectedDisease && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    selectedDisease.severity === 'Mild' ? 'bg-green-100' :
                    selectedDisease.severity === 'Moderate' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    <Stethoscope className={`w-6 h-6 ${
                      selectedDisease.severity === 'Mild' ? 'text-green-600' :
                      selectedDisease.severity === 'Moderate' ? 'text-yellow-600' : 'text-red-600'
                    }`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedDisease.name}</h2>
                    <p className="text-gray-600">{selectedDisease.category} • {selectedDisease.severity} Severity</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowHospitals(true)}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:shadow-md transition-all duration-200 font-medium flex items-center space-x-2"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Find Hospitals</span>
                  </button>
                  <button
                    onClick={() => setSelectedDisease(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl px-2"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Traditional Remedies */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-green-500" />
                    Traditional Remedies
                  </h3>
                  <div className="space-y-4">
                    {selectedDisease.traditionalRemedies.map((remedy) => (
                      <div key={remedy.id} className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-bold text-gray-900">{remedy.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{remedy.description}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{remedy.rating}</span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <h5 className="font-medium text-gray-900 mb-2">Benefits:</h5>
                          <div className="flex flex-wrap gap-1">
                            {remedy.benefits.map((benefit, index) => (
                              <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{remedy.prepTime}</span>
                          </div>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {remedy.difficulty}
                          </span>
                        </div>

                        <button
                          onClick={() => openRemedyModal(remedy)}
                          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:shadow-md transition-all duration-200 font-medium"
                        >
                          View Recipe & Instructions
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modern Treatments */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Stethoscope className="w-5 h-5 mr-2 text-blue-500" />
                    Modern Treatments
                  </h3>
                  <div className="space-y-4">
                    {selectedDisease.modernTreatments.map((treatment) => (
                      <div key={treatment.id} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-bold text-gray-900">{treatment.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{treatment.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-blue-600">{treatment.effectiveness}%</div>
                            <div className="text-xs text-gray-500">Effective</div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium">{treatment.duration}</span>
                          </div>
                          {treatment.sideEffects.length > 0 && (
                            <div>
                              <h5 className="font-medium text-gray-900 mb-1 text-sm">Side Effects:</h5>
                              <div className="flex flex-wrap gap-1">
                                {treatment.sideEffects.map((effect, index) => (
                                  <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                                    {effect}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => setShowHospitals(true)}
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:shadow-md transition-all duration-200 font-medium"
                        >
                          Find Healthcare Provider
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Remedy Details Modal */}
      {selectedRemedy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedRemedy.title}</h2>
                    <p className="text-gray-600">Traditional Remedy Instructions</p>
                  </div>
                </div>
                <button 
                  onClick={closeRemedyModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <Leaf className="w-5 h-5 mr-2" />
                    Ingredients
                  </h3>
                  <ul className="space-y-2">
                    {selectedRemedy.ingredients.map((ingredient: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Preparation Steps</h3>
                  <ol className="space-y-3">
                    {selectedRemedy.preparation.map((step: string, index: number) => (
                      <li key={index} className="flex space-x-3">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Health Benefits</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRemedy.benefits.map((benefit: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Pro Tips</h3>
                  <ul className="space-y-2">
                    {selectedRemedy.tips.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-4">
                  <button 
                    onClick={() => alert('✅ Remedy saved to your favorites!')}
                    className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-lg hover:shadow-md transition-all duration-200 font-medium"
                  >
                    Save to Favorites
                  </button>
                  <button 
                    onClick={closeRemedyModal}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hospitals Modal */}
      {showHospitals && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Nearby Hospitals</h2>
                    <p className="text-gray-600">Find healthcare providers in your area</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowHospitals(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hospitals.map((hospital) => (
                  <div key={hospital.id} className="bg-white/50 rounded-lg p-6 border border-white/20 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{hospital.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{hospital.address}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span>{hospital.rating}</span>
                          </div>
                          <div className="flex items-center">
                            <Navigation className="w-4 h-4 mr-1" />
                            <span>{hospital.distance} km</span>
                          </div>
                        </div>
                      </div>
                      {hospital.emergency && (
                        <div className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                          Emergency
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-1">
                        {hospital.specialties.map((specialty, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => bookAppointment(hospital)}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:shadow-md transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Book</span>
                        </button>
                        <button
                          onClick={() => getDirections(hospital)}
                          className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:shadow-md transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                        >
                          <Navigation className="w-4 h-4" />
                          <span>Directions</span>
                        </button>
                      </div>
                      
                      {(hospital.emergency || emergencyMode) && (
                        <button
                          onClick={() => bookAmbulance(hospital)}
                          className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:shadow-md transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                        >
                          <Ambulance className="w-4 h-4" />
                          <span>Book Ambulance</span>
                        </button>
                      )}

                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 pt-2">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          <span>{hospital.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseSearch;