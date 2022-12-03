import React, {  useState, useEffect } from "react";
// import { Link } from "react-router-dom";

import MeetingCardsLayout from "./../../common/Meeting/MeetingCardsLayout";
import ModalJoinMeeting from "./../../common/Modals/ModalJoinMeeting";
import MeetingCard from "./../../common/Meeting/MeetingCard";
import DashboardTopNav from "./DashboardTopNav";
// import Svg from "../../common/Svg/Svg";
import useDialogHook from "../../../utils/hooks/useDialogHook";
import StartNewChatModal from "./Messages/Modal/StartNewChatModal";
import MeetingContainer from "../../common/Meeting/MeetingContainer";
import { ModalStartMeeting } from "../../common";

type Props = {
  history?: any;
};
const DashboardIndex: React.FC<Props> = ({ history }) => {
  const [showModalSM, setShowModalSM] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  //destructure the dialog hook out
  const { open, handleClose, handleOpen } = useDialogHook();

  useEffect(()=>{
    
  })

  return (
    <>
      <main className="dashboard__main">
        <DashboardTopNav title="Dashboard" />
        <MeetingCardsLayout>
          <MeetingCard
            iconId="icon-new-meeting"
            heading="Start Meeting"
            subHeading="Via meeting link"
            handleClick={() => history.push("/user/conference")}
          />
          <MeetingCard
            iconId="icon-join-meeting"
            heading="Join Meeting"
            subHeading="Via invitation link"
            handleClick={() => setShowModal(true)}
          />
          <MeetingCard
            iconId="icon-schedule-meeting"
            heading="Schedule"
            subHeading="Plan a meeting"
            handleClick={() => history.push("/user/add-schedule")}
          />
          <MeetingCard
            iconId="icon-schedule-meeting"
            heading="Start Chat"
            subHeading="Plan a meeting"
            handleClick={handleOpen}
          />
        </MeetingCardsLayout>

        {open && <StartNewChatModal handleClick={handleClose} />}

        {/* <section className="meeting-toggler">
          <span className="meeting-toggle-btn active">Upcoming Meetings</span>
          <Link to="/user/schedule-list" className="meeting-link">
            <span className="meeting-toggle-btn">
              <Svg
                iconId="icon-calender-small"
                cssClass="meeting-toggle-btn__icon"
              />
              View schedule
            </span>
          </Link>
        </section> */}

        <section className="meeting-status">
          <nav className="meeting-status__toggler">
            <span className={`meeting-status__toggle-btn ${completed?"":"active"}`} onClick={()=>setCompleted(false)}>Upcoming meetings</span>
            <span className={`meeting-status__toggle-btn ${completed?"active":""}`} onClick={()=>setCompleted(true)}>Completed</span>
          </nav>

          <MeetingContainer completed={completed}/>
        </section>
      </main>

      {showModal && (
        <ModalJoinMeeting  handleClick={() => setShowModal(false)} />
      )}
      {showModalSM && (
        <ModalStartMeeting  handleClick={() => setShowModalSM(false)} />
      )}
    </>
  );
};

export default DashboardIndex;
