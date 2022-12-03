import React, { useState, useEffect, useCallback } from "react";

import ModalLayout from "./../Modal/ModalLayout";
import ModalChild from "./../Modal/ModalChild";
import Typography from "./../Typography/Typography";
import Button from "./../Button/Button";
// import FormJoinMeeting from "./../Forms/FormJoinMeeting";
import TagInput from "./../Input/TagInput";
// import UserContact from "./../Contact/UserContact";

import contactStore from "./../../../store/contactStore";
import meetingStore from "./../../../store/meetingStore";
import callStore from "./../../../store/callStore";

interface Props {
  handleClick: () => void;
}
const ModalInvitePeople: React.FC<Props> = ({ handleClick }) => {
  const [participants, setParticipants] = useState<[]>([]);

  const [userContacts, fetchUserContacts] = contactStore((store) => [
    store.contacts,
    store.fetchContacts,
  ]);

  const meetingCode = meetingStore((store) => store.meetingCode);
  const sendCallInvitatiion = callStore((store) => store.sendCallInvitatiion);

  const fetchAllUserContact = useCallback(async () => {
    fetchUserContacts();
  }, [fetchUserContacts]);

  useEffect(() => {
    fetchAllUserContact();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allContacts = userContacts.map((c: any) => ({
    label: c.fullname,
    value: c.uid,
  }));

  const sendInvitation = () => {
    const mettingPart = participants.map((p: any) => p.value);
    const invitationData = {
      call_id: meetingCode,
      participants: mettingPart,
    };
    sendCallInvitatiion(invitationData);
  };

  return (
    <ModalLayout>
      <ModalChild width="46.5rem" padding="3rem 3rem 5rem">
        <div className="modal__head m-b-100px">
          <Typography type="h3" text="Invite people to call" />
          <Button
            cssClass="btn btn-icon"
            icon="icon-times"
            iconClass="icon-times"
            handleClick={handleClick}
          />
        </div>
        <TagInput
          label="Type name to invite"
          contacts={allContacts}
          setContacts={setParticipants}
        />

        {/* <Typography type="p" text="Invited" cssClass="p-1 m-t-40px m-b-20px" />
        <UserContact /> */}

        <div className="modal-invite-people__actions m-t-60px">
          <Button
            cssClass="btn btn--small btn--all-grey btn-icon-n-text"
            withIcon={true}
            btnIcon="icon-link-2"
            iconClass="icon-link-2 btn-icon-n-text__icon"
            text="Copy Link"
          />

          <Button
            cssClass="btn btn--small btn--primary"
            text={`Send ${participants.length} Invite`}
            handleClick={() => sendInvitation()}
          />
        </div>
      </ModalChild>
    </ModalLayout>
  );
};

export default ModalInvitePeople;
