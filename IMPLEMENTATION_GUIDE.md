# Implementation Guide - New Features

## Quick Start

### 1. **RestaurantCard Component** ✅
Already existed but fully utilized in new sections.

**Location:** `/components/cards/RestaurantCard.tsx`

**Status:** Complete and integrated

---

### 2. **Providers Section Component** ✅
Displays multiple restaurant cards dynamically.

**Location:** `/components/sections/ProvidersSection.tsx`

**What It Does:**
- Shows section title and subtitle
- Renders restaurants in responsive grid (1→2→4 columns)
- Supports loading states
- Handles empty states

**Example:**
```tsx
import ProvidersSection from '@/components/sections/ProvidersSection';

<ProvidersSection
  title="Popular Restaurants"
  subtitle="Top-rated restaurants in your area"
  restaurants={restaurants}
/>
```

---

### 3. **Location Picker Component** ✅
Sticky location selector at page top.

**Location:** `/components/common/LocationPicker.tsx`

**Features:**
- Shows current delivery location
- Dropdown with 6 dummy locations
- Sticky positioning
- Ready for future geolocation

**Available Locations:**
```
- Sabon Gari
- Nassarawa
- Zoo Road
- France Road
- GRA
- Tarauni
```

**Example:**
```tsx
import LocationPicker from '@/components/common/LocationPicker';

<LocationPicker
  onLocationChange={(location) => {
    console.log('New location:', location);
  }}
/>
```

---

### 4. **Floating Cart Button** ✅
Fixed action button for cart access.

**Location:** `/components/buttons/FloatingCartButton.tsx`

**Features:**
- Fixed bottom-right position
- Shows cart count + total price
- Auto-hides when empty
- Responsive design
- Routes to cart page

**Example:**
```tsx
import FloatingCartButton from '@/components/buttons/FloatingCartButton';

<FloatingCartButton
  cartCount={2}
  cartTotal={1800}
  onClick={() => navigateTo('cart')}
/>
```

---

### 5. **Loading Skeletons** ✅
Three skeleton components for different sections.

#### 5a. RestaurantCardSkeleton
**Location:** `/components/skeletons/RestaurantCardSkeleton.tsx`

```tsx
<RestaurantCardSkeleton />
```

#### 5b. SectionSkeleton
**Location:** `/components/skeletons/SectionSkeleton.tsx`

```tsx
<SectionSkeleton itemCount={4} />
```

#### 5c. HeroSkeleton
**Location:** `/components/skeletons/HeroSkeleton.tsx`

```tsx
<HeroSkeleton />
```

---

## Updated Files

### Landing Page (`/pages/Landing.tsx`)
**Changes Made:**
1. Added LocationPicker at top
2. Added four restaurant sections:
   - Popular Restaurants
   - Your Saved Spots
   - Deals for Today
   - Nearby Vendors
3. Added FloatingCartButton
4. Updated to use SectionHeading
5. Added cart state props

**New Structure:**
```
Landing
├── Navbar
├── LocationPicker (sticky)
├── Hero Section
├── ProvidersSection (Popular)
├── Custom Section (Saved Spots)
├── ProvidersSection (Deals)
├── Custom Section (Nearby)
├── How It Works
├── CTA Section
├── Footer
└── FloatingCartButton
```

### App.tsx
**Changes Made:**
1. Added CartItem interface
2. Added cart state management
3. Implemented cart functions:
   - addToCart()
   - removeFromCart()
   - updateCartQuantity()
   - clearCart()
4. Exposed cart via window.cartState
5. Updated page components to receive cart props

**Cart API:**
```typescript
window.cartState = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  count: number;
  total: number;
}
```

---

## MockData Updates

### Enhanced Restaurants
Added `category` field to all restaurant objects:
- `'popular'` - Top-rated restaurants
- `'saved'` - Previously visited
- `'deals'` - Special offers
- `'nearby'` - Closest locations

**Example:**
```typescript
{
  id: '1',
  name: 'Tasty Suya Spot',
  image: '...',
  rating: 4.5,
  deliveryTime: '20-30',
  cuisine: 'Local',
  featured: true,
  category: 'popular'  // NEW
}
```

---

## Component Folder Structure

