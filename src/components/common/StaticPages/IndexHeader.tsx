import React from "react";
import Typography from "../Typography/Typography";
import Image from "../../common/Image/Image";

interface Props {}
const IndexHeader: React.FC<Props> = () => {
  return (
    <header className="header__index-page">
      <div className="center">
        <div className=" text-center header_text-div">
          <Typography
            type="h1"
            text="Conferencing Refactored"
            // cssClass="head-34 m-b-20px index-page__main-heading"
            cssClass=" index-page__main-heading"
          />
          {/* <div className="hidden-xl visible-xs visible-md">
            <Image
              // source="pic47"
              source="heroImgExtras"
              cssClass="teams-img header-image "
            />
          </div> */}
          <Typography
            type="p"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa ut nunc, nullam consectetur aliquet. A faucibus elementum duis mauris at turpis vel nunc."
            // cssClass="p-19 index-page__sub-heading"
            cssClass="index-page__sub-heading"
          />
        </div>
        <div className="">
          <Image
            // source="pic47"
            source="heroImgExtras"
            cssClass="teams-img header-image "
            // maxHeight="61.1rem"
            // maxWidth="97.9rem"
          />
        </div>
      </div>
    </header>
  );
};

export default IndexHeader;
