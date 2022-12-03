import React from "react";

import Typography from "./../Typography/Typography";

interface BadgeProps {
  text?: any;
  type?: string;
  cssClass?: string;
}
const Badge: React.FC<BadgeProps> = ({ text, cssClass, type }) => {
  return (
    <Typography
      type="span"
      text={text}
      cssClass={`badge ${type} ${cssClass}`}
    />
  );
};

export default Badge;
