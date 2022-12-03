import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import UserIcon from "./../UserIcon/UserIcon";
import Button from "./../Button/Button";
import Typography from "./../Typography/Typography";
import { IAllConversations, deleteConversation } from "../../../store/messageStore";
import usePooperDropdown from "../../../utils/hooks/usePopperDropdown";
import PopperContainer from "../PopperContainer";
import Badge from "../Badge/Badge";

interface Props {
  url?: string;
  chatId?: any;
  conversation: IAllConversations;
}
const MessageLink: React.FC<Props> = ({ url, chatId, conversation }) => {
  const {
    setReferenceRef,
    setPopperRef,
    styles,
    attributes,
    handleDropdownClick,
    visible,
  } = usePooperDropdown();

  const description =
    conversation.description ||
    "You will find out that this chat will be saved after the...";
  const lastMessage = conversation.last_message
    ? conversation.last_message.text
    : description;

  const isPublic = conversation.privacy === "PUBLIC" ? true : false;

  const time = conversation?.last_message
    ? format(new Date(conversation?.last_message?.created_at), "h:mm a")
    : format(new Date(conversation?.created_at), "h:mm a");

  
  const handleDeleteClick =()=> deleteConversation(chatId)
  return (
    <>
      <div className="messages-link">
        <Link to={`${url}/${chatId}`} className="messages-link__link">
          <UserIcon cssClass="messages-link__user-icon" />
          <div className="messages-link__details">
            <div className="messages-link__top">
              <div>
                <Typography
                  type="h4"
                  text={conversation.title}
                  cssClass="head-7 group__title-name"
                />
                <Typography
                  type="p"
                  text={lastMessage}
                  cssClass="p-1 m-t-5px"
                />
              </div>
              <span>
                <Typography type="p" text={time} cssClass="p-3 m-l-5px" />
                <Badge
                  text={isPublic ? "Public" : "Private"}
                  type={isPublic ? "timbo" : "ok"}
                  cssClass="m-l-auto"
                />
              </span>
            </div>
          </div>
        </Link>
        <div
          className="messages-link__action"
          ref={setReferenceRef}
          onClick={handleDropdownClick}
        >
          <Button
            cssClass="btn btn-icon call-conference-video__cta m-l-auto"
            icon="icon-tri-dot"
            iconClass="icon-tri-dot"
          />
        </div>
      </div>
      {visible && (
        <PopperContainer>
          <div ref={setPopperRef} style={styles.popper} {...attributes.popper}>
            <div className="dropdown__container">
              <p className="dropdown__item" onClick={handleDeleteClick}>Delete</p>
            </div>
          </div>
        </PopperContainer>
      )}
    </>
  );
};

export default MessageLink;
