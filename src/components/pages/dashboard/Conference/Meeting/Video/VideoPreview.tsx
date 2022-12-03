import React from "react";
import { PreviewVideo, Label } from "amazon-chime-sdk-component-library-react";

interface VideoSourceProps {}
const VideoPreview: React.FC<VideoSourceProps> = () => {
  return (
    <>
      <Label style={{ display: "block", marginBottom: ".5rem" }}>
        Video preview
      </Label>
      <PreviewVideo />
    </>
  );
};

export default VideoPreview;
