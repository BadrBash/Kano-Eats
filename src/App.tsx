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

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prevItems, item];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((i) => (i.id === itemId ? { ...i, quantity } : i))
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  (window as any).navigateTo = handleNavigation;
  (window as any).cartState = {
    items: cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    count: cartCount,
    total: cartTotal,
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <Landing
            cartCount={cartCount}
            cartTotal={cartTotal}
          />
        );
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'restaurants':
        return <Restaurants cartCount={cartCount} />;
      case 'restaurant-details':
        return <RestaurantDetails cartCount={cartCount} />;
      case 'cart':
        return (
          <Cart
            items={cartItems}
            onRemoveItem={removeFromCart}
            onUpdateQuantity={updateCartQuantity}
            onClear={clearCart}
          />
        );
      case 'order-tracking':
        return <OrderTracking />;
      case 'vendor-dashboard':
        return <VendorDashboard />;
      case 'rider-dashboard':
        return <RiderDashboard />;
      default:
        return (
          <Landing
            cartCount={cartCount}
            cartTotal={cartTotal}
          />
        );
    }
  };

  return <>{renderPage()}</>;
}

export default App;
