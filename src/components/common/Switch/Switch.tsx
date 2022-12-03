import React from "react";

interface SwitchProps {
  handleClick: () => void;
  checked: boolean;
  cssClass?: string;
}
const Switch: React.FC<SwitchProps> = ({ handleClick, checked, cssClass }) => {
  return (
    <button
      className={`switch ${checked && "on"} ${cssClass}`}
      onClick={handleClick}
    >
      <div className={`switch__button ${checked && "on"}`}></div>
    </button>
  );
};

export default Switch;