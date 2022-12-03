import React from "react";
import { CameraSelection } from "amazon-chime-sdk-component-library-react";

interface VideoSourceProps {}
const VideoSource: React.FC<VideoSourceProps> = () => {
  return <CameraSelection />;
};

export default VideoSource;
