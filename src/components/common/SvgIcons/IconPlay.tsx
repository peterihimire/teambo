import React from "react";

interface Props {
  width?: string;
  height?: string;
  cssClass?: string;
  pathCssClass?: string;
}
const IconPlay: React.FC<Props> = ({
  width,
  height,
  cssClass,
  pathCssClass,
}) => {
  return (
    <svg
      width={width || "20"}
      height={height || "20"}
      className={`icon-play ${cssClass}`}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.15234 14.125L13.6523 10L8.15234 5.875V14.125ZM3.51172 3.55469C5.31641 1.75 7.47917 0.847656 10 0.847656C12.5208 0.847656 14.6693 1.75 16.4453 3.55469C18.25 5.33073 19.1523 7.47917 19.1523 10C19.1523 12.5208 18.25 14.6836 16.4453 16.4883C14.6693 18.2643 12.5208 19.1523 10 19.1523C7.47917 19.1523 5.31641 18.2643 3.51172 16.4883C1.73568 14.6836 0.847656 12.5208 0.847656 10C0.847656 7.47917 1.73568 5.33073 3.51172 3.55469Z"
        fill="#8083A3"
        className={pathCssClass}
      />
    </svg>
  );
};

export default IconPlay;
