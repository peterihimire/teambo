import React from "react";

interface Props {
  type?: string;
}
const ProgressBar: React.FC<Props> = ({ type }) => {
  return (
    <div className="progress-bar">
      <div className={`progress-bar__status ${type}`}></div>
    </div>
  );
};

export default ProgressBar;
