import React from "react";
// import { Bar } from "react-chartjs-2";

// import AdminSideNav from "./../../../common/Admin/AdminSideNav";
import Typography from "./../../../../common/Typography/Typography";
import UserIcon from "./../../../../common/UserIcon/UserIcon";
import Button from "./../../../../common/Button/Button";
// import Svg from "./../../../common/Svg/Svg";
// import UserContact from "./../../../common/Contact/UserContact";
// import Image from "./../../../common/Image/Image";
import SearchInput from "./../../../../common/SearchInput/SearchInput";
import Select from "../../../../common/Input/Select";
import { Image } from "../../../../common";
import { Link } from "react-router-dom";
// import FilterInput from "./../../../common/FilterInput/FilterInput";
// import Table from "../../../common/Table/Table";
// import RolesTable from "./../../../common/Table/RolesTable";

interface Props {}
const ManageAccessRoles: React.FC<Props> = () => {
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
          <UserIcon pic="pic25" cssClass="admin-layout__user-icon" />
        </div>
      </nav>
      <section className="admin-layout__section">
        <section className="flex-r-aicenter m-b-20px">
          <Link to="/admin/roles">
            <Button
              cssClass="btn btn--xxsmall flex-r-jccenter-aicenter m-r-10px"
              icon="icon-arrow-back"
              iconClass="icon-plus-white"
            />
          </Link>
          <Typography type="h3" text="Manage Access" cssClass="head-22" />
        </section>

        <section className="manage_access__layout m-t-50px">
          <AccessItem />
          <AccessItem />
          <AccessItem />
          <AccessItem />
        </section>
      </section>
    </section>
  );
};

interface AccessItemProps {}
const AccessItem: React.FC<AccessItemProps> = () => {
  return (
    <section className="manage_access__item">
      <section className="manage_access__first">
        <div>
          <Image source={"userAdd"} />
        </div>
        <section>
          <Typography type="h4" text="Administrator" cssClass="m-b-10px" />
          <Typography type="p" text="mamangkarjo@gmail.com" />
        </section>
      </section>
      <Select
        name="role"
        placeholder="Change access"
        options={["Admin", "Editor"]}
      />
    </section>
  );
};

export default ManageAccessRoles;
