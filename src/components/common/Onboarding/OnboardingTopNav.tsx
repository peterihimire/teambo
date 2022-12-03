import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import Button from "../Button/Button";
import Logo from "../Logo/Logo";

type Props = {
  buttonType?: string;
};

const OnboardingTopNav: React.FC<Props> = ({ buttonType }) => {
  const match = useRouteMatch("/auth");
  const path = match?.path;

  return (
    <nav className="row onboarding-top-nav">
      <div className="onboarding__nav-center">
        <nav className="onboarding-top-nav__content">
          <Link to="/">
            <Logo type="black" />
          </Link>

          {buttonType === "signup" ? (
            <Link to={`${path}/signup/1`}>
              <Button text="Sign up" cssClass="btn--grey btn--small" />
            </Link>
          ) : (
            <Link to={`${path}/signin`}>
              <Button text="Sign In" cssClass="btn--grey btn--small" />
            </Link>
          )}
        </nav>
      </div>
    </nav>
  );
};

export default OnboardingTopNav;
