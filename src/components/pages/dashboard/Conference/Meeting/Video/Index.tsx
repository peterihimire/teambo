import React from "react";

import VideoSource from "./VideoSource";
import VideoQuality from "./VideoQuality";
import VideoPreview from "./VideoPreview";

interface AudioInputProps {}

const Video: React.FC<AudioInputProps> = () => {
  return (
    <>
      <VideoSource />
      <VideoQuality />
      <VideoPreview />
    </>
  );
};

export default Video;
