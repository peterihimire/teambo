import React from "react";
// import copy from "copy-to-clipboard";
import { Link } from "react-router-dom";

import Button from "./../Button/Button";
import Image from "./../Image/Image";
import Typography from "./../Typography/Typography";
import useToggle from '../../../utils/hooks/useToggle';
import recordingService from '../../../services/recordingService'
import { recordingStore } from '../../../store/recordingStore';
import { toast } from 'react-toastify';




interface Props {
  pic: any;
  mainLink?: string;
  recording: Record<string, any>
}
const VideoShareCard: React.FC<Props> = ({ pic, mainLink, recording }) => {
  const {title = "", description = '', uid = ""} = recording
  const {on, toggle} = useToggle()

  
  // const linkToCopy = `/user/recording-description/${uid ?? ""}`
  const [ getLocalRecordings] = recordingStore(store => [store.getLocalRecordings])
  const deleteRecording = (id: string) => {
    recordingService.deleteSingleRecording(id)
    .then(response => {
      getLocalRecordings('LOCAL');
      toast.success('Recording Deleted Successfully!', {
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
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    });
  }
  return (
    <div className="video-share__card">
      <div className="video-share__action">
        <Button
          cssClass="btn btn-icon"
          icon="icon-tri-dot"
          iconClass="icon-tri-dot"
          handleClick={() => toggle()}
        />
        <div
          className={`video-share__action-list ${
            on ? "active" : null
          }`}
        >
          <Link to="#" className="video-share__link">
            Export
          </Link>
          {/* <Link to="#" className="video-share__link" onClick={() => {
           copy(linkToCopy)
           toggle()
          }}>
            Copy Link
          </Link> */}
          <Link to="#" className="video-share__link" onClick={() => deleteRecording(uid)}>
            Delete
          </Link>
        </div>
      </div>
      <Link to={mainLink ? mainLink : "#"}>
      <div className="video-share__thumbnail">
        <Image source={pic} cssClass="video-share__img" />
      </div>
      </Link>
      <div className="video-share__details">
        <Typography
          type="h5"
          text={title}
          cssClass="head-7"
        />
        <Typography type="p" text="" cssClass="p-3 flex-r-aicenter">
          <Typography
            type="span"
            text={description}
            cssClass="video-share__info"
          />
        
        </Typography>
      </div>
    </div>
  );
};

export default VideoShareCard;
