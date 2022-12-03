import React from "react";
import Image from "../Image/Image";

const Preloader: React.FC = () => {
  return (
    <div className="preloader">
      <Image source="iconLogo" cssClass="preloader__img" />
    </div>
  );
};

export default Preloader;
