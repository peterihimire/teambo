import React from "react";

import ModalLayout from "./../Modal/ModalLayout";
import ModalChild from "./../Modal/ModalChild";
import Typography from "./../Typography/Typography";
import Button from "./../Button/Button";
// import FormJoinMeeting from "../Forms/FormJoinMeeting";
import FormJoinNewConferenceCall from './../Forms/FormJoinConferenceCall';

interface Props {
  handleClick: () => void;
}

const ModalJoinMeeting: React.FC<Props> = ({ handleClick }) => {
  return (
    <ModalLayout>
      <ModalChild>
        <div className="modal__head m-b-100px">
          <Typography type="h3" text="Join a meeting" />
          <Button
            cssClass="btn btn-icon"
            icon="icon-times"
            iconClass="icon-times"
            handleClick={handleClick}
          />
        </div>

        <FormJoinNewConferenceCall />
        <Typography
          type="p"
          text="If your recived a meeting link, tap on the link to join the meeting."
          cssClass="modal-join-meeting__footer-text"
        />
      </ModalChild>
    </ModalLayout>
  );
};

export default ModalJoinMeeting;
