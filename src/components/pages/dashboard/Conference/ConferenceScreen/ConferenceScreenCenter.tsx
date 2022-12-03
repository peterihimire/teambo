import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  useLocalVideo,
  LocalVideo,
  //  RemoteVideos,
  // RemoteVideo,
  useToggleLocalMute,
  useMeetingManager,
  FeaturedRemoteVideos,
  useRemoteVideoTileState,
  ContentShare,
  useContentShareControls,
  useContentShareState,
} from "amazon-chime-sdk-component-library-react";

import Button from "./../../../../common/Button/Button";
import LocalVideoAvatar from "./../Meeting/Video/LocalVideoAvatar";
import { userStore } from "./../../../../../store/userStore";
import namesToAvatar from "./../../../../../utils/helpers/namesToAvatar";
import ButtonRecording from "./../../../../common/Button/ButtonRecording";
import Svg from "../../../../common/Svg/Svg";
import MeetingStore from "./../../../../../store/meetingStore";
import recordingService from "../../../../../services/recordingService";
import { returnToMeetingStore } from "./../../../../../store/returnToMeetingStore";
import callsStore from "./../../../../../store/callStore";
interface Props {
  handleShowModal?: () => void;
  handleShowRight?: () => void;
  showLeft?: any;
  handleShowLeft?: () => void;
  handleShowParticipants?: () => void;
  handleShowDeviceModal?: () => void;
}

