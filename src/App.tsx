import { useState } from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Restaurants from './pages/Restaurants';
import RestaurantDetails from './pages/RestaurantDetails';
import Cart from './pages/Cart';
import OrderTracking from './pages/OrderTracking';
import VendorDashboard from './pages/VendorDashboard';
import RiderDashboard from './pages/RiderDashboard';

type Page =
  | 'landing'
  | 'login'
  | 'register'
  | 'restaurants'
  | 'restaurant-details'
  | 'cart'
  | 'order-tracking'
  | 'vendor-dashboard'
  | 'rider-dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  (window as any).navigateTo = handleNavigation;

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing />;
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'restaurants':
        return <Restaurants />;
      case 'restaurant-details':
        return <RestaurantDetails />;
      case 'cart':
        return <Cart />;
      case 'order-tracking':
        return <OrderTracking />;
      case 'vendor-dashboard':
        return <VendorDashboard />;
      case 'rider-dashboard':
        return <RiderDashboard />;
      default:
        return <Landing />;
    }
  };

  return <>{renderPage()}</>;
}

export default App;
