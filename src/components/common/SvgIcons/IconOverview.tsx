import React from "react";

interface Props {
  width?: string;
  height?: string;
  cssClass?: string;
  pathCssClass?: string;
}
const IconOverview: React.FC<Props> = ({
  width,
  height,
  cssClass,
  pathCssClass,
}) => {
  return (
    <svg
      width={width || "20"}
      height={height || "21"}
      className={`icon-overview ${cssClass}`}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={pathCssClass}
        opacity="0.4"
        d="M13.3962 2.17413H16.2179C17.3864 2.17413 18.3333 3.12901 18.3333 4.30744V7.1529C18.3333 8.33133 17.3864 9.28621 16.2179 9.28621H13.3962C12.2277 9.28621 11.2808 8.33133 11.2808 7.1529V4.30744C11.2808 3.12901 12.2277 2.17413 13.3962 2.17413Z"
        fill="#CCCCCC"
      />
      <path
        className={pathCssClass}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.78209 2.17413H6.60373C7.77229 2.17413 8.71917 3.12901 8.71917 4.30744V7.1529C8.71917 8.33133 7.77229 9.28621 6.60373 9.28621H3.78209C2.61354 9.28621 1.66666 8.33133 1.66666 7.1529V4.30744C1.66666 3.12901 2.61354 2.17413 3.78209 2.17413ZM3.78209 11.7287H6.60373C7.77229 11.7287 8.71917 12.6836 8.71917 13.862V16.7075C8.71917 17.8851 7.77229 18.8408 6.60373 18.8408H3.78209C2.61354 18.8408 1.66666 17.8851 1.66666 16.7075V13.862C1.66666 12.6836 2.61354 11.7287 3.78209 11.7287ZM16.2179 11.7287H13.3962C12.2277 11.7287 11.2808 12.6836 11.2808 13.862V16.7075C11.2808 17.8851 12.2277 18.8408 13.3962 18.8408H16.2179C17.3864 18.8408 18.3333 17.8851 18.3333 16.7075V13.862C18.3333 12.6836 17.3864 11.7287 16.2179 11.7287Z"
        fill="#CCCCCC"
      />
    </svg>
  );
};

export default IconOverview;
