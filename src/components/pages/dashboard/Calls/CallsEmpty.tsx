import React from "react";
import { Link } from "react-router-dom";

import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
import DashboardLayoutOneLeft from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneLeft";
import Typography from "./../../../common/Typography/Typography";
import Button from "./../../../common/Button/Button";
import Image from "./../../../common/Image/Image";
import Svg from "./../../../common/Svg/Svg";

interface CallsProps {}
const CallsEmpty: React.FC<CallsProps> = () => {
  return (
    <>
      <DashboardLayoutOneLeft>
        <Svg cssClass="img-calls-empty-space" iconId="img-calls-empty-space" />
      </DashboardLayoutOneLeft>
      <DashboardLayoutOneRight>
        <div className="flex-r-jccenter">
          <div className="empty-call-state">
            <div className="start-conference-card">
              <div className="start-conference-card__typo p-r-20px">
                <Typography
                  text="Conference call"
                  type="h4"
                  cssClass="start-conference-card__heading"
                />
                <Typography
                  cssClass="start-conference-card__sub-heading"
                  text="Start, schedule a conference call with teammates instantly now"
                  type="p"
                />
              </div>
              <div>
                <Link to="/user/conference">
                  <Button
                    text="Start now"
                    cssClass="btn btn--xsmall btn--grey-blue "
                  />
                </Link>
              </div>
            </div>
            <Image source="pic3" cssClass="start-conference-card__img" />
            <Typography
              text="No calls found?"
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

            <div className="flex-r-jccenter m-t-100px">
              <Link to="/user/add-schedule">
                <Button
                  text="Schedule"
                  cssClass="btn btn--xsmall btn--primary-light m-r-15px"
                />
              </Link>
              <Link to="/user/contacts">
                <Button
                  text="Private call"
                  cssClass="btn btn--xsmall btn--primary"
                />
              </Link>
            </div>
          </div>
        </div>
      </DashboardLayoutOneRight>
    </>
  );
};

export default CallsEmpty;
