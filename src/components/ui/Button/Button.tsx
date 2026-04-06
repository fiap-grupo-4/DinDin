type ButtonKind = "primary" | "secondary" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  kind?: ButtonKind;
}

export function Button({
  label,
  kind = "primary",
  type = "button",
  className,
  ...props
}: ButtonProps) {
  const defaultStyles =
    "h-11 py-1 px-3 border rounded-sm flex items-center gap-1 text-body-lg leading-body";

  const buttonKinds: Record<ButtonKind, string> = {
    primary:
      "text-brand-100 border-brand-600 bg-brand-600 hover:bg-brand-700 focus:bg-brand-800 disabled:opacity-50",
    secondary:
      "text-brand-600 border-brand-600 bg-white hover:border-brand-700 focus:border-brand-600 focus:text-brand-600 focus:bg-brand-100 disabled:opacity-50",
    danger:
      "text-danger-100 bg-danger-400 hover:bg-danger-500 focus:bg-danger-500 disabled:opacity-50",
    // linked: `${defaultStyles} text-brand-600 border-transparent bg-transparent hover:text-brand-700 disabled:opacity-50`,
  };

  return (
    <button
      type={type}
      className={`${defaultStyles} ${buttonKinds[kind]}  ${className ?? ""}`}
      {...props}
    >
      {label}
    </button>
  );
}
