import React from "react";
import Svg from "./../Svg/Svg";
import Typography from "./../Typography/Typography";
import Button from "./../Button/Button";

interface Props {}
const FilesDownload: React.SFC<Props> = () => {
  return (
    <div className="file-download">
      <Svg iconId="icon-file-download" cssClass="icon-file-download" />
      <div>
        <Typography
          type="h5"
          text="Our new template.sketch"
          cssClass="head-16"
        />
        <Typography type="p" text="128 mb" cssClass="p-1" />
      </div>
      <Button
        cssClass="btn btn-icon"
        icon="icon-cloud"
        iconClass="icon-cloud"
      />
      <Button
        cssClass="btn btn-icon"
        icon="icon-backward"
        iconClass="icon-backward"
      />
    </div>
  );
};

export default FilesDownload;
