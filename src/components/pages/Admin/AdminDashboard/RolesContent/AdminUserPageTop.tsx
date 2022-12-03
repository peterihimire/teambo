import React, { useState } from "react";
// import Button from "../../../../common/Button/Button";
import FilterInput from "../../../../common/FilterInput/FilterInput";
import AdminUserAddRoleModal from "./adminUserAddRoleModal";

interface Props {}
const AdminUserPageTop: React.FC<Props> = () => {
  const [filter, setFilter] = useState("none");

  return (
    <section className="flex-r-aicenter m-t-40px m-b-20px no-m">
      {/* <FilterInput cssClass="type-2" /> */}

      <FilterInput
        options={[
          { value: "none", label: "Filter by" },
          { value: "name", label: "Name" },
          { value: "role", label: "Role" },
          { value: "email", label: "Email" },
          { value: "date_joined", label: "Date joined" },
        ]}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        cssClass="type-2"
      />

      <FilterInput
        options={[
          { value: "none", label: "Filter by" },
          { value: "name", label: "Name" },
          { value: "role", label: "Role" },
          { value: "email", label: "Email" },
          { value: "date_joined", label: "Date joined" },
        ]}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        cssClass="type-2 m-l-auto"
      />

      <AdminUserAddRoleModal />
    </section>
  );
};

export default AdminUserPageTop;
