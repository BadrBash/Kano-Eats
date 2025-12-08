# Kano-Eats Component Documentation

## Overview
This document provides comprehensive documentation for all newly created components in the Kano-Eats application.

## Components

### 1. **RestaurantCard** (`/components/cards/RestaurantCard.tsx`)
A reusable component for displaying individual restaurant cards.

**Props:**
```typescript
{
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  cuisine: string;
}
```

**Features:**
- Rounded corners with shadow effects
- Hover animation (image zoom, shadow expand)
- Displays rating and delivery time
- Responsive layout
- Clickable card with navigation

**Usage:**
```tsx
<RestaurantCard
  id="1"
  name="Tasty Suya Spot"
  image="https://..."
  rating={4.5}
  deliveryTime="20-30"
  cuisine="Local"
/>
```

---

### 2. **SectionHeading** (`/components/common/SectionHeading.tsx`)
Reusable heading component for section titles.

**Props:**
```typescript
{
  title: string;
  subtitle?: string;
  centered?: boolean; // default: true
}
```

**Features:**
- Bold, responsive title text
- Optional subtitle
- Optional centered alignment
- Consistent spacing

**Usage:**
```tsx
<SectionHeading
  title="Popular Restaurants"
  subtitle="Top-rated restaurants in your area"
  centered={true}
/>
```

---

### 3. **ProvidersSection** (`/components/sections/ProvidersSection.tsx`)
Component for rendering a section of restaurants with title and layout.

**Props:**
```typescript
{
  title: string;
  subtitle?: string;
  restaurants: Restaurant[];
  isLoading?: boolean;
}
```

**Features:**
- Displays section heading
- Grid layout (responsive: 1 col mobile, 2 col tablet, 4 col desktop)
- Dynamic rendering of RestaurantCards
- Loading skeleton support
- Empty state handling

**Usage:**
```tsx
<ProvidersSection
  title="Popular Restaurants"
  subtitle="Top-rated restaurants in your area"
  restaurants={popularRestaurants}
  isLoading={isLoading}
/>
```

---

### 4. **LocationPicker** (`/components/common/LocationPicker.tsx`)
Sticky location selector component at the top of the page.

**Props:**
```typescript
{
  onLocationChange?: (location: Location) => void;
}
```

**Features:**
- Sticky positioning at top
- Shows current delivery location
- Dropdown with dummy locations
- 6 pre-defined locations in Kano
- Ready for future geolocation integration
- Mobile responsive

**Dummy Locations:**
- Sabon Gari
- Nassarawa
- Zoo Road
- France Road
- GRA
- Tarauni

**Usage:**
```tsx
<LocationPicker
  onLocationChange={(location) => {
    console.log('Selected location:', location);
  }}
/>
```

---

### 5. **FloatingCartButton** (`/components/buttons/FloatingCartButton.tsx`)
Fixed floating action button in bottom-right corner for cart access.

**Props:**
```typescript
{
  cartCount: number;
  cartTotal: number;
  onClick: () => void;
}
```

**Features:**
- Fixed positioning (bottom-right)
- Shows item count and total price
- Auto-hides when cart is empty
- Hover effects
- Mobile badge for item count
- Desktop layout shows detailed info
- Routes to /cart on click
- Accessible with aria-label

**Usage:**
```tsx
<FloatingCartButton
  cartCount={2}
  cartTotal={1800}
  onClick={() => navigateTo('cart')}
/>
```

---

### 6. **RestaurantCardSkeleton** (`/components/skeletons/RestaurantCardSkeleton.tsx`)
Loading skeleton for restaurant cards during data fetch.

**Features:**
- Matches RestaurantCard dimensions
- Uses Tailwind `animate-pulse`
- Placeholder for image, title, cuisine, rating, and delivery time
- Smooth animations

**Usage:**
```tsx
{isLoading && (
  <RestaurantCardSkeleton />
)}
```

---

### 7. **SectionSkeleton** (`/components/skeletons/SectionSkeleton.tsx`)
Loading skeleton for entire provider sections.

**Props:**
```typescript
{
  itemCount?: number; // default: 4
}
```

**Features:**
- Title placeholder
- Subtitle placeholder
- Grid of card skeletons
- Configurable item count
- Responsive grid layout

**Usage:**
```tsx
<SectionSkeleton itemCount={4} />
```

---

### 8. **HeroSkeleton** (`/components/skeletons/HeroSkeleton.tsx`)
Loading skeleton for the hero section.

**Features:**
- Hero heading skeletons
- Description placeholder
- Search bar placeholder
- Button placeholders
- Image placeholder
- Responsive layout

