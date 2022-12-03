import React from "react";

import OnboardingContentLayout from "../../common/Onboarding/OnboardingContentLayout";
import OnboardingTopNav from "../../common/Onboarding/OnboardingTopNav";
import Typography from "../../common/Typography/Typography";
import ResetForm from './../../common/Forms/ResetForm';

const ResetPassord: React.FC = () => {
  return (
    <>
      <OnboardingTopNav />
      <OnboardingContentLayout>
        <Typography
          type="h2"
          cssClass="head-2 head-2--sm m-b-20px"
          text="Reset Password"
        />
        <Typography
          type="p"
          cssClass="p-1 m-b-60px"
          text="Please choose your new password"
        />
        <ResetForm />
      </OnboardingContentLayout>
    </>
  );
};

export default ResetPassord;
