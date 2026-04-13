import { Icon, IconName } from "../Icon";

type ButtonKind = "primary" | "secondary" | "danger";
type ButtonSize = "md" | "sm";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: IconName;
  size?: ButtonSize;
  kind?: ButtonKind;
}

export function Button({
  label,
  kind = "primary",
  size = "md",
  type = "button",
  className = "",
  icon,
  ...props
}: ButtonProps) {
  const buttonSize = size === "md" ? "h-11" : "h-8";

  const buttonKinds: Record<ButtonKind, string> = {
    primary:
      "text-brand-100 border-brand-600 bg-brand-600 hover:bg-brand-700 focus:bg-brand-800 disabled:opacity-50 disabled:bg-brand-600 disabled:cursor-not-allowed",
    secondary:
      "text-brand-600 border-brand-600 bg-white hover:border-brand-700 hover:text-brand-700 focus:border-brand-600 focus:text-brand-600 focus:bg-brand-100 disabled:opacity-50 disabled:text-brand-600 disabled:border-brand-600 disabled:cursor-not-allowed",
    danger:
      "text-danger-100 bg-danger-400 hover:bg-danger-500 focus:bg-danger-500 disabled:opacity-50 disabled:bg-danger-400 disabled:cursor-not-allowed",
  };

  return (
    <button
      type={type}
      className={`py-1 px-3 border rounded-sm flex items-center gap-1 text-body-lg leading-body ${buttonSize} ${buttonKinds[kind]} ${className}`}
      {...props}
    >
      <span className={icon ? "pb-px" : ""}>{label}</span>
      {icon && <Icon name={icon} />}
    </button>
  );
}
