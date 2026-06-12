import type { SVGProps } from "react";
const SvgLineHeight = ({
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
    <g clipPath="url(#line-height_svg__a)">
      <path
        fill={fill}
        d="M11 4h10v2H11zM6 7v4H4V7H1l4-4 4 4zm0 10h3l-4 4-4-4h3v-4h2zm5 1h10v2H11zm-2-7h12v2H9z"
      />
    </g>
    <defs>
      <clipPath id="line-height_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgLineHeight;
