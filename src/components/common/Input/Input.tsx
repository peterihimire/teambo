import React from "react";

import Svg from "../Svg/Svg";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  name: string;
  error?: any;
  iconId?: string;
  iconClickAction?: () => void;
  placeholder?: string;
  id?: string;
  cssClass?: string;
  disable?: boolean;
}
const Input: React.FC<Props> = ({
  label,
  type = "text",
  name,
  error,
  iconId,
  iconClickAction,
  placeholder,
  id,
  cssClass,
  disable,
  ...rest
}) => {
  return (
    <div className="input-container">
      {label && (
        <label htmlFor={label} className="input__label">
          {label}
        </label>
      )}
      <div className="input__holder">
        <input
          type={type}
          id={id ? id : label}
          name={name}
          className={`input__ele ${cssClass}`}
          disabled={disable}
          placeholder={placeholder ? placeholder : label}
          {...rest}
        />
        {iconId && (
          <Svg
            iconId={iconId}
            handleClick={iconClickAction}
            cssClass={`${iconId} ${iconClickAction ? "pointer" : ""}`}
          />
        )}
      </div>
      {error ? (
        <div className="input__error">
          <span className="input__error-text">{error}</span>
        </div>
      ) : null}
    </div>
  );
};

export default Input;
