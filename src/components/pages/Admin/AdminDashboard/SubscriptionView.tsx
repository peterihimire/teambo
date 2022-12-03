import React, { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";

// import AdminSideNav from "../../../common/Admin/AdminSideNav";
import Typography from "../../../common/Typography/Typography";
import UserIcon from "../../../common/UserIcon/UserIcon";
import Button from "../../../common/Button/Button";

import TextWithDivider from "../../../common/TextWithImages/TextWithDivider";
// import Svg from "./../../../common/Svg/Svg";
// import UserContact from "../../../common/Contact/UserContact";
// import Image from "../../../common/Image/Image";
import SearchInput from "../../../common/SearchInput/SearchInput";

import GeneralInfo from "./Subscriptions/GeneralInfo";
import GeneralInfos from "./Subscriptions/GeneralInfos";
import useActiveTabpane from "../../../../utils/hooks/useActiveTabpane";
import subscription from "../../../../services/subscription";
import { useParams } from "react-router-dom";
interface Props {}
const SubscriptionView: React.FC<Props> = () => {
  const [activeIndex, setActivePane] = useActiveTabpane(0);
  const [details, setDetails] = useState<any>({});
  const { id } = useParams<{ id: any }>();
  useEffect(() => {
    (async () => {
      await subscription
        .plansdetail(id)
        .then(({ data }) => {
          //console.log("ant" + JSON.stringify(data.data));
          setDetails(data.data);
          //setfeatures(data.data.features);
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
  const adminSubHeadingsWithIcon = [
    {
      iconName: "icon-backs",
      divider: "splash",
      data: `${details ? details.max_participant : ""} subscribed accounts`,
      typer: "icon",
    },
  ];
  const tabsBtn = ["Subscription information", "Subscribed Accounts"];

  return (
    <section className="admin-layout__content">
      <nav className="admin-layout__top-nav">
        <Typography
          text={`Subscription >> ${details.title}`}
          type="h5"
          cssClass="head-21"
        />
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
          <article style={{ width: "100%" }}>
            <TextWithDivider texts={adminSubHeadingsWithIcon} />
          </article>
        </section>

        <section className="admin-layout__tab">
          <section className="admin-layout__tab-navigator">
            {tabsBtn.map((btn, index) => (
              <button
                key={index}
                onClick={() => setActivePane(index)}
                className={`admin-layout__tab-btn ${
                  index === activeIndex ? "active" : ""
                }`}
              >
                {btn}
              </button>
            ))}
          </section>
          <section className="admin-layout__tabs-container">
            {activeIndex === 0 && (
              <div className="">
                <GeneralInfo key={0} />
              </div>
            )}
            {activeIndex === 1 && <GeneralInfos key={1} />}
          </section>
        </section>
      </section>
    </section>
  );
};

export default SubscriptionView;
