import React, { useState } from 'react';
import { MapPin, Clock, Star, ChefHat, Leaf, Heart, Zap, BookOpen } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';

const DietRecommendations: React.FC = () => {
  const { addToFavorites } = useDatabase();
  const [selectedLocation, setSelectedLocation] = useState('current');
  const [dietaryPreference, setDietaryPreference] = useState('all');
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const [favoriteStates, setFavoriteStates] = useState<{[key: string]: boolean}>({});

  const locations = [
    { id: 'current', name: 'Current Location (New York)', cuisine: 'International' },
    { id: 'italian', name: 'Mediterranean Diet', cuisine: 'Italian/Greek' },
    { id: 'asian', name: 'Asian Wellness', cuisine: 'Japanese/Korean' },
    { id: 'indian', name: 'Ayurvedic Diet', cuisine: 'Indian' },
  ];

  const dietaryFilters = [
    { id: 'all', name: 'All Diets' },
    { id: 'vegetarian', name: 'Vegetarian' },
    { id: 'vegan', name: 'Vegan' },
    { id: 'keto', name: 'Keto' },
    { id: 'paleo', name: 'Paleo' },
    { id: 'gluten-free', name: 'Gluten-Free' },
  ];

  const allMealPlans = {
    current: [
      {
        id: 1,
        title: 'New York Style Bagel Bowl',
        category: 'breakfast',
        cuisine: 'American',
        dietary: ['vegetarian'],
        prepTime: '15 mins',
        calories: 380,
        rating: 4.6,
        image: 'https://images.pexels.com/photos/5945747/pexels-photo-5945747.jpeg?auto=compress&cs=tinysrgb&w=400',
        ingredients: ['1 whole wheat bagel', '2 tbsp cream cheese', '1 avocado', '2 eggs', 'Smoked salmon', 'Capers'],
        instructions: [
          'Toast the bagel until golden brown',
          'Spread cream cheese on both halves',
          'Slice avocado and arrange on bagel',
          'Top with smoked salmon and capers',
          'Serve with scrambled eggs on the side'
        ],
        benefits: ['High Protein', 'Omega-3 Rich', 'Satisfying'],
        description: 'Classic New York breakfast with a healthy twist.',
        nutritionFacts: { protein: '22g', carbs: '35g', fat: '18g', fiber: '8g' }
      },
      {
        id: 2,
        title: 'Manhattan Green Smoothie',
        category: 'breakfast',
        cuisine: 'American',
        dietary: ['vegan', 'gluten-free'],
        prepTime: '5 mins',
        calories: 280,
        rating: 4.4,
        image: 'https://images.pexels.com/photos/5945747/pexels-photo-5945747.jpeg?auto=compress&cs=tinysrgb&w=400',
        ingredients: ['2 cups spinach', '1 banana', '1 cup almond milk', '1 tbsp almond butter', '1/2 cup berries'],
        instructions: [
          'Add all ingredients to blender',
          'Blend until smooth and creamy',
          'Add ice if desired consistency',
          'Pour into glass and serve immediately'
        ],
        benefits: ['Energy Boost', 'Antioxidant Rich', 'Quick Prep'],
        description: 'Energizing smoothie perfect for busy New York mornings.',
        nutritionFacts: { protein: '8g', carbs: '32g', fat: '12g', fiber: '10g' }
      }
    ],
    italian: [
      {
        id: 3,
        title: 'Mediterranean Quinoa Bowl',
        category: 'lunch',
        cuisine: 'Mediterranean',
        dietary: ['vegetarian', 'gluten-free'],
        prepTime: '25 mins',
        calories: 420,
        rating: 4.8,
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
        ingredients: ['1 cup quinoa', '1 can chickpeas', '3 tbsp olive oil', '2 tomatoes', '1 cucumber', '100g feta cheese'],
        instructions: [
          'Cook quinoa according to package instructions',
          'Drain and rinse chickpeas',
          'Dice tomatoes and cucumber',
          'Mix quinoa with vegetables',
          'Add olive oil and herbs',
          'Top with crumbled feta cheese'
        ],
        benefits: ['Anti-inflammatory', 'Heart Healthy', 'High Protein'],
        description: 'A nutrient-dense bowl combining ancient grains with fresh vegetables.',
        nutritionFacts: { protein: '18g', carbs: '45g', fat: '22g', fiber: '12g' }
      },
      {
        id: 4,
        title: 'Italian Herb Pasta',
        category: 'dinner',
        cuisine: 'Mediterranean',
        dietary: ['vegetarian'],
        prepTime: '20 mins',
        calories: 450,
        rating: 4.7,
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
        ingredients: ['200g whole wheat pasta', '2 tbsp olive oil', 'Fresh basil', 'Cherry tomatoes', 'Parmesan cheese'],
        instructions: [
          'Cook pasta according to package directions',
          'Heat olive oil in large pan',
          'Add cherry tomatoes and cook until soft',
          'Toss pasta with tomatoes and herbs',
          'Top with fresh parmesan cheese'
        ],
        benefits: ['Heart Healthy', 'Antioxidant Rich', 'Comfort Food'],
        description: 'Traditional Italian pasta with fresh herbs and tomatoes.',
        nutritionFacts: { protein: '16g', carbs: '65g', fat: '18g', fiber: '8g' }
      }
    ],
    asian: [
      {
        id: 5,
        title: 'Japanese Salmon Bowl',
        category: 'dinner',
        cuisine: 'Japanese',
        dietary: ['keto', 'paleo'],
        prepTime: '20 mins',
        calories: 450,
        rating: 4.9,
        image: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=400',
        ingredients: ['200g wild salmon', '1 avocado', '2 tbsp seaweed', '1/2 cup brown rice', '1/2 cup edamame'],
        instructions: [
          'Season salmon with salt and pepper',
          'Pan-sear salmon for 4 minutes each side',
          'Cook brown rice according to package',
          'Steam edamame until tender',
          'Slice avocado and arrange in bowl',
          'Top with sesame seeds and seaweed'
        ],
        benefits: ['Omega-3 Rich', 'Brain Health', 'Muscle Building'],
        description: 'Japanese-inspired bowl loaded with healthy fats and clean protein.',
        nutritionFacts: { protein: '35g', carbs: '25g', fat: '28g', fiber: '10g' }
      },
      {
        id: 6,
        title: 'Korean Bibimbap',
        category: 'lunch',
        cuisine: 'Korean',
        dietary: ['vegetarian'],
        prepTime: '30 mins',
        calories: 380,
        rating: 4.6,
        image: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=400',
        ingredients: ['1 cup brown rice', 'Mixed vegetables', 'Sesame oil', 'Soy sauce', 'Kimchi', '1 egg'],
        instructions: [
          'Cook brown rice until fluffy',
          'Sauté mixed vegetables separately',
          'Arrange vegetables over rice',
          'Top with fried egg',
          'Drizzle with sesame oil and soy sauce',
          'Serve with kimchi on the side'
        ],
        benefits: ['Probiotic Rich', 'Balanced Nutrition', 'Digestive Health'],
        description: 'Traditional Korean mixed rice bowl with fermented vegetables.',
        nutritionFacts: { protein: '14g', carbs: '52g', fat: '16g', fiber: '8g' }
      }
    ],
    indian: [
      {
        id: 7,
        title: 'Turmeric Golden Rice',
        category: 'dinner',
        cuisine: 'Indian',
        dietary: ['vegetarian'],
        prepTime: '30 mins',
        calories: 380,
        rating: 4.7,
        image: 'https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=400',
        ingredients: ['1 cup basmati rice', '1 tsp turmeric', '1 cup coconut milk', '2 cups mixed vegetables', '2 tbsp ghee'],
        instructions: [
          'Rinse basmati rice until water runs clear',
          'Heat ghee in a heavy-bottomed pot',
          'Add rice and toast for 2 minutes',
          'Add turmeric and spices',
          'Pour in coconut milk and water',
          'Simmer covered for 18 minutes'
        ],
        benefits: ['Anti-inflammatory', 'Digestive Health', 'Comfort Food'],
        description: 'Traditional Ayurvedic recipe that promotes healing and digestive wellness.',
        nutritionFacts: { protein: '12g', carbs: '58g', fat: '16g', fiber: '8g' }
      },
      {
        id: 8,
        title: 'Ayurvedic Breakfast Bowl',
        category: 'breakfast',
        cuisine: 'Indian',
        dietary: ['vegetarian', 'gluten-free'],
        prepTime: '15 mins',
        calories: 320,
        rating: 4.5,
        image: 'https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=400',
        ingredients: ['1/2 cup oats', '1 cup almond milk', '1 tsp turmeric', '1 tbsp honey', 'Mixed nuts', 'Fresh fruits'],
        instructions: [
          'Cook oats with almond milk',
          'Add turmeric and mix well',
          'Sweeten with honey',
          'Top with mixed nuts and fruits',
          'Serve warm for best digestion'
        ],
        benefits: ['Digestive Health', 'Anti-inflammatory', 'Sustained Energy'],
        description: 'Warming Ayurvedic breakfast to balance your doshas.',
        nutritionFacts: { protein: '10g', carbs: '45g', fat: '14g', fiber: '8g' }
      }
    ]
  };

  const getMealPlansForLocation = () => {
    return allMealPlans[selectedLocation as keyof typeof allMealPlans] || allMealPlans.current;
  };

  const filteredMealPlans = getMealPlansForLocation().filter(meal => {
    if (dietaryPreference === 'all') return true;
    return meal.dietary.includes(dietaryPreference);
  });

  const openMealModal = (meal: any) => {
    setSelectedMeal(meal);
  };

  const closeMealModal = () => {
    setSelectedMeal(null);
  };

  const handleAddToFavorites = async (meal: any) => {
    const success = await addToFavorites('recipe', meal.id.toString(), meal);
    if (success) {
      setFavoriteStates(prev => ({ ...prev, [meal.id]: true }));
      alert('✅ Added to favorites!');
    } else {
      alert('❌ Failed to add to favorites. It might already be saved.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Diet & Nutrition</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover personalized meal plans and detailed cooking instructions based on your location and dietary preferences.
        </p>
      </div>

      {/* Location and Dietary Filters */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <MapPin className="w-4 h-4 inline mr-2" />
              Location-Based Cuisine
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {locations.map(location => (
                <option key={location.id} value={location.id}>{location.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Leaf className="w-4 h-4 inline mr-2" />
              Dietary Preference
            </label>
            <select
              value={dietaryPreference}
              onChange={(e) => setDietaryPreference(e.target.value)}
              className="w-full p-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {dietaryFilters.map(filter => (
                <option key={filter.id} value={filter.id}>{filter.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Personalized Meal Plans */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <ChefHat className="w-5 h-5 mr-2" />
          Personalized Meal Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMealPlans.map((meal) => (
            <div key={meal.id} className="bg-white/50 rounded-lg overflow-hidden border border-white/20 hover:shadow-lg transition-all duration-300 group">
              <div className="relative">
                <img
                  src={meal.image}
                  alt={meal.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    meal.category === 'breakfast' ? 'bg-yellow-100 text-yellow-700' :
                    meal.category === 'lunch' ? 'bg-green-100 text-green-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {meal.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-white text-xs font-medium">{meal.rating}</span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">{meal.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{meal.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{meal.prepTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 mr-1" />
                    <span>{meal.calories} cal</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {meal.benefits.map((benefit, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      {benefit}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1">
                  {meal.dietary.map((diet, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {diet}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  <button 
                    onClick={() => openMealModal(meal)}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:shadow-md transition-all duration-200 font-medium"
                  >
                    View Recipe & Instructions
                  </button>
                  <button 
                    onClick={() => handleAddToFavorites(meal)}
                    disabled={favoriteStates[meal.id]}
                    className={`w-full py-2 px-4 rounded-lg transition-all duration-200 font-medium ${
                      favoriteStates[meal.id] 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                        : 'bg-white/70 text-gray-700 hover:bg-white/90'
                    }`}
                  >
                    {favoriteStates[meal.id] ? 'Added to Favorites' : 'Add to Favorites'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Meal Planning */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-gray-900 mb-6">This Week's Meal Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
            <div key={day} className="bg-white/50 rounded-lg p-4 border border-white/20">
              <h3 className="font-medium text-gray-900 mb-3 text-center">{day.slice(0, 3)}</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-yellow-50 rounded text-yellow-700 cursor-pointer hover:bg-yellow-100">
                  <div className="font-medium">Breakfast</div>
                  <div className="text-xs">Green Smoothie</div>
                </div>
                <div className="p-2 bg-green-50 rounded text-green-700 cursor-pointer hover:bg-green-100">
                  <div className="font-medium">Lunch</div>
                  <div className="text-xs">Mediterranean Bowl</div>
                </div>
                <div className="p-2 bg-purple-50 rounded text-purple-700 cursor-pointer hover:bg-purple-100">
                  <div className="font-medium">Dinner</div>
                  <div className="text-xs">Salmon & Veggies</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recipe Modal */}
      {selectedMeal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedMeal.title}</h2>
                    <p className="text-gray-600">Complete Recipe & Nutrition Info</p>
                  </div>
                </div>
                <button 
                  onClick={closeMealModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <Leaf className="w-5 h-5 mr-2" />
                      Ingredients
                    </h3>
                    <ul className="space-y-2">
                      {selectedMeal.ingredients.map((ingredient: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700">{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Instructions
                    </h3>
                    <ol className="space-y-3">
                      {selectedMeal.instructions.map((step: string, index: number) => (
                        <li key={index} className="flex space-x-3">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Nutrition Facts</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Calories</span>
                        <span className="font-medium">{selectedMeal.calories}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Protein</span>
                        <span className="font-medium">{selectedMeal.nutritionFacts.protein}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Carbohydrates</span>
                        <span className="font-medium">{selectedMeal.nutritionFacts.carbs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fat</span>
                        <span className="font-medium">{selectedMeal.nutritionFacts.fat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fiber</span>
                        <span className="font-medium">{selectedMeal.nutritionFacts.fiber}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Health Benefits</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMeal.benefits.map((benefit: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={() => handleAddToFavorites(selectedMeal)}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-lg hover:shadow-md transition-all duration-200 font-medium"
                    >
                      Add to Favorites
                    </button>
                    <button 
                      onClick={closeMealModal}
                      className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietRecommendations;