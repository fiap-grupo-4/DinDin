import type { SVGProps } from "react";
const SvgArrowDropLeftLine = ({
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
    <g clipPath="url(#arrow-drop-left-line_svg__a)">
      <path
        fill={fill}
        d="m11.828 12 2.829 2.828-1.414 1.415L9 12l4.243-4.243 1.414 1.415z"
      />
    </g>
    <defs>
      <clipPath id="arrow-drop-left-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgArrowDropLeftLine;
