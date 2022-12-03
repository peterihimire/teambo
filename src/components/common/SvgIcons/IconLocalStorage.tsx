import React from "react";

interface Props {
  width?: string;
  height?: string;
  cssClass?: string;
  pathCssClass?: string;
}
const IconLocalStorage: React.FC<Props> = ({
  width,
  height,
  cssClass,
  pathCssClass,
}) => {
  return (
    <svg
      width={width || "20"}
      height={height || "20"}
      className={`icon-local-storage ${cssClass}`}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={pathCssClass}
        d="M15.5 11.75V13.5977H13.6523V11.75H15.5ZM15.5 8.09766V9.90234H13.6523V8.09766H15.5ZM17.3477 15.4023V6.25H10V8.09766H11.8477V9.90234H10V11.75H11.8477V13.5977H10V15.4023H17.3477ZM8.15234 4.40234V2.59766H6.34766V4.40234H8.15234ZM8.15234 8.09766V6.25H6.34766V8.09766H8.15234ZM8.15234 11.75V9.90234H6.34766V11.75H8.15234ZM8.15234 15.4023V13.5977H6.34766V15.4023H8.15234ZM4.5 4.40234V2.59766H2.65234V4.40234H4.5ZM4.5 8.09766V6.25H2.65234V8.09766H4.5ZM4.5 11.75V9.90234H2.65234V11.75H4.5ZM4.5 15.4023V13.5977H2.65234V15.4023H4.5ZM10 4.40234H19.1523V17.25H0.847656V0.75H10V4.40234Z"
        fill="#8083A3"
      />
    </svg>
  );
};

export default IconLocalStorage;
