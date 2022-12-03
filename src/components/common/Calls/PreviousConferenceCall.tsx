import React from "react";
// import { Link } from "react-router-dom";
import UserIcon from "./../UserIcon/UserIcon";
import Typography from "./../Typography/Typography";
import moment from "moment";

interface Props {
  meetingId?: any;
  participants?: any;
  date?: any;
  type?: any;
  privacy?: any;
  title?: any;
}
const PreviousConferenceCall: React.FC<Props> = ({ meetingId, participants, date, type, privacy, title }) => {
  // const path = "/user/conference";
  return (
    // <Link to={`${path}/${meetingId}`} className="link">
      <div className="prev-call">
        <UserIcon availability="offline" />
        <div className="prev-call__name-number m-l-15px">
        {participants?.length > 0 ? 
          participants?.map((member: any, index: any) => (
            <Typography type="h3" text={title} cssClass="head-7" />
          ))
          :
            <Typography type="h3" text={title} cssClass="head-7" />
        }
          <Typography type="p" text={`${privacy}`} cssClass="p-2" />
        </div>
        <div className="prev-call__date-time m-l-auto m-l-15px">
          <Typography type="h3" text={moment(date).format("ll")} cssClass="head-8" />
          <Typography type="p" text={moment(date).format("h:mm a")} cssClass="p-2 text-right " />
        </div>
      </div>
    // </Link>
  );
};

export default PreviousConferenceCall;
