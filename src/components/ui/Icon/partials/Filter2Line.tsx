import type { SVGProps } from "react";
const SvgFilter2Line = ({
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
    <g clipPath="url(#filter-2-line_svg__a)">
      <path
        fill={fill}
        d="M14 14v6l-4 2v-8L4 5V3h16v2zM6.404 5 12 13.394 17.596 5z"
      />
    </g>
    <defs>
      <clipPath id="filter-2-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgFilter2Line;
