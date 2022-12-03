import React from "react";

interface Props {
  width?: string;
  height?: string;
  cssClass?: string;
  pathCssClass?: string;
}
const IconReports: React.FC<Props> = ({
  width,
  height,
  cssClass,
  pathCssClass,
}) => {
  return (
    <svg
      width={width ? width : "16"}
      height={height ? height : "16"}
      className={`icon-user-circle ${cssClass}`}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={pathCssClass}
        d="M11.6523 5.25H15.3477V15.3477H11.6523V5.25ZM0.652344 15.3477V8H4.34766V15.3477H0.652344ZM6.15234 15.3477V0.652344H9.84766V15.3477H6.15234Z"
        fill="#8083A3"
      />
    </svg>
  );
};

export default IconReports;
