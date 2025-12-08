export default function RestaurantCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-200" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        
        {/* Cuisine */}
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        
        {/* Rating and delivery time */}
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}
