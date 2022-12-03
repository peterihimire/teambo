import React from "react";

import Image from "./../Image/Image";
import authService from "../../../services/authService";

interface Props {
  cssClass?: string;
  img?: any;
  src?: any;
  userId?: any;
}

const UserDetailsImage: React.FC<Props> = ({ cssClass, img, src, userId }) => {

  const imgUrl = (attachmentName: string) => {
    const assetToken = authService.getAssetToken();
    return (
      process.env.REACT_APP_API_URL+`/app/assets?cId=` +
      userId +
      "&fl=" +
      attachmentName + "&type=profile"+
      "&at=" +
      assetToken
    );
  };
  return (
    <div className={`user-datails-image ${cssClass}`}>
      <Image src={src && imgUrl(src)} source={img ? img : "iconLogo"} cssClass={`user-datails__img`} />
    </div>
  );
};

export default UserDetailsImage;
