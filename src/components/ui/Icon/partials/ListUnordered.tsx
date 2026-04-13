import type { SVGProps } from "react";
const SvgListUnordered = ({
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
    <g clipPath="url(#list-unordered_svg__a)">
      <path
        fill={fill}
        d="M8 4h13v2H8zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M8 11h13v2H8zm0 7h13v2H8z"
      />
    </g>
    <defs>
      <clipPath id="list-unordered_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgListUnordered;
