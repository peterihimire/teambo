import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import copyToClipBoard from "../../../utils/helpers/copyToClipboard";
import MeetingStore from "../../../../store/meetingStore";

// Amazon Chime
import {
  useMeetingManager,
  DeviceLabels,
} from "amazon-chime-sdk-component-library-react";

import callService from "../../../../services/callService";
import { userStore } from "./../../../../store/userStore";
import callsStore from "../../../../store/callStore";


type Props = {};
type QuizParams = {
    callId: string;
};
const JoinThroughInvite: React.FC<Props> = () => {
  const setCurrentCall = callsStore((store:any) => store.setCurrentCall);
  let { callId } = useParams<QuizParams>();
  const history = useHistory();
  const { user, getUser } = userStore();
  // const {
  //   setMeetingCode,
  //   setExternalUserId,
  //   setCallId,
  //   setChimeAttendeeId,
  //   // meetingCode,
  //   // callId,
  //   // externalUserId,
  // } = MeetingStore();

  const [setMeetingCode, setExternalUserId, setCallId, setChimeAttendeeId] =
    MeetingStore((store:any) => [
      store.setMeetingCode,
      store.setExternalUserId,
      store.setCallId,
      store.setChimeAttendeeId,
    ]);

  const meetingManager = useMeetingManager();

  useEffect(() => {
    getUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(user.uid){
        (async () => {
            // Fetch the meeting and attendee data from your server application
            await callService.joinConferenceCall(callId,{userId: uid,name: firstname,})
            .then(async (meetingResponse:any) => { 
    
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
    
            // At this point you could let users setup their devices, or by default
            // the SDK will select the first device in the list for the kind indicated
            // by `deviceLabels` (the default value is DeviceLabels.AudioAndVideo)
            // ...
    
            // Start the session to join the meeting
            await meetingManager.start();
            // history.push("/user/conference-start");
            history.push(`/user/call/${callId}`);
            }).catch ((err:any) => {
              toast.error(err.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => history.push(`/user/dashboard`)
              })
            });
        })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.uid]);
  const { firstname, uid } = user;
    

  return (
    <>
      <ToastContainer/>
    </>
  );
};

export default JoinThroughInvite;
