import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import VendorSidebar from '../components/vendor/VendorSidebar';
import { orders } from '../data/mockData';

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={0} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <VendorSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Order ID
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Customer
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Items
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Total
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">
                            {order.customer}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">
                            {order.items}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">
                            ₦{order.total.toLocaleString()}
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                order.status === 'delivered'
                                  ? 'bg-green-100 text-green-700'
                                  : order.status === 'ready'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">{order.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'menu' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Menu Management</h2>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                    Add New Item
                  </button>
                </div>
                <p className="text-gray-600">Manage your menu items here</p>
              </div>
            )}

            {activeTab === 'payouts' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payouts</h2>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-orange-50 rounded-lg p-6">
                    <p className="text-sm text-gray-600 mb-2">Total Earnings</p>
                    <p className="text-2xl font-bold text-gray-900">₦450,000</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <p className="text-sm text-gray-600 mb-2">This Month</p>
                    <p className="text-2xl font-bold text-gray-900">₦125,000</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6">
                    <p className="text-sm text-gray-600 mb-2">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">₦15,000</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Restaurant Profile</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Restaurant Name
                    </label>
                    <input
                      type="text"
                      value="Tasty Suya Spot"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value="Zoo Road, Kano"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value="0803 456 7890"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
