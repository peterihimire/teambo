import React from "react";

import OnboardingContentLayout from "../../common/Onboarding/OnboardingContentLayout";
import OnboardingTopNav from "../../common/Onboarding/OnboardingTopNav";
import Typography from "../../common/Typography/Typography";
import RecoverForm from "../../common/Forms/RecoverForm";

const Recover: React.FC = () => {
  return (
    <>
      <OnboardingTopNav />
      <OnboardingContentLayout>
        <Typography
          type="h2"
          cssClass="head-2 head-2--sm"
          text="Lost your password?"
        />
        <Typography
          type="h2"
          cssClass="head-2 head-2--sm m-b-20px"
          text="Enter your details to recover."
        />
        <Typography
          type="p"
          cssClass="p-1 m-b-60px"
          text="Enter your details to proceed further"
        />
        <RecoverForm />
      </OnboardingContentLayout>
    </>
  );
};

export default Recover;
