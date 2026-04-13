import type { SVGProps } from "react";
const SvgFunctionLine = ({
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
    <g clipPath="url(#function-line_svg__a)">
      <path
        fill={fill}
        d="M3 3h8v8H3zm0 10h8v8H3zM13 3h8v8h-8zm0 10h8v8h-8zm2-8v4h4V5zm0 10v4h4v-4zM5 5v4h4V5zm0 10v4h4v-4z"
      />
    </g>
    <defs>
      <clipPath id="function-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgFunctionLine;
