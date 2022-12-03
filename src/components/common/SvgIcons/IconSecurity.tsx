import React from "react";

interface Props {
  width?: string;
  height?: string;
  cssClass?: string;
  pathCssClass?: string;
}
const IconSecurity: React.FC<Props> = ({
  width,
  height,
  cssClass,
  pathCssClass,
}) => {
  return (
    <svg
      width={width ? width : "18"}
      height={height ? height : "22"}
      className={`icon-user-circle ${cssClass}`}
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={pathCssClass}
        d="M9 0.902344L17.25 4.59766V10.0977C17.25 12.6471 16.4622 14.9818 14.8867 17.1016C13.3112 19.1927 11.349 20.5247 9 21.0977C6.65104 20.5247 4.6888 19.1927 3.11328 17.1016C1.53776 14.9818 0.75 12.6471 0.75 10.0977V4.59766L9 0.902344ZM9 11V19.207C10.6901 18.6628 12.1224 17.6458 13.2969 16.1562C14.4714 14.638 15.1732 12.9193 15.4023 11H9ZM9 11V2.92188L2.59766 5.75781V11H9Z"
        fill="#8083A3"
      />
    </svg>
  );
};

export default IconSecurity;
