import React from "react";
import Svg from "./../Svg/Svg";
import Typography from "./../Typography/Typography";

interface Props {
  iconName?: any;
  data?: any;
  divider?: any;
}
const TextWithDividerItem: React.FC<Props> = ({ iconName, data, divider }) => {
  return (
    <div className={`text-with-divider__item ${divider ? divider : null}`}>
      <Svg iconId={iconName} cssClass={`${iconName} text-with-divider__icon`} />
      <Typography type="span" text={data} cssClass="p-10" />
    </div>
  );
};

export default TextWithDividerItem;
