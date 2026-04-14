import { Icon, type IconName } from "@/src/components/ui/Icon/Icon";
import * as CustomIcons from "@/src/components/ui/Icon/partials";

const iconNames = Object.keys(CustomIcons).sort() as IconName[];

export function IconCatalog() {
  return (
    <div
      className="grid gap-3"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(9.5rem, 1fr))",
      }}
    >
      {iconNames.map((name) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 rounded-lg border border-gray-300 bg-gray-200 px-2 py-3"
        >
          <Icon name={name} size={28} className="shrink-0 text-gray-800" />
          <code className="max-w-full wrap-break-word text-center text-[0.6875rem] leading-tight text-gray-700">
            {name}
          </code>
        </div>
      ))}
    </div>
  );
}
