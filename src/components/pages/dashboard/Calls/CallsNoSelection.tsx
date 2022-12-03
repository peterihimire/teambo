import React from "react";
import Typography from "../../../common/Typography/Typography";
import Image from "./../../../common/Image/Image";

interface CallsNoSelectionProps {}
const CallsNoSelection: React.FC<CallsNoSelectionProps> = () => {
  return (
    <div className="flex-r-jccenter">
      <div className="empty-call-state">
        <Image source="pic4" cssClass="prev-calls-list__empty-img" />
        <Typography
          text="Call History"
          type="h3"
          cssClass="head-4 text-center m-b-10px"
        />
        <Typography
          text="Start new call from the previous conversations list  or search for an existing contact"
          type="p"
          cssClass="head-5 text-center"
        />
        <Typography
          text="for an existing contact"
          type="p"
          cssClass="head-5 text-center"
        />
      </div>
    </div>
  );
};

export default CallsNoSelection;
