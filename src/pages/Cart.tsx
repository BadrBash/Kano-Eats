import { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CartSummary from '../components/CartSummary';
import { ordersAPI, isAuthenticated } from '../services/api';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  items?: CartItem[];
  onRemoveItem?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onClear?: () => void;
}

export default function Cart({ items = [], onRemoveItem, onUpdateQuantity, onClear }: CartProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cartItems = items;
  const deliveryFee = 500;

  const updateQuantity = (id: string, change: number) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
      const newQuantity = Math.max(0, item.quantity + change);
      onUpdateQuantity?.(id, newQuantity);
    }
  };

  const removeItem = (id: string) => {
    onRemoveItem?.(id);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + deliveryFee;

  const handleCheckout = async () => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      setError('Please log in to place an order');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Create order with API
      const orderData = {
        items: cartItems.map(item => ({
          menuItemId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        deliveryFee,
        total,
      };

      const response = await ordersAPI.createOrder(orderData);
      
      if (response && response.id) {
        // Clear cart on successful order
        onClear?.();
        // Navigate to order tracking
        (window as any).navigateTo?.('order-tracking');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to place order. Please try again.';
      setError(errorMsg);
      console.error('Order creation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={cartItems.length} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center justify-between">
            <span>{error}</span>
            {error.includes('log in') && (
              <button 
                onClick={() => (window as any).navigateTo?.('login')}
                className="ml-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded font-medium whitespace-nowrap"
              >
                Go to Login
              </button>
            )}
          </div>
        )}

        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-600"
                        disabled={loading}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-4">₦{item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                        disabled={loading}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                        disabled={loading}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>₦{deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading || cartItems.length === 0}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
            <button
              onClick={() => (window as any).navigateTo?.('restaurants')}
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Browse Restaurants
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
