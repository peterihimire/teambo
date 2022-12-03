import React, { useState, useEffect } from "react";
import Typography from "../../../../common/Typography/Typography";
import subscription from "../../../../../services/subscription";
import { useParams } from "react-router-dom";
interface Props {}
const GeneralInfo: React.FC<Props> = () => {
  const [details, setDetails] = useState<any>({});
  const { id } = useParams<{ id: any }>();

  useEffect(() => {
    (async () => {
      await subscription
        .udetail(id)
        .then(({ data }) => {
          //console.log("ant" + JSON.stringify(data.data));
          setDetails(data);
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
  return (
    <div>
      <div className="admin-settings__general-info" style={{ width: "100%" }}>
        <div>
          <Typography type="p" text="Name" cssClass="p-14 m-b-5px" />
          <Typography
            type="p"
            text={details.firstname + " " + details.lastname}
            cssClass="p-16"
          />
        </div>
        <div>
          <Typography type="p" text="Date of Birth" cssClass="p-14 m-b-5px" />
          <Typography type="p" text="14th April, 1996" cssClass="p-16" />
        </div>
      </div>
      <div className="admin-settings__general-info">
        <div>
          <Typography type="p" text="Email" cssClass="p-14 m-b-5px" />
          <Typography type="p" text={details.email} cssClass="p-16" />
        </div>
        <div>
          <Typography type="p" text="Username" cssClass="p-14 m-b-5px" />
          <Typography type="p" text={details.username} cssClass="p-16" />
        </div>
      </div>
      <div className="admin-settings__general-info">
        <div>
          <Typography type="p" text="Phone Number" cssClass="p-14 m-b-5px" />
          <Typography type="p" text={details.phonenumber} cssClass="p-16" />
        </div>
        <div>
          <Typography type="p" text="Location" cssClass="p-14 m-b-5px" />
          <Typography type="p" text={details.country} cssClass="p-16" />
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;
