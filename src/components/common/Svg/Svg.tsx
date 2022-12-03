import React from "react";

import images from "./../../../utils/images";

interface SvgProps {
  cssClass?: string;
  iconId?: string;
  handleClick?: () => void;
}

const Svg: React.FC<SvgProps> = ({ cssClass, iconId, handleClick }) => {
  return (
    <svg className={cssClass} onClick={handleClick}>
      <use xlinkHref={`${images.spriteSVG}#${iconId}`}></use>
    </svg>
  );
};

export default Svg;
