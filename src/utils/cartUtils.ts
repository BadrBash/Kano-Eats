/**
 * Cart Management Utilities
 * Provides helper functions for managing cart operations
 */

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId?: string;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  count: number;
  total: number;
}

/**
 * Format currency for Naira
 */
export const formatNaira = (amount: number): string => {
  return `₦${amount.toLocaleString('en-NG')}`;
};

/**
 * Calculate cart total
 */
export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

/**
 * Calculate cart count
 */
export const calculateCartCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

/**
 * Get cart from localStorage
 */
export const getCartFromStorage = (): CartItem[] => {
  try {
    const stored = localStorage.getItem('kano_eats_cart');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error retrieving cart from localStorage:', error);
    return [];
  }
};

/**
 * Save cart to localStorage
 */
export const saveCartToStorage = (items: CartItem[]): void => {
  try {
    localStorage.setItem('kano_eats_cart', JSON.stringify(items));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};
