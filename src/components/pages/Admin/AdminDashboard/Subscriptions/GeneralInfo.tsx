import React, { useState, useEffect } from "react";
import Typography from "../../../../common/Typography/Typography";
import subscription from "../../../../../services/subscription";
import { useParams } from "react-router-dom";

interface Props {}
const GeneralInfo: React.FC<Props> = () => {
  const [details, setDetails] = useState<any>({});
  const [features, setfeatures] = useState<any>([]);
  const { id } = useParams<{ id: any }>();
  useEffect(() => {
    (async () => {
      await subscription
        .plansdetail(id)
        .then(({ data }) => {
          console.log("ant" + JSON.stringify(data.data));
          setDetails(data.data);
          setfeatures(data.data.features);
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
    <div>
      <div className="admin-settings__general-info" style={{ width: "100%" }}>
        <div>
          <Typography type="p" text="Plan length" cssClass="p-14 m-b-5px" />
          <Typography type="p" text="30 days" cssClass="p-16" />
        </div>
        <div>
          <Typography type="p" text="Price" cssClass="p-14 m-b-5px" />
          <Typography type="p" text={`$` + details.price} cssClass="p-16" />
        </div>
      </div>
      <div className="admin-setting__general-info" style={{ width: "100%" }}>
        <div style={{ width: "100%" }}>
          <Typography type="p" text="Description" cssClass="p-14 m-b-5px" />
          <Typography type="p" text={details.description} cssClass="p-15" />
        </div>
      </div>
      <br></br>
      <hr
        style={{
          background: "#E7EBFD",
          color: "#E7EBFD",
          height: "1px",
          marginBottom: "1em",
        }}
      />
      <br></br>
      <div className="admin-settings__general-info">
        <div className="checker">
          {features.map((datas: any) => (
            <label className="container">
              <Typography type="p" text={datas} cssClass="p-14" />

              <input type="checkbox" checked />
              <span className="checkmark"></span>
            </label>
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default GeneralInfo;
