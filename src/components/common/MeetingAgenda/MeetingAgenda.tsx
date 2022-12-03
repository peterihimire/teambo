import React from 'react';

// import UserIcon from "./../UserIcon/UserIcon";
import Typography from "./../Typography/Typography";
import Svg from "./../Svg/Svg";

interface Props {
  withUserIcon?: boolean;
}
const MeetingAgenda: React.FC<Props> = ({ withUserIcon }) => {
  return (
    <div className="meeting-agenda">
      <div className="meeting-agenda__time">
        <Svg iconId="icon-meeting-time" cssClass="icon-meeting-time" />
      </div>
      <div className="meeting-agenda__duration">
        <Typography type="p" text="1:00" cssClass="meeting-agenda__text--1" />
        <Typography type="p" text="2:00" cssClass="meeting-agenda__text--2" />
      </div>
      <div className="meeting-agenda__title">
        <Typography
          type="p"
          text="Effective Forms Advertising"
          cssClass="meeting-agenda__text--3"
        />
        <Typography
          type="p"
          text="Ora Johnston"
          cssClass="meeting-agenda__text--2"
        />
      </div>
      {/* {withUserIcon && <UserIcon />} */}
    </div>
  );
};

export default MeetingAgenda;
