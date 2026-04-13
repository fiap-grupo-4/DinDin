import type { SVGProps } from "react";
const SvgMenuUnfoldLine = ({
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
    <g clipPath="url(#menu-unfold-line_svg__a)">
      <path
        fill={fill}
        d="M21 18v2H3v-2zM17.404 3.904 22 8.5l-4.596 4.596-1.414-1.414L19.172 8.5 15.99 5.318zM12 11v2H3v-2zm0-7v2H3V4z"
      />
    </g>
    <defs>
      <clipPath id="menu-unfold-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgMenuUnfoldLine;
