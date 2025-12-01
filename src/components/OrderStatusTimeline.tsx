import { Check } from 'lucide-react';

interface OrderStatusTimelineProps {
  status: 'preparing' | 'on_the_way' | 'delivered';
}

export default function OrderStatusTimeline({ status }: OrderStatusTimelineProps) {
  const steps = [
    { key: 'preparing', label: 'Preparing' },
    { key: 'on_the_way', label: 'On The Way' },
    { key: 'delivered', label: 'Delivered' },
  ];

  const currentStepIndex = steps.findIndex((step) => step.key === status);

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index <= currentStepIndex;
          const isActive = index === currentStepIndex;

          return (
            <div key={step.key} className="flex flex-col items-center flex-1">
              <div className="relative flex items-center w-full">
                {index > 0 && (
                  <div
                    className={`absolute right-1/2 h-1 w-full -z-10 transition-colors duration-300 ${
                      index <= currentStepIndex ? 'bg-orange-500' : 'bg-gray-200'
                    }`}
                  />
                )}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto transition-all duration-300 ${
                    isCompleted
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  } ${isActive ? 'ring-4 ring-orange-200' : ''}`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : <span>{index + 1}</span>}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-1/2 h-1 w-full -z-10 transition-colors duration-300 ${
                      index < currentStepIndex ? 'bg-orange-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
              <p
                className={`mt-2 text-sm font-medium ${
                  isActive ? 'text-orange-500' : isCompleted ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
