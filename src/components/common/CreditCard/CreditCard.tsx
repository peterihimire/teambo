import React from "react";
import { Image, Typography } from "..";

interface Props {
  account_name?: string;
  last4?: string;
  exp_month?: string;
  exp_year?: string;
  card_type?: string;
}

const CreditCard: React.FC<Props> = ({
  account_name,
  last4,
  exp_month,
  exp_year,
  card_type,
}) => {
  const ct = card_type?.replace(" ", "");

  return (
    <div className="credit-card__wrapper">
      <section className="flex-r-jcbetween">
        <section>
          <Typography
            type="h5"
            text={`**** **** **** ${last4}`}
            cssClass="head-9 m-b-10px"
          />

          <Typography
            type="h5"
            text={account_name}
            cssClass="head-20 m-b-10px"
          />

          <Typography
            type="h5"
            text={`Expiry: ${exp_month}/${exp_year}`}
            cssClass="head-20 m-b-20px"
          />

          {ct === "visa" ? (
            <Image source={`visa`} cssClass="icon-cc" />
          ) : ct === "verve" ? (
            <Image source={`verve`} cssClass="icon-cc" />
          ) : ct === "mastercard" ? (
            <Image source={`mastercard`} cssClass="icon-cc" />
          ) : (
            <Image source={`cc`} cssClass="icon-cc" />
          )}
        </section>
      </section>
    </div>
  );
};

export default CreditCard;
