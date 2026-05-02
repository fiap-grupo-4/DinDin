interface HeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function Heading({ title, subtitle, className = "" }: HeadingProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-brand-600 h-2 w-2" />
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
