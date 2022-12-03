import React from "react";
import AudioInputDevice from "./AudioInputDevices";
import AudioOutputDevice from "./AudioOutputDevice";

interface AudioInputProps {}

const Audio: React.FC<AudioInputProps> = () => {
  return (
    <>
      <AudioInputDevice />
      <AudioOutputDevice />
    </>
  );
};

export default Audio;
