import React from "react";

import ModalLayout from "./../Modal/ModalLayout";
import ModalChild from "./../Modal/ModalChild";
import Typography from "./../Typography/Typography";
import Button from "./../Button/Button";
import MeetingAgenda from './../MeetingAgenda/MeetingAgenda';

interface Props {
  handleClick: () => void;
}
const ModalMeetingAgenda: React.FC<Props> = ({ handleClick }) => {
  return (
    <ModalLayout>
      <ModalChild width="45.8rem" padding="3rem 3rem 5rem">
        <div className="modal__head m-b-50px">
          <Typography type="h3" text="Meeting Agenda" />
          <Button
            cssClass="btn btn-icon"
            icon="icon-times"
            iconClass="icon-times"
            handleClick={handleClick}
          />
        </div>
        <MeetingAgenda />
        <MeetingAgenda />
        <MeetingAgenda />
        <MeetingAgenda />
      </ModalChild>
    </ModalLayout>
  );
};

export default ModalMeetingAgenda;
