import React, {Fragment, useEffect} from "react";
import { useParams } from "react-router-dom";


import DashboardLayoutOne from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOne";
import DashboardLayoutOneLeft from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneLeft";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
import DashboardTopNav from "./../DashboardTopNav";
import IconLink from "./../../../common/IconLink/IconLink";

import VideoShareCard from "./../../../common/VideoShareCard/VideoShareCard";
import IconTrash from "./../../../common/SvgIcons/IconTrash";
import ScreenshareSideBar from "./components/ScreenshareSideBar";
import { recordingStore } from '../../../../store/recordingStore';
import LoadingRecordings from "./loading/LoadingRecordings";
import DataEmpty from "./empty/DataEmpty";

type useParamsProps ={
  type: string
}

interface Props {}
const ShareVideo: React.FC<Props> = () => {
  const  {type =""} = useParams<useParamsProps>();
  const [localRecordings, getLocalRecordings] = recordingStore(store => [store.localRecordings, store.getLocalRecordings])
  

  //Ge ther recording
  useEffect(() => {
      getLocalRecordings(type);
      // eslint-disable-next-line
  }, [type])
  
  
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
          <DashboardLayoutOneRight>
            <div>
                { localRecordings?.recordings?.length === 0 ? <DataEmpty text="You do not have any recordings" /> :   localRecordings?.error ? <DataEmpty text="Something went wrong" /> :null}
            </div>
            <div className="video-share">
              {
               !localRecordings?.error && localRecordings.loading ? <LoadingRecordings />:

               !localRecordings?.error  && localRecordings.recordings.map((recording: any) => (
                  <Fragment key={recording.uid}>

                    <VideoShareCard mainLink={`/user/recording-description/${recording.uid}`} recording={recording} pic="pic12" />
                  </Fragment>
                ))
              }
              


            </div>
          </DashboardLayoutOneRight>
        </DashboardLayoutOne>
      </main>
    </>
  );
};

export default ShareVideo;
