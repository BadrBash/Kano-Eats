interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-8 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </div>
  );
}
