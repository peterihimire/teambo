import { useHistory } from "react-router-dom";
import UserIcon, { AvatarIcon } from "./../UserIcon/UserIcon";
import Typography from "./../Typography/Typography";
import Button from "./../Button/Button";
import { userStore } from "../../../store/userStore";
import api from "./../../../utils/constants/api";
import { usePost } from "./../../../utils/hooks/fetchHook";

interface Props {
  noCall?: boolean;
  iconSize?: string;
  actionBtnSize?: string;
  userImg?: any;
  user?: any;
  userDetail?: any;
}
const UserContact: React.FC<Props> = ({
  noCall = true,
  iconSize,
  userImg,
  user,
  userDetail,
}) => {
  const accountUser = userStore((store) => store.user);

  const history = useHistory();
  //api calls
  const { post } = usePost(api.POST_START_CONVERSATION);

  //default values for details
  let name = "Teresa Lloyd";
  let type = "PR agent";
  let avatar = "BA";
  let isAccountUser = "";
  let image = "";

  const beginConversation = async () => {
    if (userDetail && userDetail.user) {
      const data = {
        participants: [userDetail.user.uid],
        privacy: "PRIVATE",
      };

      try {
        const conversationResponse: any = await post(data);

        history.push(`/user/messages/${conversationResponse.data.uid}`);
      } catch (err) {
        console.log(err);
      }
    } else return;
  };

  if (user && user.id) {
    const { firstname, lastname, type: userType, uid } = user;
    name = `${lastname} ${firstname}`;
    image = user.image === "none" || user.image === null ? "" : user.image;
    type = userType;
    avatar = lastname[0] + firstname[0];
    isAccountUser = uid === accountUser.uid ? "" : "not__user";
  } else if (userDetail) {
    name = userDetail
      ? userDetail.user.firstname + " " + userDetail.user.lastname
      : "Adams Grants";
    type = userDetail ? userDetail.user.role : "Software Developer";
    avatar =
      userDetail.user.firstname[0].toUpperCase() +
      userDetail.user.lastname[1].toUpperCase();
  }

  return (
    <div className="user-contact">
      {!image ? (
        <AvatarIcon avatar={avatar} cssClass={`${isAccountUser}`} />
      ) : (
        <UserIcon cssClass={iconSize} pic={userImg} />
      )}
      <div className="user-contact__info">
        <Typography
          type="h3"
          text={name}
          cssClass="head-7 line-height-0 m-b-18px"
        />
        <Typography type="p" text={type} cssClass="p-2 line-height-0" />
      </div>

      <div className="m-l-auto flex-r">
        {noCall && (
          <>
            {userDetail && userDetail.user && (
              <>
                <Button
                  handleClick={beginConversation}
                  cssClass="btn btn-icon user-contact__cta user-contact__cta--1 flx-shrink-0"
                  icon="icon-comment-double"
                  iconClass="icon-comment-double"
                />

                <Button
                  handleClick={beginConversation}
                  cssClass="btn btn-icon user-contact__cta flx-shrink-0"
                  icon="icon-phone-right"
                  iconClass="icon-phone-right"
                />
              </>
            )}
          </>
        )}
        {/* <div ref={setReferenceRef} onClick={handleDropdownClick}>
          <Button
            cssClass={`btn btn-icon user-contact__cta flx-shrink-0 ${
              actionBtnSize ? actionBtnSize : null
            }`}
            icon="icon-tri-dot"
            iconClass="icon-tri-dot"
          />
        </div>
        {visible && (
          <div ref={setPopperRef} style={styles.popper} {...attributes.popper}>
            <div>
              <h3>I am here</h3>
              <h3>I am here</h3>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default UserContact;
