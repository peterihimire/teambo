import React from "react";
import Image from "../Image/Image";
import authService from "../../../services/authService";

interface Props {
  handleClick?: () => void;
  cssClass?: string;
  pic?: any;
  userId?: any;
  availability?: "online" | "away" | "offline";
}
const UserIcon: React.FC<Props> = ({
  handleClick,
  cssClass,
  pic,
  userId,
  availability,
}) => {
  const imgUrl = (attachmentName: string) => {

    const assetToken = authService.getAssetToken();
    return (
      process.env.REACT_APP_API_URL+"/app/assets?cId=" +
      userId +
      "&fl=" +
      attachmentName + "&type=profile"+
      "&at=" +
      assetToken
    );
  };
  return (
    <div
      className={`user-icon ${cssClass ? cssClass : null}`}
      onClick={handleClick}
    >
      <Image src={pic && imgUrl(pic)} source={"iconLogo"} cssClass="user-icon__img" />
      {availability && (
        <span className={`user-icon__availability ${availability}`}></span>
      )}
    </div>
  );
};

interface AvatarIconProps {
  avatar?: string;
  cssClass?: string;
}

export const AvatarIcon: React.FC<AvatarIconProps> = ({
  cssClass = "",
  avatar,
}) => {
  return <h3 className={`avatar__icon ${cssClass}`}>{avatar || "BA"}</h3>;
};
export const AvatarIconLarge: React.FC<AvatarIconProps> = ({
  cssClass = "",
  avatar,
}) => (
  <div className="avatar__container">
    <h3 className={`avatar__icon large ${cssClass}`}>{avatar || "BA"}</h3>
  </div>
);

export default UserIcon;
