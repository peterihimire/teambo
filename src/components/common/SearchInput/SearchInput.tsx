import React from "react";
import Svg from "./../Svg/Svg";

interface Props {}
const SearchInput: React.FC<Props> = () => {
  return (
    <div className="search-input">
      <input
        type="text"
        className="search-input__input"
        placeholder="Search here....."
      />
      <Svg iconId="icon-search-input" cssClass="icon-search-input" />
    </div>
  );
};

export default SearchInput;
