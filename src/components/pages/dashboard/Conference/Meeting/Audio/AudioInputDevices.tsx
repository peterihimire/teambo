import React from "react";
import { MicSelection } from "amazon-chime-sdk-component-library-react";

interface AudioInputDevicesProps {}

const AudioInputDevice: React.FC<AudioInputDevicesProps> = () => {
  return <MicSelection />;
};

export default AudioInputDevice;
