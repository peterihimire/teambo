import React, { useState } from "react";

//custom import
import Typography from "../../../../common/Typography/Typography";
import Button from "./../../../../common/Button/Button";
import ChatBox from "../../Messages/Bones/ChatBox";
import TypingChat from "./../../../../common/Chat/TypingChat";
import MessageInput from "./../../../../common/Chat/ChatInput";
import callsStore from "../../../../../store/callStore";
import authService from "../../../../../services/authService";
import useSocketio from "../../../../../utils/hooks/useSocketio";
import { EVENT_TYPES } from "../../../../../utils/constants/socketEvents";
import api from "../../../../../utils/constants/api";
import { usePost } from '../../../../../utils/hooks/fetchHook';

const { TYPING, TYPE_END } =
  EVENT_TYPES;
interface Props {
  showRight: boolean,
  handleShowRight?: () => void;
}


const ConferenceScreenRight: React.FC<Props> = ({ showRight, handleShowRight }) => {
  const [userText, setUserText] = useState("");

  //get the current call details
  const currentCall = callsStore(store => store.currentCall);

  //get the conversation id
  const { conversation_id: conversationId = ""} = currentCall;


  //start the socket io
  const {  socketRef, allMessages, user, guestTyping } = useSocketio(conversationId);

  //post message
  const { post: postMessage } = usePost("");

  //the get message is passed into the input in order to extrac the message and also for the socket.io typing
  const getMessage = (message: any) => {
    setUserText(message);
    const payload = { user: user.uid, conversation: conversationId };

    if (message) {
      socketRef.current.emit(TYPING, payload);
    } else {
      socketRef.current.emit(TYPE_END, payload);
    }
  };
  
  //this is triggered when the user send message
  const sendMesssge = async (attachments: any) => {
    try {
      const formData = new FormData();
      formData.append("text", userText);
      if (attachments) {
        attachments.forEach((attachment: any) => {
          formData.append("attachments", attachment);
        });
      }
      await postMessage(
        formData,
        {},
        api.POST_CONVERSATION_MESSAGE(conversationId)
      );
    } catch (err) {}
  };
  const assetToken = authService.getAssetToken();
  return (
    <>
    {
      showRight && 
    <aside className="call-conference-video__right">
      <div className="call-conference-video__right-top">
        <Typography type="h3" cssClass="head-10" text="Messages" />

        <Button
          cssClass="btn btn-icon m-l-auto"
          icon="icon-times"
          iconClass="icon-times"
          handleClick={handleShowRight}
        />
      </div>
      <div className="call-conference-video__right-body">
    
          <ChatBox
              allMessages={allMessages.current}
              conversationId={conversationId}
              user={user}
              assetToken={assetToken}
              
            />
        
          {guestTyping.typing ? (
            <TypingChat user={guestTyping} />
          ) : null}
      </div>
      <div className="call-conference-video__right-footer">
        <MessageInput
          getMessage={getMessage}
          handleSubmit={sendMesssge}
        />
      </div>
    </aside>
    }
    </>
  );
};

export default ConferenceScreenRight;
