import React from "react";

import Svg from "./../Svg/Svg";
import Typography from "./../Typography/Typography";

type Props = {
  iconId: string;
  heading: string;
  subHeading: string;
  handleClick?: () => void;
};
const MeetingCard: React.FC<Props> = ({
  iconId,
  heading,
  subHeading,
  handleClick,
}) => {
  return (
    <div className="meeting__card" onClick={handleClick}>
      <Svg iconId={iconId} cssClass="meeting__card-icon" />
      <div className="">
        <Typography type="h4" text={heading} cssClass="meeting__card-title" />
        <Typography type="p" text={subHeading} cssClass="meeting__card-text" />
      </div>
    </div>
  );
};

export default MeetingCard;
