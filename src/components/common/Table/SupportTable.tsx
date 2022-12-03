import React, { useState, useEffect } from "react";
import Typography from "../Typography/Typography";
import Button from "./../Button/Button";
import Checkbox from "./../Input/Checkbox";
import { NavLink } from "react-router-dom";
import subscription from "../../../services/subscription";

interface Props {}

const SupportTable: React.FC<Props> = () => {
  const dater = (dates: any) => {
    var date: Date = new Date(dates);

    return date.toDateString();
  };
  const [datas, setDatas] = useState<any>([]);
  useEffect(() => {
    (async () => {
      await subscription
        .support()
        .then(({ data }) => {
          console.log("ant" + JSON.stringify(data.data));
          setDatas(data.data);
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
  return (
    <table className="table">
      <thead>
        <tr className="table__head-row">
          <th className="table__th-first"></th>
          <th>Ticket number</th>
          <th>ticket title</th>
          <th>sender</th>
          <th>Date</th>
          <th className="table__th-last"></th>
        </tr>
      </thead>
      <tbody>
        {datas.map((data: any, key: any) => (
          <tr className="table__body-row">
            <td>
              <Checkbox label="user1" name="user1" cssClass="m-l-20px" />
            </td>
            <td>
              <Typography type="h6" text={data.id} cssClass="head-26" />
            </td>
            <td>
              <Typography type="p" text={data.title} cssClass="p-14" />
            </td>

            <td>
              <Typography type="p" text={data.description} cssClass="p-14" />
            </td>
            <td>
              <Typography
                type="p"
                text={dater(data.created_at)}
                cssClass="p-14"
              />
            </td>
            <td>
              <NavLink
                to={`/admin/support/${data.initiator_id}/${data.uid}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Button
                  cssClass="btn btn-4-table radius-5px table__cta"
                  text="View"
                />
              </NavLink>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SupportTable;
