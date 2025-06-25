import React, { useState } from 'react';
import { Search, Filter, Heart, Star, Clock, User, ChefHat, Leaf } from 'lucide-react';

const Remedies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRemedy, setSelectedRemedy] = useState<any>(null);

  const categories = [
    { id: 'all', name: 'All Remedies' },
    { id: 'digestive', name: 'Digestive Health' },
    { id: 'respiratory', name: 'Respiratory' },
    { id: 'skin', name: 'Skin Care' },
    { id: 'immunity', name: 'Immunity' },
    { id: 'stress', name: 'Stress Relief' },
  ];

  const remedies = [
    {
      id: 1,
      title: 'Turmeric Golden Milk',
      category: 'immunity',
      description: 'A traditional Indian remedy combining turmeric with warm milk and spices to boost immunity and reduce inflammation.',
      ingredients: ['1 cup milk', '1 tsp turmeric powder', '1/4 tsp black pepper', '1 tsp honey', 'Pinch of cinnamon'],
      preparation: [
        'Heat milk in a saucepan over medium heat',
        'Add turmeric powder, black pepper, and cinnamon',
        'Simmer for 5 minutes while stirring occasionally',
        'Remove from heat and let cool slightly',
        'Add honey and stir well before serving'
      ],
      benefits: ['Anti-inflammatory', 'Immune system boost', 'Better sleep quality'],
      rating: 4.8,
      reviews: 127,
      prepTime: '10 mins',
      difficulty: 'Easy',
      tips: [
        'Use fresh turmeric root for better flavor',
        'Black pepper enhances turmeric absorption',
        'Best consumed before bedtime'
      ]
    },
    {
      id: 2,
      title: 'Ginger Lemon Tea',
      category: 'digestive',
      description: 'A soothing blend that aids digestion, reduces nausea, and provides natural energy.',
      ingredients: ['1 inch fresh ginger', '1 lemon (juiced)', '1 cup hot water', '1 tsp honey'],
      preparation: [
        'Peel and grate fresh ginger',
        'Boil water and pour over grated ginger',
        'Steep for 5-7 minutes',
        'Strain the liquid to remove ginger pieces',
        'Add fresh lemon juice and honey to taste'
      ],
      benefits: ['Digestive aid', 'Nausea relief', 'Natural energy boost'],
      rating: 4.6,
      reviews: 89,
      prepTime: '8 mins',
      difficulty: 'Easy',
      tips: [
        'Use organic ginger for best results',
        'Adjust ginger amount based on tolerance',
        'Drink 30 minutes before meals'
      ]
    },
    {
      id: 3,
      title: 'Aloe Vera Face Mask',
      category: 'skin',
      description: 'Natural face mask using fresh aloe vera gel to soothe and hydrate skin.',
      ingredients: ['2 tbsp fresh aloe vera gel', '1 tsp honey', '1/2 tsp rose water'],
      preparation: [
        'Extract fresh aloe vera gel from the plant',
        'Mix aloe vera gel with honey in a bowl',
        'Add rose water and blend until smooth',
        'Apply evenly to clean face and neck',
        'Leave for 15-20 minutes, then rinse with cool water'
      ],
      benefits: ['Skin hydration', 'Reduces inflammation', 'Natural glow'],
      rating: 4.7,
      reviews: 203,
      prepTime: '5 mins',
      difficulty: 'Easy',
      tips: [
        'Use fresh aloe vera for best results',
        'Patch test before full application',
        'Use 2-3 times per week'
      ]
    },
    {
      id: 4,
      title: 'Eucalyptus Steam Inhalation',
      category: 'respiratory',
      description: 'Traditional steam therapy using eucalyptus oil to clear respiratory passages.',
      ingredients: ['4-5 drops eucalyptus oil', '2 cups boiling water', 'Large towel'],
      preparation: [
        'Boil water in a large bowl',
        'Add eucalyptus essential oil to the hot water',
        'Position your face 12 inches above the bowl',
        'Cover your head and bowl with a large towel',
        'Inhale steam for 10-15 minutes with eyes closed'
      ],
      benefits: ['Clears congestion', 'Reduces cough', 'Breathing relief'],
      rating: 4.5,
      reviews: 156,
      prepTime: '15 mins',
      difficulty: 'Easy',
      tips: [
        'Keep eyes closed during inhalation',
        'Take breaks if feeling dizzy',
        'Use pure eucalyptus oil only'
      ]
    },
    {
      id: 5,
      title: 'Lavender Sleep Pillow',
      category: 'stress',
      description: 'Aromatherapy pillow filled with dried lavender to promote relaxation and better sleep.',
      ingredients: ['1 cup dried lavender flowers', 'Small cotton pouch', 'Essential lavender oil (optional)'],
      preparation: [
        'Ensure lavender flowers are completely dry',
        'Fill cotton pouch with dried lavender flowers',
        'Add 2-3 drops of lavender essential oil if desired',
        'Seal the pouch securely',
        'Place near your pillow or under pillowcase'
      ],
      benefits: ['Better sleep quality', 'Stress reduction', 'Natural relaxation'],
      rating: 4.9,
      reviews: 312,
      prepTime: '5 mins',
      difficulty: 'Easy',
      tips: [
        'Replace lavender every 3-6 months',
        'Store in dry place when not in use',
        'Can also be used in drawers for fragrance'
      ]
    },
    {
      id: 6,
      title: 'Apple Cider Vinegar Tonic',
      category: 'digestive',
      description: 'Daily health tonic to support digestion and maintain healthy pH levels.',
      ingredients: ['1 tbsp apple cider vinegar', '1 cup warm water', '1 tsp honey', '1/4 tsp cinnamon'],
      preparation: [
        'Use raw, unfiltered apple cider vinegar',
        'Mix vinegar with warm (not hot) water',
        'Add honey and stir until dissolved',
        'Sprinkle cinnamon and mix well',
        'Drink 30 minutes before meals'
      ],
      benefits: ['Digestive support', 'Blood sugar balance', 'Detoxification'],
      rating: 4.4,
      reviews: 78,
      prepTime: '3 mins',
      difficulty: 'Easy',
      tips: [
        'Start with smaller amounts if new to ACV',
        'Use a straw to protect tooth enamel',
        'Choose organic, unfiltered varieties'
      ]
    },
  ];

  const filteredRemedies = remedies.filter(remedy => {
    const matchesSearch = remedy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         remedy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || remedy.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openRecipeModal = (remedy: any) => {
    setSelectedRemedy(remedy);
  };

  const closeRecipeModal = () => {
    setSelectedRemedy(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Traditional Remedies</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover time-tested natural remedies from around the world to support your health and wellness journey.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search remedies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Remedies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRemedies.map((remedy) => (
          <div key={remedy.id} className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">{remedy.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1">{remedy.rating}</span>
                    </div>
                    <User className="w-4 h-4" />
                    <span>{remedy.reviews} reviews</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{remedy.description}</p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{remedy.prepTime}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  remedy.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {remedy.difficulty}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Key Benefits:</h4>
                <div className="flex flex-wrap gap-2">
                  {remedy.benefits.map((benefit, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => openRecipeModal(remedy)}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-lg hover:shadow-md transition-all duration-200 font-medium"
            >
              View Full Recipe & Instructions
            </button>
          </div>
        ))}
      </div>

      {filteredRemedies.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No remedies found</h3>
          <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
        </div>
      )}

      {/* Recipe Modal */}
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
                    <p className="text-gray-600">Complete Recipe & Instructions</p>
                  </div>
                </div>
                <button 
                  onClick={closeRecipeModal}
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
                    onClick={closeRecipeModal}
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
    </div>
  );
};

export default Remedies;