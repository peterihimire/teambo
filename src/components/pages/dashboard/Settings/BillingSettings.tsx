import React, { useEffect, useState } from "react";
import Typography from "../../../common/Typography/Typography";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
// import Button from "./../../../common/Button/Button";
import userService from "../../../../services/userService";

interface Props {
  history?: any;
}
const BillingSettings: React.FC<Props> = ({ history }) => {
  const [billingInfo, setBillingInfo] = useState({
    account_name: '',
    card_type: '',
    payment_type: '',
    last4: '',
    exp_month: '',
    exp_year: '',
    channel: '',
    bank: '',
  })
  const [paymentsInfo, setPaymentsInfo] = useState([])
  const billing = () => {
    userService.billingInfo().then(response => {
      const info = response.data.data;
      setBillingInfo(info.billing)
      setPaymentsInfo(info.payments)
    });
  };
  useEffect(() => {
    (async () => {
      await billing();
    })();
  },[]);
  return (
    <DashboardLayoutOneRight>
      <Typography type="h5" text="Payment details" cssClass="head-9 m-b-20px" />
      <div className="billing-details__container">
        <div className="billing-details__row">
          <Typography
            type="h6"
            text="Payment method"
            cssClass="p-2 billing-details"
          />
          <div className="flex-r-aicenter">
            {billingInfo &&
              <Typography
                type="h6"
                text={`${billingInfo.card_type} ${billingInfo.payment_type} ending in ${billingInfo.last4}, exp: ${billingInfo.exp_month}/${billingInfo.exp_year}`}
                cssClass="p-2"
              />
            }
          </div>
        </div>
        <div className="billing-details__row">
          <Typography
            type="h6"
            text="Billing period"
            cssClass="p-2 billing-details"
          />
          <div className="flex-r-aicenter">
            <Typography type="h6" text="" cssClass="p-2" />
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
      </div>

      <Typography
        type="h5"
        text="Recent payments"
        cssClass="head-9 m-b-20px m-t-50px"
      />
      <div className="billing-details__container">
      {paymentsInfo && paymentsInfo.map((paymentInfo: { plan: any;created_at: string; }, index:any) => (
        <div className="billing-details__row" key={index}>
          <div className="flex-r-aicenter">
            <Typography
              type="h6"
              text={paymentInfo.created_at}
              cssClass="p-2 billing-details"
            />
            <Typography
              type="h6"
              text={`${paymentInfo.plan.title} (${paymentInfo.plan.interval})`}
              cssClass="p-9 m-l-30px"
            />
          </div>
          <div className="flex-r-aicenter">
            <Typography type="h6" text={`$${paymentInfo.plan.price}`} cssClass="p-6" />
            {/* <Typography type="p" text="Invoice" cssClass="p-8 m-l-15px" /> */}
          </div>
        </div>
      ))}

        {/* <div className="billing-details__row">
          <div className="flex-r-aicenter">
            <Typography
              type="h6"
              text="21 Oct 2018"
              cssClass="p-2 billing-details"
            />
            <Typography
              type="h6"
              text="CRM Pro (9/21/2018 to 10/21/2019)"
              cssClass="p-9 m-l-30px"
            />
          </div>
          <div className="flex-r-aicenter">
            <Typography type="h6" text="$34.00" cssClass="p-6" />
            <Typography type="p" text="Invoice" cssClass="p-8 m-l-15px" />
          </div>
        </div> */}
      </div>

      {/* <div className="flex-r-jcbetween m-t-120px">
        <div>
          <Button
            cssClass="btn--primary btn--small"
            text="Update Settings"
            type="submit"
          />
          <Button cssClass="btn--grey btn--small m-l-10px" text="Cancel" />
        </div>

        <Button
          cssClass="btn btn--small btn--all-grey btn-icon-n-text"
          withIcon={true}
          btnIcon="icon-trash-sm"
          iconClass="icon-trash-sm btn-icon-n-text__icon"
          text="Deactivate Account"
        />
      </div> */}
    </DashboardLayoutOneRight>
  );
};

export default BillingSettings;
