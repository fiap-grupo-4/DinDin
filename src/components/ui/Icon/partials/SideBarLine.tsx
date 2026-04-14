import type { SVGProps } from "react";
const SvgSideBarLine = ({
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
    <g clipPath="url(#side-bar-line_svg__a)">
      <path
        fill={fill}
        d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1m5 2H4v14h4zm2 0v14h10V5z"
      />
    </g>
    <defs>
      <clipPath id="side-bar-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgSideBarLine;
