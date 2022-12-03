import { useState } from "react";


import ConversationFilesModal from "../Modal/ConversationFilesModal";
import {Badge, ModalMeetingAgenda, ModalMeetingParticipants, Svg, Typography} from "../../../../common";
import { messageStore } from "../../../../../store/messageStore";
import useDialogHook from "../../../../../utils/hooks/useDialogHook";

type Props = {
  conversationId: string;
  // conversationDetails: any;
};

const MessageChatContentToggler: React.FC<Props> = ({ conversationId }) => {
  //zustand store,

  const conversationDetails = messageStore(
    (store) => store.message.conversationDetails
  );
  let groupName = conversationDetails?.title || "Chat name";

  const [agendaModal, setAgendaModal] = useState<boolean>(false);
  const [participantModal, setParticipantModal] = useState<boolean>(false);
  const {
    open: fileModal,
    handleOpen: openFileModal,
    handleClose: closeFileModal,
  } = useDialogHook();

  return (
    <div className="message-chat__content-toggler-wrapper">
      <Typography
        type="h5"
        text={groupName}
        cssClass="head-13 m-b-10px group__name"
      />
      <div className="message-chat__content-toggler">
        <button
          onClick={openFileModal}
          className="message-chat__content-toggle"
        >
          <div className="flex-c-jccenter-aicenter pointer">
            <div className="message-chat__toggle-icon">
              <Badge
                type="ok"
                cssClass="message-chat__content-toggle__badge"
                text={
                  (conversationDetails?.files_count &&
                    conversationDetails.files_count + " ") ||
                  0 + ""
                }
              />
              <Svg iconId="icon-folder" cssClass="icon-folder m-b-4px" />
            </div>
            <span className="message-chat__content-toggle__text">Files</span>
          </div>
        </button>
        {conversationDetails && conversationDetails.type !== "DEFAULT" && (
          <button
            className="message-chat__content-toggle"
            onClick={() => setAgendaModal(true)}
          >
            <div className="flex-c-jccenter-aicenter pointer">
              <div className="message-chat__toggle-icon">
                <Badge
                  type="ok"
                  cssClass="message-chat__content-toggle__badge"
                  text="8"
                />
                <Svg iconId="icon-agenda" cssClass="icon-agenda" />
              </div>
              <span className="message-chat__content-toggle__text">
                Meeting agenda
              </span>
            </div>
          </button>
        )}
        <button
          className="message-chat__content-toggle"
          onClick={() => setParticipantModal(true)}
        >
          <div className="flex-c-jccenter-aicenter pointer">
            <div className="message-chat__toggle-icon">
              <Badge
                type="ok"
                cssClass="message-chat__content-toggle__badge"
                text={
                  (conversationDetails?.participants &&
                    conversationDetails.participants.length + " ") ||
                  0 + ""
                }
              />
              <Svg iconId="icon-group" cssClass="icon-group m-b-6px" />
            </div>
            <span className="message-chat__content-toggle__text">
              Participants
            </span>
          </div>
        </button>
      </div>

      {agendaModal && (
        <ModalMeetingAgenda handleClick={() => setAgendaModal(false)} />
      )}
      {fileModal && (
        <ConversationFilesModal
          conversationId={conversationId}
          handleClick={closeFileModal}
        />
      )}
      {participantModal && (
        <ModalMeetingParticipants
          conversationId={conversationId}
          handleClick={() => setParticipantModal(false)}
        />
      )}
    </div>
  );
};

export default MessageChatContentToggler;