```
src/
├── components/
│   ├── buttons/
│   │   ├── PrimaryButton.tsx
│   │   ├── SecondaryButton.tsx
│   │   └── FloatingCartButton.tsx         [NEW]
│   ├── cards/
│   │   ├── MenuItem.tsx
│   │   ├── RestaurantCard.tsx
│   │   └── RiderCard.tsx
│   ├── common/                            [NEW FOLDER]
│   │   ├── LocationPicker.tsx
│   │   └── SectionHeading.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/                          [NEW FOLDER]
│   │   └── ProvidersSection.tsx
│   ├── skeletons/                         [NEW FOLDER]
│   │   ├── RestaurantCardSkeleton.tsx
│   │   ├── SectionSkeleton.tsx
│   │   └── HeroSkeleton.tsx
│   └── vendor/
│       └── VendorSidebar.tsx
├── pages/
│   ├── Cart.tsx
│   ├── Landing.tsx                        [UPDATED]
│   ├── Login.tsx
│   ├── OrderTracking.tsx
│   ├── Register.tsx
│   ├── RestaurantDetails.tsx
│   ├── Restaurants.tsx
│   ├── RiderDashboard.tsx
│   └── VendorDashboard.tsx
├── data/
│   └── mockData.ts                        [UPDATED]
├── utils/                                 [NEW FOLDER]
│   └── cartUtils.ts                       [NEW]
├── App.tsx                                [UPDATED]
└── index.css
```

---

## Styling Overview

### Color Scheme
- **Primary:** `orange-500`, `orange-600`
- **Secondary:** `white`, `gray-50`
- **Text:** `gray-900` (primary), `gray-600` (secondary)
- **Borders:** `gray-200`

### Responsive Breakpoints
- **Mobile:** < 640px (1 column)
- **Tablet:** 640px - 1024px (2 columns)
- **Desktop:** > 1024px (4 columns)

### Typography
- **Headings:** Bold, `text-3xl` or `text-4xl`
- **Subtitles:** `text-gray-600`
- **Card Text:** `font-semibold`, `text-sm`

### Effects
- **Shadows:** `shadow-sm` (normal), `hover:shadow-lg` (hover)
- **Animations:** `group-hover:scale-105` (image zoom)
- **Loading:** `animate-pulse` (skeleton screens)

---

## Testing Checklist

### Desktop Testing
- [ ] LocationPicker displays correctly
- [ ] FloatingCartButton appears at bottom-right
- [ ] All four sections render properly
- [ ] Hover effects work on cards
- [ ] SectionHeading alignment is correct

### Mobile Testing (< 640px)
- [ ] LocationPicker is readable
- [ ] Restaurant cards stack in single column
- [ ] FloatingCartButton shows badge
- [ ] No horizontal overflow
- [ ] Text is appropriately sized

### Tablet Testing (640px - 1024px)
- [ ] Two-column grid works
- [ ] LocationPicker is properly positioned
- [ ] FloatingCartButton is visible

### Functionality
- [ ] Location change works in LocationPicker
- [ ] FloatingCartButton routes to /cart
- [ ] Cart count updates correctly
- [ ] Cart total displays in naira (₦)

---

## Performance Tips

1. **Lazy Load Images**
   - Consider implementing lazy loading for restaurant images
   - Use `loading="lazy"` attribute on img tags

2. **Skeleton Screens**
   - Use SectionSkeleton while loading data
   - Improves perceived performance

3. **Code Splitting**
   - Sections are self-contained for easy splitting
   - Can load sections on demand

4. **LocalStorage**
   - Cart data can be persisted using cartUtils
   - Implement: `saveCartToStorage(cartItems)`

---

## Future Enhancements

### Phase 2
- [ ] Real geolocation API integration
- [ ] Search functionality
- [ ] Filter by rating, delivery time, cuisine
- [ ] Favorites/Wishlist
- [ ] Order history

### Phase 3
- [ ] Real-time order tracking
- [ ] Payment integration
- [ ] User reviews and ratings
- [ ] Restaurant analytics dashboard
- [ ] Rider app integration

---

## Common Issues & Solutions

### Issue: LocationPicker shows wrong imports
**Solution:** Ensure lucide-react is installed
```bash
npm install lucide-react
```

### Issue: FloatingCartButton not appearing
**Solution:** Check if `cartCount > 0`
The button auto-hides when cart is empty

### Issue: Cart state not syncing
**Solution:** Use `window.cartState` API
```typescript
const cart = (window as any).cartState;
cart.addToCart(item);
```

---

## Migration Guide

If upgrading from previous version:

1. **Update imports** in pages that reference old Landing
2. **Add cart props** to page components
3. **Update mockData** with category field
4. **Test thoroughly** on mobile and desktop

---

## Documentation Files

- `COMPONENTS.md` - Detailed component documentation
- `IMPLEMENTATION_GUIDE.md` - This file
- Component JSDoc comments in source files

---

## Support & Questions

Refer to the component source files for:
- TypeScript interfaces
- Prop definitions
- Usage examples
- Implementation details

Each component has clear comments explaining its purpose and usage.
