import {Button, Typography, UserDetailsImage,} from "../../../../common"
import { AvatarIconLarge } from "../../../../common/UserIcon/UserIcon";

type UserDetailsModalProps = {
  user: any;
};

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user }) => {
  let name = "Chester Martin";
  let email = "johanna.stevens@gmail.com";
  let type = "UI/UX Designer";
  let image = "";
  let avatar = "";


  if (user?.uid) {
    const { firstname, lastname } = user;
    name = `${lastname} ${firstname}`;
    email = user?.email;
    type = user?.type;
    image = user?.image === "none" ? null : user?.image;
    avatar = lastname[0] + firstname[0];
  }

  return (
    <div className="message-chat__right ">
      <div className="message-chat__participant-details__top">
        <Button
          cssClass="btn btn-icon"
          icon="icon-star"
          iconClass="icon-star"
        />
        <Button
          cssClass="btn btn-icon"
          icon="icon-tri-dot"
          iconClass="icon-tri-dot"
        />
      </div>
      {image ? (
        <UserDetailsImage img="pic8" cssClass="m-x-auto m-t-60px m-b-15px" />
      ) : (
        <AvatarIconLarge avatar={avatar} cssClass="not__user" />
      )}

      <Typography type="h5" text={name} cssClass="head-9 text-center" />
      <Typography type="p" text={type} cssClass="p-1 text-center m-b-50px" />

      <div className="message-chat__participant-info">
        <Typography type="h6" text="Email" cssClass="head-15" />
        <Typography type="p" text={email} cssClass="p-6" />
      </div>
      <div className="message-chat__participant-info">
        <Typography type="h6" text="Dial" cssClass="head-15" />
        <Typography type="p" text="j.stevens@ymsg.com" cssClass="p-6" />
      </div>
      <div className="message-chat__participant-info">
        <Typography type="h6" text="Meeting" cssClass="head-15" />
        <Typography
          type="p"
          text="http://go.betacall.com/j.stevens"
          cssClass="p-6"
        />
      </div>
      <div className="message-chat__participant-info">
        <Typography type="h6" text="Phone" cssClass="head-15" />
        <Typography type="p" text="439-582-1578" cssClass="p-6" />
        <Typography type="p" text="621-770-7689" cssClass="p-6" />
      </div>
    </div>
  );
};

export default UserDetailsModal;
