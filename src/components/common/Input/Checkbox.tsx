import React from "react";

interface Props {
  label?: string;
  name?: string;
  cssClass?: string;
}
const Checkbox: React.FC<Props> = ({ label, name, cssClass, ...rest }) => {
  return (
    <label htmlFor={label} className={`input__checkbox ${cssClass}`}>
      <input type="checkbox" name={name} id={label} value="yes" {...rest} />
      <span className="input__checkbox-btn"></span>
      {/* <span className="input__checkbox-label">{label}</span> */}
    </label>
  );
};

export default Checkbox;
