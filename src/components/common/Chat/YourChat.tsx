import { format } from "date-fns";
import UserIcon, { AvatarIcon } from "./../UserIcon/UserIcon";
import Typography from "./../Typography/Typography";

interface Props {
  handleClick?: () => void;
  message?: any;
}
const YourChat: React.FC<Props> = ({ handleClick, message }) => {
  const username = `${message?.sender.lastname} ${message?.sender.firstname} `;
  const avatarIcon = message?.sender?.image || "";
 
  const avatarName = message ?  message?.sender?.lastname[0] + message?.sender?.firstname[0] : "BA"
  const time = message?.created_at
    ? format(new Date(message?.created_at), "h:mm a")
    : "8.25 PM";

  return (
    <div className="your-chat">
      <div onClick={handleClick}>
        {avatarIcon ? <UserIcon pic={avatarIcon} userId={message.sender.uid}/> : <AvatarIcon avatar={avatarName} cssClass="not__user" />}
      </div>
      <div className="your-chat__details">
        <Typography
          type="h5"
          text={username || "Alma Pierce"}
          cssClass="head-11 your-chat__name"
        />
        <Typography
          type="h6"
          text={time}
          cssClass="head-12 m-l-10px your-chat__time"
        />
        <div className="your-chat__message">
          <Typography
            text={message ? message.text : "Freelance Design Tricks"}
            type="p"
          />
        </div>
      </div>
    </div>
  );
};

export default YourChat;
