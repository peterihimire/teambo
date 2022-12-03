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
import IconUserCircle from "./../../../common/SvgIcons/IconUserCircle";
import IconSecurity from "./../../../common/SvgIcons/IconSecurity";
// import IconDollarCircle from "./../../../common/SvgIcons/IconDollarCircle";
import IconBell from "./../../../common/SvgIcons/IconBell";

import ProfileSettingsIndex from "./ProfileSettingsIndex";
import GeneralProfileSettings from "./GeneralProfileSettings";
import ProfileSettingsSecurity from "./ProfileSettingsSecurity";
import BillingSettings from "./BillingSettings";
import ProfileSettingsNotification from "./ProfileSettingsNotification";
import SupportSettings from "./SupportSettings";
import SubscriptionPage from "./SubscriptionIndex";
import IconSubscription from "../../../common/SvgIcons/IconSubscription";
import IconPayment from "../../../common/SvgIcons/IconPayment";
import PaymentPage from "./PaymentSettingsIndex";
import PaymentSettingsAddCard from "./PaymentSettingsAddCard";

interface Props {
  history?: any;
}
const ProfileSettings: React.FC<Props> = ({ history }) => {
  const { path, url } = useRouteMatch();
  const { user } = userStore();

  return (
    <>
      <main className="dashboard__main">
        <DashboardTopNav title="Profile Settings" />

        <DashboardLayoutOne>
          <BrowserRouter>
            <DashboardLayoutOneLeft
              cssClass="color-2 flex-shrink-0"
              width="33.1rem"
            >
              <UserDetailsImageUpload
                img="pic11"
                profile={user}
                cssClass="m-x-auto m-t-30px m-b-15px"
              />

              <Typography
                type="h5"
                text={(user.company ? user.company.name : (user.username ? user.username : (`${user.firstname} ${user.lastname}`)))}
                cssClass="head-9 text-center"
              />
              <Typography
                type="p"
                text={user.account_type}
                cssClass="p-1 text-center m-b-50px"
              />

              <IconLink
                Icon={
                  <IconUserCircle
                    cssClass="icon-links__icon"
                    pathCssClass="icon-links__icon-path"
                  />
                }
                title="General information"
                subTitle="Profile photo, name & address"
                link={`${url}/general-info`}
              />
              <IconLink
                Icon={
                  <IconSecurity
                    cssClass="icon-links__icon"
                    pathCssClass="icon-links__icon-path"
                  />
                }
                title="Security"
                subTitle="Change Password"
                link={`${url}/security`}
              />
              {/* <IconLink
                Icon={
                  <IconDollarCircle
                    cssClass="icon-links__icon"
                    pathCssClass="icon-links__icon-path"
                  />
                }
                title="Billing"
                subTitle="Setup payment methods"
                link={`${url}/billing`}
              /> */}
              <IconLink
                Icon={
                  <IconBell
                    cssClass="icon-links__icon"
                    pathCssClass="icon-links__icon-path"
                  />
                }
                title="Notifications"
                subTitle="Set your email notifications"
                link={`${url}/notifications`}
              />
              <IconLink
                Icon={
                  <IconSubscription
                    cssClass="icon-links__icon"
                    pathCssClass="icon-links__icon-path"
                  />
                }
                title="Subscriptions"
                subTitle="View Subscriptions and Payments"
                link={`${url}/subscriptions`}
              />
              <IconLink
                Icon={
                  <IconPayment
                    cssClass="icon-links__icon"
                    pathCssClass="icon-links__icon-path"
                  />
                }
                title="Payments"
                subTitle="Cards Settings"
                link={`${url}/payments`}
              />
              <IconLink
                Icon={
                  <IconGroupUser
                    cssClass="icon-links__icon"
                    pathCssClass="icon-links__icon-path"
                  />
                }
                title="Support"
                subTitle="Request for support"
                link={`${url}/support`}
              />
            </DashboardLayoutOneLeft>

            <Switch>
              <Route path={`${path}/support`} component={SupportSettings} />
              <Route
                path={`${path}/notifications`}
                component={ProfileSettingsNotification}
              />
              <Route path={`${path}/billing`} component={BillingSettings} />
              <Route
                path={`${path}/security`}
                component={ProfileSettingsSecurity}
              />
              <Route
                path={`${path}/general-info`}
                component={GeneralProfileSettings}
              />
              <Route
                path={`${path}/subscriptions`}
                component={SubscriptionPage}
              />
              <Route
                path={`${path}/payments/change`}
                component={PaymentSettingsAddCard}
              />
              <Route path={`${path}/payments`} component={PaymentPage} />
              <Route path="/" component={ProfileSettingsIndex} />
            </Switch>
          </BrowserRouter>
        </DashboardLayoutOne>
      </main>
    </>
  );
};

export default ProfileSettings;
