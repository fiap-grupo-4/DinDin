import { Icon, IconName } from "../Icon";

type SelectState = "default" | "error";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  required?: boolean;
  helperText?: string;
  iconLeft?: IconName;
  state?: SelectState;
  options: SelectOption[];
}

export function Select({
  label,
  required,
  helperText,
  iconLeft,
  state = "default",
  disabled,
  className = "",
  options,
  ...props
}: SelectProps) {
  const baseStyles =
    "w-full h-11 px-3 rounded-md border-2 text-body-lg text-gray-700 outline-none transition";

  const stateStyles: Record<SelectState, string> = {
    default:
      "border-gray-400 bg-white hover:border-gray-500 focus:border-brand-500",
    error:
      "border-danger-400 bg-white hover:border-danger-500 focus:border-danger-500",
  };

  const disabledStyles =
    "bg-gray-200 border-gray-400 cursor-not-allowed opacity-60";

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
        <select
          className={`
                    appearance-none
                    ${baseStyles}
                    ${stateStyles[state]}
                    ${disabled ? disabledStyles : ""}
                    ${iconLeft ? "pl-10" : ""}
                    pr-10
                    ${className}
            `}
          disabled={disabled}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="absolute right-3 pointer-events-none text-gray-500">
          <Icon name="ArrowDownSLine" size={20} />
        </span>
      </div>
      {helperText && (
        <span
          className={`text-body-xs ${
            state === "error" ? "text-danger-500" : "text-gray-500"
          }`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
}
