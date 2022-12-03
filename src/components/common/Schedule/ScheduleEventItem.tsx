import React, { useState } from "react";

import IconBlueTime from "./../SvgIcons/IconBlueTime";
import MeetingDuration from "./../Meeting/MeetingDuration";
import Tag from "./../Tag/Tag";
import Typography from "./../Typography/Typography";
import Button from "./../Button/Button";
import { useHistory } from "react-router-dom";
import ScheduleEventDetails from "./ScheduleEventDetails";

import MeetingStore from "../../../store/meetingStore";

// Amazon Chime
import {
  useMeetingManager,
  DeviceLabels,
} from "amazon-chime-sdk-component-library-react";

import callService from "../../../services/callService";
import ModalMeetingDeviceSetup from "../Modals/ModalMeetingDeviceSetup";
import callsStore from "../../../store/callStore";

interface Props {scheduleItem:any}
const ScheduleEventItem: React.FC<Props> = ({scheduleItem}) => {
  const [showEventDetails, setShowEventDetails] = useState<boolean>(false);

  const setCurrentCall = callsStore((store) => store.setCurrentCall);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();

  const [setMeetingCode, setExternalUserId, setCallId, setChimeAttendeeId] =
    MeetingStore((store) => [
      store.setMeetingCode,
      store.setExternalUserId,
      store.setCallId,
      store.setChimeAttendeeId,
    ]);

  const meetingManager = useMeetingManager();

  const startMeeting = () => {
    const conferenceCallId  = scheduleItem.call.external_id;
    (async () => {
      setIsLoading(true);
      // Fetch the meeting and attendee data from your server application
      await callService.beginConferenceCall(
        conferenceCallId
      )
      .then(async (meetingResponse) => { 

        const meetingJson: any = await meetingResponse.data;
        console.log("Meeting Data: ", meetingJson.data);
        setMeetingCode(meetingJson.external_id);
        setCallId(meetingJson.conversation.call_id);
        setExternalUserId(meetingJson.participant.ExternalUserId);
        setChimeAttendeeId(meetingJson.participant.AttendeeId);
        // AttendeeId

        const joinData = {
          meetingInfo: meetingJson.Meeting,
          attendeeInfo: meetingJson.participant,
          deviceLabels: DeviceLabels.AudioAndVideo,
        };

        //set the current call to state
        setCurrentCall(meetingJson);

        // Use the join API to create a meeting session using the above data
        await meetingManager.join(joinData);

        setIsLoading(false);

        // At this point you could let users setup their devices, or by default
        // the SDK will select the first device in the list for the kind indicated
        // by `deviceLabels` (the default value is DeviceLabels.AudioAndVideo)
        // ...

        // Start the session to join the meeting
        await meetingManager.start();
        // history.push("/user/conference-start");
        history.push(`/user/call/${conferenceCallId}`);
      }).catch (err => {
        console.log({ conferenceCallId: err.response.data.message });
        setIsLoading(false);
      });
    })();
  };
  return (
    <div className="scheduled-event__item">
      <IconBlueTime
        width={36}
        height={36}
        cssClass="scheduled-event__time-icon"
      />
      <MeetingDuration starting={scheduleItem.started_at} duration={scheduleItem.duration} cssClass="m-l-20px flex-r scheduled-event__duration" />
      <div className="scheduled-event__name">
        <Tag cssClass="tag tag--business" text={scheduleItem?.privacy} />
        <Typography
          type="p"
          text={scheduleItem.title}
          cssClass="scheduled-event__title"
        />
      </div>
      <div className="flex-r m-l-auto scheduled-event__item-right">
        <Button
          cssClass="btn--primary btn--small m-t-15px btn-center"
          text="Start"
          isLoading={isLoading}
          handleClick={() => startMeeting()}
        />
        <Button
          cssClass="btn btn-icon m-l-10px scheduled-event__action-btn"
          icon="icon-tri-dot"
          iconClass="icon-tri-dot"
          handleClick={() => setShowEventDetails((prevState) => !prevState)}
        />
        {showEventDetails && <ScheduleEventDetails scheduleItem={scheduleItem}/>}
      </div>
      {showModal && (
        <ModalMeetingDeviceSetup handleClick={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ScheduleEventItem;
