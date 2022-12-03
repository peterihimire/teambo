import React from "react";
import Typography from "./../../../../../common/Typography/Typography";

interface Props {
  text?: string
}
const LocalVideoAvatar: React.FC<Props> = ({text}) => {
 
  return (
    <div className="video-avatar">
      <Typography
        type="h3"
        text={text ? text : ""}
        cssClass="video-avatar__text"
      />
    </div>
  );
};

export default LocalVideoAvatar;
