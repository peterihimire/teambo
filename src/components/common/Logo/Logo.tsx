import React from "react";

import Image from "./../Image/Image";

export interface Props {
  type: string;
}
const Logo: React.FC<Props> = ({ type }) => {
  return (
    <Image
      source={type === "black" ? "logoBlack" : "logoBlack"}
      alt="logo"
      cssClass="logo"
    />
  );
};

export default Logo;
