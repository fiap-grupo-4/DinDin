import { Icon, IconName } from "../Icon";

type InputState = "default" | "error";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    required?: boolean;
    helperText?: string;
    iconLeft?: IconName;
    iconRight?: IconName;
    state?: InputState;
}

export function Input({
    label,
    required,
    helperText,
    placeholder,
    iconLeft,
    iconRight,
    state = "default",
    disabled,
    className = "",
    ...props
}: InputProps) {
    const baseStyles = "w-full h-11 px-3 rounded-md border-2 text-body-lg text-gray-700 outline-none transition";

    const stateStyles: Record<InputState, string> = {
        default:
            "border-gray-400 bg-white hover:border-gray-500 focus:border-brand-500",
        error:
            "border-danger-400 bg-white hover:border-danger-500 focus:border-danger-500",
    };

    const disabledStyles = "bg-gray-200 border-gray-400 cursor-not-allowed opacity-60";

  return (
        <div className="flex flex-col gap-1 w-full">
            {label && (
                <label className="text-body-md text-gray-800">
                    {label}
                    {required && <span className="text-danger-400 ml-1">*</span>}
                </label>
            )}
            <div className="relative flex items-center">
                {iconLeft && (
                    <span className="absolute left-3 text-gray-500">
                    <Icon name={iconLeft} size={20} />
                    </span>
                )}
                <input
                    className={`
                        ${baseStyles}
                        ${stateStyles[state]}
                        ${disabled ? disabledStyles : ""}
                        ${iconLeft ? "pl-10" : ""}
                        ${iconRight ? "pr-10" : ""}
                        ${className}
                    `}
                    disabled={disabled}
                    placeholder={placeholder}
                    {...props} />
                {iconRight && (
                    <span className="absolute right-3 text-gray-500">
                    <Icon name={iconRight} size={20} />
                    </span>
                )}
            </div>
            {helperText && (
                <span
                    className={`text-body-xs ${
                    state === "error" ? "text-danger-500" : "text-gray-500"
                    }`}>
                    {helperText}
                </span>
            )}
        </div>
  );
}