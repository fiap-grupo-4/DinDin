import type { SVGProps } from "react";
const SvgPencilLine = ({
  fill = "currentColor",
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <g clipPath="url(#pencil-line_svg__a)">
      <path
        fill={fill}
        d="m13.107 8.072-1.179-1.179-7.761 7.762v1.178h1.178zm1.178-1.179 1.178-1.178-1.178-1.178-1.178 1.178zM6.035 17.5H2.5v-3.536L13.696 2.768a.833.833 0 0 1 1.178 0l2.358 2.358a.833.833 0 0 1 0 1.178z"
      />
    </g>
    <defs>
      <clipPath id="pencil-line_svg__a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgPencilLine;
