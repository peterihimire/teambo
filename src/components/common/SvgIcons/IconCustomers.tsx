import React from "react";

interface Props {
  width?: string;
  height?: string;
  cssClass?: string;
  pathCssClass?: string;
}
const IconCustomers: React.FC<Props> = ({
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
        d="M9 13.5V9.84766H3.5V13.5H9ZM17.25 9.84766H16.3477V15.3477H14.5V9.84766H10.8477V15.3477H1.65234V9.84766H0.75V8L1.65234 3.40234H16.3477L17.25 8V9.84766ZM16.3477 0.652344V2.5H1.65234V0.652344H16.3477Z"
        fill="#8083A3"
      />
    </svg>
  );
};

export default IconCustomers;
