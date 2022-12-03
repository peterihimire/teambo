import React from "react";
import adminRolesStore from "../../../../../store/adminRolesStore";
import { RolesTable } from "../../../../common";

interface Props {}
const AdminUser: React.FC<Props> = () => {
  const heading = [
    {
      name: "Name",
      key: "name",
    },
    {
      name: "Role",
      key: "role",
    },
    {
      name: "Email address",
      key: "email_address",
    },
    {
      name: "Date joined",
      key: "updated_at",
    },
  ];

  const data = Array.from(
    adminRolesStore.getState().adminUsers,
    (adminUsers) => ({
      name: `${adminUsers.firstName} ${adminUsers.lastName}`,
      email_address: adminUsers.email,
      role: adminUsers.role,
      updated_at: adminUsers.dateJoined,
    })
  );

  return (
    <div>
      <RolesTable heading={heading} data={data} />
    </div>
  );
};

export default AdminUser;
