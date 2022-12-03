import React from "react";
import Typography from "./../Typography/Typography";

interface Props {title:string}
const MeetingTitle: React.SFC<Props> = ({title}) => {
  return (
    <div className="meetings__detail__title">
      <Typography
        type="p"
        text={title}
        cssClass="meetings__detail__text--3"
      />
      {/* <Typography
        type="p"
        text="Ora Johnston"
        cssClass="meetings__detail__text--2"
      /> */}
    </div>
  );
};

export default MeetingTitle;
