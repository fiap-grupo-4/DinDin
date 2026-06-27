import { default as BaseLogo } from "./BaseLogo";

type LogoType = "light" | "brand" | "dark";

interface LogoProps {
  kind?: LogoType;
  className?: string;
}

export function Logo({ kind = "light", className = "" }: LogoProps) {
  const logoKinds: Record<LogoType, string> = {
    light: "text-white",
    dark: "text-black",
    brand: "text-brand-500",
  };
  return (
    <span>
      <BaseLogo className={`w-44 ${logoKinds[kind]} ${className}`} />
    </span>
  );
}
