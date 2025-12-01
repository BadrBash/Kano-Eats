import { Phone, MapPin } from 'lucide-react';

interface RiderCardProps {
  name: string;
  phone: string;
  image?: string;
  location?: string;
}

export default function RiderCard({ name, phone, image, location }: RiderCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-2xl font-semibold">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <Phone className="w-4 h-4" />
            <span>{phone}</span>
          </div>
          {location && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
