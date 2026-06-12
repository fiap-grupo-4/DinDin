import type { SVGProps } from "react";
const SvgMenu5Line = ({
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
    <g clipPath="url(#menu-5-line_svg__a)">
      <path fill={fill} d="M18 18v2H6v-2zm3-7v2H3v-2zm-3-7v2H6V4z" />
    </g>
    <defs>
      <clipPath id="menu-5-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgMenu5Line;
