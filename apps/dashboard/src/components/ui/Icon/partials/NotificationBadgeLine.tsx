import type { SVGProps } from "react";
const SvgNotificationBadgeLine = ({
  fill = "currentColor",
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#notification-badge-line_svg__a)">
      <path
        fill={fill}
        d="M13.341 4A6 6 0 0 0 13 6H5v14h14v-8c.681 0 1.358-.114 2-.341V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM19 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8"
      />
    </g>
    <defs>
      <clipPath id="notification-badge-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgNotificationBadgeLine;
