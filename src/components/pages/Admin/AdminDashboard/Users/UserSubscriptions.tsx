import React from "react";
import Typography from "./../../../../common/Typography/Typography";

import { useLocation, useHistory } from "react-router-dom";
import { useGetUserManagement } from "../../../../../services/userManagementService";

interface Props {}
const UserSubscriptions: React.FC<Props> = () => {
  const { state }: any = useLocation();
  const history = useHistory();

  React.useEffect((): any => {
    if (!state) {
      history.push("/admin/users");
    }
  }, [history, state]);

  const { data, isLoading, isError, error } = useGetUserManagement(
    `/dashboard/users/${state?.row?.uid}/subscriptions`
  );

  return (
    <>
      {isLoading ? (
        <div style={{ marginTop: "1em" }}>
          <small>Fetching user's subscription...</small>
        </div>
      ) : error || isError ? (
        <div style={{ marginTop: "1em", color: "red" }}>
          <small>Something went wrong</small>
        </div>
      ) : (
        <>
          <section className="user-details__data-2">
            <Typography
              type="h5"
              text="Payment details"
              cssClass="head-9 m-b-20px"
            />

            <div className="billing-details__container">
              <div className="billing-details__row">
                <Typography
                  type="h6"
                  text="Payment title"
                  cssClass="p-2 billing-details"
                />
                <div className="flex-r-aicenter">
                  <Typography
                    type="h6"
                    text={data?.data?.subscriptionDetails?.title || "N/A"}
                    cssClass="p-2"
                  />
                  {/* <Typography type="p" text="Update" cssClass="p-8 m-l-15px" /> */}
                </div>
              </div>
              <div className="billing-details__row">
                <Typography
                  type="h6"
                  text="Billing period"
                  cssClass="p-2 billing-details"
                />
                <div className="flex-r-aicenter">
                  <Typography
                    type="h6"
                    text={data?.data?.subscriptionDetails?.interval || "N/A"}
                    cssClass="p-2"
                  />
                  {/* <Typography type="p" text="Update" cssClass="p-8 m-l-15px" /> */}
                </div>
              </div>
              <div className="billing-details__row">
                <Typography
                  type="h6"
                  text="License keys"
                  cssClass="p-2 billing-details"
                />
                <div className="flex-r-aicenter">
                  <Typography
                    type="p"
                    text={data?.data?.subscriptionDetails?.license || "N/A"}
                    cssClass="p-8 m-l-15px"
                  />
                </div>
              </div>
            </div>
            {/* <div className="billing-details__container">
              <div className="billing-details__row">
                <Typography
                  type="h6"
                  text="Payment method"
                  cssClass="p-2 billing-details"
                />
                <div className="flex-r-aicenter">
                  <Typography
                    type="h6"
                    text="MasterCard ending in 4078, exp: 08/2020"
                    cssClass="p-2"
                  />
                  <Typography type="p" text="Update" cssClass="p-8 m-l-15px" />
                </div>
              </div>
              <div className="billing-details__row">
                <Typography
                  type="h6"
                  text="Billing period"
                  cssClass="p-2 billing-details"
                />
                <div className="flex-r-aicenter">
                  <Typography
                    type="h6"
                    text="Plan billed monthly"
                    cssClass="p-2"
                  />
                  <Typography type="p" text="Update" cssClass="p-8 m-l-15px" />
                </div>
              </div>
              <div className="billing-details__row">
                <Typography
                  type="h6"
                  text="License keys"
                  cssClass="p-2 billing-details"
                />
                <div className="flex-r-aicenter">
                  <Typography
                    type="p"
                    text="Redeem a license key"
                    cssClass="p-8 m-l-15px"
                  />
                </div>
              </div>
            </div> */}
          </section>

          <section className="user-details__about">
            <Typography
              type="h5"
              text="Recent payments"
              cssClass="head-9 m-b-20px"
            />

            {data?.data?.recentPayments?.length <= 0
              ? "Check back, no available recent payments for this user."
              : data?.data?.recentPayments?.map((payment: any) => {
                  return (
                    <>
                      <div className="billing-details__container">
                        <div className="billing-details__row">
                          <div className="flex-r-aicenter">
                            <Typography
                              type="h6"
                              text={payment?.created_at || "N/A"}
                              cssClass="p-2 billing-details"
                            />
                            <Typography
                              type="h6"
                              text={payment?.paymentPlatform || "N/A"}
                              cssClass="p-9 m-l-30px"
                            />
                          </div>
                          <div className="flex-r-aicenter">
                            <Typography
                              type="h6"
                              text={payment?.plan?.price}
                              cssClass="p-6"
                            />
                            <Typography
                              type="p"
                              text="Invoice"
                              cssClass="p-8 m-l-15px"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
          </section>
        </>
      )}
    </>
  );
};

export default UserSubscriptions;
