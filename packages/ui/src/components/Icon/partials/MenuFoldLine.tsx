import type { SVGProps } from "react";
const SvgMenuFoldLine = ({
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
    <g clipPath="url(#menu-fold-line_svg__a)">
      <path
        fill={fill}
        d="M21 18v2H3v-2zM6.596 3.904 8.01 5.318 4.828 8.5l3.182 3.182-1.414 1.414L2 8.5zM21 11v2h-9v-2zm0-7v2h-9V4z"
      />
    </g>
    <defs>
      <clipPath id="menu-fold-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgMenuFoldLine;
