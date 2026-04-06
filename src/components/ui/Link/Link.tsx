import NextLink, { LinkProps as NextLinkProps } from "next/link";

interface LinkProps extends NextLinkProps {
  label: string;
  className?: string;
}

export function Link({ label, className = "", ...props }: LinkProps) {
  return (
    <NextLink
      className={
        "h-6 no-underline text-brand-600 bg-transparent hover:text-brand-700 disabled:opacity-50" +
        className
      }
      {...props}
    >
      {label}
    </NextLink>
  );
}
