import type { SVGProps } from "react";
const SvgStarHalfSLine = ({
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
    <g clipPath="url(#star-half-s-line_svg__a)">
      <path
        fill={fill}
        d="m12 14.656 2.817 1.72-.766-3.21 2.507-2.147-3.29-.264L12 7.708zM12 17l-5.878 3.59 1.598-6.7-5.23-4.48 6.865-.55L12 2.5l2.645 6.36 6.866.55-5.231 4.48 1.598 6.7z"
      />
    </g>
    <defs>
      <clipPath id="star-half-s-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgStarHalfSLine;
