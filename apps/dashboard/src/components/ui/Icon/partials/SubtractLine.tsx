import type { SVGProps } from "react";
const SvgSubtractLine = ({
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
    <g clipPath="url(#subtract-line_svg__a)">
      <path fill={fill} d="M5 11h14v2H5z" />
    </g>
    <defs>
      <clipPath id="subtract-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgSubtractLine;
