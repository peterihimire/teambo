import React from "react";

import OnboardingContentLayout from "../../common/Onboarding/OnboardingContentLayout";
import Typography from "../../common/Typography/Typography";
import Image from "./../../common/Image/Image";
import AdminSignInForm from "../../common/Forms/AdminSignInForm";

type Props = {
  location: object;
  history: object;
};
const AdminSignIn: React.FC<Props> = ({ history }) => {
  return (
    <>
      <div style={{ width: "100%" }}>
        <OnboardingContentLayout>
          <Image source="iconLogo" cssClass="onboarding__icon" />
          <Typography
            type="h2"
            cssClass="head-1 m-t-10px"
            text="Login to your dashboard"
          />
          <Typography
            type="p"
            cssClass="p-1 m-b-60px"
            text="Enter your details to proceed further"
          />

          <AdminSignInForm />
        </OnboardingContentLayout>
      </div>
    </>
  );
};

export default AdminSignIn;
