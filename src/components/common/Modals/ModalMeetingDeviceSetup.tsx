import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import ModalLayout from "./../Modal/ModalLayout";
import ModalChild from "./../Modal/ModalChild";
import Typography from "./../Typography/Typography";
import Button from "./../Button/Button";
import DeviceSetup from "../../pages/dashboard/Conference/Meeting/DeviceSetup/Index";

import { useMeetingManager } from "amazon-chime-sdk-component-library-react";

interface Props {
  handleClick: () => void;
}

const ModalMeetingDeviceSetup: React.FC<Props> = ({ handleClick }) => {
  const meetingManager = useMeetingManager();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStartMeeting = async () => {
    setIsLoading(true);
    await meetingManager.start();
    setIsLoading(false);
    history.push("/user/conference-start");
    // history.push("/user/sample-call");
  };

  return (
    <ModalLayout>
      <ModalChild padding="2rem 3rem 3rem" width="70rem">
        <div className="modal__head m-b-40px">
          <Typography type="h3" text="Device Settings" />
          <Button
            cssClass="btn btn-icon small"
            icon="icon-times"
            iconClass="icon-times"
            handleClick={handleClick}
          />
        </div>

        <DeviceSetup />

        <div className="flex-r-jcend m-t-60px">
          <Button
            cssClass="btn btn--primary btn--xxsmall"
            text="Start Meeting"
            handleClick={() => handleStartMeeting()}
            isLoading={isLoading}
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

export default ModalMeetingDeviceSetup;
