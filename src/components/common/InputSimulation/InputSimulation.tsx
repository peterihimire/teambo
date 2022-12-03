import React from "react";

import Typography from "./../Typography/Typography";
import Svg from "./../Svg/Svg";

interface Props {
  label?: any;
  value?: any;
  icon?: string;
}
const InputSimulation: React.FC<Props> = ({ value, label, icon }) => {
  return (
    <div className="input-simulation">
      <Typography type="h6" text={label} cssClass="input-simulation__label" />
      <div className="input-simulation__input">
        <Typography type="p" text={value} cssClass="input-simulation__value" />

        <Svg iconId={icon} cssClass={icon} />
      </div>
    </div>
  );
};

export default InputSimulation;
