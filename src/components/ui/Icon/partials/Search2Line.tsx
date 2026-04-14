import type { SVGProps } from "react";
const SvgSearch2Line = ({
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
    <g clipPath="url(#search-2-line_svg__a)">
      <path
        fill={fill}
        d="M11 2c4.968 0 9 4.032 9 9s-4.032 9-9 9-9-4.032-9-9 4.032-9 9-9m0 16c3.867 0 7-3.133 7-7s-3.133-7-7-7-7 3.132-7 7 3.132 7 7 7m8.485.071 2.829 2.828-1.415 1.415-2.828-2.829z"
      />
    </g>
    <defs>
      <clipPath id="search-2-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgSearch2Line;
