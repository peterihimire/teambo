import React from "react";
import Typography from "./../../../../common/Typography/Typography";

interface Props {
  data: any;
  key: number;
  isLoading: boolean;
  isError: boolean;
  error: any;
}

const UserPersonalInfo: React.FC<Props> = ({
  data,
  key,
  isLoading,
  isError,
  error,
}) => {
  return (
    <>
      {isLoading ? (
        <div style={{ marginTop: "1em" }}>
          <small>Fetching user's personal information...</small>
        </div>
      ) : isError || error ? (
        <div style={{ marginTop: "1em", color: "red" }}>
          <small>Something went wrong</small>
        </div>
      ) : (
        <>
          <section className="user-details__data">
            <div>
              <Typography
                type="p"
                text={`${data?.lastname} ${data?.firstname}`}
                cssClass="p-15 m-b-5px"
              />
              <Typography
                type="p"
                text={`${data?.lastname} ${data?.firstname}`}
                cssClass="p-16"
              />
            </div>
            <div>
              <Typography
                type="p"
                text="Date of birth"
                cssClass="p-15 m-b-5px"
              />
              <Typography
                type="p"
                text={data?.date_of_birth || "N/A"}
                cssClass="p-16"
              />
            </div>
            <div>
              <Typography type="p" text="Email" cssClass="p-15 m-b-5px" />
              <Typography type="p" text={`${data?.email}`} cssClass="p-16" />
            </div>
            <div>
              <Typography
                type="p"
                text={`Profession`}
                cssClass="p-15 m-b-5px"
              />
              <Typography
                type="p"
                text={`${data?.role || "N/A"}`}
                cssClass="p-16"
              />
            </div>
            <div>
              <Typography
                type="p"
                text="Phone number"
                cssClass="p-15 m-b-5px"
              />
              <Typography
                type="p"
                text={data?.phonenumber || "N/A"}
                cssClass="p-16"
              />
            </div>
            <div>
              <Typography type="p" text="Location" cssClass="p-15 m-b-5px" />
              <Typography
                type="p"
                text={data?.location || "N/A"}
                cssClass="p-16"
              />
            </div>
          </section>

          <section className="user-details__about">
            <div>
              <Typography type="p" text="About me" cssClass="p-15 m-b-5px" />
              <Typography type="p" text="" cssClass="p-16">
                {data?.about || "N/A"}
              </Typography>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default UserPersonalInfo;
