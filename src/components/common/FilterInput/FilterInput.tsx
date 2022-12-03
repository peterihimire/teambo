import React from "react";

interface Props {
  cssClass?: string;
  options?: Array<any>;
  onChange?: (e: any) => void;
  value?: any;
}
const FilterSelect: React.FC<Props> = ({
  cssClass,
  options,
  onChange,
  value,
}) => {
  return (
    <select
      onChange={onChange}
      value={value}
      className={`filter-select ${cssClass}`}
    >
      {!!options ? (
        options.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))
      ) : (
        <>
          <option value="">This month</option>
          <option value="">Last month</option>
          <option value="">Next Month</option>
        </>
      )}
    </select>
  );
};

export default FilterSelect;
