import React, { Fragment, useEffect } from "react";

import ModalLayout from "./../Modal/ModalLayout";
import ModalChild from "./../Modal/ModalChild";
import Typography from "./../Typography/Typography";
import Button from "./../Button/Button";
import MessageContact from "./../Contact/MessageContact";
import { messageStore } from "../../../store/messageStore";
import Loader from "../Loader";
import TagInput from "../Input/TagInput";
import { useLazyGet, usePatch, usePost } from "../../../utils/hooks/fetchHook";
import api from "../../../utils/constants/api";
import { userStore } from "../../../store/userStore";

interface Props {
  handleClick: () => void;
  conversationId: string;
}
const ModalMeetingParticipants: React.FC<Props> = ({
  handleClick,
  conversationId,
}) => {
  const participants = messageStore((store) => store.message.participants);
  const setParticipants = messageStore((store) => store.setParticipants);
  const conversationDetails = messageStore(
    (store) => store.message.conversationDetails
  );
  const [allContacts, setAllGroupContacts] = messageStore((store) => [
    store.group.allContacts,
    store.setAllGroupContacts,
  ]);
  const user = userStore((store) => store.user);

  //api
  const { get: getParticipants } = useLazyGet("");
  const { isLoading: removeLoading, patch: patchParticipants } = usePatch("");

  useEffect(() => {
    if (conversationDetails.participants) {
      let participantsQuery = conversationDetails?.participants.join(",");
      // console.log(participantsQuery)
      setParticipants([]);
      getParticipants({}, api.GET_PARTICIPANTS(participantsQuery))
        .then((data) => {
          setParticipants(data);
        })
        .catch((err) => {});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationDetails]);

  //api
  const { isLoading, post } = usePost(
    api.POST_ADD_PARTICIPANT_TO_CONVERSATION(conversationId)
  );

  //check if the privacy of the chat is public inorder to prevent adding to group
  const isPublic = conversationDetails.privacy === "PUBLIC";
  const isOwner = conversationDetails.initiator_id === user.uid;

  const addParticipants = async () => {
    const data: any = {};
    data.participants = allContacts.map((contact) => contact.user.uid);
    try {
      await post(data);
      setParticipants([]);
      setAllGroupContacts([]);
      handleClick();
    } catch (error) {}
  };

  const removeParticipant = async (
    conversationId: string,
    participantId: string
  ) => {
    try {
      await patchParticipants(
        "",
        api.REMOVE_PARTICIPANT_FROM_CONVERSATION(conversationId, participantId)
      );
      setParticipants([]);
      setAllGroupContacts([]);
      handleClick();
    } catch (error) {}
  };

  return (
    <ModalLayout>
      <ModalChild width="45.3rem" padding="3rem 3rem 5rem">
        <div className="modal__head m-b-50px">
          <Typography type="h3" text="Members" />
          <Button
            cssClass="btn btn-icon"
            icon="icon-times"
            iconClass="icon-times"
            handleClick={handleClick}
          />
        </div>

        {isPublic && isOwner && (
          <div className="m-b-18px">
            <TagInput
              contacts={allContacts}
              setContacts={setAllGroupContacts}
              label="Select members to add to chat"
              participants={participants}
            />
          </div>
        )}

        {isPublic && allContacts.length > 0 && (
          <div className="m-b-18px">
            <Typography
              type="p"
              text="Contact selected to add"
              cssClass="p-6 m-b-10px"
            />

            {allContacts.map((contact: any) => (
              <Fragment key={contact.id}>
                <MessageContact
                  isOwner={isOwner}
                  userDetail={contact}
                  noCall={false}
                />
              </Fragment>
            ))}
          </div>
        )}

        <div>
          <Typography type="p" text="Added Members" cssClass="p-6 m-b-10px" />

          {participants.length === 0 ? (
            <Loader />
          ) : (
            participants.map((participant: any) => (
              <Fragment key={participant.id}>
                <MessageContact
                  removeParticipant={() =>
                    removeParticipant(conversationId, participant.uid)
                  }
                  user={participant}
                  isOwner={isOwner}
                  noCall={false}
                  isPublic={isPublic}
                />
              </Fragment>
            ))
          )}
        </div>

        <div className="modal-invite-people__actions m-t-60px">
          <Button
            cssClass="btn btn--small btn--all-grey btn-icon-n-text"
            iconClass="icon-link-2 btn-icon-n-text__icon"
            text="Cancel"
            handleClick={handleClick}
          />

          {isPublic && (
            <Button
              disable={allContacts.length === 0}
              cssClass="btn btn--small btn--primary"
              text="Add to chat"
              handleClick={addParticipants}
              isLoading={isLoading || removeLoading}
            />
          )}
        </div>
      </ModalChild>
    </ModalLayout>
  );
};

export default ModalMeetingParticipants;
