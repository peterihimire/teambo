import React from "react";

import Typography from "./../Typography/Typography";

interface Props {
  cssClass?: string; 
  text?: any;
}
const Tag: React.FC<Props> = ({ cssClass, text }) => {
  return <Typography type="span" cssClass={`tag ${cssClass}`} text={text} />;
};

export default Tag;
