import React from "react";
import { Route, BrowserRouter, Switch, useRouteMatch } from "react-router-dom";

import SignIn from "./../onboarding/SignIn";
import Recover from "./../onboarding/Recover";
import VerifyEmail from "./../onboarding/VerifyEmail";
import SignUpOne from "./../onboarding/SignUpOne";
import ResetPassord from "./../onboarding/ResestPassword";
import SignUpTwo from "./../onboarding/SignUpTwo";
import SignUpThree from "./../onboarding/SignUpThree";
import AdminSignIn from "./../Admin/AdminSignIn";

interface Props {}
const Auth: React.FC<Props> = () => {
  const { path } = useRouteMatch();

  return (
    <BrowserRouter>
      <Switch>
        <Route path={`${path}/verify-email/:token`} component={VerifyEmail} />
        <Route
          path={`${path}/reset-password/:token`}
          component={ResetPassord}
        />
        <Route path={`${path}/recover`} component={Recover} />
        <Route path={`${path}/admin`} component={AdminSignIn} />
        <Route path={`${path}/signup/1`} component={SignUpOne} />
        <Route path={`${path}/signup/2`} component={SignUpTwo} />
        <Route path={`${path}/signup/3`} component={SignUpThree} />
        <Route path={`${path}/signin`} component={SignIn} />
        <Route path={`${path}/`} component={SignIn} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Auth;
