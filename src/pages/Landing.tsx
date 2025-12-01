import { Search, Bike, ShoppingBag, Clock } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import RestaurantCard from '../components/cards/RestaurantCard';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import { restaurants } from '../data/mockData';

export default function Landing() {
  const featuredRestaurants = restaurants.filter((r) => r.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={0} />

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
                    placeholder="Enter your delivery address"
                    className="flex-1 outline-none text-gray-700"
                  />
                  <PrimaryButton>Find Food</PrimaryButton>
                </div>
              </div>

              <div className="flex gap-4">
                <PrimaryButton onClick={() => window.location.href = '/restaurants'}>
                  Order Food
                </PrimaryButton>
                <SecondaryButton onClick={() => window.location.href = '/become-rider'}>
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

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Restaurants</h2>
            <p className="text-gray-600">Popular choices in your area</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Get your food in 3 easy steps</p>
          </div>
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
    </div>
  );
}
