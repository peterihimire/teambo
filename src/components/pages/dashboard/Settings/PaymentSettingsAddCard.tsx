import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Button from "../../../common/Button/Button";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
import FormAddCard from "../../../common/Forms/FormAddCard";
import Typography from "../../../common/Typography/Typography";

interface Props {}

const PaymentSettingsAddCard: React.FC<Props> = () => {
  return (
    <DashboardLayoutOneRight>
      <ToastContainer />

      <section className="flex-r-aicenter m-b-40px">
        <Link to="/user/profile-settings/payments" className="m-r-20px">
          <Button
            cssClass="btn btn-icon"
            icon="icon-arrow-left"
            iconClass="icon-arrow-right"
          />
        </Link>
        <Typography type="h5" text="Change Card" cssClass="head-9" />
      </section>

      <FormAddCard />
    </DashboardLayoutOneRight>
  );
};

export default PaymentSettingsAddCard;
