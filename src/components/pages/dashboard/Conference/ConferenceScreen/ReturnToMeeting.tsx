import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

import { returnToMeetingStore } from "./../../../../../store/returnToMeetingStore";
import MeetingStore from "../../../../../store/meetingStore";
import callsStore from "../../../../../store/callStore";
import callService from "../../../../../services/callService";
import { ToastContainer, toast } from "react-toastify";
import ReactTooltip from "react-tooltip";

import {
  useRosterState,
  useMeetingManager,
  DeviceLabels,
} from "amazon-chime-sdk-component-library-react";

import { userStore } from "../../../../../store/userStore";

export default function ReturnToMeeting({ a }: any) {
  const { isReturnToMeeting } = returnToMeetingStore();
  const meetingManager = useMeetingManager();
  const { roster } = useRosterState();
  const attendees = Object.values(roster);

  const history = useHistory();

  const setCurrentCall = callsStore((store: any) => store.setCurrentCall);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    user: { firstname, uid },
    getUser,
  } = userStore();

  let {
    currentCall: { external_id: externalId, started_at: startTime },
  } = callsStore();

  React.useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [currentSeconds, setCurrentSeconds] = React.useState(0);
  const [currentMinute, setCurrentMinute] = React.useState(0);
  const [currentHour, setCurrentHour] = React.useState(0);

  let timerRef: any = React.useRef();

  React.useEffect(() => {
    if (startTime && externalId) {
      timerRef.current = setInterval(() => {
        if (currentSeconds >= 59) {
          setCurrentSeconds(0);
          setCurrentMinute((m) => m + 1);
        }

        if (currentMinute >= 59) {
          setCurrentSeconds(0);
          setCurrentMinute(0);
          setCurrentHour((h) => h + 1);
        }
        setCurrentSeconds((s: any) => s + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  });

  const [setMeetingCode, setExternalUserId, setCallId, setChimeAttendeeId] =
    MeetingStore((store: any) => [
      store.setMeetingCode,
      store.setExternalUserId,
      store.setCallId,
      store.setChimeAttendeeId,
    ]);

  const handleReturnToMeeting = async () => {
    setIsLoading(true);

    await callService
      .joinConferenceCall(externalId, {
        userId: uid,
        name: firstname,
      })
      .then(async (meetingResponse) => {
        const meetingJson: any = await meetingResponse.data;

        setMeetingCode(meetingJson.external_id);
        setCallId(meetingJson.conversation.call_id);
        setExternalUserId(meetingJson.participant.ExternalUserId);
        setChimeAttendeeId(meetingJson.participant.AttendeeId);

        const joinData = {
          meetingInfo: meetingJson.Meeting,
          attendeeInfo: meetingJson.participant,
          deviceLabels: DeviceLabels.AudioAndVideo,
        };

        setCurrentCall(meetingJson);

        await meetingManager.join(joinData);

        setIsLoading(false);

        await meetingManager.start();
        history.push(`/user/call/${externalId}`);
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Oops! Try Again.", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <>
      <ToastContainer />

      {isReturnToMeeting &&
        ReactDOM.createPortal(
          <section className="meeting-wrapper">
            <ReactTooltip />

            <div className="meeting-wrapper-container">
              <div>
                <h3>Ongoing Meeting</h3>
              </div>

              {attendees && (
                <div className="meeting-image-wrapper">
                  {attendees?.map(({ name }, i) => {
                    if (i < 4) {
                      return (
                        <div className="meeting-main-image" data-tip={name}>
                          {name?.slice(0, 2)?.toLocaleUpperCase()}
                        </div>
                      );
                    }
                    return (
                      <div className="meeting-other-image">
                        +{attendees?.length - 4}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="meeting-time-count">
                <h6>
                  {" "}
                  {currentHour > 0 &&
                    (currentHour > 9 ? currentHour : `0${currentHour}`)}
                  {currentHour > 0 && ":"}
                  {currentMinute > 9 ? currentMinute : `0${currentMinute}`}:
                  {currentSeconds > 9 ? currentSeconds : `0${currentSeconds}`}{" "}
                </h6>
              </div>

              <div>
                <button
                  className="meeting-button"
                  type="submit"
                  onClick={handleReturnToMeeting}
                  disabled={isLoading}
                >
                  {isLoading ? "Connecting..." : "Return to Meeting"}
                </button>
              </div>
            </div>
          </section>,
          document.body
        )}
    </>
  );
}
