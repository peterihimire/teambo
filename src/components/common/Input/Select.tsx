import React from "react";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  error?: any;
  placeholder?: string;
  cssClass?: string;
  optionClass?: string;
  options?: Array<any>;
  value?: any;
  values?: Array<any>;
  handleChange?: (e: any) => void;
  multiple?: boolean;
}
const Select: React.FC<Props> = ({
  label,
  name,
  error,
  placeholder,
  cssClass,
  optionClass,
  options,
  value,
  values,
  handleChange,
  multiple = false,
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
        <select
          id={name}
          name={name}
          className={`input__ele ${cssClass}`}
          value={value}
          onChange={handleChange}
          multiple={multiple}
          {...rest}
        >
          <option className={`input__ele ${optionClass}`}>
            {placeholder ? placeholder : ""}
          </option>
          {!!multiple
            ? options?.map((opt: any, index: any) => (
                <option
                  key={index}
                  value={opt}
                  selected={values?.includes(opt)}
                  className={`input__ele ${optionClass}`}
                >
                  {opt}
                </option>
              ))
            : options?.map((opt: any, index: any) =>
                typeof opt === "object" ? (
                  <option
                    key={index}
                    value={opt.value}
                    className={`input__ele ${optionClass}`}
                  >
                    {opt.label}
                  </option>
                ) : (
                  <option
                    key={index}
                    value={opt}
                    className={`input__ele ${optionClass}`}
                  >
                    {opt}
                  </option>
                ),
              )}
        </select>
      </div>
      {error ? (
        <div className="input__error">
          <span className="input__error-text">{error}</span>
        </div>
      ) : null}
    </div>
  );
};

export default Select;
