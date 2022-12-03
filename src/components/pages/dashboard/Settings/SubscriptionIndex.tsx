import React from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
import Typography from "../../../common/Typography/Typography";
import SubscriptionHistory from "./SubscriptionHistory";
import SubscriptionPlans from "./SubscriptionPlans";

interface Props {}

const SubscriptionPage: React.FC<Props> = () => {
  const { path, url } = useRouteMatch();

  return (
    <DashboardLayoutOneRight>
      <BrowserRouter>
        <Typography type="h5" text="Subscriptions" cssClass="head-9 m-b-40px" />

        <section className="flex-r">
          <SubTabLink url={`${url}`} text="Plans" className="m-r-100px" />
          <SubTabLink url={`${url}/history`} text="History" />
        </section>

        <section className="m-t-40px">
          <Switch>
            <Route path={`${path}/history`} component={SubscriptionHistory} />
            <Route path={`${path}`} component={SubscriptionPlans} />
          </Switch>
        </section>
      </BrowserRouter>
    </DashboardLayoutOneRight>
  );
};

interface SubTab {
  url: string;
  text: string;
  className?: string;
}
const SubTabLink: React.FC<SubTab> = ({ url, text, className }) => {
  const location = useLocation();
  return (
    <Link
      to={`${url}`}
      className={`plan-tab-link ${className} ${
        location.pathname === url ? "active" : ""
      }`}
    >
      <Typography type="h5" text={text} cssClass="head-9 plan-tab-link" />
    </Link>
  );
};

export default SubscriptionPage;
