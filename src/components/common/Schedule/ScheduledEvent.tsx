import React from "react";

import ScheduleEventItem from "./ScheduleEventItem";
import ScheduleEventTop from "./ScheduleEventTop";

// interface ScheduleObject {
//   _id?: any;
//   started_at:any;
// }

interface Props {schedule?: any}
const ScheduledEvent: React.FC<Props> = ({schedule}) => {
  return (
    <div className="scheduled-event">
      <ScheduleEventTop date={schedule[0]?.started_at} />
      {schedule.map((scheduleItem:{})=><ScheduleEventItem scheduleItem={scheduleItem}/>)}
      
    </div>
  );
};

export default ScheduledEvent;
