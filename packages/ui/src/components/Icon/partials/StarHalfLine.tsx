import type { SVGProps } from "react";
const SvgStarHalfLine = ({
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
    <g clipPath="url(#star-half-line_svg__a)">
      <path
        fill={fill}
        d="m12 15.968 4.247 2.377-.949-4.773 3.573-3.305-4.833-.573L12 5.275zm0 2.292-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z"
      />
    </g>
    <defs>
      <clipPath id="star-half-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgStarHalfLine;
