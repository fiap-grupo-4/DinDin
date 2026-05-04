interface HeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  dotColor?: 'brand' | 'danger';
}

export function Heading({
  title,
  subtitle,
  className = '',
  dotColor = 'brand',
}: HeadingProps) {
  const dotClasses = {
    brand: 'bg-brand-600',
    danger: 'bg-danger-400',
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <span className={`rounded-full h-2 w-2 ${dotClasses[dotColor]}`} />
        <h2>{title}</h2>
      </div>
      {subtitle && (
        <p className="text-gray-700 text-body-md lg:text-heading-xs pl-4">
          {subtitle}
        </p>
      )}
    </div>
  );
}
