import type { SVGProps } from "react";
const SvgArrowDropUpLine = ({
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
    <g clipPath="url(#arrow-drop-up-line_svg__a)">
      <path
        fill={fill}
        d="m12 11.828-2.828 2.829-1.415-1.414L12 9l4.243 4.243-1.415 1.414z"
      />
    </g>
    <defs>
      <clipPath id="arrow-drop-up-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgArrowDropUpLine;
