import React from "react";
import {
  Route,
  BrowserRouter,
  Switch,
  useRouteMatch,
  useLocation,
  Redirect,
} from "react-router-dom";

// import AdminSignIn from "./AdminSignIn";
import AdminDashboardIndex from "./AdminDashboard/AdminDashboardIndex";
import Users from "./AdminDashboard/Users";
import UserDetails from "./AdminDashboard/Users/UserDetails";
import Roles from "./AdminDashboard/Roles";
import Settings from "./AdminDashboard/Settings";
import SupportTickets from "./AdminDashboard/SupportTickets";
import SupportTicketsView from "./AdminDashboard/SupportTicketsView";
import Subscriptions from "./AdminDashboard/Subscriptions";
import SubscriptionView from "./AdminDashboard/SubscriptionView";
import AdminSideNav from "./../../common/Admin/AdminSideNav";
import AdminSignIn from "./AdminSignIn";
import AdminProtectedRoute from "./../../common/ProtectedRoute/AdminProtectedRoute";

interface Props {}
const AdminIndex: React.FC<Props> = () => {
  const { path } = useRouteMatch();
  const location = useLocation();
  return (
    <main className="admin-layout">
      <BrowserRouter>
        {location.pathname === "/admin/auth" ? null : <AdminSideNav />}

        <Switch>
          <AdminProtectedRoute path={`${path}/user-details/:id`} component={UserDetails} />
          <AdminProtectedRoute path={`${path}/settings`} component={Settings} />
          <AdminProtectedRoute path={`${path}/subscriptions`} component={Subscriptions} />
          <AdminProtectedRoute
            path={`${path}/subscription/:id`}
            component={SubscriptionView}
          />
          <AdminProtectedRoute path={`${path}/supports`} component={SupportTickets} />
          <AdminProtectedRoute path={`${path}/roles`} component={Roles} exact />
          {/* <AdminProtectedRoute path={`${path}/support/:id`} component={SupportTicketsView} /> */}
          <AdminProtectedRoute path={`${path}/users`} component={Users} />
          <AdminProtectedRoute path={`${path}/dashboard`} component={AdminDashboardIndex} />
          <AdminProtectedRoute path={`${path}/`} component={AdminDashboardIndex} exact />
          <AdminProtectedRoute path={`${path}/support/:id/:uid`} component={SupportTicketsView}/>
          <AdminProtectedRoute path={`${path}/support/view`} component={SupportTicketsView} />

          <Route path={`${path}/auth`} component={AdminSignIn} />

          <Redirect from={`${path}/admin`} to={`${path}/auth`} exact />

          {/* <Redirect from={`${path}/`} to={`${path}/auth/admin`} /> */}
        </Switch>
      </BrowserRouter>
    </main>
  );
};

export default AdminIndex;
