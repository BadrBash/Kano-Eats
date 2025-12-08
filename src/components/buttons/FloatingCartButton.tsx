import { ShoppingCart } from 'lucide-react';

interface FloatingCartButtonProps {
  cartCount: number;
  cartTotal: number;
  onClick: () => void;
}

export default function FloatingCartButton({
  cartCount,
  cartTotal,
  onClick,
}: FloatingCartButtonProps) {
  // Hide button if cart is empty
  if (cartCount === 0) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 z-30 flex items-center gap-3 group"
      aria-label="View shopping cart"
    >
      <div className="flex items-center gap-3">
        <ShoppingCart className="w-6 h-6" />
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm font-semibold">{cartCount} item{cartCount !== 1 ? 's' : ''}</span>
          <span className="text-xs text-orange-100">₦{cartTotal.toLocaleString()}</span>
        </div>
        {/* Badge for mobile */}
        <div className="sm:hidden absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {cartCount}
        </div>
      </div>
    </button>
  );
}
