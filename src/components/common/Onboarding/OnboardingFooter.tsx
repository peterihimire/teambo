import React from "react";

import ButtonSocial from "../Button/ButtonSocial";
import Divider from "../Divider/Divider";

type Props = {};
const OnboardingFooter: React.FC<Props> = () => {
  return (
    <>
      <Divider text="Or" cssClass="m-y-50px m-y-50px--mobile" />
      <ButtonSocial
        cssClass="btn-social btn--full"
        text="Sign In with Google"
        iconClass="fa-google"
      />
      <ButtonSocial
        cssClass="btn-social btn--full"
        text="Sign In with Facebook"
        iconClass="fa-facebook-f"
      />
      <ButtonSocial
        cssClass="btn-social btn--full"
        text="Sign In with Twitter"
        iconClass="fa-twitter"
      />
    </>
  );
};

export default OnboardingFooter;
