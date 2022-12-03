import React from "react";

import Audio from "../Audio/Index";
import Video from "../Video/Index";

interface DeviceSetupProps {}
const DeviceSetup: React.FC<DeviceSetupProps> = () => {
  return (
    <div className="device-setup">
      <div>
        <Audio />
      </div>
      <div>
        <Video />
      </div>
    </div>
  );
};

export default DeviceSetup;
