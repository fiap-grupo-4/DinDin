import type { SVGProps } from "react";
const SvgLinkUnlinkM = ({
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
    <g clipPath="url(#link-unlink-m_svg__a)">
      <path
        fill={fill}
        d="m17.657 14.828-1.414-1.414L17.657 12a3.998 3.998 0 0 0-1.298-6.524A4 4 0 0 0 12 6.343l-1.414 1.414-1.414-1.414 1.414-1.414a6 6 0 0 1 8.485 8.485zm-2.829 2.829-1.414 1.414a5.999 5.999 0 1 1-8.485-8.485l1.414-1.414 1.414 1.414L6.343 12A4 4 0 0 0 12 17.657l1.414-1.414zm0-9.9 1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07zM5.775 2.293l1.932-.518L8.742 5.64l-1.931.518-1.036-3.864zm9.483 16.068 1.931-.518 1.036 3.864-1.932.518zM2.293 5.775l3.864 1.036-.518 1.931-3.864-1.035zm16.068 9.483 3.864 1.035-.518 1.932-3.864-1.036z"
      />
    </g>
    <defs>
      <clipPath id="link-unlink-m_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgLinkUnlinkM;
