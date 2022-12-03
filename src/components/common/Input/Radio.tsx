import React from "react";

interface Props {
  label: string;
  name?: string;
  handleClick?: () => void;
}
const Radio: React.FC<Props> = ({ label, name, handleClick, ...rest }) => {
  return (
    <label htmlFor={label} className="input__radio" onClick={handleClick}>
      <input type="checkbox" name={name} id={label} value="yes" {...rest} />
      <span className="input__radio-btn"></span>
      <span className="input__radio-label">{label}</span>
    </label>
  );
};

export default Radio;
