import { ShoppingBag, Menu as MenuIcon, DollarSign, User } from 'lucide-react';

interface VendorSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function VendorSidebar({ activeTab, onTabChange }: VendorSidebarProps) {
  const menuItems = [
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'menu', label: 'Menu', icon: MenuIcon },
    { id: 'payouts', label: 'Payouts', icon: DollarSign },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Vendor Dashboard</h2>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                activeTab === item.id
                  ? 'bg-orange-50 text-orange-500'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
