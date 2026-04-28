import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { Icon, IconName } from "../Icon";

interface LinkProps extends NextLinkProps {
  label: string;
  iconLeft?: IconName;
  iconRight?: IconName;
  className?: string;
}

export function Link({ label, className = "", iconLeft, iconRight, ...props }: LinkProps) {
  return (
    <NextLink
      className={`flex items-center gap-1 h-6 pb-1 no-underline text-body-lg leading-body text-brand-600 bg-transparent hover:text-brand-700 disabled:opacity-50 ${className}`}
      {...props}
    >
      {iconLeft && <Icon name={iconLeft} size={20} />}
      <span>{label}</span>
      {iconRight && <Icon name={iconRight} size={20} />}
    </NextLink>
  );
}
