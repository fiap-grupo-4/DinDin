import type { SVGProps } from "react";
const SvgToggleLine = ({
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
    <g clipPath="url(#toggle-line_svg__a)">
      <path
        fill={fill}
        d="M8 7a5 5 0 1 0 0 10h8a5 5 0 1 0 0-10zm0-2h8a7 7 0 1 1 0 14H8A7 7 0 1 1 8 5m0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6"
      />
    </g>
    <defs>
      <clipPath id="toggle-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgToggleLine;
