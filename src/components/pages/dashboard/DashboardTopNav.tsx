import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Typography from "./../../common/Typography/Typography";
// import Button from "./../../common/Button/Button";
import UserIcon, { AvatarIcon } from "./../../common/UserIcon/UserIcon";
import IconSettings from "./../../common/SvgIcons/IconSettings";
import IconLogout from "./../../common/SvgIcons/IconLogout";
import auth from "./../../../services/authService";
import { userStore } from "./../../../store/userStore";

import useOnClickOutside from "./../../../utils/hooks/useOnClickOutside";

interface Props {
  history?: any;
  title: string;
  icon?: string;
}
const DashboardTopNav: React.FC<Props> = ({ title, icon }) => {
  const { user } = userStore();
  const history = useHistory();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>();
  useOnClickOutside(ref, () => setShowDropdown(false));
  const logout = async () => {
    await auth.logout();
    history.push("/auth");
    history.go(0);
  };
  let avatar = "";
  const { firstname, lastname, image: userImage } = user;
  if(user.firstname && user.lastname){
    avatar = lastname[0] + firstname[0];
  }
  return (
    <>
      <nav className="dashboard-top-nav">
        <div className="dashboard-top-nav__col-1">
          <Typography type="h3" text={title} cssClass="head-3" />
        </div>
        <div className="dashboard-top-nav__col-last">
          {/* <Button
            cssClass="btn btn-icon"
            icon={icon ? icon : "icon-search"}
            iconClass={icon ? icon : "icon-search"}
          /> */}
          <div onClick={() => setShowDropdown((prevState) => !prevState)}>
            {!userImage ? (
              <AvatarIcon avatar={avatar} cssClass={"user_header"} />
            ):(
                <UserIcon pic={userImage} userId={user.uid} availability="online" />
            )}
          </div>
        </div>

        {showDropdown && (
          <div
            ref={ref as React.RefObject<HTMLDivElement>}
            className="dropdown-top-nav animate-slideFromBottom"
          >
            <Link
              to="/user/profile-settings"
              className="dropdown-top-nav__link"
            >
              <IconSettings pathCssClass="dropdown-top-nav__link__icon" />
              <span>Profile settings</span>
            </Link>
            <Link to="#" onClick={logout} className="dropdown-top-nav__link">
              <IconLogout
                cssClass="dropdown-top-nav__link__icon-logout"
                pathCssClass="dropdown-top-nav__link__icon-logout-path"
              />
              <span>Log out</span>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default DashboardTopNav;
