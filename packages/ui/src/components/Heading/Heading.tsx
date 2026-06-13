interface HeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  kind?: "default" | "danger";
}

export function Heading({
  title,
  subtitle,
  className = "",
  kind = "default",
}: HeadingProps) {
  const kinds = {
    default: "bg-brand-600",
    danger: "bg-danger-400",
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <span className={`rounded-full h-2 w-2 ${kinds[kind]}`} />
        <h2 className="text-gray-900">{title}</h2>
      </div>
      {subtitle && (
        <p className="text-gray-700 text-body-md lg:text-heading-xs pl-4">
          {subtitle}
        </p>
      )}
    </div>
  );
}
