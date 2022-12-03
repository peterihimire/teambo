import React from "react";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import { userStore } from "./../../../store/userStore";
import ReactTooltip from "react-tooltip";

//custom import
import { Image } from "../../common";
import Svg from "../../common/Svg/Svg";
import ReturnToMeeting from "./Conference/ConferenceScreen/ReturnToMeeting";
import { useHistory } from "react-router-dom";

interface Props {}
const DashboardSideNav: React.FC<Props> = () => {
  const location = useLocation();
  const { user } = userStore();
  const match = useRouteMatch("/user");
  const url = match?.url;

  const history = useHistory();
  let userData: any = localStorage.getItem('userData');
  if(!userData){
    history.push(`/auth`);
    history.go(0);
  }

  return (
    <>
      <ReactTooltip />
      <ReturnToMeeting />
      <aside className="dashboard__side-nav">
        <Link to={`${url}/dashboard`}>
          <Image source="iconLogo" cssClass="dashboard__nav-logo" />
        </Link>
        <nav className="dashboard__navs">
          <Link
            to={`${url}/dashboard`}
            data-tip="Dashboard"
            className={`dashboard__nav ${
              location.pathname === `${url}/dashboard` ? "active" : ""
            } `}
          >
            {/* <span className="dashboard__nav-indicator ok"></span> */}
            {location.pathname === `${url}/dashboard` ? (
              <Svg iconId="icon-home-active" cssClass="dashboard__navs-icon" />
            ) : (
              <Svg iconId="icon-home" cssClass="dashboard__navs-icon" />
            )}
          </Link>
          <Link
            to={`${url}/messages`}
            data-tip="Messages"
            className={`dashboard__nav ${
              location.pathname.includes(`${url}/messages`) ? "active" : ""
            } `}
          >
            {location.pathname.includes(`${url}/messages`) ? (
              <Svg
                iconId="icon-messages-active"
                cssClass="dashboard__navs-icon"
              />
            ) : (
              <Svg iconId="icon-messages" cssClass="dashboard__navs-icon" />
            )}
          </Link>
          <Link
            to={`${url}/calls`}
            data-tip="Private Calls"
            className={`dashboard__nav ${
              location.pathname.includes(`${url}/calls`) ? "active" : ""
            } `}
          >
            {location.pathname.includes(`${url}/calls`) ? (
              <Svg iconId="icon-call-active" cssClass="dashboard__navs-icon" />
            ) : (
              <Svg iconId="icon-call" cssClass="dashboard__navs-icon" />
            )}
          </Link>
          <Link
            to={`${url}/conference`}
            data-tip="Conference Calls"
            className={`dashboard__nav ${
              location.pathname.includes(`${url}/conference`) ? "active" : ""
            } `}
          >
            {/* <span className="dashboard__nav-indicator warn"></span> */}
            {location.pathname.includes(`${url}/conference`) ? (
              <Svg
                iconId="icon-conference-active"
                cssClass="dashboard__navs-icon"
              />
            ) : (
              <Svg iconId="icon-conference" cssClass="dashboard__navs-icon" />
            )}
          </Link>
          <Link
            to={`${url}/contacts`}
            data-tip="Contacts"
            className={`dashboard__nav ${
              location.pathname.includes(`${url}/contacts`) ||
              location.pathname.includes(`${url}/add-contact`)
                ? "active"
                : ""
            } `}
          >
            {location.pathname.includes(`${url}/contacts`) ||
            location.pathname.includes(`${url}/add-contact`) ? (
              <Svg
                iconId="icon-contacts-active"
                cssClass="dashboard__navs-icon"
              />
            ) : (
              <Svg iconId="icon-contacts" cssClass="dashboard__navs-icon" />
            )}
          </Link>
          <Link
            to={`${url}/share-new-video`}
            data-tip="Recordings"
            className={`dashboard__nav ${
              location.pathname.includes(`${url}/share-new-video`)
                ? "active"
                : ""
            } `}
          >
            {/* <span className="dashboard__nav-indicator ok"></span> */}
            {location.pathname.includes(`${url}/share-new-video`) ? (
              <Svg
                iconId="icon-recordings-active"
                cssClass="dashboard__navs-icon"
              />
            ) : (
              <Svg iconId="icon-recordings" cssClass="dashboard__navs-icon" />
            )}
          </Link>
          <Link
            to={`${url}/schedule-list`}
            data-tip="Schedules"
            className={`dashboard__nav ${
              location.pathname.includes(`${url}/schedule`) ||
              location.pathname.includes(`${url}/schedule-list`) ||
              location.pathname.includes(`${url}/add-schedule`)
                ? "active"
                : ""
            } `}
          >
            {location.pathname.includes(`${url}/schedule`) ||
            location.pathname.includes(`${url}/schedule-list`) ||
            location.pathname.includes(`${url}/add-schedule`) ? (
              <Svg
                iconId="icon-schedule-active"
                cssClass="dashboard__navs-icon"
              />
            ) : (
              <Svg iconId="icon-schedule" cssClass="dashboard__navs-icon" />
            )}
          </Link>
          <Link
            to={
              user.account_type === "COMPANY"
                ? `${url}/settings`
                : `${url}/profile-settings`
            }
            data-tip="Settings"
            className={`dashboard__nav ${
              location.pathname.includes(`${url}/profile-settings`) ||
              location.pathname.includes(`${url}/settings`)
                ? "active"
                : ""
            } `}
          >
            {location.pathname.includes(`${url}/profile-settings`) ||
            location.pathname.includes(`${url}/settings`) ? (
              <Svg
                iconId="icon-settings-active"
                cssClass="dashboard__navs-icon"
              />
            ) : (
              <Svg iconId="icon-settings" cssClass="dashboard__navs-icon" />
            )}
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default DashboardSideNav;
