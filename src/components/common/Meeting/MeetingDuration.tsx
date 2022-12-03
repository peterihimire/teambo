import React from "react";
import {getDuration} from "../../../utils/helpers/formatDate.ts";
import Typography from "./../Typography/Typography";

interface Props {
  cssClass?: string;
  starting?: string,
  duration?: number
}
const MeetingDuration: React.FC<Props> = ({ cssClass, starting, duration }) => {
  const {hour,minutes,endhour,endMinutes} = getDuration(starting,duration)
  return (
    <div className={`meetings__detail__duration ${cssClass}`}>
      <Typography type="p" text={`${hour}:${minutes}`} cssClass="meetings__detail__text--1" />
      <Typography type="p" text={`${endhour}:${endMinutes}`} cssClass="meetings__detail__text--2" />
    </div>
  );
};

export default MeetingDuration;
