/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import Typography from "./../../../common/Typography/Typography";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
import Svg from "./../../../common/Svg/Svg";
// import ProgressBar from "./../../../common/ProgressBar/ProgressBar";
import ReportCard from "./../../../common/ReportCard/ReportCard";
import {companyReportStore} from "../../../../store/companyReportStore";
// control + spacebar to show  the intellisence with  imports thats supposed to be in it
import { Bar } from "react-chartjs-2";

interface Props {
  history?: any;
  height: number;
  width: number;
  topUser?: any;
}

const SettingsReport: React.FC<Props> = ({ history }) => {
  // FOR THE API CALL
  // const [companyReport, setCompanyReport] = useState<any>({});
  // const [topUsersArray, setTopUsersArray] = useState<any>([]);
  // const [mostActiveUsersArray, setMostActiveUsersArray] = useState<any>([]);
  const [companyCallMembers, setCompanyCallMembers] = useState<any>("");
  const [companyAudioMinutes, setCompanyAudioMinutes] = useState<any>("");
  const [companyVideoMinutes, setCompanyVideoMinutes] = useState<any>("");

  const [topUsersAudioCountArray, setTopUsersAudioCountArray] = useState<any>([]);
  const [topUsersVidCountArray, setTopUsersVidCountArray] = useState<any>([]);
  const [topUsersName, setTopUsersName] = useState<any>([]);
  const [mostActUsersArray, setMostActUsersArray] = useState<any>([]);
  const [mostActiveUsersName, setMostActiveUsersName] = useState<any>([]);

  // FOR THE LOCAL STORE
  const {companyReport, getCompanyReport} = companyReportStore();

  // FOR THE FETCHED DATA FROM DATABASE
  const fetchCompanyReport = () => {
    // FOR THE DATA COMING FROM DATABASE
    let audioMinutes = companyReport.companyCallHistory.audioMinutes;
    setCompanyAudioMinutes(audioMinutes);

    let videoMinute = companyReport.companyCallHistory.videoMinute;
    setCompanyVideoMinutes(videoMinute);

    let callMembers = companyReport.companyCallHistory.callMembers;
    setCompanyCallMembers(callMembers);

    let topUsers = companyReport.topUsers;
    const data1 = topUsers.map((topUser: any) => {
      return topUser.callHistory.audioCount;
    });
    setTopUsersAudioCountArray(data1)
    const data2 = topUsers.map((topUser: any) => {
      return topUser.callHistory.videoCount;
    });
    setTopUsersVidCountArray(data2)
    const data3 = topUsers.map((topUser: any) => {
      let firstName = topUser?.firstName;
      let lastName = topUser?.lastName;
      let lastNameInitial = lastName?.slice(0, 1);
  
      return `${firstName}.${lastNameInitial}`;
    });
    setTopUsersName(data3)

    let mostActUsers = companyReport.mostActiveUsers;
    const data4 = mostActUsers.map((actUser: any) => {
      return actUser.messageHistory?.messageCount;
    });
    setMostActUsersArray(data4)

    const data5 = mostActUsers.map((actUser: any) => {
      let firstName = actUser?.firstName;
      let lastName = actUser?.lastName;
      let lastNameInitial = lastName?.slice(0, 1);

      return `${firstName}.${lastNameInitial}`;
    });
    setMostActiveUsersName(data5)
  };

  useEffect(() => {
    getCompanyReport();
    (async () => {
      await fetchCompanyReport();
    })();
  }, []);

  return (
    <DashboardLayoutOneRight>
      <div className="flex-r-jcbetween-aicenter m-b-20px">
        <Typography type="h5" text="Reports" cssClass="head-9" />
        <div className="flex-r-aicenter">
          <Svg iconId="icon-calender-sm" cssClass="icon-calender-sm" />
          <Typography
            type="p"
            text="17 Feb 2020 - 17 Mar 2020"
            cssClass="settings-report__date-filter m-l-10px"
          />
        </div>
      </div>
      <div className="settings-report__cards m-b-40px">
        <ReportCard
          title="Audio minutes"
          subTitle="Total time spent"
          statValue={companyAudioMinutes}
          progressBarType="ok"
        />
        <ReportCard
          title="Video minutes"
          subTitle="Total time spent"
          statValue={companyVideoMinutes}
          progressBarType="warn"
        />
        <ReportCard
          title="Call members"
          subTitle="Total call participants"
          statValue={companyCallMembers}
          progressBarType="danger"
        />
      </div>

      <div className="settings-report__stats">
        <div className="settings-report__other-stats">
          {!companyReport ? (
            <div className="settings-report__dummy">
              <Typography
                type="span"
                text="No data found for chart."
                cssClass="p-7"
              />
            </div>
          ) : (
            <div className="settings-report__other-stats--1">
              <div className="flex-r-jcbetween">
                <div>
                  <Typography type="h5" text="Top users" cssClass="head-18" />
                  <Typography
                    type="p"
                    text="Week to week performance"
                    cssClass="p-1"
                  />
                </div>
                <div>
                  <Svg
                    iconId="icon-video-calls"
                    cssClass="icon-video-calls m-r-5px"
                  />
                  <Typography type="span" text="Video calls" cssClass="p-7" />
                </div>
              </div>
              <div className="settings-report__dummy">
                <Bar
                  type="bar"
                  data={{
                    labels: topUsersName,
                    datasets: [
                      {
                        /* 
                        //@ts-ignore */
                        axis: "y",
                        label: "Audio Calls",
                        data: topUsersAudioCountArray,
                        borderColor: "#4680FF",
                        backgroundColor: "#4680FF",
                        borderWidth: 2,
                        barPercentage: 0.5,
                        barThickness: 5,
                        maxBarThickness: 8,
                        minBarLength: 2,
                      },
                      {
                        borderColor: "#10BD1B",
                        backgroundColor: "#10BD1B",
                        borderWidth: 2,
                        data: topUsersVidCountArray,
                        /* 
                        //@ts-ignore */
                        fill: "transparent",
                        label: "Video Calls",
                        barPercentage: 0.5,
                        barThickness: 5,
                        maxBarThickness: 8,
                        minBarLength: 2,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      x: {
                        grid: {
                          display: false,
                          drawBorder: false,
                        },
                        ticks: {
                          /* 
                        //@ts-ignore */
                          beginAtZero: true,
                        },
                      },

                      y: {
                        grid: {
                          display: false,
                          drawBorder: false,
                        },
                      },
                    },
                  }}
                  height={10}
                  width={10}
                />
              </div>
            </div>
          )}
        </div>
        {!companyReport ? (
          <div className="settings-report__dummy">
            <Typography
              type="span"
              text="No data found for chart."
              cssClass="p-7"
            />
          </div>
        ) : (
          <div className="settings-report__usage-stats">
            <div className="flex-r-jcbetween">
              <div>
                <Typography
                  type="h5"
                  text="Most active users"
                  cssClass="head-18"
                />
                <Typography
                  type="p"
                  text="Week to week performance"
                  cssClass="p-1"
                />
              </div>
              <div>
                <Svg
                  iconId="icon-messages-2"
                  cssClass="icon-messages-2 m-r-5px"
                />
                <Typography type="span" text="Messages" cssClass="p-7" />
              </div>
            </div>

            <div className="settings-report__dummy">
              <Bar
                type="bar"
                data={{
                  labels: mostActiveUsersName,
                  datasets: [
                    {
                      label: "Messages",

                      data: mostActUsersArray,
                      borderColor: "#4680FF",
                      backgroundColor: "#4680FF",
                      borderWidth: 2,
                      barPercentage: 0.5,
                      barThickness: 5,
                      maxBarThickness: 8,
                      minBarLength: 2,
                      /* 
                        //@ts-ignore */
                      pointRadius: 0,
                      fill: "transparent",
                    },
                  ],
                }}
                options={{
                  indexAxis: "y",
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        /* 
                        //@ts-ignore */
                        beginAtZero: true,
                      },
                    },
                    y: {
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                    },
                  },
                }}
                height={10}
                width={10}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayoutOneRight>
  );
};

export default SettingsReport;