**Usage:**
```tsx
<HeroSkeleton />
```

---

## Updated Components

### Landing Page (`/pages/Landing.tsx`)
**Major Updates:**
- Integrated `LocationPicker` at top
- Added four new sections using `ProvidersSection`
- Integrated `FloatingCartButton`
- Added cart state props
- Uses `SectionHeading` for consistency
- Categorized restaurants by type (popular, saved, deals, nearby)

**Categories:**
1. **Popular Restaurants** - Top-rated options
2. **Your Saved Spots** - Previously visited restaurants
3. **Deals for Today** - Special offers
4. **Nearby Vendors** - Quick delivery options

---

### App.tsx
**Cart State Management:**
- Global cart state with items array
- `addToCart()` - Add items to cart
- `removeFromCart()` - Remove items
- `updateCartQuantity()` - Change quantity
- `clearCart()` - Empty entire cart
- Exposes cart via `window.cartState` for easy access
- Passes cart data to all pages

**Props to Pages:**
- `Landing`: cartCount, cartTotal
- `Restaurants`: cartCount
- `RestaurantDetails`: cartCount
- `Cart`: items, onRemoveItem, onUpdateQuantity, onClear

---

## Data Structure

### Restaurant Object
```typescript
{
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string; // "20-30" format
  cuisine: string;
  featured?: boolean;
  category: 'popular' | 'saved' | 'deals' | 'nearby';
}
```

### CartItem Object
```typescript
{
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId?: string;
}
```

---

## Utilities

### Cart Utils (`/utils/cartUtils.ts`)
- `formatNaira()` - Format currency
- `calculateCartTotal()` - Get total price
- `calculateCartCount()` - Get item count
- `getCartFromStorage()` - Retrieve from localStorage
- `saveCartToStorage()` - Save to localStorage

**Usage:**
```tsx
import { formatNaira, calculateCartTotal } from '@/utils/cartUtils';

const total = calculateCartTotal(cartItems);
const formatted = formatNaira(total); // ₦1,800
```

---

## Styling

### Tailwind Classes Used
- **Spacing:** `py-16`, `px-4`, `gap-6`, `mb-8`
- **Grid:** `grid-cols-1`, `sm:grid-cols-2`, `lg:grid-cols-4`
- **Colors:** `orange-500`, `gray-900`, `gray-600`
- **Effects:** `shadow-sm`, `hover:shadow-lg`, `animate-pulse`
- **Responsive:** Mobile-first approach with `sm:` and `lg:` breakpoints

### Custom Animations
- Image zoom on hover (using `group-hover:scale-105`)
- Shadow expansion on hover
- Pulse animation for skeletons

---

## Best Practices Implemented

✅ **Functional Components** - All components use React hooks
✅ **Composition** - Props-based customization
✅ **Reusability** - Modular, single-responsibility components
✅ **Responsive Design** - Mobile-first Tailwind approach
✅ **Accessibility** - ARIA labels, semantic HTML
✅ **Performance** - Lazy rendering, skeleton screens
✅ **Clean Code** - Clear naming, proper TypeScript types
✅ **Scalability** - Easy to extend and maintain

---

## Usage Examples

### Basic Landing Page Setup
```tsx
import Landing from './pages/Landing';

<Landing cartCount={2} cartTotal={1800} />
```

### Using Multiple Sections
```tsx
import ProvidersSection from '@/components/sections/ProvidersSection';
import { restaurants } from '@/data/mockData';

const popular = restaurants.filter(r => r.category === 'popular');

<ProvidersSection
  title="Popular"
  restaurants={popular}
  isLoading={false}
/>
```

### Adding to Cart
```tsx
const cartState = (window as any).cartState;

cartState.addToCart({
  id: '1',
  name: 'Beef Suya',
  price: 1500,
  quantity: 1,
  image: 'https://...',
});
```

---

## Future Enhancements

- [ ] Implement real geolocation in LocationPicker
- [ ] Add real-time location tracking
- [ ] Integrate payment gateway
- [ ] Add restaurant ratings/reviews
- [ ] Search and filter functionality
- [ ] Wishlist feature
- [ ] Order history
- [ ] Push notifications for delivery updates

---

## Mobile Responsiveness

All components are fully responsive:
- **Mobile (< 640px):** Single column layout
- **Tablet (640px - 1024px):** Two column grid
- **Desktop (> 1024px):** Four column grid

The LocationPicker and FloatingCartButton adapt for mobile:
- Compact text on mobile
- Full details on desktop
- Badge indicator on mobile

---

## Contact & Support
For questions or issues with these components, please refer to the main project documentation or contact the development team.
