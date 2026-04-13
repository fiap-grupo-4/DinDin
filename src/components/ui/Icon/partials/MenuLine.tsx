import type { SVGProps } from "react";
const SvgMenuLine = ({
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
    <g clipPath="url(#menu-line_svg__a)">
      <path fill={fill} d="M3 4h18v2H3zm0 7h18v2H3zm0 7h18v2H3z" />
    </g>
    <defs>
      <clipPath id="menu-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgMenuLine;
