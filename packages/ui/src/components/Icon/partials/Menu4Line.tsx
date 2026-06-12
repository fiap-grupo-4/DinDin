import type { SVGProps } from "react";
const SvgMenu4Line = ({
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
    <g clipPath="url(#menu-4-line_svg__a)">
      <path fill={fill} d="M16 18v2H5v-2zm5-7v2H3v-2zm-2-7v2H8V4z" />
    </g>
    <defs>
      <clipPath id="menu-4-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgMenu4Line;
