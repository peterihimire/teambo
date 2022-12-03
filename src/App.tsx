import React, { lazy, Suspense, useEffect } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Preloader from "./components/common/preloader/Preloader";
import NotFound from "./components/pages/NotFound/NotFound";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute";
import {
  lightTheme,
  MeetingProvider,
} from "amazon-chime-sdk-component-library-react";
import { ThemeProvider } from "styled-components";

import "./App.scss";
// import { useStore } from "./store";
import { userStore } from "./store/userStore";
import { companyReportStore } from "./store/companyReportStore";
import JoinThroughInvite from "./components/pages/dashboard/Conference/JoinThroughInvite";
import StartThroughInvite from "./components/pages/dashboard/Conference/StartThroughInvite";
import Home from "./components/pages/StaticPages/Index";

// const Home = lazy(() => import("./components/pages/StaticPages/Index"));
const Pricing = lazy(() => import("./components/pages/StaticPages/Pricing"));
const PricingPayment = lazy(
  () => import("./components/pages/StaticPages/PricingPayment"),
);
const Contact = lazy(() => import("./components/pages/StaticPages/Contact"));
const Faq = lazy(() => import("./components/pages/StaticPages/Faq"));
const ComingSoon = lazy(
  () => import("./components/pages/StaticPages/ComingSoon"),
);
const TermsCondition = lazy(
  () => import("./components/pages/StaticPages/TermsCondition"),
);

// const AdminSignIn = lazy(() => import("./components/pages/Admin/AdminSignIn"));
const Auth = lazy(() => import("./components/pages/Auth/NewAuth"));
const Dashboard = lazy(() => import("./components/pages/dashboard/Dashboard"));
const Admin = lazy(() => import("./components/pages/Admin/AdminIndex"));
const Sample = lazy(() => import("./components/pages/sample"));

interface Props {}
const App: React.FC<Props> = () => {
  // const url = './scripts/socket.io.js'
  // useScript(url)
  const getUser = userStore((store) => store.getUser);

  useEffect(() => {
    getUser();
  }, [getUser]);
  const getCompanyReport = companyReportStore((store) => store.getCompanyReport);

  useEffect(() => {
    getCompanyReport();
  }, [getCompanyReport]);

  return (
    <Suspense fallback={<Preloader />}>
      <ThemeProvider theme={lightTheme}>
        <MeetingProvider>
          <BrowserRouter>
            <Switch>
              {/* <Route path="/return-to-meeting" component={ReturnToMeeting} /> */}
              <Route path="/pre" component={Preloader} />
              <Route path="/sample" component={Sample} />
              <Route path="/home" component={Home} />
              <Route path="/pricing" component={Pricing} />
              <Route path="/faq" component={Faq} />
              <Route path="/pricing-payment" component={PricingPayment} />
              <Route path="/contact" component={Contact} />
              <Route path="/coming-soon" component={ComingSoon} />
              <Route path="/terms-and-conditions" component={TermsCondition} />
              <ProtectedRoute path="/user" component={Dashboard} />
              <ProtectedRoute
                path="/call/invite/:callId"
                component={JoinThroughInvite}
              />
              <ProtectedRoute
                path="/call/start/:callId"
                component={StartThroughInvite}
              />
              <Route path="/auth">
                <Auth />
              </Route>
              {/* <Route path="/admin/auth" component={AdminSignIn} /> */}
              <Route path="/admin" component={Admin} />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" to="/home" exact />
              <Redirect to="/not-found" />
            </Switch>
          </BrowserRouter>
        </MeetingProvider>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
