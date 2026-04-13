import type { SVGProps } from "react";
const SvgMenu3Line = ({
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
    <g clipPath="url(#menu-3-line_svg__a)">
      <path fill={fill} d="M3 4h18v2H3zm6 7h12v2H9zm-6 7h18v2H3z" />
    </g>
    <defs>
      <clipPath id="menu-3-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgMenu3Line;
