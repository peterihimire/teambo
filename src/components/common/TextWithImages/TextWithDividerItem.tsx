import React, { useState, useEffect } from "react";
import Svg from "./../Svg/Svg";
import Typography from "./../Typography/Typography";

import subscription from "../../../services/subscription";
import { useParams, Link } from "react-router-dom";

interface Props {
  iconName?: any;
  data?: any;
  divider?: any;
  typer?: any;
}
const TextWithDividerItem: React.FC<Props> = ({
  iconName,
  data,
  divider,
  typer,
}) => {
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
      //
    };
  });
  return (
    <div className={`text-with-image ${divider ? divider : null}`}>
      <div className="sub-leveller">
        <div
          className=""
          style={{ maxWidth: "40px", maxHeight: "20px", cursor: "pointer" }}
        >
          {typer === "icon" ? (
            <Link to="/admin/subscriptions">
              <Svg
                iconId={iconName}
                cssClass={`${iconName} text-with-divider__icon`}
              />
            </Link>
          ) : (
            <img alt="divider" src={details.image} className="divider-image" />
          )}
        </div>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <div className="">
          <Typography
            type="h3"
            text={details.title}
            cssClass="head-22 m-b-15px"
          />
          <Typography type="span" text={data} cssClass="p-10" />
        </div>
      </div>
    </div>
  );
};

export default TextWithDividerItem;
