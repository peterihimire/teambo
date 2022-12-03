import React, { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

import DashboardTopNav from "./../DashboardTopNav";
import DashboardLayoutOne from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOne";
import DashboardLayoutOneLeft from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneLeft";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
import IconLink from "./../../../common/IconLink/IconLink";

import IconTrash from "./../../../common/SvgIcons/IconTrash";

import Typography from "./../../../common/Typography/Typography";
import Button from "./../../../common/Button/Button";
import CallVisibility from "./../../../common/CallVisibility/CallVisibility";
import { ERecordingOptions, MediaRecorderType, RecordingOptions } from './constants';
import useDialogHook from "../../../../utils/hooks/useDialogHook";
import RecordingModal from "./Modals/RecordingModal";
import VideoPreview from "./components/VideoPreview";
import ScreenshareSideBar from "./components/ScreenshareSideBar";
import { saveLcoalRecording } from '../../../../services/recordingService';
import { convertToFormData } from '../../../../utils/libs';

import { toast, ToastContainer } from 'react-toastify';



interface Props {}
const ShareNewRecord: React.FC<Props> = () => {

  //desctructure the enums option out
  const {  SCREEN_ONLY, } = ERecordingOptions;

   //set selected options
   const [selected, setSelected] = useState<ERecordingOptions>(SCREEN_ONLY);


   //put the media blob in state z
   const [localMedia, setLocalMedia] = useState(''); 
   const [localMediaBlob, setLocalMediaBlob] = useState<any>(null); 


   //
  const onStop = (blobUrl: string, blob: Blob) => {
    setLocalMedia(blobUrl);
    setLocalMediaBlob(blob);

    
  }

  //use react medial Recorder hooks and set initila values to screen and cam
  const {
    status,
    startRecording,
    stopRecording,
  
    previewStream
  } = useReactMediaRecorder({...MediaRecorderType[selected], onStop, blobPropertyBag: {
    type: 'video/webm'
  } });


  //const destructure items form dialog
  const {
    open,
    handleOpen,
    handleClose,
  } = useDialogHook();

  

  //change selected options 
  const changeSelectedOptions = (option:ERecordingOptions) => setSelected(option);


  //Save the recording
  const saveRecording = async (values:Record<string, any>) =>  {
    console.log(values);
    const data = convertToFormData({ 
      ...values,
      recording: localMediaBlob
    })
    try{
        await saveLcoalRecording(data)
        setLocalMedia('')
        setLocalMediaBlob("")
        handleClose();
    }
    catch(err:any) {
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
  }

  return (
    <>
    <ToastContainer />
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
          <DashboardLayoutOneRight>
            <div className="start-records m-t-70px">
            {
              
              RecordingOptions.map(({id, cssClass, pathCssClass, textCssClass, text, icon: Icon, action}) => (
                <div 
                onClick={() => changeSelectedOptions(action)}
                key={id} className={`start-records__actions ${selected === action && "active__record"}`}>
                <Icon
                  cssClass={cssClass}
                  pathCssClass={pathCssClass}
                />
                <Typography
                  type="h5"
                  text={text}
                  cssClass={textCssClass}
                />
              </div>
              ))
            }
            </div>

            <Typography
              text="Start new record"
              type="h3"
              cssClass="head-4 text-center m-b-10px m-t-30px"
            />
            <Typography
              text="Start new video recording and share it with"
              type="p"
              cssClass="head-5 text-center"
            />
            <Typography
              text="your contacts"
              type="p"
              cssClass="head-5 text-center m-b-35px"
            />
          {
            status === "recording" ? 
            
            <Button
              cssClass="btn btn--danger btn--small btn-center m-t-40px m-b-100px"
              text="Stop Record"
              handleClick={() => {
                stopRecording()
              handleOpen()
              }}
              />
              :
            <Button
              cssClass="btn btn--primary btn--small btn-center m-t-40px m-b-10px"
              text="Start Record"
              handleClick={startRecording}
            />
            
          }
          {
            open && <RecordingModal saveRecording={saveRecording} closeModal={handleClose} mediaBlobUrl={(localMedia as string)} />
          }
          {
            localMedia && <Button
            cssClass="btn-total-naked btn--xxxsmall btn--small btn-center m-t-10px m-b-50px"
            text="Open Record🎬"
            handleClick={() => handleOpen()}          />
          }
          {status === 'recording'  && 
          <div className="start-records--preview">
          
          <VideoPreview stream={previewStream} /></div>}

            <CallVisibility left='Audio off' right='Audio on' />
          </DashboardLayoutOneRight>
        </DashboardLayoutOne>
      </main>
    </>
  );
};

export default ShareNewRecord;
