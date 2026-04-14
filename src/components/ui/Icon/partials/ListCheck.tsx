import type { SVGProps } from "react";
const SvgListCheck = ({
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
    <g clipPath="url(#list-check_svg__a)">
      <path
        fill={fill}
        d="M8 4h13v2H8zm-5-.5h3v3H3zm0 7h3v3H3zm0 7h3v3H3zM8 11h13v2H8zm0 7h13v2H8z"
      />
    </g>
    <defs>
      <clipPath id="list-check_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgListCheck;
