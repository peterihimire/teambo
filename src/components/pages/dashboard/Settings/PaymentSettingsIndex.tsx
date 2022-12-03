import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import paymentService from "../../../../services/paymentService";
import { Button, Typography } from "../../../common";
import { CreditCard } from "../../../common/CreditCard";
import isEmpty from "is-empty";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";

interface Props {}

const PaymentPage: React.FC<Props> = () => {
  const { url } = useRouteMatch();

  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState<any>(null);

  useEffect(() => {
    setLoading(true);

    paymentService
      .getUserCard()
      .then((response: any) => {
        setCard(response.data.data);
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        if (err.response) {
          if (err.response.data.message) {
            toast.error(err.response.data.message);
          } else {
            toast.error("An error occurred");
          }
        } else {
          toast.error("An error occurred error");
        }
      });
  }, []);

  return (
    <>
      <DashboardLayoutOneRight>
        <ToastContainer />
        <section className="flex-r-jcbetween-aicenter m-b-40px">
          <Typography type="h5" text="Payments" cssClass="head-9" />
          {!isEmpty(card) && (
            <Link to={`${url}/change`}>
              <Button
                cssClass="btn btn--primary btn--small radius-7px flex-r-jccenter-aicenter"
                text="Change card"
                type="button"
              />
            </Link>
          )}
        </section>
        <Typography type="h5" text="Cards" cssClass="head-20 m-b-20px" />

        {loading ? (
          "Loading..."
        ) : isEmpty(card) ? (
          "No cards available"
        ) : (
          <CreditCard {...card} />
        )}
      </DashboardLayoutOneRight>
    </>
  );
};

export default PaymentPage;
