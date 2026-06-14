import type { SVGProps } from "react";
const SvgArrowLeftUpLine = ({
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
    <g clipPath="url(#arrow-left-up-line_svg__a)">
      <path
        fill={fill}
        d="m9.414 8 8.607 8.607-1.414 1.414L8 9.414V17H6V6h11v2z"
      />
    </g>
    <defs>
      <clipPath id="arrow-left-up-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgArrowLeftUpLine;
