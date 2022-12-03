import React, { useState } from "react";
import Switch from "./../Switch/Switch";

interface Props {
  left?: any;
  right?: any;
}
const CallVisibility: React.FC<Props> = ({ left, right }) => {
  const [isPublished, setIsPublished] = useState<boolean>(false);
  return (
    <div className="call-visibility">
      <span className={`call-visibility__status ${!isPublished && "active"}`}>
        {left || "Private"}
      </span>
      <Switch
        handleClick={() => setIsPublished((prev) => !prev)}
        checked={isPublished}
      />
      <span className={`call-visibility__status ${isPublished && "active"}`}>
        {right || "Public"}
      </span>
    </div>
  );
};

export default CallVisibility;
