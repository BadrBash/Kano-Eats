import { useState } from 'react';
import { Search, Bike, ShoppingBag, Clock } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import LocationPicker from '../components/common/LocationPicker';
import ProvidersSection from '../components/sections/ProvidersSection';
import SectionHeading from '../components/common/SectionHeading';
import FloatingCartButton from '../components/buttons/FloatingCartButton';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import { restaurants } from '../data/mockData';

interface LandingProps {
  cartCount?: number;
  cartTotal?: number;
}

export default function Landing({ cartCount = 0, cartTotal = 0 }: LandingProps) {
  const [isLoading] = useState(false);

  // Categorize restaurants
  const popularRestaurants = restaurants.filter((r) => r.category === 'popular');
  const savedRestaurants = restaurants.filter((r) => r.category === 'saved');
  const dealsRestaurants = restaurants.filter((r) => r.category === 'deals');
  const nearbyRestaurants = restaurants.filter((r) => r.category === 'nearby');

  const handleCartClick = () => {
    (window as any).navigateTo?.('cart');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={cartCount} />
      <LocationPicker />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Your Favorite Food,
                <span className="text-orange-500"> Delivered Fast</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Get your favorite meals from the best restaurants in Kano delivered right to your doorstep.
              </p>

              <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search restaurants or dishes"
                    className="flex-1 outline-none text-gray-700"
                  />
                  <PrimaryButton>Find Food</PrimaryButton>
                </div>
              </div>

              <div className="flex gap-4 flex-wrap">
                <PrimaryButton onClick={() => (window as any).navigateTo?.('restaurants')}>
                  Order Food
                </PrimaryButton>
                <SecondaryButton onClick={() => (window as any).navigateTo?.('rider-dashboard')}>
                  Become a Rider
                </SecondaryButton>
              </div>
            </div>

            <div className="hidden md:block">
              <img
                src="https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Food delivery"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Restaurants Section */}
      <ProvidersSection
        title="Popular Restaurants"
        subtitle="Top-rated restaurants in your area"
        restaurants={popularRestaurants}
        isLoading={isLoading}
      />

      {/* Your Saved Spots Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Your Saved Spots"
            subtitle="Restaurants you've loved before"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{restaurant.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{restaurant.cuisine}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-700">
                      <span className="font-medium">★ {restaurant.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{restaurant.deliveryTime} min</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deals for Today Section */}
      <ProvidersSection
        title="Deals for Today"
        subtitle="Special offers and discounts"
        restaurants={dealsRestaurants}
        isLoading={isLoading}
      />

      {/* Nearby Vendors Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Nearby Vendors"
            subtitle="Quick delivery from your neighborhood"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nearbyRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{restaurant.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{restaurant.cuisine}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-700">
                      <span className="font-medium">★ {restaurant.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{restaurant.deliveryTime} min</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How It Works"
            subtitle="Get your food in 3 easy steps"
          />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Choose Your Food</h3>
              <p className="text-gray-600">Browse from hundreds of restaurants and cuisines</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Place Your Order</h3>
              <p className="text-gray-600">Select items and checkout securely</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bike className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your food delivered in 30 minutes or less</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Earn?</h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
            Join our network of riders and vendors. Flexible hours, great earnings.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-white text-orange-500 hover:bg-orange-50 font-medium px-8 py-3 rounded-lg transition-all duration-200">
              Become a Vendor
            </button>
            <button className="bg-orange-600 text-white hover:bg-orange-700 font-medium px-8 py-3 rounded-lg transition-all duration-200">
              Become a Rider
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating Cart Button */}
      <FloatingCartButton
        cartCount={cartCount}
        cartTotal={cartTotal}
        onClick={handleCartClick}
      />
    </div>
  );
}
