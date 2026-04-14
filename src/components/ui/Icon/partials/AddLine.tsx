import type { SVGProps } from "react";
const SvgAddLine = ({
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
    <g clipPath="url(#add-line_svg__a)">
      <path fill={fill} d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
    </g>
    <defs>
      <clipPath id="add-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgAddLine;
