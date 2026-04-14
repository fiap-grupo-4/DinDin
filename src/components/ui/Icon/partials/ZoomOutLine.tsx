import type { SVGProps } from "react";
const SvgZoomOutLine = ({
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
    <g clipPath="url(#zoom-out-line_svg__a)">
      <path
        fill={fill}
        d="m18.031 16.617 4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617m-2.006-.742A6.98 6.98 0 0 0 18 11c0-3.868-3.133-7-7-7s-7 3.132-7 7 3.132 7 7 7a6.98 6.98 0 0 0 4.875-1.975zM7 10h8v2H7z"
      />
    </g>
    <defs>
      <clipPath id="zoom-out-line_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgZoomOutLine;
