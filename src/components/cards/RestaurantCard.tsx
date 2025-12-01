import { Star, Clock } from 'lucide-react';

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  cuisine: string;
}

export default function RestaurantCard({
  id,
  name,
  image,
  rating,
  deliveryTime,
  cuisine,
}: RestaurantCardProps) {
  return (
    <a
      href={`/restaurant/${id}`}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">{name}</h3>
        <p className="text-sm text-gray-500 mb-3">{cuisine}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-gray-700">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{deliveryTime} min</span>
          </div>
        </div>
      </div>
    </a>
  );
}
