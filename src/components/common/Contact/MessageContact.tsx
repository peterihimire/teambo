import { useHistory } from "react-router-dom";
import UserIcon, { AvatarIcon } from "./../UserIcon/UserIcon";
import Typography from "./../Typography/Typography";
import Button from "./../Button/Button";
import { userStore } from "../../../store/userStore";
import api from "./../../../utils/constants/api";
import { usePost } from "./../../../utils/hooks/fetchHook";
import usePopperDropdown from "../../../utils/hooks/usePopperDropdown";

interface Props {
  noCall?: boolean;
  isPublic?: boolean;
  iconSize?: string;
  actionBtnSize?: string;
  userImg?: any;
  user?: any;
  userDetail?: any;
  removeParticipant?: any;
  isOwner: boolean;
}
const MessgeContact: React.FC<Props> = ({
  noCall = true,
  isPublic,
  iconSize,
  actionBtnSize,
  userImg,
  user,
  userDetail,
  removeParticipant,
  isOwner,
}) => {
  const accountUser = userStore((store) => store.user);

  const history = useHistory();
  //api calls
  const { post } = usePost(api.POST_START_CONVERSATION);
  const {
    setReferenceRef,
    setPopperRef,
    styles,
    attributes,
    handleDropdownClick,
    visible,
  } = usePopperDropdown();

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
    image = user.image === ("none" || null) ? "" : user.image;
    type = userType;
    avatar = lastname[0] + firstname[0];
    isAccountUser = uid === accountUser.uid ? "" : "not__user";
  } else if (userDetail) {
    name = userDetail ? userDetail.fullname : "Adams Grants";
    type = userDetail ? userDetail.role : "Software Developer";
    avatar =
      userDetail.fullname[0].toUpperCase() +
      userDetail.fullname[1].toUpperCase();
  }

  const removeUser = () => {
    if (removeParticipant) {
      removeParticipant();
      history.go(0);
    }
  };

  return (
    <div className="user-contact">
      {!image ? (
        <AvatarIcon avatar={avatar} cssClass={`${isAccountUser}`} />
      ) : (
        <UserIcon cssClass={iconSize} pic={user.image} userId={user.uid}/>
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
                  cssClass="btn btn-icon user-contact__cta flx-shrink-0"
                  icon="icon-phone-right"
                  iconClass="icon-phone-right"
                />
              </>
            )}
          </>
        )}
        {isOwner && isPublic &&(
          <div ref={setReferenceRef} onClick={handleDropdownClick}>
            <Button
              cssClass={`btn btn-icon user-contact__cta flx-shrink-0 ${
                actionBtnSize ? actionBtnSize : null
              }`}
              icon="icon-tri-dot"
              iconClass="icon-tri-dot"
            />
          </div>
        )}
        {visible && (
          <div ref={setPopperRef} style={styles.popper} {...attributes.popper}>
            <div className="dropdown__container">
              <p onClick={removeUser} className="dropdown__item">
                Remove
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessgeContact;
