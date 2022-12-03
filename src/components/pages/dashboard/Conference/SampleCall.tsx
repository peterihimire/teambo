import React from "react";

import {
  LocalVideo,
  useLocalVideo,
  VideoTileGrid,
} from "amazon-chime-sdk-component-library-react";

interface Props {}
const SampleCall: React.FC<Props> = () => {
  const { toggleVideo } = useLocalVideo();
  return (
    <div className="m-l-auto m-r-30px">
      <h3>Sample call here my nigga</h3>
      <button onClick={toggleVideo}>toggle</button>
      <LocalVideo
        id="1"
        nameplate="Me"
        className="call-conference-video__participant"
      />
      <VideoTileGrid
        layout="standard"
        className="call-conference-video__participant"
      />
    </div>
  );
};

export default SampleCall;
