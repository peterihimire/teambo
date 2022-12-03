import React from "react";
import { QualitySelection } from "amazon-chime-sdk-component-library-react";

interface VideoSourceProps {}
const VideoQuality: React.FC<VideoSourceProps> = () => {
  return <QualitySelection />;
};

export default VideoQuality;
