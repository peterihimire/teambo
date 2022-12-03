import React from "react";

interface Props {
  cssClass: string;
  text: string;
  iconClass: string;
  handleClick?: () => void;
}
const ButtonSocial: React.FC<Props> = ({
  cssClass,
  text,
  iconClass,
  handleClick,
}) => {
  return (
    <button className={`btn ${cssClass}`} onClick={handleClick}>
      <i className={`fab ${iconClass} btn-social__icon`}></i>
      <span className="btn-social__name">{text}</span>
    </button>
  );
};

export default ButtonSocial;