// Start of Component
const ConferenceScreenCenter: React.FC<Props> = ({
  handleShowModal,
  handleShowRight,
  showLeft,
  handleShowLeft,
  handleShowParticipants,
  handleShowDeviceModal,
}) => {
  const [showMeetingAction, setShowMeetingAction] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openRecordActions, setOpenRecordActions] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isLoadingAll, setIsLoadingAll] = useState<boolean>(false);
  const { toggleVideo, isVideoEnabled } = useLocalVideo();
  const { toggleContentShare } = useContentShareControls();
  const { isLocalUserSharing, tileId } = useContentShareState();
  const { muted, toggleMute } = useToggleLocalMute();
  const { size } = useRemoteVideoTileState();
  const history = useHistory();
  const meetingManager = useMeetingManager();

  const { currentCall, setCurrentCall } = callsStore();

  const { setIsReturnToMeeting } = returnToMeetingStore();
  const [offEvent, setOffEvent] = React.useState(false);

  React.useEffect(() => {
    setIsReturnToMeeting(false);
    return (): any => {
      if (Boolean(currentCall) && currentCall?.external_id && !offEvent) {
        setIsReturnToMeeting(true);
      } else {
        setIsReturnToMeeting(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsReturnToMeeting, offEvent]);

  const { user } = userStore();
  const callId = MeetingStore((store) => store.callId);

  // Covert user names to avatar
  const { firstname, lastname } = user;
  const avatarText = namesToAvatar(firstname, lastname);
  // Meeting Action Toggle
  const toggleMeetingActions = () => {
    setShowMeetingAction((prevState) => !prevState);
  };
  // Leave Meeting function

  const returnToMeetingLeave = () => {
    setCurrentCall({
      calls: [],
      conferenceCalls: [],
      currentCall: null,
    });
    setOffEvent(true);
    setIsReturnToMeeting(false);
  };
  const leaveMeetingAll = async () => {
    returnToMeetingLeave();
    setIsLoadingAll(true);
    await meetingManager.leave();
    setIsLoadingAll(false);
    history.push("/user");
  };
  const leaveMeeting = async () => {
    returnToMeetingLeave();
    setIsLoading(true);
    await meetingManager.leave();
    setIsLoading(false);
    history.push("/user");
  };
  // Start and end recording
  const startRecording = async () => {
    setIsRecording(true);
    const callData = {
      title: "string",
      call_id: callId,
      description: "string",
    };
    try {
      const res = await recordingService.startMeetingRecording(callData);
      console.log("Recording: ", res.data);
      const res2 = await recordingService.startRecording(
        "b587e57d-97d0-4f1a-a669-d0b034c20706"
      );
      console.log("Recording: ", res2.data);
    } catch (error) {
      setIsRecording(false);
    }
  };
  const stopRecording = () => {
    setIsRecording(false);
  };

  return (
    <>
      <div className="call-conference-video__center">
        <div className="overlayy">
          <div className="overlayy__top"></div>
          <div className="overlayy__bottom"></div>
        </div>

        <div className="call-conference-video__top">
          <div className="flex-r">
            <Button
              cssClass="btn btn-icon call-conference-video__cta"
              icon="icon-share-screen-blue"
              iconClass="icon-share-screen-blue"
              title="Share Screen"
              handleClick={() => toggleContentShare()}
            />
            <ButtonRecording
              recording={isRecording}
              handleClick={() =>
                setOpenRecordActions((prevState) => !prevState)
              }
            >
              {openRecordActions && (
                <div className="recording-dropdown animate-fadeOutRightMin">
                  <Link
                    to="#"
                    className="recording-dropdown__btn"
                    onClick={() => startRecording()}
                  >
                    <Svg
                      iconId="icon-video-record-start"
                      cssClass="icon-video-record-start"
                    />
                    <span className="recording-dropdown__btn-text">
                      Start Recording
                    </span>
                  </Link>
                  <Link
                    to="#"
                    className="recording-dropdown__btn"
                    onClick={() => stopRecording()}
                  >
                    <Svg
                      iconId="icon-video-record-end"
                      cssClass="icon-video-record-end"
                    />
                    <span className="recording-dropdown__btn-text">
                      Stop Recording
                    </span>
                  </Link>
                </div>
              )}
            </ButtonRecording>
          </div>

          <div className="flex-r">
            <Button
              cssClass="btn btn-icon call-conference-video__cta "
              icon="icon-participants"
              iconClass="icon-participants"
              title="View Participants"
              handleClick={handleShowParticipants}
            />
            <Button
              cssClass="btn btn-icon call-conference-video__cta "
              icon="icon-user-plus"
              iconClass="icon-user-plus"
              title="Add user to call"
              handleClick={handleShowModal}
            />
            <Button
              cssClass="btn btn-icon call-conference-video__cta"
              icon="icon-comment"
              iconClass="icon-comment"
              title="Chat"
              handleClick={handleShowRight}
            />
          </div>
        </div>

        <div className="call-conference-video__participants">
          <div className="call-conference-video__participant-active">
            {/* {isLocalShareLoading ?  <Typography
        type="h3"
        text={`${firstname} is screen sharing`}
        cssClass="video-avatar__text"
      />? */}
            <ContentShare />
            {!isLocalUserSharing && !tileId && (
              <div className="call-conference-video__participant-active-component">
                {/* <Image
              source="pic6"
              cssClass="call-conference-video__participant-img"
            /> */}
                {isVideoEnabled ? (
                  <LocalVideo nameplate="Me" />
                ) : (
                  <LocalVideoAvatar text={user ? avatarText : ""} />
                )}
              </div>
            )}
          </div>

          {size > 0 ? (
            <div className="call-conference-video__other-participants-wrapper">
              <div className="call-conference-video__other-participants ">
                {/* <RemoteVideos /> */}
                {/* <RemoteVideo tileId={avatarText} name={avatarText} /> */}

                {tileId && (
                  <div className="call-conference-video__participant">
                    {isVideoEnabled ? (
                      <LocalVideo
                        nameplate="Me"
                        className="call-conference-video__participant"
                      />
                    ) : (
                      <LocalVideoAvatar text={avatarText ? avatarText : ""} />
                    )}
                  </div>
                )}

                {/* {tiles.map((tileId) => (
                  <RemoteVideo tileId={tileId} name={avatarText} />
                ))} */}

                <FeaturedRemoteVideos />
              </div>
            </div>
          ) : null}
        </div>

        <div className="call-conference-video__footer">
          {showMeetingAction && (
            <div className="flex-r-jccenter call-conference-video__leave-meeting__container ">
              <div className="call-conference-video__leave-meeting animate-slideFromTop">
                <Button
                  cssClass="btn btn--danger btn--small btn--full m-b-10px"
                  text="End Meeting for All"
                  handleClick={() => leaveMeetingAll()}
                  isLoading={isLoadingAll}
                />
                <Button
                  cssClass="btn btn--primary btn--small btn--full"
                  text="Leave Meeting"
                  handleClick={() => leaveMeeting()}
                  isLoading={isLoading}
                />
              </div>
            </div>
          )}
          <div className="flex-r">
            <Button
              cssClass="btn btn-icon call-conference-video__cta"
              icon="icon-bars"
              iconClass="icon-bars"
              title={showLeft ? "Hide meeting code" : "View meeting code"}
              handleClick={handleShowLeft}
            />
          </div>
          <div className="flex-r">
            <Button
              cssClass={`btn btn-icon call-conference-video__cta ${
                muted ? "muted" : ""
              }`}
              icon="icon-mic"
              iconClass="icon-mic"
              title={muted ? "Unmute" : "Mute"}
              handleClick={toggleMute}
            />
            <Button
              cssClass="btn btn-icon btn-icon--0-border btn--primary call-conference-video__cta"
              icon="icon-phone-down"
              iconClass="icon-phone-down"
              title="End meeting"
              handleClick={() => toggleMeetingActions()}
            />
            <Button
              cssClass={`btn btn-icon call-conference-video__cta ${
                !isVideoEnabled ? "muted" : ""
              }`}
              icon="icon-camera"
              iconClass="icon-camera"
              title={isVideoEnabled ? "Hide video" : "Show video"}
              handleClick={toggleVideo}
            />
          </div>
          <div className="flex-r">
            <Button
              cssClass="btn btn-icon call-conference-video__cta"
              icon="icon-settings-solid"
              iconClass="icon-settings-solid"
              title="Call Settings"
              handleClick={handleShowDeviceModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ConferenceScreenCenter;
