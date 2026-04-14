import type { SVGProps } from "react";
const SvgArrowDownSLine = ({
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
    <g clipPath="url(#arrow-down-s-line_svg__a)">
      <path
        fill={fill}
        d="m12 13.172 4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"
      />
    </g>
    <defs>
      <clipPath id="arrow-down-s-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgArrowDownSLine;
