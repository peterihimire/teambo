import React from "react";
import {formatDate} from "../../../utils/helpers/formatDate.ts";
import Typography from "./../Typography/Typography";

interface Props {date?: any}
const MeetingDate: React.FC<Props> = ({date}) => {
  const {dayshort,dateNum} = formatDate(date)
  return (
    <div className="meetings__date">
      <Typography type="p" text={dayshort} cssClass="meetings__period" />
      <Typography type="h2" text={`${dateNum}`} cssClass="meetings__day" />
      {/* <Typography type="p" text="Today" cssClass="meetings__period" /> */}
    </div>
  );
};

export default MeetingDate;
