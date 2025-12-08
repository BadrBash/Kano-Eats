import SectionHeading from '../common/SectionHeading';
import RestaurantCard from '../cards/RestaurantCard';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  cuisine: string;
}

interface ProvidersSectionProps {
  title: string;
  subtitle?: string;
  restaurants: Restaurant[];
  isLoading?: boolean;
}

export default function ProvidersSection({
  title,
  subtitle,
  restaurants,
  isLoading = false,
}: ProvidersSectionProps) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={title} subtitle={subtitle} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Placeholder for skeletons will be used when loading
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-64 animate-pulse" />
            ))
          ) : restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No restaurants available
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
