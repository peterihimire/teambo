import { useEffect, useState } from "react";
import userService from "../../../../services/userService";
import { formatDate } from "../../../../utils/helpers/formatDate";
import Typography from "../../../common/Typography/Typography";

interface Props {}

const SubscriptionHistory: React.FC<Props> = () => {
  const [paymentsInfo, setPaymentsInfo] = useState([]);
  const billing = () => {
    userService.billingInfo().then((response) => {
      const info = response.data.data;
      setPaymentsInfo(info.payments);
    });
  };
  useEffect(() => {
    billing();
  }, []);

  const f_date = (x: string) => {
    const { dateNum, month, year } = formatDate(x);
    return `${month} ${dateNum}, ${year}`;
  };

  return (
    <div className="billing-details__container">
      {paymentsInfo &&
        paymentsInfo.map(
          (paymentInfo: { plan: any; created_at: string }, index: any) => (
            <div className="billing-details__row" key={index}>
              <div className="flex-r-aicenter">
                <Typography
                  type="h6"
                  text={f_date(paymentInfo.created_at)}
                  cssClass="p-2 billing-details"
                />
                <Typography
                  type="h6"
                  text={`${paymentInfo.plan.name} (${paymentInfo.plan.interval})`}
                  cssClass="p-9 m-l-30px"
                />
              </div>
              <div className="flex-r-aicenter">
                <Typography
                  type="h6"
                  text={`$${paymentInfo.plan.price}`}
                  cssClass="p-6"
                />
              </div>
            </div>
          )
        )}
    </div>
  );
};

export default SubscriptionHistory;
