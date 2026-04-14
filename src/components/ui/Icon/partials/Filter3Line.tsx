import type { SVGProps } from "react";
const SvgFilter3Line = ({
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
    <g clipPath="url(#filter-3-line_svg__a)">
      <path fill={fill} d="M10 18h4v-2h-4zM3 6v2h18V6zm3 7h12v-2H6z" />
    </g>
    <defs>
      <clipPath id="filter-3-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgFilter3Line;
