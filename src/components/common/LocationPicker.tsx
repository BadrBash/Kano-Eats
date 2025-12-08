import { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  address: string;
}

interface LocationPickerProps {
  onLocationChange?: (location: Location) => void;
}

const DUMMY_LOCATIONS: Location[] = [
  { id: '1', name: 'Sabon Gari', address: 'Sabon Gari, Kano' },
  { id: '2', name: 'Nassarawa', address: 'Nassarawa, Kano' },
  { id: '3', name: 'Zoo Road', address: 'Zoo Road, Kano' },
  { id: '4', name: 'France Road', address: 'France Road, Kano' },
  { id: '5', name: 'GRA', address: 'GRA, Kano' },
  { id: '6', name: 'Tarauni', address: 'Tarauni, Kano' },
];

export default function LocationPicker({ onLocationChange }: LocationPickerProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location>(DUMMY_LOCATIONS[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);
    setIsOpen(false);
    onLocationChange?.(location);
  };

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-orange-500" />
          <span className="text-sm text-gray-600">Delivering to:</span>
          <span className="font-semibold text-gray-900">{selectedLocation.name}</span>
          
          <div className="ml-auto relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1 text-orange-500 hover:text-orange-600 font-medium text-sm"
            >
              Change
              <ChevronDown className="w-4 h-4" />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-2">
                  {DUMMY_LOCATIONS.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => handleSelectLocation(location)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        selectedLocation.id === location.id
                          ? 'bg-orange-50 text-orange-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="font-medium">{location.name}</div>
                      <div className="text-xs text-gray-500">{location.address}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
