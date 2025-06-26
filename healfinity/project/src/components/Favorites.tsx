import React, { useState, useEffect } from 'react';
import { Heart, Star, Clock, ChefHat, Leaf, User, Trash2, ExternalLink } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';

const Favorites: React.FC = () => {
  const { getFavorites, removeFromFavorites, loading } = useDatabase();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const categories = [
    { id: 'all', name: 'All Favorites' },
    { id: 'remedy', name: 'Traditional Remedies' },
    { id: 'recipe', name: 'Recipes' },
    { id: 'yoga_session', name: 'Yoga Sessions' },
  ];

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  const handleRemoveFavorite = async (itemType: string, itemId: string) => {
    const success = await removeFromFavorites(itemType as any, itemId);
    if (success) {
      setFavorites(favorites.filter(fav => !(fav.item_type === itemType && fav.item_id === itemId)));
      alert('✅ Removed from favorites!');
    }
  };

  const filteredFavorites = favorites.filter(favorite => {
    if (selectedCategory === 'all') return true;
    return favorite.item_type === selectedCategory;
  });

  const openItemModal = (item: any) => {
    setSelectedItem(item);
  };

  const closeItemModal = () => {
    setSelectedItem(null);
  };

  const getItemIcon = (itemType: string) => {
    switch (itemType) {
      case 'remedy': return Heart;
      case 'recipe': return ChefHat;
      case 'yoga_session': return User;
      default: return Heart;
    }
  };

  const getItemColor = (itemType: string) => {
    switch (itemType) {
      case 'remedy': return 'from-green-500 to-blue-500';
      case 'recipe': return 'from-orange-500 to-red-500';
      case 'yoga_session': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Favorites</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Access all your saved remedies, recipes, and yoga sessions in one place.
        </p>
      </div>

      {/* Category Filter */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                  : 'bg-white/50 text-gray-700 hover:bg-white/70'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Favorites Grid */}
      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((favorite) => {
            const Icon = getItemIcon(favorite.item_type);
            const itemData = favorite.item_data;
            
            return (
              <div key={favorite.id} className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${getItemColor(favorite.item_type)} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {itemData.title || itemData.name || 'Favorite Item'}
                      </h3>
                      <p className="text-sm text-gray-600 capitalize">{favorite.item_type.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFavorite(favorite.item_type, favorite.item_id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                  {itemData.description || itemData.bio || 'No description available'}
                </p>

                <div className="space-y-3 mb-4">
                  {itemData.rating && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{itemData.rating}</span>
                      {itemData.reviews && <span>({itemData.reviews} reviews)</span>}
                    </div>
                  )}

                  {itemData.prepTime && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{itemData.prepTime}</span>
                    </div>
                  )}

                  {itemData.benefits && (
                    <div>
                      <div className="flex flex-wrap gap-1">
                        {itemData.benefits.slice(0, 3).map((benefit: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => openItemModal(favorite)}
                  className={`w-full bg-gradient-to-r ${getItemColor(favorite.item_type)} text-white py-3 px-4 rounded-lg hover:shadow-md transition-all duration-200 font-medium flex items-center justify-center space-x-2`}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Details</span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No favorites yet</h3>
          <p className="text-gray-600">
            {selectedCategory === 'all' 
              ? 'Start adding items to your favorites to see them here.'
              : `No ${selectedCategory.replace('_', ' ')} favorites found.`
            }
          </p>
        </div>
      )}

      {/* Item Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getItemColor(selectedItem.item_type)} rounded-lg flex items-center justify-center`}>
                    {React.createElement(getItemIcon(selectedItem.item_type), { className: "w-6 h-6 text-white" })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedItem.item_data.title || selectedItem.item_data.name || 'Favorite Item'}
                    </h2>
                    <p className="text-gray-600 capitalize">{selectedItem.item_type.replace('_', ' ')}</p>
                  </div>
                </div>
                <button 
                  onClick={closeItemModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedItem.item_data.description || selectedItem.item_data.bio || 'No description available'}
                  </p>
                </div>

                {selectedItem.item_data.ingredients && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <Leaf className="w-5 h-5 mr-2" />
                      Ingredients
                    </h3>
                    <ul className="space-y-2">
                      {selectedItem.item_data.ingredients.map((ingredient: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700">{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedItem.item_data.preparation && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Preparation Steps</h3>
                    <ol className="space-y-3">
                      {selectedItem.item_data.preparation.map((step: string, index: number) => (
                        <li key={index} className="flex space-x-3">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {selectedItem.item_data.benefits && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Benefits</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.item_data.benefits.map((benefit: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedItem.item_data.tips && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Pro Tips</h3>
                    <ul className="space-y-2">
                      {selectedItem.item_data.tips.map((tip: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button 
                    onClick={() => handleRemoveFavorite(selectedItem.item_type, selectedItem.item_id)}
                    className="flex-1 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-all duration-200 font-medium"
                  >
                    Remove from Favorites
                  </button>
                  <button 
                    onClick={closeItemModal}
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

export default Favorites;