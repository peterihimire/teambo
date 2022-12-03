import React from "react";
import adminRolesStore from "../../../../../store/adminRolesStore";
import { RolesTable } from "../../../../common";

interface Props {}
const RolesPage: React.FC<Props> = () => {
  const heading = [
    {
      name: "Title",
      key: "title",
    },
    {
      name: "Accronym",
      key: "accronym",
    },
    {
      name: "Description",
      key: "description",
    },
    {
      name: "Date updated",
      key: "updated_at",
    },
  ];

  const search = adminRolesStore((state) => state.searchFilter);
  const roles = adminRolesStore((state) => state.roles);
  const rolesSearchFilter = roles.filter(
    (role) =>
      role.title.toLowerCase().match(search.toLocaleLowerCase()) !== null ||
      role.description.toLowerCase().match(search.toLocaleLowerCase()) !== null ||
      role.accronym.toLowerCase().match(search.toLocaleLowerCase()) !== null 
  );

  return (
    <div>
      {adminRolesStore.getState().isLoading ? (
        "Loading..."
      ) : (
        <RolesTable heading={heading} data={rolesSearchFilter} />
      )}
    </div>
  );
};

export default RolesPage;
