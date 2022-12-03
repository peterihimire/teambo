import React from "react";

interface Props {
  label?: string;
  name: string;
  list?: string;
  error?: any;
  placeholder?: string;
  cssClass?: string;
  options?: Array<any>;
}
const DataList: React.FC<Props> = ({
  label,
  name,
  list,
  error,
  placeholder,
  cssClass,
  options,
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
          name={name}
          list={list}
          className={`input__ele ${cssClass}`}
          placeholder={placeholder ? placeholder : label}
          {...rest}
        />

        <datalist id={name} className={`input__ele ${cssClass}`} {...rest}>
          <option>{placeholder ? placeholder : ""}</option>
          {options?.map((opt: any, index: any) => (
            <option key={index} value={opt} />
          ))}
        </datalist>
      </div>
      {error ? (
        <div className="input__error">
          <span className="input__error-text">{error}</span>
        </div>
      ) : null}
    </div>
  );
};

export default DataList;
