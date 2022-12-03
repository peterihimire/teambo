import { format } from "date-fns";

import UserIcon, { AvatarIcon } from "./../UserIcon/UserIcon";
import Typography from "./../Typography/Typography";

interface YourChatProps {
  message?: any;
}
const MyChat: React.FC<YourChatProps> = ({ message }) => {
  const username = `${message?.sender.lastname} ${message?.sender.firstname} `;
  const avatarIcon = message?.sender?.image || "";
  const avatarName = message ? message?.sender?.lastname[0] + message?.sender?.firstname[0] : "BA"
  // const date = format(new Date(message?.created_at),  "MM/dd/yyyy 'at' h:mm a")
  const time = message?.created_at
    ? format(new Date(message?.created_at), "h:mm a")
    : "8.25 PM";

  return (
    <div className="my-chat">
      <div className="my-chat__details">
        <Typography
          type="h6"
          text={time}
          cssClass="head-12 m-r-10px my-chat__time"
        />
        <Typography
          type="h5"
          text={username || "Alma Pierce"}
          cssClass="head-11 my-chat__name"
        />
        <div className="my-chat__message">
          <Typography
            text={message ? message.text : "Freelance Design Tricks"}
            type="p"
          />
        </div>
      </div>
      {avatarIcon ? <UserIcon pic={avatarIcon} userId={message.sender.uid} /> : <AvatarIcon avatar={avatarName} />}
    </div>
  );
};

export default MyChat;
