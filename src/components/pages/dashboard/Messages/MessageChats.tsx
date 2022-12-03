//eslint-disable-next-line
import React, { Fragment, useEffect, useRef, useState, createRef } from "react";

import UserDetailsModal from "./Modal/UserDetailsModal";
import ChatBox from "./Bones/ChatBox";
import MessageChatContentToggler from "./Bones/MessageChatContentToggler";
import {MessageInput, TypingChat} from "./../../../common";
import Loader from "../../../common/Loader";
import { messageStore } from "../../../../store/messageStore";
import authService from "../../../../services/authService";
import { EVENT_TYPES } from "../../../../utils/constants/socketEvents";
import api from "../../../../utils/constants/api";
import { useLazyGet, usePost } from "../../../../utils/hooks/fetchHook";
import useSocketio from "../../../../utils/hooks/useSocketio";


const { TYPING, TYPE_END } =
  EVENT_TYPES;

interface Props {
  match: {
    params: {
      id: string;
    };
  };
}

const MessageChats: React.FC<Props> = (props) => {
  let conversationId = props?.match.params.id;



  
  const [
    setConversationDetails,
    
    setParticipants,
    setAllGroupContacts,
  ] = messageStore((store) => [
    store.setConversationDetails,
    store.setParticipants,
    store.setAllGroupContacts,
  ]);

  //local state
  const [userDetails, setUserDetails] = useState<any>({ fetched: false });
  const [userDetailsModal, setuserDetailsModal] = useState<boolean>(false);
 
  const [userText, setUserText] = useState("");
  const messagesEndRef = createRef<HTMLInputElement>();


  // api calls
  const { isLoading, get: getAllMessage } = useLazyGet(
    api.GET_CONVERSATION_MESSAGES(conversationId)
  );
  const { get: getUserDetails } = useLazyGet("");
  const { get: getConversationById } = useLazyGet(
    api.GET_CONVERSATION_BY_ID(conversationId)
  );
  const { post: postMessage } = usePost("");

  const MessageChatTogglerPorps = {
    conversationId,
  };

    // Socket.io event emitters and listeners
const { socketRef, allMessages, user, guestTyping } = useSocketio(conversationId)




  useEffect(() => {
    //make sure that the participant modal selection is emptyp
    setParticipants([]);
    setAllGroupContacts([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  //get all messages and conversation once the user navigate the pages (reason for the conversationId dependency)
  useEffect(() => {
    getAllMessage()
      .then((data) => {
        allMessages.current = [...data].reverse();
      })
      .catch((err) => {
        // console.log("err");
      });

    getConversationById()
      .then((data) => {
        setConversationDetails(data);
      })
      .catch((err) => {});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);



  // custom scroll to bottom for new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMessages.current, guestTyping]);

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
      setUserText("");
    } catch (err) {}
  };

  // this is for showing the current participant detail on the right
  const handleUserDetails = async (message: any) => {
    const id = message?.sender.uid || "";
    let userId = api.GET_USER_DETAILS(id);
    //dont fetch if you are still clicking on the same user
    if (userDetails.uid === id) return;

    if (id && userId) {
      try {
        let userdetails = await getUserDetails({}, userId);
        setUserDetails({ ...userdetails, fetched: true });
      } catch (err) {}
    }
  };

  const assetToken = authService.getAssetToken();

  return (
    <>
      <main>
        <div className="message-chat">
          {/* <MessageChatLeft /> */}

          <div className="message-chat__center">
            <MessageChatContentToggler {...MessageChatTogglerPorps} />
            {/* Chats */}
            <div className="message-chat__center__content">
              <div className="message-chats">
                <div className="message-chats__discussions">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <ChatBox
                      allMessages={allMessages.current}
                      conversationId={conversationId}
                      user={user}
                      assetToken={assetToken}
                      handleUserDetails={handleUserDetails}
                      setUserDetailsModal={setuserDetailsModal}
                    />
                  )}
                  {guestTyping.typing ? (
                    <TypingChat user={guestTyping} me={user.uid === guestTyping.user ? true : false}/>
                  ) : null}
                  <div ref={messagesEndRef} />
                </div>
                <div className="call-conference-video__right-footer">
                  <MessageInput
                    getMessage={getMessage}
                    handleSubmit={sendMesssge}
                    noExtra={false}
                    messageChat={true}
                    value={userText}
                  />
                </div>
              </div>
            </div>
          </div>

          {userDetailsModal && <UserDetailsModal user={userDetails} />}
        </div>
      </main>
    </>
  );
};

export default MessageChats;
