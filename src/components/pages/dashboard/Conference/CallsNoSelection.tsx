import React, { useState } from "react";
import {
  Button,
  FormStartNewConferenceCall,
  ModalJoinMeetingWithLink,
} from "../../../common";
import Typography from "../../../common/Typography/Typography";
import Image from "./../../../common/Image/Image";

interface CallsNoSelectionProps {}
const CallsNoSelection: React.FC<CallsNoSelectionProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="flex-r-jccenter">
      <div className="empty-state">
        <Image source="pic5" cssClass="empty-state__conference-img" />
        <Typography
          text="Start new conference call"
          type="h3"
          cssClass="head-4 text-center m-b-10px"
        />
        <Typography
          text="Start new conversation with an existing contact or invite"
          type="p"
          cssClass="head-5 text-center"
        />
        <Typography
          text="anyone with the link"
          type="p"
          cssClass="head-5 text-center m-b-35px"
        />

        <FormStartNewConferenceCall />
        <div className="flex-r-jccenter-aicenter m-t-20px text-center pointer bbb">
          <Button
            cssClass="btn-total-naked btn--xxxsmall btn-join-meeting"
            text="🖐🏻 Click here to join a meeting"
            handleClick={() => setShowModal(true)}
          />
        </div>
        {showModal && (
          <ModalJoinMeetingWithLink handleClick={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
};

export default CallsNoSelection;
