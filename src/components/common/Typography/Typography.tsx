import React from "react";

interface Props {
  type: any;
  cssClass?: string;
  text?: string;
}

const Typography: React.FC<Props> = ({
  type: Type,
  cssClass,
  text,
  children,
}) => {
  return <Type className={cssClass}>{text ? text : children}</Type>;
};

export default Typography;
