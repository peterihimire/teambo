import React from "react";
import UserIcon, { AvatarIcon } from "./../UserIcon/UserIcon";
import Typography from "./../Typography/Typography";
import TypingLoading from "./TypingLoading";

interface YourChatProps {
  user?: any;
  me?: any;
}
const TypingChat: React.FC<YourChatProps> = ({ user, me }) => {
  let username = "Alma Pierce";
  let avatarName = "AP";
  let avatarImage = "";

  if (user) {
    if (user.typing) {
      const { firstname, lastname, image } = user;
      username = `${user.firstname} ${user.lastname}`;
      avatarName = lastname[0] + firstname[0];
      avatarImage = image === "none" || null ? "" : image;
    }
  }
  return (
    <div className={`typing-chat ${me ? 'hidden' : ''}`}>
      {avatarImage ? <UserIcon /> : <AvatarIcon avatar={avatarName} />}
      <div className="typing-chat__details">
        <Typography
          type="h5"
          text={username}
          cssClass="head-11 typing-chat__name"
        />
        <div className="typing-chat__message">
          <TypingLoading />
        </div>
      </div>
    </div>
  );
};

export default TypingChat;
