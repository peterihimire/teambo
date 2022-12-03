import { useEffect, useRef, useState } from 'react';
import addNotification from "react-push-notification";
import { useHistory } from "react-router";


//custo imports
import { EVENT_TYPES } from '../constants/socketEvents';
import { messageStore } from '../../store/messageStore';
import { userStore } from '../../store/userStore';
import { toast } from 'react-toastify';


const { TYPING, TYPE_END, NEW_PARTICIPANT, NEW_CONVERSATION_REQUEST, END_CALL, END_CALL_NOTIFICATION } =
  EVENT_TYPES;




const useSocketio = (conversationId : string) => {
  const history = useHistory();
  const renderRedirect = () => {
      history.push('/user/dashboard')
      history.go(0)
  }

  //Get the user from the store
  const user = userStore((store) => store.user);


  //get required state from message store
      const [
        setConversationDetails,
        addNewConversation,
        setAllUserConversations,
        allConversations
      ] = messageStore((store) => [
        store.setConversationDetails,
        store.addNewConversation,
        store.setAllUserconversations,
        store.allConversations
      ]);

  //ref for socket .io initialization
  const socketRef = useRef<any>(null);

  //Try to confirm the current user with any property
  const confirmUser = (id: string): boolean => user.uid === id;

 //const all messages to be displayed
  const allMessages = useRef<Array<any>>([]);

  //listen to the user typing
  const [guestTyping, setGuestTyping] = useState<any>({
    typing: false,
  });



  //updat the conversation details 
      const updateConversation = (conversation: any) => {
        let conversationIndex = -1;
        if (conversation.conversation_id) {
          conversationIndex = [...allConversations].findIndex(
            (prevConversation) =>
              // eslint-disable-next-line
              prevConversation.uid == conversation.conversation_id
          );
        }
    
        if (conversationIndex !== -1) {
          let newConversations = [...allConversations];
          let myConversation = newConversations[conversationIndex];
          myConversation.last_message = conversation;
    
          setAllUserConversations(newConversations);
        }
      };

      useEffect(() => {
        socketRef.current = io(process.env.REACT_APP_API_URL+"/conversation");
    
        socketRef.current.on(TYPING, (payload: any) => {
          setGuestTyping({
            typing: true,
            ...payload,
          });
    
          setTimeout(() => {
            setGuestTyping({
              typing: false,
            });
          }, 5000);
        });
    
        socketRef.current.on(TYPE_END, (payload: any) => {
          setGuestTyping({
            typing: false,
          });
        });
    
        socketRef.current.emit("event::conversation::join-conversation", {
          conversation: conversationId,
          user: user.uid,
        });
    
        socketRef.current.on("event::conversation::new-message", (msg: any) => {
            const prevLastMessage =
            allMessages.current[allMessages.current.length - 1];
         
            
          if (prevLastMessage && msg.uid !== prevLastMessage.uid) {
            const myMessage = confirmUser(msg.sender_id);
            if (!myMessage) {
             
              addNotification({
                title: "Timbo message",
                subtitle: "New message",
                message: msg?.text,
                native: true,
              });
            }
            allMessages.current = [...allMessages.current, msg];
            updateConversation(msg);
          } else if (!prevLastMessage && allMessages.current.length === 0) {
            allMessages.current = [...allMessages.current, msg];
            updateConversation(msg);
          }
        });
    
        socketRef.current.on(
          "event::conversation::leave-conversation",
          (msg: any) => {
            // console.log(msg)
            console.log(msg);
          }
        );
        socketRef.current.on(
          "event::conversation::remove-participant",
          (conversation: any) => {
            let conversationIndex = [...allConversations].findIndex(
              // eslint-disable-next-line
              (prevConversation) => prevConversation.uid == conversation.uid
            );
    
            if (conversationIndex !== -1) {
              let newConversations = [...allConversations];
    
              newConversations.splice(conversationIndex, 1, conversation);
              setConversationDetails(conversation);
              setAllUserConversations(newConversations);
            }
          }
        );
    
        socketRef.current.on(NEW_PARTICIPANT, (conversation: any) => {
          let conversationIndex = [...allConversations].findIndex(
            // eslint-disable-next-line
            (prevConversation) => prevConversation.uid == conversation.uid
          );
    
          if (conversationIndex !== -1) {
            let newConversations = [...allConversations];
    
            newConversations.splice(conversationIndex, 1, conversation);
            setConversationDetails(conversation);
            setAllUserConversations(newConversations);
          }
        });
    
        socketRef.current.on(NEW_CONVERSATION_REQUEST, (response: any) => {
          let checkConversation = [...allConversations].filter(
            (conversation) => conversation.id === response.id
          );
    
          if (checkConversation.length > 0) return;
          addNewConversation(response);
          // setConversationDetails(response)
        });

        socketRef.current.on(
          END_CALL,
          (msg: any) => {
            console.log(msg);
            toast.error(msg, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              onClose: () => renderRedirect(),
            })
          }
        );

        socketRef.current.on(
          END_CALL_NOTIFICATION,
          (msg: any) => {
            console.log(msg);
            toast.error(msg, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              // onClose: () => history.go(0),
            })
          }
        );
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [conversationId, user.uid, allConversations]);

    return { socketRef, allMessages, user, guestTyping }
}

export default useSocketio
