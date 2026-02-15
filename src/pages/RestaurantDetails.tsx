import { useState, useEffect } from 'react';
import { Star, Clock, MapPin, ShoppingCart } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MenuItem from '../components/cards/MenuItem';
import CategoryTabs from '../components/CategoryTabs';
import { menuAPI } from '../services/api';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function RestaurantDetails() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get restaurant ID from window state (you can also use URL params if using React Router)
  const restaurantId = (window as any).selectedRestaurantId || '1';

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const data = await menuAPI.getMenuItems(restaurantId);
        setMenuItems(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load menu');
        setMenuItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [restaurantId]);

  const categories = ['All', ...Array.from(new Set(menuItems.map((item) => item.category)))];

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory);

  const handleAddToCart = (itemId: string) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={cartCount} />

      <div className="relative h-64 md:h-80 bg-gray-200">
        <img
          src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Tasty Suya Spot</h1>
          <div className="flex flex-wrap gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">4.5</span>
              <span className="text-gray-500">(200+ ratings)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>20-30 min</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Zoo Road, Kano</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            {!loading && (
              <>
                <div className="mb-6">
                  <CategoryTabs
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                  />
                </div>

                {loading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="bg-gray-200 rounded-lg h-32 animate-pulse" />
                    ))}
                  </div>
                ) : filteredItems.length > 0 ? (
                  <div className="space-y-4">
                    {filteredItems.map((item) => (
                      <MenuItem key={item.id} {...item} onAdd={handleAddToCart} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No menu items available</p>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                <h2 className="font-semibold text-lg">Your Cart</h2>
              </div>

              {cartCount > 0 ? (
                <div>
                  <div className="space-y-3 mb-6">
                    {Object.entries(cart).map(([itemId, quantity]) => {
                      const item = menuItems.find((i) => i.id === itemId);
                      if (!item) return null;
                      return (
                        <div key={itemId} className="flex justify-between text-sm">
                          <span className="text-gray-700">
                            {item.name} x{quantity}
                          </span>
                          <span className="font-medium">
                            ₦{(item.price * quantity).toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between font-semibold text-lg mb-4">
                      <span>Total</span>
                      <span>
                        ₦
                        {Object.entries(cart)
                          .reduce((sum, [itemId, quantity]) => {
                            const item = menuItems.find((i) => i.id === itemId);
                            return sum + (item?.price || 0) * quantity;
                          }, 0)
                          .toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors duration-200">
                    Checkout
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
