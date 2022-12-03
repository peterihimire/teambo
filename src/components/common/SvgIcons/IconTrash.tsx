import React from "react";

interface Props {
  width?: string;
  height?: string;
  cssClass?: string;
  pathCssClass?: string;
}
const IconTrash: React.FC<Props> = ({
  width,
  height,
  cssClass,
  pathCssClass,
}) => {
  return (
    <svg
      width={width || "14"}
      height={height || "18"}
      className={`icon-trash ${cssClass}`}
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={pathCssClass}
        d="M13.4023 1.65234V3.5H0.597656V1.65234H3.77734L4.72266 0.75H9.27734L10.2227 1.65234H13.4023ZM1.5 15.4023V4.40234H12.5V15.4023C12.5 15.8893 12.3138 16.319 11.9414 16.6914C11.569 17.0638 11.1393 17.25 10.6523 17.25H3.34766C2.86068 17.25 2.43099 17.0638 2.05859 16.6914C1.6862 16.319 1.5 15.8893 1.5 15.4023Z"
        fill="#8083A3"
      />
    </svg>
  );
};

export default IconTrash;
