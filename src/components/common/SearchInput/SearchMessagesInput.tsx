import React from "react";
import Svg from "./../Svg/Svg";

interface Props {
  handleChange: (e: any) => void;
  value?: any;
}
const SearchMessagesInput: React.FC<Props> = ({ handleChange, value }) => {
  return (
    <div className="search-input-2 input-container">
      <input
        onChange={(e) => handleChange(e.currentTarget.value)}
        value={value}
        type="text"
        className="search-input-2__input"
        placeholder="Search..."
      />
      <Svg iconId="icon-lens" cssClass="icon-lens" />
    </div>
  );
};

export default SearchMessagesInput;
//   cssClass="head-6"