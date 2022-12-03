import React from "react";
import Svg from "./../Svg/Svg";

interface Props {
  handleChange: (e: any) => void;
  value?: any;
}
const SearchCallsInput: React.FC<Props> = ({ handleChange, value }) => {
  return (
    <div className="search-input-2">
      <input
        onChange={(e) => handleChange(e.currentTarget.value)}
        value={value}
        type="text"
        className="search-input-2__input"
        placeholder="Name, email or phone number"
      />
      <Svg iconId="icon-lens" cssClass="icon-lens" />
    </div>
  );
};

export default SearchCallsInput;
//   cssClass="head-6"
