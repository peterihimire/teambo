import React from "react";
import { useRouteMatch } from "react-router-dom";

import Typography from "../../../../common/Typography/Typography";
import Image from "../../../../common/Image/Image";
import { Button } from "../../../../common/Button";
import Checkbox from "./../../../../common/Input/Checkbox";
import { useHistory } from "react-router";
import { imgUrl } from "./getImageAsset";
import ReactPaginate from "react-paginate";

interface Props {
  data: any;
  isError: boolean;
  error: any;
  isLoading: boolean;
  setPageSize: (e: number) => void;
  handlePageChange: (e: any) => void;
  pageSize: number;
  userCount: number;
}

const UserManagementTable: React.FC<Props> = ({
  data,
  isError,
  error,
  isLoading,
  userCount,
  pageSize,
  setPageSize,
  handlePageChange,
}) => {
  const match = useRouteMatch("/admin");
  const path = match?.path;

  const history = useHistory();

  let pages = 0;
  if (pageSize && userCount) {
    pages = Math.ceil(userCount / pageSize);
  }

  let sizes: Array<number> = [10];

  if (data) {
    let relay = 2,
      counter = 10;
    while (relay < userCount / 10) {
      counter += 10;
      sizes.push(counter);
      ++relay;
    }
  }

  return (
    <>
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
          {isLoading ? (
            <div style={{ padding: "1em" }}>
              <small>Fetching users, please wait...</small>
            </div>
          ) : isError || error ? (
            <div style={{ padding: "1em", color: "red" }}>
              <small>Something went wrong, try again.</small>
            </div>
          ) : data?.length <= 0 ? (
            <div style={{ padding: "1em" }}>
              <small>No available users.</small>
            </div>
          ) : (
            data?.map((row: any) => (
              <tr className="table__body-row">
                <td>
                  <Checkbox label="user1" name="user1" cssClass="m-l-20px" />
                </td>
                <td>
                  <div className="flex-r-aicenter">
                    {row?.image ? (
                      <div className="table__user">
                        <Image
                          src={row?.image && imgUrl(row.uid, row.image)}
                          source={"pic18"}
                          alt={`${row?.lastname?.toLocaleUpperCase()}`}
                          cssClass="table__user-img"
                        />
                      </div>
                    ) : (
                      <div
                        className={`avatar__icon`}
                        style={{ display: "flex", fontSize: "0.7em" }}
                      >
                        <span style={{ marginRight: "2px" }}>
                          {row?.firstname?.toLocaleUpperCase()?.slice(0, 1)}
                        </span>
                        <span>
                          {row?.lastname?.toLocaleUpperCase()?.slice(0, 1)}
                        </span>
                      </div>
                    )}
                    <Typography
                      type="h6"
                      text={`${row?.firstname || "N/A"} ${
                        row?.lastname || "N/A"
                      }`}
                      cssClass="head-26 m-l-10px"
                    />
                  </div>
                </td>
                <td>
                  <Typography
                    type="p"
                    text={`${row?.email || "N/A"}`}
                    cssClass="p-14"
                  />
                </td>
                <td>
                  <Typography
                    type="p"
                    text={`${row?.phone || "N/A"}`}
                    cssClass="p-14"
                  />
                </td>
                <td>
                  <Typography
                    type="p"
                    text={`${
                      new Date(row?.created_at)?.toLocaleDateString(undefined, {
                        weekday: "short",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }) || "N/A"
                    }`}
                    cssClass="p-14"
                  />
                </td>
                <td>
                  <Typography
                    type="p"
                    text={row?.plan || "N/A"}
                    cssClass="p-14"
                  />
                </td>
                <td
                  onClick={() =>
                    history.push({
                      pathname: `${path}/user-details/${row?.id}`,
                      state: { row },
                    })
                  }
                >
                  <Button
                    cssClass="btn btn-4-table radius-5px table__cta"
                    text="View User"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {!isError && !error && (
        <aside className="um-wrapper">
          <div className="umb-wrapper">
            <ReactPaginate
              containerClassName="pagination"
              activeClassName="paginate-active"
              disabledClassName="paginate-disabled"
              previousClassName="paginate-previous"
              nextClassName="paginate-next"
              breakLabel="..."
              previousLabel="Prev"
              nextLabel="Next"
              breakClassName={"break-me"}
              pageCount={pages}
              marginPagesDisplayed={5}
              pageRangeDisplayed={1}
              onPageChange={handlePageChange}
            />
            {/* <Button
              handleClick={handlePrevious}
              cssClass="btn btn--info btn--xxsmall btn-icon-n-text radius-6px m-r-20px"
              btnIcon="icon-upload"
              text="Previous"
            />
            <Button
              handleClick={() => handleNext(data)}
              cssClass="btn btn--primary btn--xxsmall btn-icon-n-text radius-6px"
              btnIcon="icon-upload"
              text="Next"
            /> */}
          </div>

          <div className="page-size-select">
            <aside className="um-page-size">
              <h5>Page size:</h5>
            </aside>
            <aside className="um-select-box">
              <select onChange={(e: any) => setPageSize(e.target.value)}>
                {sizes.map((size) => (
                  <option value={size}>{size}</option>
                ))}
              </select>
            </aside>
          </div>
        </aside>
      )}
    </>
  );
};

export default UserManagementTable;
