import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import adminRolesStore from "../../../../../store/adminRolesStore";
import { Svg } from "../../../../common";
// import Button from "../../../../common/Button/Button";
// import Button from "../../../../common/Button/Button";
import FilterInput from "../../../../common/FilterInput/FilterInput";
import AddRoleModal from "./addRoleModal";

interface Props {}
const RolesPageTop: React.FC<Props> = () => {
  const [filter, setFilter] = useState("none");
  const [search, setSearch] = useState("");

  useEffect(() => {
    adminRolesStore.setState((prev: any) => ({
      ...prev,
      searchFilter: search,
    }));
  }, [search]);

  return (
    <section className="flex-r-aicenter m-t-40px m-b-20px no-m">
      {/* <FilterInput cssClass="type-2" /> */}

      <div className="search-input">
        <input
          type="text"
          className="search-input__input"
          placeholder="Search....."
          style={{ height: 45 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Svg iconId="icon-search-input" cssClass="icon-search-input" />
      </div>

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
        cssClass="type-2 m-l-20px"
      />

      <div className="m-l-auto">
        <AddRoleModal />
      </div>
    </section>
  );
};

export default RolesPageTop;
