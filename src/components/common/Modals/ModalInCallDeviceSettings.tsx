import React from "react";


import ModalLayout from "./../Modal/ModalLayout";
import ModalChild from "./../Modal/ModalChild";
import Typography from "./../Typography/Typography";
import Button from "./../Button/Button";

import {
  CameraSelection,
  SpeakerSelection,
  MicSelection,
} from "amazon-chime-sdk-component-library-react";

interface Props {
  handleClick: () => void;
}

const ModalInCallDeviceSettings: React.FC<Props> = ({ handleClick }) => {

  return (
    <ModalLayout>
      <ModalChild padding="2rem 3rem 3rem" width="40rem">
        <div className="modal__head m-b-40px">
          <Typography type="h3" text="Call settings" />
          <Button
            cssClass="btn btn-icon small"
            icon="icon-times"
            iconClass="icon-times"
            handleClick={handleClick}
          />
        </div>
        <CameraSelection />
        <SpeakerSelection />
        <MicSelection />

        <div className="flex-r-jcbetween-aicenter m-t-60px">
          <Button
            cssClass="btn btn--grey btn--xxsmall"
            text="Cancel"
            handleClick={handleClick}
            // isLoading={isLoading}
          />
          <Button
            cssClass="btn btn--primary btn--xxsmall"
            text="Done"
            handleClick={handleClick}
            // isLoading={isLoading}
          />
        </div>
        {/* <Typography
          type="p"
          text="If your recived a meeting link, tap on the link to join the meeting."
          cssClass="modal-join-meeting__footer-text"
        /> */}
      </ModalChild>
    </ModalLayout>
  );
};

export default ModalInCallDeviceSettings;
