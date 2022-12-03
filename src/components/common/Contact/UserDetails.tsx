import React, { useState } from "react";
import UserDetailsImage from "./../User/UserDetailsImage";
import Typography from "./../Typography/Typography";
import Button from "./../Button/Button";
import { useHistory } from "react-router-dom";
import api from "./../../../utils/constants/api";
import { usePost } from "./../../../utils/hooks/fetchHook";
import { AvatarIconLarge } from "../UserIcon/UserIcon";
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
  contact?: any;
}
const UserDetails: React.FC<Props> = ({ contact }) => {
  const history = useHistory();
  //api calls
  const { post } = usePost(api.POST_START_CONVERSATION);

  const beginConversation = async () => {
    if (contact && contact.user) {
      const data = {
        participants: [contact.user.uid],
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
        participants: [contact.user.uid]
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
  if(!contact){
    history.push(`/user/contacts`);
    history.go(0);
  }
  const avatar =
  contact.fullname[0].toUpperCase() +
  contact.fullname[1].toUpperCase();

  return (
    <>
      <div className="user-details">
        <table className="user-details__table">
          <tbody>
            <tr>
              <td></td>

              <td className="user-details__detail">
                <div className="flex-r-aicenter">
                  {contact.user.image ? 
                    <UserDetailsImage img={contact.user.image} userId={contact.user.uid}  />
                  : 
                    <AvatarIconLarge avatar={avatar} />
                  }
                  <div className="m-l-20px">
                    <div>
                      <Typography
                        type="h5"
                        text={contact.fullname}
                        cssClass="head-9"
                      />
                      <Typography
                        type="p"
                        text={contact.role}
                        cssClass="p-1"
                      />
                    </div>
                    <div className="m-t-10px flex-r">
                      <Button
                        handleClick={beginConversation}
                        cssClass="btn btn--primary btn--xxsmall btn-icon-n-text m-r-10px"
                        withIcon={true}
                        iconClass="icon-message-small m-r-7px"
                        btnIcon="icon-message-small"
                        text="Message"
                      />
                      <Button
                        cssClass="btn btn-icon m-r-10px"
                        icon="icon-phone-right"
                        iconClass="icon-phone-right"
                        handleClick={joinMeeting}
                        isLoading={isLoading}
                      />
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            {/* <tr>
              <td className="user-details__title-container">
                <Typography
                  type="h6"
                  cssClass="user-details__title"
                  text="Bio"
                />
              </td>
              <td className="user-details__detail">
                <Typography
                  type="p"
                  cssClass="user-details__detail-text"
                  text=" When I first got into the advertising, I was looking for the
              magical combination that would put website into the top search
              engine rankings"
                />
              </td>
            </tr> */}
            <tr>
              <td className="user-details__title-container">
                <Typography
                  type="p"
                  cssClass="user-details__title"
                  text="Email"
                />
              </td>
              <td className="user-details__detail">
                <div className="flex-r-jcbetween">
                  <div>
                    <Typography
                      type="p"
                      cssClass="user-details__detail-text"
                      text={contact.email}
                    />
                  </div>
                  <Typography
                    type="p"
                    cssClass="user-details__label"
                    text="Primary"
                  />
                </div>
                {contact.additional_email?.map((email: any, index:any) => (
                  <Typography
                    key={index}
                    type="p"
                    cssClass="user-details__detail-text"
                    text={email}
                  />
                ))}
              </td>
            </tr>
            <tr>
              <td className="user-details__title-container">
                <Typography
                  type="p"
                  cssClass="user-details__title"
                  text="Address"
                />
              </td>
              <td className="user-details__detail">
                <div className="flex-r-jcbetween">
                  <Typography
                    type="p"
                    cssClass="user-details__detail-text"
                    text={contact.address}
                  />
                </div>
              </td>
            </tr>
            {/* <tr>
              <td className="user-details__title-container">
                <Typography
                  type="p"
                  cssClass="user-details__title"
                  text="Meeting"
                />
              </td>
              <td className="user-details__detail">
                <div className="flex-r-jcbetween">
                  <Typography
                    type="p"
                    cssClass="user-details__detail-text"
                    text=" http://go.betacall.com/meet/j.stevens"
                  />
                </div>
              </td>
            </tr> */}
            <tr>
              <td className="user-details__title-container">
                <Typography
                  type="p"
                  cssClass="user-details__title"
                  text="Phone"
                />
              </td>
              <td className="user-details__detail">
                <div className="flex-r-jcbetween">
                  <div>
                    <Typography
                      type="p"
                      cssClass="user-details__detail-text"
                      text={contact.phone}
                    />
                  </div>
                    <Typography
                      type="p"
                      cssClass="user-details__label"
                      text="Primary"
                    />
                </div>
                {contact.additional_phone?.map((phone: any, index:any) => (
                  <Typography
                    key={index}
                    type="p"
                    cssClass="user-details__detail-text"
                    text={phone}
                  />
                ))}
              </td>
            </tr>
            {/* <tr>
              <td className="user-details__title-container">
                <Typography
                  type="p"
                  cssClass="user-details__title"
                  text="Social"
                />
              </td>
              <td className="user-details__detail">
                <div className="flex-r">
                  <Button
                    cssClass="btn btn-icon user-details__social-btn"
                    icon="icon-facebook-sm"
                    iconClass="icon-facebook-sm"
                  />
                  <Button
                    cssClass="btn btn-icon user-details__social-btn"
                    icon="icon-pinterest"
                    iconClass="icon-pinterest"
                  />
                  <Button
                    cssClass="btn btn-icon user-details__social-btn"
                    icon="icon-twitter-sm"
                    iconClass="icon-twitter-sm"
                  />
                  <Button
                    cssClass="btn btn-icon user-details__social-btn"
                    icon="icon-linkedin"
                    iconClass="icon-linkedin"
                  />
                  <Button
                    cssClass="btn btn-icon user-details__social-btn"
                    icon="icon-google-sm"
                    iconClass="icon-google-sm"
                  />
                </div>
              </td>
            </tr> */}
          </tbody>
        </table>
        {showModal && (
          <ModalMeetingDeviceSetup handleClick={() => setShowModal(false)} />
        )}
      </div>
    </>
  );
};

export default UserDetails;
