import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

import { Link } from "react-router-dom";

// Hooks
// import useBarChart from "../../../../utils/hooks/useBarChart";

// import AdminSideNav from "../../../common/Admin/AdminSideNav";
import Typography from "../../../common/Typography/Typography";
import UserIcon from "../../../common/UserIcon/UserIcon";
import Button from "../../../common/Button/Button";
import TextWithDivider from "../../../common/TextWithDivider/TextWithDivider";
// import Svg from "../../../common/Svg/Svg";
import UserContact from "../../../common/Contact/UserContact";
import Image from "../../../common/Image/Image";
import SearchInput from "../../../common/SearchInput/SearchInput";
import FilterInput from "../../../common/FilterInput/FilterInput";
import AddSubscription from "./AddSubscription";
import subscription from "../../../../services/subscription";
import * as FileSaver from "file-saver";
//import * as XLSX from "xlsx";
interface Props {}
const Subscriptions: React.FC<Props> = () => {
  const [adds, setAdds] = useState<boolean>(false);
  const [plans, setPlans] = useState<any>([]);
  const [User, setUsers] = useState<any>([]);
  const [chart, setChart] = useState<any>([]);
  const [expo, setExpo] = useState<any>([]);

  const data = {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [
      {
        label: "Basic",
        data: [12, 19, 3, 5, 2, 3, 3],
        backgroundColor: "#7895FF",
      },
      {
        label: "Silver",
        data: [2, 3, 20, 5, 1, 4, 2],
        backgroundColor: "#FF92AE",
      },
      {
        label: "Gold",
        data: [3, 10, 13, 15, 22, 30, 6],
        backgroundColor: "#FFD18B",
      },
    ],
  };

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
    {
      iconName: "icon-info-circle",
      divider: "splash",
      data: "Create and manage subscriptions`",
    },
  ];

  useEffect(() => {
    (async () => {
      await subscription
        .subscriptions()
        .then(({ data }) => {
          console.log("ant" + JSON.stringify(data.data.planInfo));
          setPlans(data.data.planInfo);
          setChart(data.data.plansChart);

          console.log("Aaa" + chart[0].mondayCount);
        })
        .catch((ex) => {
          if (ex.response && ex.response.status === 401) {
          }
        });
    })();
    (async () => {
      await subscription
        .recent()
        .then(({ data }) => {
          console.log("ants" + JSON.stringify(data.data));
          setUsers(data.data);
        })
        .catch((ex) => {
          if (ex.response && ex.response.status === 401) {
          }
        });
    })();
    (async () => {
      await subscription
        .exp()
        .then(({ data }) => {
          console.log("ants" + JSON.stringify(data.data));
        })
        .catch((ex) => {
          if (ex.response && ex.response.status === 401) {
          }
        });
    })();
    (async () => {
      await subscription
        .exports()
        .then(({ data }) => {
          console.log("export" + JSON.stringify(data));
          setExpo(data);
        })
        .catch((ex) => {
          if (ex.response && ex.response.status === 401) {
          }
        });
    })();
    return () => {
      console.log("hi"); // 👍
    };
  });

  /*  
      const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
    const exportToCSV = (csvData: any, fileName: any) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

*/

  const TextFile = (csvData: any) => {
    var blob = new Blob([`${expo}`], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "subscription.txt");
  };
  return (
    <section className="admin-layout__content">
      <nav className="admin-layout__top-nav">
        <Typography text="Susbcriptions" type="h5" cssClass="head-21" />
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
              text="Subscriptions"
              cssClass="head-22 m-b-15px"
            />
            <TextWithDivider texts={adminSubHeadingsWithIcon} />
          </article>
          <Button
            cssClass="btn btn--primary btn--xxsmall btn-icon-n-text radius-6px"
            withIcon={true}
            iconClass="icon-plus-white m-r-10px"
            btnIcon="icon-plus-white"
            text="Add New"
            handleClick={() => setAdds(true)}
          />
          {adds && (
            <AddSubscription
              displayModal={adds}
              ad={adds === true ? "a" : "b"}
              closeModal={() => setAdds(false)}
            />
          )}
        </section>

        <section className="admin-dashboard__stats">
          <aside className="admin-dashboard__stats-details">
            <section className="admin-dashboard__stats-cards">
              {plans.map((datas: any, key: any) => (
                <div className="admin-dashboard__stats-card">
                  <div className="flex-r-jcbetween-aicenter">
                    <Image
                      source={
                        key === 0 ? "pic26" : key === 1 ? "pic27" : "pic28"
                      }
                    />
                    <FilterInput cssClass="type-1" />
                  </div>
                  <Link
                    to={`/admin/subscription/${datas.planId}`}
                    className="link link--primary"
                  >
                    <div className="m-t-30px">
                      <Typography
                        type="p"
                        text={datas.planName}
                        cssClass="p-12 m-b-5px"
                      />
                      <Typography type="span" text="" cssClass="">
                        <Typography
                          type="span"
                          text={datas.subscribersCount}
                          cssClass="head-24"
                        />
                        <Typography
                          type="span"
                          text="+23"
                          cssClass="p-13 m-l-5px"
                        />
                      </Typography>
                    </div>
                  </Link>
                </div>
              ))}
            </section>
            <section className="admin-dashboard__chart">
              <div className="flex-r-jcbetween-aicenter m-b-20px">
                <Typography type="h5" text="Activities" cssClass="head-25" />
                <Button
                  cssClass="btn btn--primary btn--xxsmall btn-icon-n-text radius-6px"
                  withIcon={true}
                  iconClass="icon-upload m-r-10px"
                  btnIcon="icon-upload"
                  text="Export"
                  handleClick={() => TextFile(expo ? expo : "")}
                  // handleClick={() =>
                  // exportToCSV(expo ? expo : "", "Exported file")
                  //}
                />
              </div>
              <Bar
                data={
                  chart.length > 0
                    ? {
                        labels: ["M", "T", "W", "T", "F", "S", "S"],
                        datasets: [
                          {
                            label: "Basic",
                            data: [
                              chart[0].mondayCount,
                              chart[0].tuesdayCount,
                              chart[0].wednesdayCount,
                              chart[0].thursdayCount,
                              chart[0].fridayCount,
                              chart[0].saturdayCount,
                              chart[0].sundayCount,
                            ],
                            backgroundColor: "#7895FF",
                          },
                          {
                            label: "Silver",
                            data: [
                              chart[1].mondayCount,
                              chart[1].tuesdayCount,
                              chart[1].wednesdayCount,
                              chart[1].thursdayCount,
                              chart[1].fridayCount,
                              chart[1].saturdayCount,
                              chart[1].sundayCount,
                            ],
                            backgroundColor: "#FF92AE",
                          },
                          {
                            label: "Gold",
                            data: [
                              chart[2].mondayCount,
                              chart[2].tuesdayCount,
                              chart[2].wednesdayCount,
                              chart[2].thursdayCount,
                              chart[2].fridayCount,
                              chart[2].saturdayCount,
                              chart[2].sundayCount,
                            ],
                            backgroundColor: "#FFD18B",
                          },
                        ],
                      }
                    : data
                }
                options={options}
              />
            </section>
          </aside>
          <aside className="admin-dashboard__stats-aside">
            <aside className="admin-dashboard__stats-right">
              <Typography type="h4" text="New subscribers" cssClass="head-6" />
              <Typography type="p" text="New premium accounts" cssClass="p-3" />
              <div className="admin-dashboard__stats__recent-users">
                {User.map((datas: any, key: any) => (
                  <UserContact
                    noCall={false}
                    user={datas}
                    userDetail={datas}
                    iconSize="small"
                    actionBtnSize="small"
                    userImg="pic23"
                  />
                ))}
              </div>
              <Typography
                type="p"
                text="View All"
                cssClass="p-3 text-center pointer"
              />
            </aside>
          </aside>
        </section>
      </section>
    </section>
  );
};

export default Subscriptions;
