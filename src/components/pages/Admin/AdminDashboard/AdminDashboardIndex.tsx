import React from "react";
import { Bar } from "react-chartjs-2";

// import AdminSideNav from "./../../../common/Admin/AdminSideNav";
import Typography from "./../../../common/Typography/Typography";
import UserIcon from "./../../../common/UserIcon/UserIcon";
import Button from "./../../../common/Button/Button";
import TextWithDivider from "./../../../common/TextWithDivider/TextWithDivider";
// import Svg from "./../../../common/Svg/Svg";
import Image from "./../../../common/Image/Image";
// import SearchInput from "./../../../common/SearchInput/SearchInput";
// import FilterInput from "./../../../common/FilterInput/FilterInput";
import { useGetUserManagement } from "./../../../../services/userManagementService";
// import { AvatarIcon } from "../../../common/UserIcon/UserIcon";
// import { downloader } from "./downloader";
import { useHistory } from "react-router";
import { imgUrl } from "./Users/getImageAsset";

interface Props {}
const AdminDashboardIndex: React.FC<Props> = () => {
  const options: any = {
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
  };
  const adminSubHeadingsWithIcon = [
    // {
    //   iconName: "icon-location",
    //   divider: "splash",
    //   data: "Hamsterdam, Germany",
    // },
    {
      iconName: "icon-solid-time",
      divider: "splash",
      data: new Date()?.toLocaleDateString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  ];

  const { data, isLoading, isError, error } = useGetUserManagement(
    `/dashboard/plans/stats`
  );

  const {
    data: dataSupportTickets,
    isLoading: isLoadingSupportTickets,
    isError: isErrorSupportTickets,
    error: errorSupportTickets,
  } = useGetUserManagement(`/supports`);

  // const {
  //   data: dataExport,
  //   isLoading: isLoadingDataExport,
  //   isError: isErrorDataExport,
  //   error: errorDataExport,
  // } = useGetUserManagement(`/dashboard/plans/stats/export`);

  const history = useHistory();

  const {
    data: dataUserActivities,
    isLoading: isLoadingUserActivities,
    isError: isErrorUserActivities,
    error: errorUserActivities,
  } = useGetUserManagement(`/users?sort=-created_at&page=1&perPage=8`);

  const graphFactor = data?.data?.activities;
  const monday = graphFactor?.monday;
  const tuesday = graphFactor?.tuesday;
  const wednesday = graphFactor?.wednesday;
  const thursday = graphFactor?.thursday;
  const friday = graphFactor?.friday;
  const saturday = graphFactor?.saturday;

  const getUserName = () => {
    const data: any = localStorage.getItem("userData");
    const parsedData = JSON.parse(data);
    return parsedData?.data?.firstname;
  };

  return (
    <section className="admin-layout__content">
      <nav className="admin-layout__top-nav">
        <Typography text="Dashboard" type="h5" cssClass="head-21" />
        <div className="admin-layout__top-nav__actions">
          {/* <SearchInput />
          <Button
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
              text={`Good day, ${getUserName() || "to you from timbo"}`}
              cssClass="head-22 m-b-15px"
            />
            <TextWithDivider texts={adminSubHeadingsWithIcon} />
          </article>
        </section>

        <section className="admin-dashboard__stats">
          {isLoading ? (
            <div className="admin-layout__content" style={{ padding: "5em 0" }}>
              <small>Please wait, loading users and graph details...</small>
            </div>
          ) : error || isError ? (
            <div
              className="admin-layout__content"
              style={{ marginTop: "1em", color: "red" }}
            >
              <small>Something went wrong, Try Again.</small>
            </div>
          ) : (
            <aside className="admin-dashboard__stats-details">
              <section className="admin-dashboard__stats-cards">
                <div className="admin-dashboard__stats-card">
                  <div className="flex-r-jcbetween-aicenter">
                    <Image source="pic26" />
                    {/* <FilterInput cssClass="type-1" /> */}
                  </div>
                  <div className="m-t-30px">
                    <Typography
                      type="p"
                      text="All Registered Users"
                      cssClass="p-12 m-b-5px"
                    />
                    <Typography type="span" text="" cssClass="">
                      <Typography
                        type="span"
                        text={data?.data?.allUsersCount || "N/A"}
                        cssClass="head-24"
                      />
                      {/* <Typography
                        type="span"
                        text="+23"
                        cssClass="p-13 m-l-5px"
                      /> */}
                    </Typography>
                  </div>
                </div>
                <div className="admin-dashboard__stats-card">
                  <div className="flex-r-jcbetween-aicenter">
                    <Image source="pic27" />
                    {/* <FilterInput cssClass="type-1" /> */}
                  </div>

                  <div className="m-t-30px">
                    <Typography
                      type="p"
                      text="Paid Users"
                      cssClass="p-12 m-b-5px"
                    />
                    <Typography type="span" text="" cssClass="">
                      <Typography
                        type="span"
                        text={data?.data?.paidPlanUsersCount || "0"}
                        cssClass="head-24"
                      />
                      {/* <Typography
                        type="span"
                        text="+23"
                        cssClass="p-13 m-l-5px"
                      /> */}
                    </Typography>
                  </div>
                </div>
                <div className="admin-dashboard__stats-card">
                  <div className="flex-r-jcbetween-aicenter">
                    <Image source="pic28" />
                    {/* <FilterInput cssClass="type-1" /> */}
                  </div>

                  <div className="m-t-30px">
                    <Typography
                      type="p"
                      text="Free Users"
                      cssClass="p-12 m-b-5px"
                    />
                    <Typography type="span" text="" cssClass="">
                      <Typography
                        type="span"
                        text={data?.data?.freePlanUsersCount || "N/A"}
                        cssClass="head-24"
                      />
                      {/* <Typography
                        type="span"
                        text="+23"
                        cssClass="p-13 m-l-5px"
                      /> */}
                    </Typography>
                  </div>
                </div>
              </section>
              <section className="admin-dashboard__chart">
                <div className="flex-r-jcbetween-aicenter m-b-20px">
                  <Typography
                    type="h5"
                    text="Timbo Activities"
                    cssClass="head-25"
                  />

                  {/* {isLoadingDataExport ? (
                    <div
                      className="admin-layout__content"
                      style={{ padding: "5em" }}
                    >
                      ...
                    </div>
                  ) : isErrorDataExport || errorDataExport ? (
                    <div style={{ marginTop: "1em", color: "red" }}>
                      Export not available
                    </div>
                  ) : (
                    downloader(dataExport, "dashboardplanstatistic")
                  )} */}
                </div>

                <Bar
                  data={{
                    labels: ["M", "T", "W", "T", "F", "S", "S"],
                    datasets: [
                      {
                        label: "Registered users",
                        data: [
                          monday?.privateCallsCount,
                          tuesday?.privateCallsCount,
                          wednesday?.privateCallsCount,
                          thursday?.privateCallsCount,
                          friday?.privateCallsCount,
                          saturday?.privateCallsCount,
                        ],
                        backgroundColor: "#7895FF",
                      },
                      {
                        label: "Paid Users",
                        data: [
                          monday?.publicCallsCount,
                          tuesday?.publicCallsCount,
                          wednesday?.publicCallsCount,
                          thursday?.publicCallsCount,
                          friday?.publicCallsCount,
                          saturday?.publicCallsCount,
                        ],
                        backgroundColor: "#FF92AE",
                      },
                      {
                        label: "Free Users",
                        data: [
                          monday?.messagesCount,
                          tuesday?.messagesCount,
                          wednesday?.messagesCount,
                          thursday?.messagesCount,
                          friday?.messagesCount,
                          saturday?.messagesCount,
                        ],
                        backgroundColor: "#FFD18B",
                      },
                    ],
                  }}
                  options={options}
                  /* 
            //@ts-ignore */
                  type={"any"}
                />
              </section>
            </aside>
          )}
          <aside className="admin-dashboard__stats-aside">
            {isLoadingSupportTickets ? (
              <div style={{ padding: "1em 0", fontSize: "0.8em" }}>
                Please wait, loading support tickets...
              </div>
            ) : errorSupportTickets || isErrorSupportTickets ? (
              <div style={{ marginTop: "0.8em", color: "red" }}>
                <small>Something went wrong, Try Again.</small>
              </div>
            ) : (
              <div className="support-tickect-card">
                {/* <Svg iconId="icon-circle" cssClass="icon-circle" /> */}
                <Button
                  cssClass="btn btn-icon admin-layout__btn"
                  icon="icon-notification"
                  iconClass="icon-notification"
                />
                <div className="m-l-20px">
                  <Typography
                    type="h5"
                    text={`You have (${dataSupportTickets?.data?.length}) support tickets`}
                    cssClass="head-23 m-b-2px"
                  />
                  <button
                    className="btn m-t-5px"
                    onClick={() => history.push("/admin/supports")}
                    style={{ background: "#eee", padding: "5px" }}
                  >
                    <small>View tickets</small>
                  </button>
                </div>
              </div>
            )}
            <aside className="admin-dashboard__stats-right">
              <Typography type="h4" text="Recent Users" cssClass="head-6" />
              <Typography
                type="p"
                text="Your previous chats and calls"
                cssClass="p-3"
              />
              <div className="admin-dashboard__stats__recent-users">
                {isLoadingUserActivities ? (
                  <div style={{ padding: "1em 0", fontSize: "0.8em" }}>
                    Please wait, loading user activities...
                  </div>
                ) : errorUserActivities || isErrorUserActivities ? (
                  <div style={{ marginTop: "1em", color: "red" }}>
                    <small>Could not fetch user activities, Try Again.</small>
                  </div>
                ) : (
                  <>
                    {dataUserActivities?.users?.map((activity: any) => {
                      if (!activity?.firstname || !activity?.lastname)
                        return null;
                      return (
                        <div
                          className="user-contact"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            history.push({
                              pathname: `/admin/user-details/${activity?.id}`,
                              state: { row: activity },
                            })
                          }
                        >
                          {!activity?.image ? (
                            <h3
                              className={`avatar__icon`}
                              style={{ display: "flex" }}
                            >
                              <span style={{ marginRight: "2px" }}>
                                {activity?.firstname?.slice(0, 1)}
                              </span>
                              {activity?.lastname?.slice(0, 1)}
                            </h3>
                          ) : (
                            <div className={`user-icon }`}>
                              <Image
                                src={
                                  activity?.image &&
                                  imgUrl(activity.uid, activity.image)
                                }
                                source={"iconLogo"}
                                cssClass="user-icon__img"
                              />
                            </div>
                          )}
                          <div className="user-contact__info">
                            {/* <UserContact
                              noCall={false}
                              iconSize="small"
                              actionBtnSize="small"
                              userImg="pic22"
                            /> */}
                            <Typography
                              type="h3"
                              text={`${activity?.firstname} ${activity?.lastname}`}
                              cssClass="head-7 line-height-0 m-b-18px"
                            />
                            <Typography
                              type="p"
                              text={activity?.type?.toLocaleLowerCase()}
                              cssClass="p-2 line-height-0"
                            />
                          </div>

                          <div className="m-l-auto flex-r"></div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
              <div onClick={() => history.push("/admin/users")}>
                <Typography
                  type="p"
                  text="View All"
                  cssClass="p-3 text-center pointer"
                />
              </div>
            </aside>
          </aside>
        </section>
      </section>
    </section>
  );
};

export default AdminDashboardIndex;
