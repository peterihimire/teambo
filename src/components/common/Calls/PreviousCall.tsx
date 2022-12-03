import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
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
const PreviousCall: React.FC<Props> = ({ meetingId, title, participants, date, type, privacy }) => {
  const match = useRouteMatch("/user/calls");
  const path = match?.path;
  return (
    <Link to={`${path}/${meetingId}`} className="link">
      <div className="prev-call">
        <UserIcon availability="offline" />
        <div className="prev-call__name-number m-l-15px">
          <Typography type="h3" text={`${title}`} cssClass="head-7" />
          <Typography type="p" text={`${privacy}`} cssClass="p-2" />
        </div>
        <div className="prev-call__date-time m-l-auto m-l-15px">
          <Typography type="h3" text={moment(date).format("Do MMM YYYY")} cssClass="head-8" />
          <Typography type="p" text={moment(date).format("h:mm a")} cssClass="p-2 text-right " />
        </div>
      </div>
    </Link>
  );
};

export default PreviousCall;
