import React from "react";

import UserIcon from "./../UserIcon/UserIcon";
import IconBlueTime from "./../SvgIcons/IconBlueTime";
import MeetingDuration from "./MeetingDuration";
import MeetingTitle from "./MeetingTitle";

interface Props {
  scheduleItem?:any
}
const MeetingDetail: React.FC<Props> = ({scheduleItem}) => {
  return (
    <div className="meetings__detail">
      <IconBlueTime />
      <MeetingDuration starting={scheduleItem?.started_at} duration={scheduleItem?.duration} />
      <MeetingTitle title={scheduleItem?.title}/>
      <UserIcon />
    </div>
  );
};

export default MeetingDetail;
