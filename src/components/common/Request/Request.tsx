import React from "react";

import Typography from "./../Typography/Typography";

interface Props {
    title: string,
    date?: any,
    identifier?: any
}
const Request: React.FC<Props> = ({ title, date, identifier }) => {
  return (
    <div className="request">
      <div>
        <Typography type="h6" text={title} cssClass="head-16" />
        <Typography type="p" text={`TN: ${identifier}`} cssClass=" p-2" />
      </div>
      <Typography type="p" text={date} cssClass=" p-2" />
    </div>
  );
};

export default Request;
