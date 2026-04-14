import type { SVGProps } from "react";
const SvgDivideLine = ({
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
    <g clipPath="url(#divide-line_svg__a)">
      <path
        fill={fill}
        d="M5 11h14v2H5zm7-3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"
      />
    </g>
    <defs>
      <clipPath id="divide-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgDivideLine;
