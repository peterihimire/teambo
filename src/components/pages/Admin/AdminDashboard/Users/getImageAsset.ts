import authService from "../../../../../services/authService";

export const imgUrl = (userId: string, attachmentName: string) => {
  const assetToken = authService.getAssetToken();
  return (
    "https://api.jointimbo.com/app/assets?cId=" +
    userId +
    "&fl=" +
    attachmentName +
    "&type=profile" +
    "&at=" +
    assetToken
  );
};
