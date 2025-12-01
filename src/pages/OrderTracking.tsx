import { MapPin, Phone } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import OrderStatusTimeline from '../components/OrderStatusTimeline';
import RiderCard from '../components/cards/RiderCard';

export default function OrderTracking() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={0} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Track Your Order</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold text-xl mb-6">Order Status</h2>
              <OrderStatusTimeline status="on_the_way" />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold text-xl mb-4">Live Tracking</h2>
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Map placeholder</p>
                  <p className="text-sm text-gray-400">Real-time tracking coming soon</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold text-xl mb-4">Order Details</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-medium">ORD-12345</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Restaurant</span>
                  <span className="font-medium">Tasty Suya Spot</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Items</span>
                  <span className="font-medium">3 items</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₦4,800</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold text-xl mb-4">Delivery Address</h2>
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900 mb-1">Home</p>
                  <p className="text-gray-600">
                    No. 45 Ahmadu Bello Way, Nassarawa, Kano
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold text-xl mb-4">Your Rider</h2>
              <RiderCard
                name="Abdullahi Musa"
                phone="0803 456 7890"
                location="2 mins away"
              />
              <button className="w-full mt-4 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors">
                <Phone className="w-5 h-5" />
                Call Rider
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
