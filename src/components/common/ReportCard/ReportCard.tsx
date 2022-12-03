import React from "react";
import Typography from "./../Typography/Typography";
import ProgressBar from "./../ProgressBar/ProgressBar";

interface Props {
  title?: string | any;
  subTitle?: string | any;
  statValue?: string | any;
  progressBarType?: string;
  noBorder?: boolean;
  cssClass?: string;
}
const ReportCard: React.FC<Props> = ({
  title,
  subTitle,
  statValue,
  progressBarType,
  noBorder,
  cssClass,
}) => {
  return (
    <div
      className={`settings-report__card ${cssClass} ${
        noBorder ? "no-border" : null
      }`}
    >
      <div>
        <Typography type="h5" text={title} cssClass="head-18" />
        <Typography type="p" text={subTitle} cssClass="p-1" />
      </div>
      <div>
        <Typography type="h5" text={statValue} cssClass="head-19 text-right" />
        <ProgressBar type={progressBarType} />
      </div>
    </div>
  );
};

export default ReportCard;
