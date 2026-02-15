import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import RestaurantCard from '../components/cards/RestaurantCard';
import { restaurantsAPI } from '../services/api';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  cuisine: string;
}

export default function Restaurants() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cuisines = ['All', 'Local', 'Nigerian', 'Fast Food', 'Rice Dishes', 'Middle Eastern', 'Italian'];
  const ratings = ['All', '4.5+', '4.0+', '3.5+'];

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const data = await restaurantsAPI.getRestaurants();
        setRestaurants(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load restaurants');
        // Fallback to empty array
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = selectedCuisine === 'All' || restaurant.cuisine === selectedCuisine;
    const matchesRating = selectedRating === 'All' ||
                         restaurant.rating >= parseFloat(selectedRating);
    return matchesSearch && matchesCuisine && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={0} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Restaurants</h1>
          <p className="text-gray-600">Discover amazing food near you</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for restaurants or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-gray-700"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="w-5 h-5 text-gray-700" />
                <h2 className="font-semibold text-lg">Filters</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Cuisine</h3>
                  <div className="space-y-2">
                    {cuisines.map((cuisine) => (
                      <label key={cuisine} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="cuisine"
                          value={cuisine}
                          checked={selectedCuisine === cuisine}
                          onChange={(e) => setSelectedCuisine(e.target.value)}
                          className="w-4 h-4 text-orange-500"
                        />
                        <span className="text-gray-700">{cuisine}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Rating</h3>
                  <div className="space-y-2">
                    {ratings.map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={selectedRating === rating}
                          onChange={(e) => setSelectedRating(e.target.value)}
                          className="w-4 h-4 text-orange-500"
                        />
                        <span className="text-gray-700">{rating}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-xl h-64 animate-pulse" />
                ))}
              </div>
            ) : filteredRestaurants.length > 0 ? (
              <>
                <div className="mb-4 text-sm text-gray-600">
                  {filteredRestaurants.length} restaurants found
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} {...restaurant} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No restaurants found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
