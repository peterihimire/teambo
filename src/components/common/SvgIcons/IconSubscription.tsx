import React from "react";

interface Props {
  width?: string;
  height?: string;
  cssClass?: string;
  pathCssClass?: string;
}
const IconSubscription: React.FC<Props> = ({
  width,
  height,
  cssClass,
  pathCssClass,
}) => {
  return (
    <svg
      width={width || "18"}
      height={height || "16"}
      className={`icon-group-user ${cssClass}`}
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={pathCssClass}
        d="M14.762 0H2.42004V1.19601H14.762V0Z"
        fill="#8083A3"
      />
      <path
        className={pathCssClass}
        d="M15.972 2.52502H1.20996V3.72104H15.972V2.52502Z"
        fill="#8083A3"
      />
      <path
        className={pathCssClass}
        d="M17.182 5.04987H0V16H17.182V5.04987Z"
        fill="#8083A3"
      />
    </svg>
  );
};

export default IconSubscription;
