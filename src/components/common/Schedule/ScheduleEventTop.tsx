import React from "react";
import { useHistory } from "react-router";
import {formatDate} from "../../../utils/helpers/formatDate.ts";
import Typography from "./../Typography/Typography";
import Button from "./../Button/Button";


interface Props {date:any}
const ScheduleEventTop: React.FC<Props> = ({date}) => {
  const history = useHistory();
  const {month,day, dateNum,year} = formatDate(date)
  return (
    <div className="scheduled-event__top m-b-30px">
      <Typography type="h5" text="" cssClass="scheduled-event__date">
        <Typography type="span" text={`${day}, `} cssClass="text-bold" />
        {month} {dateNum}, {year}
      </Typography>

      <Button
        cssClass="btn btn-icon m-l-10px scheduled-event__action-btn"
        icon="icon-circle-plus"
        iconClass="icon-circle-plus"
        handleClick={()=>history.push('/user/add-schedule')}
      />
    </div>
  );
};

export default ScheduleEventTop;
