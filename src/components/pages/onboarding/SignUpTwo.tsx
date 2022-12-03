import React from "react";

import OnboardingContentLayout from "../../common/Onboarding/OnboardingContentLayout";
import OnboardingFooter from "./../../common/Onboarding/OnboardingFooter";
import OnboardingTopNav from "../../common/Onboarding/OnboardingTopNav";
import SignupTwoForm from "../../common/Forms/SignupTwoForm";
import Typography from "../../common/Typography/Typography";

type SignUpProps = {};
const SignUpTwo: React.FC<SignUpProps> = () => {
  return (
    <>
      <OnboardingTopNav />
      <OnboardingContentLayout>
        <Typography
          type="h2"
          cssClass="head-1 m-t-10px"
          text="Tell us more about yourself"
        />
        <Typography
          type="p"
          cssClass="p-1 m-b-60px"
          text="Enter your details to proceed further"
        />
        <SignupTwoForm />

        <OnboardingFooter />
      </OnboardingContentLayout>
    </>
  );
};

export default SignUpTwo;
