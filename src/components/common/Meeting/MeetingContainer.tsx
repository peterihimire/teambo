import React, {useEffect} from 'react';
import MeetingInADay from './MeetingInADay';
import scheduleStore from "./../../../store/scheduleStore";
import LoadingSchedule from '../../pages/dashboard/Schedule/LoadingSchedule';
import {formatDateData} from "../../../utils/helpers/formatDate.ts";  

interface Props {
    completed:boolean;
} 
const MeetingContainer : React.FC<Props> = ({completed})=>{
    const {fetchSchedules,schedules, isLoading} = scheduleStore()
    useEffect(()=>{
        fetchSchedules();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    // console.log(schedules);
    const filterByDate = (data:any)=>{
        if(completed){
            return data.filter((item:any)=> new Date(item.started_at).getTime() < Date.now() )
        }
            return data.filter((item:any)=> new Date(item.started_at).getTime() >= Date.now() )
    }
    return (
        <section className="meetings">
            {
               isLoading? <LoadingSchedule />:formatDateData(filterByDate(schedules)).map((schedule:any,item:any)=>(<MeetingInADay key={item} schedule={schedule}/>))
            }
            {(!isLoading && filterByDate(schedules)?.length === 0) && (completed?<p>There are no completed meetings</p>:<p>There are no upcoming meetings</p>)}
        
          </section>
    )
}

export default MeetingContainer