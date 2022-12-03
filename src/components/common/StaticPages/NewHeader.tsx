import React from "react";
import Typography from "../Typography/Typography";
import Image from "../Image/Image";

interface Props {}
const NewHeader: React.FC<Props> = () => {
  return (
    <header className="newheader__index-page">
      <div className="center">
        <div className=" text-center header_text-div">
          <Typography
            type="h1"
            text="Conferencing Refactored"
            cssClass="newheader__main-heading "
          />

          <Typography
            type="p"
            text="Time and space isn’t a factor anymore. Be unlimited with stellar messaging, video conferencing, and meeting transcription features. Only on Timbo."
            cssClass="newheader__sub-heading"
          />
        </div>

        <div className="newheader__image-div">
          <Image source="heroImgAmerican2" cssClass="newheader__image " />
        </div>
      </div>
    </header>
  );
};

export default NewHeader;
