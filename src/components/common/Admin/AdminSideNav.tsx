import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import Image from "./../Image/Image";
import Svg from "./../Svg/Svg";
import IconOverview from "./../SvgIcons/IconOverview";
// import Typography from "./../Typography/Typography";
import IconUsers from "./../SvgIcons/IconUsers";
import IconRoles from "./../SvgIcons/IconRoles";
import IconTicket from "./../SvgIcons/IconTicket";
import IconSettings from "./../SvgIcons/IconSettings";
import IconLogout from "./../SvgIcons/IconLogout";
import AdminSidenavLink from "./AdminSidenavLink";
import auth from "./../../../services/authService";

import useActiveTabpane from "./../../../utils/hooks/useActiveTabpane";

interface Props {}
const AdminSideNav: React.FC<Props> = () => {
  const history = useHistory();
  const [activeIndex, setActivePane] = useActiveTabpane(0);
  const match = useRouteMatch("/admin");
  const url = match?.url;

  const logout = async () => {
    setActivePane(6)
    await auth.logout();
    history.push("/admin/auth");
    history.go(0);
  };

  return (
    <nav className="admin-side-nav">
      <div className="admin-side-nav__top">
        <Image source="logoBlack" maxHeight="2.9rem" maxWidth="8.3rem" />
        <Svg iconId="icon-menu" cssClass="icon-menu" />
        {/* <button>
        </button> */}
      </div>
      <div className="m-t-80px admin-side-nav__container">
        <AdminSidenavLink
          link={`${url}/dashboard`}
          text="Dashboard"
          handleClick={() => setActivePane(0)}
          isActive={activeIndex === 0}
          icon={
            <IconOverview
              cssClass="admin-side-nav__link-icon"
              pathCssClass={`admin-side-nav__link-icon__path ${
                activeIndex === 0 ? "active" : null
              }`}
            />
          }
        />
        <AdminSidenavLink
          link={`${url}/users`}
          text="Users"
          handleClick={() => setActivePane(1)}
          isActive={activeIndex === 1}
          icon={
            <IconUsers
              cssClass="admin-side-nav__link-icon"
              pathCssClass={`admin-side-nav__link-icon__path ${
                activeIndex === 1 ? "active" : null
              }`}
            />
          }
        />
        <AdminSidenavLink
          link={`${url}/roles`}
          text="Roles"
          handleClick={() => setActivePane(2)}
          isActive={activeIndex === 2}
          icon={
            <IconRoles
              cssClass="admin-side-nav__link-icon"
              pathCssClass={`admin-side-nav__link-icon__path ${
                activeIndex === 2 ? "active" : null
              }`}
            />
          }
        />
        <AdminSidenavLink
          link={`${url}/supports`}
          text="Support tickets"
          handleClick={() => setActivePane(3)}
          isActive={activeIndex === 3}
          icon={
            <IconTicket
              cssClass="admin-side-nav__link-icon"
              pathCssClass={`admin-side-nav__link-icon__path ${
                activeIndex === 3 ? "active" : null
              }`}
            />
          }
        />
      </div>
      <div className="admin-side-nav__divider"></div>
      <div className="admin-side-nav__container">
        <AdminSidenavLink
          link={`${url}/subscriptions`}
          text="Subscriptions"
          handleClick={() => setActivePane(4)}
          isActive={activeIndex === 4}
          icon={
            <IconSettings
              cssClass="admin-side-nav__link-icon"
              pathCssClass={`admin-side-nav__link-icon__path ${
                activeIndex === 4 ? "active" : null
              }`}
            />
          }
        />

        <AdminSidenavLink
          link={`${url}/settings`}
          text="Settings"
          handleClick={() => setActivePane(5)}
          isActive={activeIndex === 5}
          icon={
            <IconSettings
              cssClass="admin-side-nav__link-icon"
              pathCssClass={`admin-side-nav__link-icon__path ${
                activeIndex === 5 ? "active" : null
              }`}
            />
          }
        />
      </div>
      <div className="admin-side-nav__bottom">
        <AdminSidenavLink
          link="#"
          text="Sign out"
          handleClick={logout}
          isActive={activeIndex === 6}
          icon={
            <IconLogout
              cssClass="admin-side-nav__link-icon"
              pathCssClass={`admin-side-nav__link-icon__path ${
                activeIndex === 6 ? "active" : null
              }`}
            />
          }
        />
      </div>
    </nav>
  );
};

export default AdminSideNav;
