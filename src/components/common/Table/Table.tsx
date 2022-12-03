import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import Typography from "../Typography/Typography";
import Image from "./../Image/Image";
import Button from "./../Button/Button";
import Checkbox from "./../Input/Checkbox";
import subscription from "../../../services/subscription";
import { useParams } from "react-router-dom";

interface Props {}
const Table: React.FC<Props> = () => {
  const match = useRouteMatch("/admin");
  const path = match?.path;
  const [detailss, setDetailss] = useState<any>([]);
  const { id } = useParams<{ id: any }>();
  useEffect(() => {
    (async () => {
      await subscription
        .subaccounts(`${id}`)
        .then(({ data }) => {
          console.log("ant" + JSON.stringify(data.data));
          setDetailss(data.data.users);
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
  return (
    <table className="table">
      <thead>
        <tr className="table__head-row">
          <th className="table__th-first"></th>
          <th>Name</th>
          <th>Email address</th>
          <th>Phone</th>
          <th>Date joined</th>
          <th>PLAN</th>
          <th className="table__th-last"></th>
        </tr>
      </thead>
      <tbody>
        {detailss.map((datas: any, key: any) => (
          <tr className="table__body-row">
            <td>
              <Checkbox label="user1" name="user1" cssClass="m-l-20px" />
            </td>
            <td>
              <div className="flex-r-aicenter">
                <div className="table__user">
                  <Image source="pic18" cssClass="table__user-img" />
                </div>
                <Typography
                  type="h6"
                  text={datas.firstname + " " + datas.lastname}
                  cssClass="head-26 m-l-10px"
                />
              </div>
            </td>
            <td>
              <Typography type="p" text={datas.email} cssClass="p-14" />
            </td>
            <td>
              <Typography type="p" text={datas.phonenumber} cssClass="p-14" />
            </td>
            <td>
              <Typography type="p" text={datas.created_at} cssClass="p-14" />
            </td>
            <td>
              <Typography type="p" text={datas.planName} cssClass="p-14" />
            </td>
            <td>
              <Link to={`${path}/user-details/${datas.uid}`} className="link">
                <Button
                  cssClass="btn btn-4-table radius-5px table__cta"
                  text="View User"
                />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
