import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { Icon, IconName } from "../Icon";

interface LinkProps extends NextLinkProps {
  label: string;
  icon?: IconName;
  className?: string;
}

export function Link({ label, className = "", icon, ...props }: LinkProps) {
  return (
    <NextLink
      className={`flex items-center gap-1 h-6 pb-1 no-underline text-body-lg leading-body text-brand-600 bg-transparent hover:text-brand-700 disabled:opacity-50 ${className}`}
      {...props}
    >
      <span className={icon ? "pb-0.5" : ""}>{label}</span>
      {icon && <Icon name={icon} size={20} />}
    </NextLink>
  );
}
