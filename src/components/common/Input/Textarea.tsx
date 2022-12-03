import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
  error?: any;
  placeholder?: string;
  id?: string;
  cssClass?: string;
  disable?: boolean;
  rows?: number;
}
const Textarea: React.FC<Props> = ({
  label,
  name,
  error,
  placeholder,
  id,
  cssClass,
  disable,
  rows = 5,
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
        <textarea
          id={id ? id : label}
          name={name}
          rows={rows}
          className={`input__ele ${cssClass}`}
          disabled={disable}
          placeholder={placeholder ? placeholder : label}
          {...rest}
        />
      </div>
      {error ? (
        <div className="input__error">
          <span className="input__error-text">{error}</span>
        </div>
      ) : null}
    </div>
  );
};

export default Textarea;
