import React from "react";
// import { Bar } from "react-chartjs-2";

// import AdminSideNav from "./../../../common/Admin/AdminSideNav";
import Typography from "./../../../common/Typography/Typography";
import UserIcon from "./../../../common/UserIcon/UserIcon";
// import Button from "./../../../common/Button/Button";
import TextWithDivider from "./../../../common/TextWithDivider/TextWithDivider";
// import Svg from "./../../../common/Svg/Svg";
// import UserContact from "./../../../common/Contact/UserContact";
// import Image from "./../../../common/Image/Image";
// import SearchInput from "./../../../common/SearchInput/SearchInput";
// import FilterInput from "./../../../common/FilterInput/FilterInput";

import {
  useGetUserPaginated,
  useHtppMethods,
} from "./../../../../services/userManagementService";
import UserManagementTable from "./Users/UserManagementTable";

import Svg from "./../../../common/Svg/Svg";
import { downloader } from "./downloader";

interface Props {}
const Users: React.FC<Props> = () => {
  const adminSubHeadingsWithIcon = [
    {
      iconName: "icon-info-circle",
      divider: "splash",
      data: "Monitor and manage user statistics",
    },
  ];

  const [page, setPage] = React.useState(1);

  const [pageSize, setPageSize] = React.useState(10);

  const handlePageChange = ({ selected }: any) => {
    console.log(selected, "this xis the selected man");
    setPage((p) => (selected <= 0 || p <= 0 ? selected + 1 : selected));
    console.log(page, "this is the page man");
  };

  const { data, isLoading, isError, error } = useGetUserPaginated(
    `/users?page=${page}&perPage=${pageSize}`,
    page
  );

  const [searchState, setSearchState] = React.useState<string>("");

  const iData = data?.users?.filter(
    (data: any) =>
      data?.firstname?.toLocaleLowerCase()?.includes(searchState) ||
      data?.lastname?.toLocaleLowerCase()?.includes(searchState)
  );

  console.log(iData, "this is the id");

  const {
    data: dataExport,
    isLoading: isLoadingDataExport,
    isError: isErrorDataExport,
    error: errorDataExport,
  } = useHtppMethods(`/users/export`, "post", null);

  const handleChange = (e: any) => setSearchState(e.target.value);

  return (
    <section className="admin-layout__content">
      <nav className="admin-layout__top-nav">
        <Typography text="Users" type="h5" cssClass="head-21" />
        <div className="admin-layout__top-nav__actions">
          {/* <div className="search-input">
            <input
              type="text"
              className="search-input__input"
              placeholder="Search here..."
              onChange={handleChange}
            />
            <Svg iconId="icon-search-input" cssClass="icon-search-input" />
          </div> */}
          {/* <Button
            cssClass="btn btn-icon admin-layout__btn"
            icon="icon-notification"
            iconClass="icon-notification"
          /> */}
          <UserIcon availability="online" cssClass="admin-layout__user-icon" />
        </div>
      </nav>
      <section className="admin-layout__section">
        <section className="flex-r-jcbetween-aicenter m-b-20px">
          <article>
            <Typography
              type="h3"
              text="User Management"
              cssClass="head-22 m-b-15px"
            />
            <TextWithDivider texts={adminSubHeadingsWithIcon} />
          </article>
        </section>
        <section className="flex-r-aicenter m-t-40px m-b-20px">
          <div className="search-input">
            <Svg iconId="icon-search-input" cssClass="icon-search-input" />
            <input
              type="text"
              className="search-input__input"
              placeholder="Search user..."
              onChange={handleChange}
              style={{ padding: "15px", width: "50%" }}
            />
          </div>

          {isLoadingDataExport ? (
            <div className="m-l-auto">...</div>
          ) : isErrorDataExport || errorDataExport ? (
            <>
              <div
                className="m-l-auto"
                style={{ marginTop: "1em", color: "red" }}
              >
                <small>Export not available</small>
              </div>
            </>
          ) : (
            <div className="m-l-auto">{downloader(dataExport, `users`)}</div>
          )}
        </section>

        <section>
          <div className="table-wrapper ">
            <UserManagementTable
              {...{
                data: iData,
                isLoading,
                isError,
                error,
                setPageSize,
                handlePageChange,
                userCount: data?.userCount,
                pageSize,
              }}
            />
          </div>
        </section>
      </section>
    </section>
  );
};

export default Users;
