import React, {useEffect, useState} from "react";
import { useHistory, useLocation } from "react-router";
import DashboardLayoutOne from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOne";
import DashboardLayoutOneLeft from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneLeft";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
import DashboardTopNav from "../DashboardTopNav";
import ScheduledEvent from "../../../common/Schedule/ScheduledEvent";
import IconLink from "../../../common/IconLink/IconLink";
import IconLocalStorage from "../../../common/SvgIcons/IconLocalStorage";
import IconUserCircle from "./../../../common/SvgIcons/IconUserCircle";
import IconGroupUser from "./../../../common/SvgIcons/IconGroupUser";
import FormSearchInput from "../../../common/Forms/FormSearchInput";

import scheduleStore from "./../../../../store/scheduleStore";
import LoadingSchedule from "./LoadingSchedule.tsx";
import {formatDateData} from "../../../../utils/helpers/formatDate.ts"; 

interface Props {}
const ScheduledEventList: React.FC<Props> = () => {
  const history = useHistory();
  const location = useLocation();
  const type = location.pathname.split("/").slice(-1)[0]
  const {fetchSchedules, schedules, isLoading} = scheduleStore()
  const [scheduleTypes, setScheduleTypes] = useState<any>([])
  
  useEffect(()=>{
    if(type ===  "public"){
      setScheduleTypes(schedules.filter((schedule:any)=>schedule?.privacy === "PUBLIC"))
    }else if(type === "private"){
      setScheduleTypes(schedules.filter((schedule:any)=>schedule?.privacy === "PRIVATE"))
    }else{
      setScheduleTypes(schedules);
    }
   // eslint-disable-next-line
  //  ??osun aiyapejju adetayo oso
  },[schedules,type])

  useEffect(()=>{
    fetchSchedules()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  if(schedules.length === 0 && !isLoading){
    history.push("/user/schedule")
  }
  
  return (
    <>
      <main className="dashboard__main">
        <DashboardTopNav title="Schedule" />

        <DashboardLayoutOne>
          <DashboardLayoutOneLeft
            cssClass="color-2 flex-shrink-0 flex-c-jcbetween"
            width="33.1rem"
          >
            <div>
              <FormSearchInput />
              <IconLink
                Icon={
                  <IconUserCircle
                    cssClass="icon-links__icon"
                    pathCssClass="icon-links__icon-path"
                  />
                }
                title="All Events"
                subTitle="All mettings unified"
                bagdeText={schedules?.flat()?.length}
                // cssClass="active"
                link="/user/schedule-list"
              />
              <IconLink
                Icon={
                  <IconLocalStorage
                    cssClass="icon-links__icon"
                    pathCssClass="icon-links__icon-path"
                  />
                }
                title="Public"
                link="/user/schedule-list/public"
              />
              <IconLink
                Icon={
                  <IconGroupUser
                    cssClass="icon-links__icon"
                    pathCssClass="icon-links__icon-path"
                  />
                }
                title="Private"
                link="/user/schedule-list/private"
              />
            </div>
          </DashboardLayoutOneLeft>
          <DashboardLayoutOneRight cssClass='scheduled-event__right-side'>
            {isLoading?<LoadingSchedule />:(formatDateData(scheduleTypes).map((schedule:any)=><ScheduledEvent schedule={schedule}/>))}
            {scheduleTypes.length < 1 && <p style={{textAlign:"center"}}>There are no schedule</p>}
          </DashboardLayoutOneRight>
        </DashboardLayoutOne>
      </main>
    </>
  );
};

export default ScheduledEventList;
