import * as CustomIcons from "./partials";

const allIcons = { ...CustomIcons } as const;

export type IconName = keyof typeof allIcons;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({
  name,
  size,
  viewBox = "0 0 24 24",
  ...props
}: IconProps) {
  const IconComponent = allIcons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }

  if (size === undefined) {
    return <IconComponent {...props} />;
  }

  return (
    <IconComponent {...props} width={size} height={size} viewBox={viewBox} />
  );
}
