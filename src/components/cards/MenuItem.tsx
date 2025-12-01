import { Plus } from 'lucide-react';

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  onAdd: (id: string) => void;
}

export default function MenuItem({
  id,
  name,
  description,
  price,
  image,
  onAdd,
}: MenuItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex">
      <div className="w-32 h-32 flex-shrink-0">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">{name}</h4>
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">{description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-900">₦{price.toLocaleString()}</span>
          <button
            onClick={() => onAdd(id)}
            className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
