import React from "react";
import { Link } from "react-router-dom";

import DashboardLayoutOne from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOne";
import DashboardLayoutOneLeft from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneLeft";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
import DashboardTopNav from "../DashboardTopNav";
import IconLink from "../../../common/IconLink/IconLink";
import IconLocalStorage from "../../../common/SvgIcons/IconLocalStorage";
import Typography from "./../../../common/Typography/Typography";
import Image from "./../../../common/Image/Image";
import Button from "./../../../common/Button/Button";
import IconUserCircle from "./../../../common/SvgIcons/IconUserCircle";
import IconGroupUser from "./../../../common/SvgIcons/IconGroupUser";
import FormSearchInput from "../../../common/Forms/FormSearchInput";

interface Props {}
const ScheduleEmpty: React.FC<Props> = () => {
  return (
    <>
      <main className="dashboard__main">
        <DashboardTopNav title="Schedule" />

        <DashboardLayoutOne>
          <DashboardLayoutOneLeft
            cssClass="color-2 flex-shrink-0 flex-c-jcbetween"
            width="33.1rem"
          >
            <div>
              <FormSearchInput />
              <IconLink
                Icon={
                  <IconUserCircle
                    cssClass="icon-links__icon"
                    pathCssClass="icon-links__icon-path"
                  />
                }
                title="All Events"
                subTitle="All mettings unified"
                bagdeText="0"
                cssClass="active"
              />
              <IconLink
                Icon={
                  <IconLocalStorage
                    cssClass="icon-links__icon"
                    pathCssClass="icon-links__icon-path"
                  />
                }
                title="Public"
              />
              <IconLink
                Icon={
                  <IconGroupUser
                    cssClass="icon-links__icon"
                    pathCssClass="icon-links__icon-path"
                  />
                }
                title="Private"
              />
            </div>
          </DashboardLayoutOneLeft>
          <DashboardLayoutOneRight>
            <div className="flex-r-jccenter">
              <div className="empty-state">
                <Image
                  source="pic17"
                  maxWidth="23.1rem"
                  maxHeight="17.6rem"
                  cssClass="m-t-70px m-b-50px m-x-auto display-block"
                />
                <Typography
                  text="No events found?"
                  type="h3"
                  cssClass="head-4 text-center m-b-10px"
                />
                <Typography
                  text="Try to create new calendar events or"
                  type="p"
                  cssClass="head-5 text-center"
                />
                <Typography
                  text="sync your calendar service"
                  type="p"
                  cssClass="head-5 text-center m-b-35px"
                />

                <Link to="/user/add-schedule" className="text-deco-none">
                  <Button
                    cssClass="btn btn--primary btn--small btn-center m-t-40px"
                    text="Add New Event"
                  />
                </Link>
              </div>
            </div>
          </DashboardLayoutOneRight>
        </DashboardLayoutOne>
      </main>
    </>
  );
};

export default ScheduleEmpty;
