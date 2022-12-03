import React, { useEffect } from "react";
// import { Bar } from "react-chartjs-2";

// import AdminSideNav from "./../../../common/Admin/AdminSideNav";
import Typography from "./../../../common/Typography/Typography";
import UserIcon from "./../../../common/UserIcon/UserIcon";
import Button from "./../../../common/Button/Button";
import TextWithDivider from "./../../../common/TextWithDivider/TextWithDivider";
// import Svg from "./../../../common/Svg/Svg";
// import UserContact from "./../../../common/Contact/UserContact";
// import Image from "./../../../common/Image/Image";
import SearchInput from "./../../../common/SearchInput/SearchInput";
// import FilterInput from "./../../../common/FilterInput/FilterInput";
// import Table from "../../../common/Table/Table";
// import RolesTable from "./../../../common/Table/RolesTable";
import useActiveTabpane from "../../../../utils/hooks/useActiveTabpane";
import RolesPage from "./RolesContent/RolesPage";
import AdminUser from "./RolesContent/AdminUserPage";
import RolesPageTop from "./RolesContent/RolesPageTop";
import AdminUserPageTop from "./RolesContent/AdminUserPageTop";
import adminRolesStore from "../../../../store/adminRolesStore";

interface Props {}
const Roles: React.FC<Props> = () => {
  const [activeIndex, setActivePane] = useActiveTabpane(0);

  const adminSubHeadingsWithIcon = [
    {
      iconName: "icon-info-circle",
      divider: "splash",
      data: "Add and manage roles",
    },
  ];

  useEffect(() => {
    adminRolesStore.getState().fetchRoles();
  }, []);

  const tabsBtn = ["Roles", "Admin user"];

  const tabsContent = [<RolesPage key={0} />, <AdminUser key={1} />];

  const tabsControls = [<RolesPageTop key={0} />, <AdminUserPageTop key={1} />];

  return (
    <section className="admin-layout__content">
      <nav className="admin-layout__top-nav">
        <Typography text="Roles" type="h5" cssClass="head-21" />
        <div className="admin-layout__top-nav__actions">
          <SearchInput />
          <Button
            cssClass="btn btn-icon admin-layout__btn"
            icon="icon-notification"
            iconClass="icon-notification"
          />
          <UserIcon availability="online" cssClass="admin-layout__user-icon" />
        </div>
      </nav>
      <section className="admin-layout__section">
        <section className="flex-r-jcbetween-aicenter m-b-20px">
          <article>
            <Typography
              type="h3"
              text="Role Management"
              cssClass="head-22 m-b-15px"
            />
            <TextWithDivider texts={adminSubHeadingsWithIcon} />
          </article>
        </section>

        {tabsControls.map((content, index) =>
          index === activeIndex ? content : null
        )}

        <section className="admin-layout__tab">
          <section className="admin-layout__tab-navigator">
            {tabsBtn.map((btn, index) => (
              <button
                key={index}
                onClick={() => setActivePane(index)}
                className={`admin-layout__tab-btn ${
                  index === activeIndex ? "active" : ""
                }`}
              >
                {btn}
              </button>
            ))}
          </section>
          <section className="m-t-20px">
            {tabsContent.map((content, index) =>
              index === activeIndex ? content : null
            )}
          </section>
        </section>
      </section>
    </section>
  );
};

export default Roles;
