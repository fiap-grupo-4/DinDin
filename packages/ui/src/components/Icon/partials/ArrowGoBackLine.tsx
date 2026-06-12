import type { SVGProps } from "react";
const SvgArrowGoBackLine = ({
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
    <g clipPath="url(#arrow-go-back-line_svg__a)">
      <path
        fill={fill}
        d="m5.828 7 2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 0 1 0 16H4v-2h9a6 6 0 1 0 0-12z"
      />
    </g>
    <defs>
      <clipPath id="arrow-go-back-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgArrowGoBackLine;
