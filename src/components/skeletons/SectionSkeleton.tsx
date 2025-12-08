import RestaurantCardSkeleton from './RestaurantCardSkeleton';

interface SectionSkeletonProps {
  itemCount?: number;
}

export default function SectionSkeleton({ itemCount = 4 }: SectionSkeletonProps) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title skeleton */}
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-2 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto animate-pulse" />
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: itemCount }).map((_, i) => (
            <RestaurantCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
