import React from "react";

import Image from "./../Image/Image";
import userService from "../../../services/userService";
import companyService from "../../../services/companyService";
import { toast } from 'react-toastify';
import authService from "../../../services/authService";

import { userStore } from "./../../../store/userStore";

interface Props {
  cssClass?: string;
  img?: any;
  profile?: any;
  company?: any;
}


const UserDetailsImage: React.FC<Props> = ({ cssClass, img, profile, company }) => {
  const { user, getUser } = userStore();
  const imgUrl = (attachmentName: string) => {
    const assetToken = authService.getAssetToken();
    return (
      process.env.REACT_APP_API_URL+"/app/assets?cId=" +
      user.uid +
      "&fl=" +
      attachmentName + "&type=profile"+
      "&at=" +
      assetToken
    );
  };
  const photoUpload = (e: any) =>{
    const file = e.target.files[0];
    const formData = new FormData();
  
    // Update the formData object
    formData.append(
      "image",
      file,
      file.name
    );
    userService.updateProfileImage(formData)
    .then(response => {
      getUser();
      toast.success('Profile Image Updated Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }).catch (err => {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.error[0], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }else {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    });

  }
  const companyLogoUpload = (e: any) =>{
    const file = e.target.files[0];
    const formData = new FormData();
  
    // Update the formData object
    formData.append(
      "image",
      file,
      file.name
    );
    companyService.updateCompanyLogo(formData)
    .then(response => {
      getUser();
      toast.success('Company Logo Updated Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }).catch (err => {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.error[0], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }else {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    });
  }
  return (
    <label className={`user-datails-image ${cssClass}`}>
      <div className={`user-datails-image-upload`}>
        {/* <Image source={img} src={profile.image ? `${process.env.REACT_APP_API_URL}/app/assets?cId=${profile.asset_auth_id}&fl=${profile.image}&action=read&type=profile&at=${userAssetToken}` : null} cssClass={`user-datails__img`} /> */}
        {company === true 
          ?<Image source={img} src={imgUrl(profile.logo)} cssClass={`user-datails__img`} />
          :<Image source={img} src={imgUrl(profile.image)} cssClass={`user-datails__img`} />
        }
      </div>
      
      {company === true ? <input id="photo-upload com" style={{display: "none"}} type="file" onChange={(e)=> companyLogoUpload(e)}/> : <input id="photo-upload" style={{display: "none"}} type="file" onChange={(e)=> photoUpload(e)}/> }
    </label>
  );
};


export default UserDetailsImage;
