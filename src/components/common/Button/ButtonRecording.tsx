import React from "react";
import Svg from "../Svg/Svg";

interface Props {
  cssClass?: string;
  recording?: boolean;
  handleClick?: () => void;
}
const ButtonRecording: React.FC<Props> = ({
  cssClass,
  recording,
  handleClick,
  children,
}) => {
  return (
    <div className="btn-recording-wrapper">
      <button className={`btn btn-recording ${cssClass}`} onClick={handleClick}>
        {recording && (
          <Svg
            iconId="icon-recording-circle"
            cssClass="icon-recording-circle animate-slideInLeftMin"
          />
        )}
        <span className="btn-recording-text">
          {recording ? "Recording" : "Record meeting"}
        </span>
        <Svg
          iconId="icon-recording-down-caret"
          cssClass="icon-recording-down-caret"
        />
      </button>
      {children ? children : null}
    </div>
  );
};

export default ButtonRecording;
