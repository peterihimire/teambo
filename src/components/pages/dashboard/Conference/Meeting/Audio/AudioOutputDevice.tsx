import React from "react";
import { SpeakerSelection } from "amazon-chime-sdk-component-library-react";

interface AudioOutputDevicesProps {}
const AudioOutputDevice: React.FC<AudioOutputDevicesProps> = () => {
  return <SpeakerSelection />;
};

export default AudioOutputDevice;
