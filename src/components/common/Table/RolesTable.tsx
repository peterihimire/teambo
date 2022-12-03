import React from "react";
import { formatDate } from "../../../utils/helpers/formatDate";
import Typography from "../Typography/Typography";
// import Button from "./../Button/Button";
import Checkbox from "./../Input/Checkbox";

interface Props {
  heading: Array<any>;
  data: Array<any>;
}
const RolesTable: React.FC<Props> = ({ heading, data }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr className="table__head-row">
            <th className="table__th-first"></th>
            {heading.map((th, idx) => (
              <th key={idx}>{th.name}</th>
            ))}
            {/* <th className="table__th-last"></th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((tr, idx) => (
            <tr key={idx} className="table__body-row">
              <td>
                <Checkbox
                  label={`user${idx}`}
                  name={`user${idx}`}
                  cssClass="m-l-20px"
                />
              </td>
              {heading.map((td, i) => {
                var text = tr[td.key];
                if (td.key === "updated_at") {
                  const { dateNum, month, year } = formatDate(tr[td.key]);
                  text = `${month} ${dateNum}, ${year}`;
                }
                return (
                  <td key={i}>
                    <Typography
                      type={
                        td.key === "name" || td.key === "title" ? "h6" : "p"
                      }
                      text={text}
                      cssClass={
                        td.key === "name" || td.key === "title"
                          ? "head-26"
                          : "p-14"
                      }
                    />
                  </td>
                );
              })}
              {/* <td>
                <Typography type="h6" text="Theresa Webb" cssClass="head-26" />
              </td>
              <td>
                <Typography type="p" text="Admin" cssClass="p-14" />
              </td>

              <td>
                <Typography
                  type="p"
                  text="curtis.weaver@example.com"
                  cssClass="p-14"
                />
              </td>
              <td>
                <Typography type="p" text="Feb 15, 2020" cssClass="p-14" />
              </td> */}
              {/* <td>
                <Button
                  cssClass="btn btn-4-table radius-5px table__cta"
                  text="View"
                />
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RolesTable;
