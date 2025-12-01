import { useState } from 'react';
import { MapPin, Package } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { riderOrders } from '../data/mockData';

export default function RiderDashboard() {
  const [activeTab, setActiveTab] = useState('assigned');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={0} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rider Dashboard</h1>
          <p className="text-gray-600">Manage your deliveries</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-2">Today's Deliveries</p>
            <p className="text-3xl font-bold text-gray-900">12</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-2">Today's Earnings</p>
            <p className="text-3xl font-bold text-gray-900">₦4,500</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-2">Average Rating</p>
            <p className="text-3xl font-bold text-gray-900">4.8</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b">
            <div className="flex gap-4 px-6">
              <button
                onClick={() => setActiveTab('assigned')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'assigned'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Assigned Orders
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'history'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                History
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'assigned' && (
              <div className="space-y-4">
                {riderOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          {order.id}
                        </h3>
                        <p className="text-gray-600">{order.restaurant}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'picked_up'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {order.status === 'picked_up' ? 'Picked Up' : 'Assigned'}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-3">
                        <Package className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Pickup</p>
                          <p className="text-sm text-gray-600">{order.pickup}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Delivery</p>
                          <p className="text-sm text-gray-600">{order.delivery}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div>
                        <p className="text-sm text-gray-600">Distance</p>
                        <p className="font-medium text-gray-900">{order.distance}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Earnings</p>
                        <p className="font-semibold text-lg text-gray-900">
                          ₦{order.amount.toLocaleString()}
                        </p>
                      </div>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-lg transition-colors">
                        {order.status === 'picked_up' ? 'Complete' : 'Accept'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="text-center py-12 text-gray-500">
                <p>No delivery history yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
