import React from "react";
import { Bar } from "react-chartjs-2";

import Typography from "./../../../../common/Typography/Typography";
import ReportCard from "./../../../../common/ReportCard/ReportCard";

import { useLocation, useHistory } from "react-router-dom";
import { useGetUserManagement } from "../../../../../services/userManagementService";
import { downloader } from "./../downloader";

interface Props {}
const UserActivities: React.FC<Props> = () => {
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

  const { state }: any = useLocation();
  const history = useHistory();

  React.useEffect((): any => {
    if (!state) {
      history.push("/admin/users");
    }
  }, [history, state]);

  const {
    data: userActivities,
    isLoading,
    isError,
    error,
  } = useGetUserManagement(`/dashboard/users/${state?.row?.uid}/activities`);

  const {
    data: dataExport,
    isLoading: isLoadingDataExport,
    isError: isErrorDataExport,
    error: errorDataExport,
  } = useGetUserManagement(`dashboard/users/${state?.row?.id}/usage/export`);

  const graphFactor = userActivities?.data?.activities;
  const monday = graphFactor?.monday;
  const tuesday = graphFactor?.tuesday;
  const wednesday = graphFactor?.wednesday;
  const thursday = graphFactor?.thursday;
  const friday = graphFactor?.friday;
  const saturday = graphFactor?.saturday;

  return (
    <>
      {isLoading ? (
        <div style={{ marginTop: "1em" }}>
          <small>Fetching user activities...</small>
        </div>
      ) : error || isError ? (
        <div style={{ marginTop: "1em", color: "red" }}>
          <small>Something went wrong</small>
        </div>
      ) : (
        <>
          <section className="user-details__data">
            <ReportCard
              title="Private call minutes"
              subTitle="Total time spent"
              statValue={userActivities?.data?.privateCallsMinutes || 0}
              progressBarType="ok"
              noBorder={true}
              cssClass="small"
            />
            <ReportCard
              title="Public call minutes"
              subTitle="Total time spent"
              statValue={userActivities?.data?.publicCallsMinutes || 0}
              progressBarType="warn"
              noBorder={true}
              cssClass="small"
            />
            <ReportCard
              title="Chat Counts"
              subTitle="Total chat count"
              statValue={userActivities?.data?.chatCounts}
              progressBarType="danger"
              noBorder={true}
              cssClass="small"
            />
          </section>

          <section className="user-details__about">
            <section className="admin-dashboard__chart">
              <div className="flex-r-jcbetween-aicenter m-b-20px">
                <Typography
                  type="h5"
                  text="Timbo Activities"
                  cssClass="head-25"
                />
                <div className="flex-r-aicenter">
                  {/* <Button
                    cssClass="btn btn--primary btn--xxsmall btn-icon-n-text radius-6px"
                    withIcon={true}
                    iconClass="icon-upload m-r-10px"
                    btnIcon="icon-upload"
                    text="This Month"
                  /> */}

                  {isLoadingDataExport ? (
                    <div className="" style={{ padding: "5em" }}>
                      ...
                    </div>
                  ) : isErrorDataExport || errorDataExport ? (
                    <div style={{ marginTop: "1em", color: "red" }}>
                      Export not available
                    </div>
                  ) : (
                    downloader(
                      dataExport,
                      `${state?.row?.firstname} ${state?.row?.lastname}`
                    )
                  )}

                  {/* <Button
                    cssClass="btn btn--primary btn--xxsmall btn-icon-n-text radius-6px m-l-10px"
                    withIcon={true}
                    iconClass="icon-upload m-r-10px"
                    btnIcon="icon-upload"
                    text="Export"
                  /> */}
                </div>
              </div>
              <Bar
                data={{
                  labels: ["M", "T", "W", "T", "F", "S", "S"],
                  datasets: [
                    {
                      label: "Private call minutes",
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
                      label: "Public call minutes",
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
                      label: "Chat counts",
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
          </section>
        </>
      )}
    </>
  );
};

export default UserActivities;
