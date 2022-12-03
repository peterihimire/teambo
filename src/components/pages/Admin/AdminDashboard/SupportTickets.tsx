import React, { useState, useEffect } from "react";

import Typography from "../../../common/Typography/Typography";
import UserIcon from "../../../common/UserIcon/UserIcon";
import Button from "../../../common/Button/Button";
import TextWithDivider from "../../../common/TextWithDivider/TextWithDivider";

import SearchInput from "../../../common/SearchInput/SearchInput";
import FilterInput from "../../../common/FilterInput/FilterInput";

import SupportTable from "./../../../common/Table/SupportTable";
import subscription from "../../../../services/subscription";
import * as FileSaver from "file-saver";

interface Props {}
const SupportTickets: React.FC<Props> = () => {
  const [expo, setExpo] = useState<any>([]);
  const adminSubHeadingsWithIcon = [
    {
      iconName: "icon-info-circle",
      divider: "splash",
      data: "Add and mange roles",
    },
  ];
  useEffect(() => {
    (async () => {
      await subscription
        .supexport()
        .then(({ data }) => {
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
  }, []);
  const TextFile = (csvData: any) => {
    var blob = new Blob([`${expo}`], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "ticket.txt");
  };
  return (
    <section className="admin-layout__content">
      <nav className="admin-layout__top-nav">
        <Typography text="Support ticket" type="h5" cssClass="head-21" />
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
              text="Support ticket"
              cssClass="head-22 m-b-15px"
            />
            <TextWithDivider texts={adminSubHeadingsWithIcon} />
          </article>
        </section>
        <section className="flex-r-aicenter m-t-40px m-b-20px">
          <FilterInput cssClass="type-2" />
          <FilterInput cssClass="type-2 m-l-auto" />
          <Button
            cssClass="btn btn--primary btn--xxsmall btn-icon-n-text m-l-10px radius-7px"
            withIcon={true}
            iconClass="icon-upload m-r-10px"
            btnIcon="icon-upload"
            text="Export"
            handleClick={() => TextFile(expo ? expo : "")}
          />
        </section>

        <section>
          <div className="table-wrapper ">
            <SupportTable />
          </div>
        </section>
      </section>
    </section>
  );
};

export default SupportTickets;
