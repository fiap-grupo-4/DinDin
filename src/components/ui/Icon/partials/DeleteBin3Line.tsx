import type { SVGProps } from "react";
const SvgDeleteBin3Line = ({
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
    <g clipPath="url(#delete-bin-3-line_svg__a)">
      <path
        fill={fill}
        d="M20 7v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7H2V5h20v2zM6 7v13h12V7zm5 2h2v2h-2zm0 3h2v2h-2zm0 3h2v2h-2zM7 2h10v2H7z"
      />
    </g>
    <defs>
      <clipPath id="delete-bin-3-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgDeleteBin3Line;
