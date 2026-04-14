import type { SVGProps } from "react";
const SvgArrowDropRightLine = ({
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
    <g clipPath="url(#arrow-drop-right-line_svg__a)">
      <path
        fill={fill}
        d="M12.172 12 9.343 9.172l1.414-1.415L15 12l-4.243 4.243-1.414-1.415z"
      />
    </g>
    <defs>
      <clipPath id="arrow-drop-right-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgArrowDropRightLine;
