import React, { useState, useEffect } from "react";
import {
  UserActivityProvider,
  useMeetingManager,
} from "amazon-chime-sdk-component-library-react";

//custo import
import ConferenceScreenLeft from "./ConferenceScreen/ConferenceScreenLeft";
import ConferenceScreenRight from "./ConferenceScreen/ConferenceScreenRight";
import ConferenceScreenCenter from "./ConferenceScreen/ConferenceScreenCenter";
import ConferenceParticipants from "./ConferenceScreen/ConferenceParticipants";

import { ModalInvitePeople, ModalInCallDeviceSettings } from "../../../common";
import MeetingStore from "./../../../../store/meetingStore";
import callService from "../../../../services/callService";
import { EVENT_TYPES } from "../../../../utils/constants/socketEvents";
import useSocketio from "../../../../utils/hooks/useSocketio";

const { START_CALL } = EVENT_TYPES;

interface Props {}
const CallBackground: React.FC<Props> = () => {
  const [showLeft, setShowLeft] = useState<boolean>(true);
  const [showRight, setShowRight] = useState<boolean>(false);
  const [showParticipants, setShowParticipants] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeviceModal, setShowDeviceModal] = useState<boolean>(false);

  const { externalUserId, chimeAttendeeId, callId } = MeetingStore();
  const meetingManager = useMeetingManager();

  const { socketRef,user } = useSocketio(callId)
  useEffect(() => {
    const payload = { user: user.uid, conversation: callId };
    socketRef.current.emit(START_CALL, payload);
    // Get Attendee Details
    meetingManager.getAttendee = async (
      chimeAttendeeId: string,
      externalUserId?: string
    ) => {
      const attendeeData = await callService.getMeetingParticipant(
        callId,
        externalUserId
      );
      return {
        name: `${attendeeData.data.firstname} ${attendeeData.data.lastname}`,
      };
    };

    meetingManager.getAttendee(externalUserId, chimeAttendeeId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowRight = () => {
    setShowParticipants(false);
    setShowRight((prevState) => !prevState);
  };

  const handleShowParticipants = () => {
    setShowRight(false);
    setShowParticipants((prevState) => !prevState);
  };

  return (
    <>
      <UserActivityProvider>
        <main className="dashboard__main">
          <div className="call-conference-video">
            {showLeft && (
              <ConferenceScreenLeft handleClick={() => setShowLeft(false)} />
            )}

            <ConferenceScreenCenter
              handleShowRight={() => handleShowRight()}
              showLeft={showLeft}
              handleShowLeft={() => setShowLeft((prevState) => !prevState)}
              handleShowParticipants={() => handleShowParticipants()}
              handleShowModal={() => setShowModal(true)}
              handleShowDeviceModal={() => setShowDeviceModal(true)}
            />

            <ConferenceScreenRight showRight={showRight} handleShowRight={() => handleShowRight()} />
            {showParticipants && (
              <ConferenceParticipants
                handleClick={() => setShowParticipants(false)}
              />
            )}
          </div>
        </main>
        {showModal && (
          <ModalInvitePeople handleClick={() => setShowModal(false)} />
        )}
        {showDeviceModal && (
          <ModalInCallDeviceSettings
            handleClick={() => setShowDeviceModal(false)}
          />
        )}
      </UserActivityProvider>
    </>
  );
};

export default CallBackground;
