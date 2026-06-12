import type { SVGProps } from "react";
const SvgArrowUpSLine = ({
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
    <g clipPath="url(#arrow-up-s-line_svg__a)">
      <path
        fill={fill}
        d="m12 10.828-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z"
      />
    </g>
    <defs>
      <clipPath id="arrow-up-s-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgArrowUpSLine;
