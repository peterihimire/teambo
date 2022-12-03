import React, { useState } from "react";
import Image from "./../Image/Image";
import Switch from "./../Switch/Switch";
import Typography from "./../Typography/Typography";

interface Props {
  pic?: any;
  title: any;
  status?: any;
  subTitle: string;
  updateActivate?: any;
}
const SwitchOption: React.FC<Props> = ({ pic, title, status, subTitle, updateActivate }) => {
  const [activate, setActivate] = useState<boolean>(status);
  const handleClick= () => {
    setActivate((prevState) => !prevState);
    updateActivate((prevState: any) => !prevState)
  }
  return (
    <div className="switch-option">
      {pic && <Image source={pic} cssClass="switch-option__img" />}
      <div>
        <Typography
          type="h6"
          text={title}
          cssClass={`switch-option__title head-20 ${activate ? "active" : ""}`}
        />
        <Typography
          type="p"
          text={subTitle}
          cssClass="switch-option__sub-title p-2"
        />
      </div>
      <Switch
        handleClick={() => handleClick()}
        checked={activate}
        cssClass="m-l-auto"
      />
    </div>
  );
};

export default SwitchOption;
