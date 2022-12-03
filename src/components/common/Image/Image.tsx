import React from "react";

import images from "./../../../utils/images";

interface Props {
  source: keyof typeof images;
  src?: any;
  alt?: string;
  cssClass?: string;
  maxWidth?: string;
  maxHeight?: string;
}

const Image: React.FC<Props> = ({
  source,
  src,
  alt = "logo",
  cssClass,
  maxWidth,
  maxHeight,
}) => {
  const styles = {
    maxWidth,
    maxHeight,
  };
  return (
    <img src={src ? src : images[source]} alt={alt} className={cssClass} style={styles} />
  );
};

export default Image;
