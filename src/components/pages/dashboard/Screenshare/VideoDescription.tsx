import React, {Fragment, useEffect, useState} from "react";

import { useParams } from "react-router-dom";


import DashboardLayoutOne from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOne";
import DashboardLayoutOneLeft from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneLeft";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
import DashboardTopNav from "../DashboardTopNav";
import IconLink from "../../../common/IconLink/IconLink";

import IconTrash from "../../../common/SvgIcons/IconTrash";
import Typography from "./../../../common/Typography/Typography";
import Badge from "./../../../common/Badge/Badge";
import ChatInput from "./../../../common/Chat/ChatInput";
import MyChat from "./../../../common/Chat/MyChat";
import YourChat from "./../../../common/Chat/YourChat";
import TypingChat from "./../../../common/Chat/TypingChat";
import Button from "./../../../common/Button/Button";
import ScreenshareSideBar from "./components/ScreenshareSideBar";
import { userStore } from '../../../../store/userStore';
import { getAttachmentUrl } from "../../../../utils/libs";
import { recordingStore } from '../../../../store/recordingStore';
import LoadingVideoDescription from "./loading/LoadingVideoDescription";


type useParamsProps ={
  id: string
}
interface Props {}
const VideoDescription: React.FC<Props> = () => {
  const  {id = ""} = useParams<useParamsProps>();
  const user = userStore(store => store.user)
  
  const [recording, getRecording] = recordingStore(store => [store.singleLocalRecording, store.getSingleLocalRecording])

  //const video url
  const [videoUrl, setVideoUrl] = useState('')
 

   useEffect(() => {
    getRecording(id);
      // eslint-disable-next-line
   }, [])

   useEffect(() => {
      if (recording?.file_url) {
        let newUrl = getAttachmentUrl({attachmentName: recording.file_url, id: user.uid, type: 'recording'})
        setVideoUrl(newUrl)
      }
       // eslint-disable-next-line
   },[recording])

  
   //There must be recording at this state
   const { description = "", tags = [], storage = "LOCAL" } = recording

  

  return (
    <>
      <main className="dashboard__main">
        <DashboardTopNav title="Recordings" />

        <DashboardLayoutOne>
          <DashboardLayoutOneLeft
            cssClass="color-2 flex-shrink-0 flex-c-jcbetween"
            width="33.1rem"
          >
            <div>
              <ScreenshareSideBar />
            </div>
            <div>
              <IconLink
                Icon={
                  <IconTrash
                    cssClass="icon-links__icon"
                    pathCssClass="icon-links__icon-path"
                  />
                }
                title="Deleted"
                subTitle="Removed videos"
                cssClass=""
              />
            </div>
          </DashboardLayoutOneLeft>
          <DashboardLayoutOneRight padding="0">
            {
          ///check if there is no recording
          recording?.error ? <div>No Record found</div> :

          recording.loading ? <LoadingVideoDescription />
          :
                      
            (<div className="video-description__layout">
              <div className="video-description__left">
                <div className="video-description__video" >
                <video src={(videoUrl as string)} width="100%" controls autoPlay={false} loop />
                {/* <iframe
                title="video"
								src={videoUrl}
								frameBorder="0"
								allowFullScreen
								style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
							></iframe> */}
                </div>
                <div className="video-description__details">
                  <table className="user-details__table">
                    <tbody>
                      <tr>
                        <td className="user-details__title-container">
                          <Typography
                            type="h6"
                            cssClass="user-details__title"
                            text="About"
                          />
                        </td>
                        <td className="user-details__detail">
                          <Typography
                            type="p"
                            cssClass="user-details__detail-text"
                            text={description}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="user-details__title-container">
                          <Typography
                            type="p"
                            cssClass="user-details__title"
                            text="Tags"
                          />
                        </td>
                        <td className="user-details__detail">
                          <div className="video-description__tags">
                          {
                            tags.map((tag: string, id:number) => (
                              <Fragment key={id}>
                                  <Typography
                              type="span"
                              cssClass="video-description__tag"
                              text={tag}
                            />
                              </Fragment>
                            ))
                          }
                            
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="user-details__title-container">
                          <Typography
                            type="p"
                            cssClass="user-details__title"
                            text="Share"
                          />
                        </td>
                        <td className="user-details__detail">
                          <div className="flex-r">
                            <Button
                              cssClass="btn btn-icon user-details__social-btn"
                              icon="icon-facebook-sm"
                              iconClass="icon-facebook-sm"
                            />
                            <Button
                              cssClass="btn btn-icon user-details__social-btn"
                              icon="icon-pinterest"
                              iconClass="icon-pinterest"
                            />
                            <Button
                              cssClass="btn btn-icon user-details__social-btn"
                              icon="icon-twitter-sm"
                              iconClass="icon-twitter-sm"
                            />
                            <Button
                              cssClass="btn btn-icon user-details__social-btn"
                              icon="icon-linkedin"
                              iconClass="icon-linkedin"
                            />
                            <Button
                              cssClass="btn btn-icon user-details__social-btn"
                              icon="icon-google-sm"
                              iconClass="icon-google-sm"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {
                storage !== "LOCAL" &&


              <div className="video-description__right">
                <div className="video-description__chat-top">
                  <Typography
                    type="h4"
                    text="Latest comments"
                    cssClass="head-17"
                  />
                  <Badge text="4" type="ok" />
                </div>
                <div className="video-description__chat">
                  <MyChat />
                  <MyChat />
                  <YourChat />
                  <MyChat />
                  <YourChat />
                  <MyChat />
                  <YourChat />
                  <MyChat />
                  <YourChat />
                  <TypingChat />
                </div>
                <div className="video-description__chat-bottom">
                  <ChatInput noExtra={true} />
                </div>
              </div>
              }
            </div>)
}
          </DashboardLayoutOneRight>
        </DashboardLayoutOne>
      </main>
    </>
  );
};

export default VideoDescription;
