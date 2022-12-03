import { Button, Typography } from "..";
import Image from "./../../common/Image/Image";
// import paymentStore from "../../../store/paymentStore";

interface Props {
  uid: string;
  name: string;
  price: string;
  features: Array<string>;
  interval: string;
  onSelect: (e: string) => void;
}

const SubscriptionPlan: React.FC<Props> = ({
  uid,
  name,
  price,
  features,
  interval,
  onSelect,
}) => {
  // const { isLoadingUserSub, userSub } = paymentStore();

  // console.log(userSub);

  return (
    <div className="sub-plan-settings">
      <div className="flexible-item">
        <section>
          <div className="flexible-header">
            <Typography
              type="p"
              text={name}
              cssClass="p-16  m-b-10px keep-messages__sub-heading"
            />
            <div className="variety-plan-price">
              {Number(price) !== 0 && (
                <span>
                  <Typography
                    type="p"
                    text="$"
                    cssClass="p-16  m-b-0px keep-messages__sub-heading"
                  />
                </span>
              )}

              <Typography
                type="h3"
                text={
                  price === "0"
                    ? "Free"
                    : price === null
                    ? "Contact us"
                    : `${price}`
                }
                cssClass="head-29 text-center  m-b-0px"
              />
              {Number(price) !== 0 && (
                <span>
                  <Typography
                    type="p"
                    // text={`/${interval.replace("LY", "").toLowerCase()}`}
                    text={`/month`}
                    cssClass="p-16  m-b-0px "
                  />
                </span>
              )}
            </div>
          </div>
          <div className="flexible-text-div">
            {features.map((feature: string, idx) => (
              <div key={idx} className="flexible-text-content">
                <Image source="checkMarkCircle" cssClass="m" />
                <span>
                  <Typography
                    type="p"
                    text={feature}
                    cssClass="p-16  m-b-0px flexible-p"
                  />
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="m-t-40px">
          <Button
            cssClass="btn btn-primary btn--big row radius-10px "
            text="Upgrade"
            handleClick={() => onSelect(uid)}
          />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
