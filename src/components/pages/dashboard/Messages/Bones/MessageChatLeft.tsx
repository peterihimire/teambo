import {MessagesSideLinks, Typography, FormSearchInput} from "../../../../common";

const MessageChatLeft = () => {
  return (
    <div className="message-chat__left">
      <Typography type="h5" text="Chats" cssClass="head-13 m-b-10px" />
      <FormSearchInput />
      <MessagesSideLinks />
    </div>
  );
};

export default MessageChatLeft;
