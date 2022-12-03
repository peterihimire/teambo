import React from "react";
import { BrowserRouter, Switch, Route, useRouteMatch } from "react-router-dom";
import { userStore } from "../../../../store/userStore";

import Typography from "./../../../common/Typography/Typography";
import DashboardLayoutOne from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOne";
import DashboardLayoutOneLeft from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneLeft";

import DashboardTopNav from "./../DashboardTopNav";
import UserDetailsImageUpload from "./../../../common/User/UserDetailsImageUpload";
import IconLink from "./../../../common/IconLink/IconLink";
import IconGroupUser from "./../../../common/SvgIcons/IconGroupUser";
import IconTaskList from "./../../../common/SvgIcons/IconTaskList";
import IconReports from "./../../../common/SvgIcons/IconReport";
import IconPuzzle from "./../../../common/SvgIcons/IconPuzzle";

import SettingsIndex from "./SettingsIndex";
import CompanyInformation from "./CompanyInformation";
import TeamsSettings from "./TeamsSettings";
import SettingsReport from "./SettingsReport";
import IntegrationSettings from "./IntegrationSettings";

interface Props {
  history?: any;
}
const Settings: React.FC<Props> = ({ history }) => {
  const { path, url } = useRouteMatch();
  const { user } = userStore();

  if(user.account_type !== "COMPANY"){
    history.push(`/user/profile-settings`);
    history.go(0);
  }

  return (
    <>
      <main className="dashboard__main">
        <DashboardTopNav title="Settings" />

        <DashboardLayoutOne>
          <BrowserRouter>
            <DashboardLayoutOneLeft
              cssClass="color-2 flex-shrink-0"
              width="33.1rem"
            >
              <UserDetailsImageUpload
                img="pic11"
                profile={user.own_company}
                company={true}
                cssClass="m-x-auto m-t-30px m-b-15px"
              />

              <Typography
                type="h5"
                text={user.own_company && user.own_company.name}
                cssClass="head-9 text-center"
              />
              <Typography
                type="p"
                text={user.own_company && (user.own_company.staffs.length+' Employees')}
                cssClass="p-1 text-center m-b-50px"
              />

              <IconLink
                Icon={
                  <IconTaskList
                    cssClass="icon-links__icon"
                    pathCssClass="icon-links__icon-path"
                  />
                }
                title="Company information"
                subTitle="Company photo, name & details"
                link={`${url}/company-info`}
              />
              <IconLink
                Icon={
                  <IconGroupUser
                    cssClass="icon-links__icon"
                    pathCssClass="icon-links__icon-path"
                  />
                }
                title="Teams & Users"
                subTitle="Add new users and create teams"
                link={`${url}/teams-n-users`}
              />
              <IconLink
                Icon={
                  <IconReports
                    cssClass="icon-links__icon"
                    pathCssClass="icon-links__icon-path"
                  />
                }
                title="Reports"
                subTitle="Usage and actions reports"
                link={`${url}/reports`}
              />
              <IconLink
                Icon={
                  <IconPuzzle
                    cssClass="icon-links__icon"
                    pathCssClass="icon-links__icon-path"
                  />
                }
                title="Integrations"
                subTitle="Setup app integrations"
                link={`${url}/integration`}
              />
            </DashboardLayoutOneLeft>

            <Switch>
              <Route
                path={`${path}/integration`}
                component={IntegrationSettings}
              />
              <Route path={`${path}/reports`} component={SettingsReport} />
              <Route path={`${path}/teams-n-users`} component={TeamsSettings} />
              <Route
                path={`${path}/company-info`}
                component={CompanyInformation}
              />
              <Route path="/" component={SettingsIndex} />
            </Switch>
          </BrowserRouter>
        </DashboardLayoutOne>
      </main>
    </>
  );
};

export default Settings;
