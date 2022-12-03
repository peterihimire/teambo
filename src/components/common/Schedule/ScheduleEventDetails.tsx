import React,{useState} from "react"
import {useHistory} from "react-router-dom"
import {getDuration,formatDate} from "../../../utils/helpers/formatDate.ts";
import Button from "./../Button/Button";
import InputSimulation from "./../InputSimulation/InputSimulation";
import GridView from "./../GridView/GridView";
import Typography from "./../Typography/Typography";
import {AvatarIcon} from "./../UserIcon/UserIcon";
import DeleteModal from "../../pages/dashboard/Messages/Modal/DeleteModal";
import scheduleService from "../../../services/scheduleService";
import scheduleStore from "./../../../store/scheduleStore";

interface Props {scheduleItem:any}
const ScheduleEventDetails: React.SFC<Props> = ({scheduleItem}) => {
  const history = useHistory();
  const {fetchSchedules} = scheduleStore()
  const [deleteModal, setDeleteModal] = useState(false)
  const {hour,minutes,endhour,endMinutes} = getDuration(scheduleItem.started_at,scheduleItem.duration)
  const {month,day, dateNum} = formatDate(scheduleItem.started_at)
  const handleSubmit =()=> scheduleService.deleteSchedule(scheduleItem.uid)
  console.log(scheduleItem)
  return (
    <div className="scheduled-event__details">
      <div className="flex-r-jcbetween-aicenter m-b-40px">
        <Button
          cssClass="btn btn-icon m-l-10px scheduled-event__action-btn"
          icon="icon-pen"
          iconClass="icon-pen"
          handleClick={()=>history.push(`/user/edit-schedule/${scheduleItem.uid}`)}
        />
        <Button
          cssClass="btn btn-icon m-l-10px scheduled-event__action-btn"
          icon="icon-trash"
          iconClass="icon-trash"
          handleClick={()=>{setDeleteModal(true)}}
        />
      </div>
      {deleteModal && <DeleteModal handleSubmit={handleSubmit} afterSubmit={fetchSchedules} handleClick={()=>setDeleteModal(false)} />}
      <InputSimulation
        label="Date"
        value={`${day}, ${month} ${dateNum}`}
        icon="icon-calender-dark"
      />
      <GridView grid={2}>
        <InputSimulation label="Date" value={`${hour}:${minutes}`} icon="icon-time-bold" />
        <InputSimulation label="Date" value={`${endhour}:${endMinutes}`} icon="icon-time-bold" />
      </GridView>
      <div className="">
        <Typography
          type="h6"
          text="Shared with"
          cssClass="scheduled-event__label"
        />
        <div className="scheduled-event__participant">
          {
            scheduleItem.participants.map((email:string)=>(
              <div className="scheduled-event__tooltip">
                <AvatarIcon key={email} avatar={email.substring(0,2)}  />
                <span className="scheduled-event__tooltip__text">{email}</span>
              </div>
              ))
          }
          {/* <Button
            cssClass="btn btn-icon scheduled-event__action-btn"
            icon="icon-backward"
            iconClass="icon-backward"
          /> */}
        </div>
      </div>
      <div className="m-t-20px">
        <Typography type="h6" text="Note" cssClass="scheduled-event__label" />
        <Typography type="p" text="" cssClass="scheduled-event__note">
          {scheduleItem.note}
        </Typography>
      </div>
    </div>
  );
};

export default ScheduleEventDetails;
