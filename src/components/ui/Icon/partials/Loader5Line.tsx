import type { SVGProps } from "react";
const SvgLoader5Line = ({
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
    <g clipPath="url(#loader-5-line_svg__a)">
      <path fill={fill} d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7z" />
    </g>
    <defs>
      <clipPath id="loader-5-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgLoader5Line;
