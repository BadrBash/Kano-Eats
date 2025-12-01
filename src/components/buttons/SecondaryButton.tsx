interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}

export default function SecondaryButton({
  children,
  onClick,
  className = '',
  type = 'button',
}: SecondaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-medium px-6 py-3 rounded-lg transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
}
