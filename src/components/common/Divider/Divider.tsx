import React from "react";

interface Props {
  text: string;
  cssClass?: string;
}

const Divider: React.FC<Props> = ({ text, cssClass }) => {
  return (
    <div className={`divider ${cssClass}`}>
      <span className="divider__text">{text}</span>
    </div>
  );
};

export default Divider;
