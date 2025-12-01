import { ShoppingCart, User, MapPin, Menu } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <span className="font-bold text-xl text-gray-900">KanoEats</span>
            </a>

            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>Deliver to Nassarawa, Kano</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="/restaurants" className="text-gray-700 hover:text-orange-500 transition-colors">
              Restaurants
            </a>
            <a href="/become-rider" className="text-gray-700 hover:text-orange-500 transition-colors">
              Become a Rider
            </a>
            <a href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-orange-500 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </a>
            <a href="/login">
              <User className="w-6 h-6 text-gray-700 hover:text-orange-500 transition-colors" />
            </a>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-4">
            <a href="/restaurants" className="block text-gray-700 hover:text-orange-500">
              Restaurants
            </a>
            <a href="/become-rider" className="block text-gray-700 hover:text-orange-500">
              Become a Rider
            </a>
            <a href="/cart" className="block text-gray-700 hover:text-orange-500">
              Cart ({cartCount})
            </a>
            <a href="/login" className="block text-gray-700 hover:text-orange-500">
              Login
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
