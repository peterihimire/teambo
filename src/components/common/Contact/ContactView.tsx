import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserIcon, { AvatarIcon } from "./../UserIcon/UserIcon";
import Typography from "./../Typography/Typography";
import Button from "./../Button/Button";
import { userStore } from "../../../store/userStore";
import api from "./../../../utils/constants/api";
import { usePost } from "./../../../utils/hooks/fetchHook";

import MeetingStore from "../../../store/meetingStore";

// Amazon Chime
import {
  useMeetingManager,
  DeviceLabels,
} from "amazon-chime-sdk-component-library-react";
// Http Service
import callService from "../../../services/callService";
import ModalMeetingDeviceSetup from "./../Modals/ModalMeetingDeviceSetup";
import callsStore from "../../../store/callStore";

interface Props {
  noCall?: boolean;
  iconSize?: string;
  actionBtnSize?: string;
  userImg?: any;
  user?: any;
  userDetail?: any;
  url?:any;
  updateSelectedContactInfo: (arg: any) => void
}
const ContactView: React.FC<Props> = ({
  noCall = true,
  iconSize,
  actionBtnSize,
  userImg,
  user,
  userDetail,
  url,
  updateSelectedContactInfo
}) => {
  const accountUser = userStore((store) => store.user);

  const history = useHistory();
  //api calls
  const { post } = usePost(api.POST_START_CONVERSATION);

  //default values for details
  let name = "Teresa Lloyd";
  let type = "PR agent";
  let avatar = "BA";
  let isAccountUser = "";
  let image = "";

  const beginConversation = async () => {
    if (userDetail && userDetail.user) {
      const data = {
        participants: [userDetail.user.uid],
        privacy: "PRIVATE",
      };

      try {
        const conversationResponse: any = await post(data);

        history.push(`/user/messages/${conversationResponse.data.uid}`);
      } catch (err) {
        console.log(err);
      }
    } else return;
  };

  //destructure setting the call to be started to state
  const setCurrentCall = callsStore((store) => store.setCurrentCall);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setMeetingCode, setExternalUserId, setCallId, setChimeAttendeeId } = MeetingStore();

  /**
   * Amazon Chime Shit (Start)
   * @param
   */

  const meetingManager = useMeetingManager();

  const joinMeeting = async () => {
    setIsLoading(true);
    // e.preventDefault();
    // Fetch the meeting and attendee data from your server application
    try {
      const meetingResponse: any = await callService.startConferenceCall({
        type: "VIDEO",
        privacy: "PRIVATE",
      });
      const meetingJson: any = await meetingResponse.data;
      await callService.addMeetingParticipant({
        call_id: meetingJson.external_id,
        participants: [userDetail.uid]
      });
      setMeetingCode(meetingJson.external_id);
      setCallId(meetingJson.conversation.call_id);
      setExternalUserId(meetingJson.participant.ExternalUserId);
      setChimeAttendeeId(meetingJson.participant.AttendeeId);

      const joinData = {
        meetingInfo: meetingJson.Meeting,
        attendeeInfo: meetingJson.participant,
        deviceLabels: DeviceLabels.AudioAndVideo,
      };

      //set the current call to state
      setCurrentCall(meetingJson);

      // Use the join API to create a meeting session using the above <data

      await meetingManager.join(joinData);
      setIsLoading(false);
      setShowModal(true);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  if (user && user.id) {
    const { firstname, lastname, type: userType, uid, image: userImage } = user;
    name = `${lastname} ${firstname}`;
    image = userImage;
    type = userType;
    avatar = lastname[0] + firstname[0];
    isAccountUser = uid === accountUser.uid ? "" : "not__user";
  } else if (userDetail) {
    name = userDetail ? userDetail.fullname : "Adams Grants";
    type = userDetail ? userDetail.role : "Software Developer";
    avatar =
      userDetail.fullname[0].toUpperCase() +
      userDetail.fullname[1].toUpperCase();
  }

  return (
    <div className="user-contact">

      <Link to={`${url}/${userDetail.uid}`} className="user-contact__link" onClick={() => updateSelectedContactInfo(userDetail)}>
        {!image ? (
          <AvatarIcon avatar={avatar} cssClass={`${isAccountUser}`} />
        ) : (
          <UserIcon cssClass={iconSize} pic={image} userId={userDetail.user.uid}/>
        )}
        <div className="user-contact__info">
          <Typography
            type="h3"
            text={name}
            cssClass="head-7 line-height-0 m-b-18px"
          />
          <Typography type="p" text={type} cssClass="p-2 line-height-0" />
        </div>
      </Link>

      <div className="m-l-auto flex-r">
        {noCall && (
          <>
            {userDetail && userDetail.user && (
              <>
                <Button
                  handleClick={beginConversation}
                  cssClass="btn btn-icon user-contact__cta user-contact__cta--1 flx-shrink-0"
                  icon="icon-comment-double"
                  iconClass="icon-comment-double"
                />

                <Button
                  handleClick={joinMeeting}
                  cssClass="btn btn-icon user-contact__cta flx-shrink-0"
                  icon="icon-phone-right"
                  iconClass="icon-phone-right"
                  isLoading={isLoading}
                />
              </>
            )}
          </>
        )}
        {/* <div ref={setReferenceRef} onClick={handleDropdownClick}>
          <Button
            cssClass={`btn btn-icon user-contact__cta flx-shrink-0 ${
              actionBtnSize ? actionBtnSize : null
            }`}
            icon="icon-tri-dot"
            iconClass="icon-tri-dot"
          />
        </div>
        {visible && (
          <div ref={setPopperRef} style={styles.popper} {...attributes.popper}>
            <div>
            </div>
          </div>
        )} */}
      </div>
      {showModal && (
        <ModalMeetingDeviceSetup handleClick={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ContactView;
