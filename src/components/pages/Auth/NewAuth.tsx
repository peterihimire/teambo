import React from "react";
import { Route, BrowserRouter, Switch, useRouteMatch } from "react-router-dom";

import SignIn from "./../StaticPages/LogIn";
import SignUpIndividual from "./../StaticPages/SignUpIndividual";
import SignUpCompany from "./../StaticPages/SignUpCompany";
import Recover from "./../onboarding/Recover";
import VerifyEmail from "./../onboarding/VerifyEmail";
import ResetPassord from "./../onboarding/ResestPassword";
import SignUpThree from "./../onboarding/SignUpThree";

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
        <Route path={`${path}/signup-individual`} component={SignUpIndividual} />
        <Route path={`${path}/signup-company`} component={SignUpCompany} />
        <Route path={`${path}/signup/3`} component={SignUpThree} />
        <Route path={`${path}/signin`} component={SignIn} />
        <Route path={`${path}/`} component={SignIn} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Auth;
