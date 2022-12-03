import React from "react";

import MeetingDate from "./MeetingDate";
import MeetingDetail from "./MeetingDetail";

interface Props {
  schedule ?: any
}
const MeetingInADay: React.FC<Props> = ({schedule}) => {
  return (
    <div className="meetings__card">
      <MeetingDate date={schedule[0]?.started_at} />
      <div className="meetings__list">
        {schedule.map((scheduleItem:{},index:number)=><MeetingDetail key={index} scheduleItem={scheduleItem} />)}
      </div>
    </div>
  );
};

export default MeetingInADay;
