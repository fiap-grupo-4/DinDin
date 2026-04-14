import type { SVGProps } from "react";
const SvgCheckboxIndeterminateLine = ({
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
    <g clipPath="url(#checkbox-indeterminate-line_svg__a)">
      <path
        fill={fill}
        d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1m1 2v14h14V5zm2 6h10v2H7z"
      />
    </g>
    <defs>
      <clipPath id="checkbox-indeterminate-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCheckboxIndeterminateLine;
