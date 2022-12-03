import React from "react";
import { BrowserRouter, Switch, useRouteMatch } from "react-router-dom";

import DashboardSideNav from "./DashboardSideNav";
import dashboardRoutes from "../../../utils/constants/dashboardRoutes";
import ProtectedRoute from "../../common/ProtectedRoute/ProtectedRoute"

type Props = {};
const Dashboard: React.FC<Props> = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <main className="dashboard__body">
        <BrowserRouter>
          <DashboardSideNav />
          <Switch>
            {dashboardRoutes.map(({path:routePath, component, key}) => (

              <ProtectedRoute key={key} path={`${path}${routePath}`} component={component} />
            ))}
            
            {/* <Redirect from="/" to={`${url}/dashboard`} /> */}
          </Switch>
        </BrowserRouter>
      </main>
    </>
  );
};

export default Dashboard;
