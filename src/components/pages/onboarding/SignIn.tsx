import React from "react";

import OnboardingContentLayout from "../../common/Onboarding/OnboardingContentLayout";
import OnboardingFooter from "./../../common/Onboarding/OnboardingFooter";
import OnboardingTopNav from "../../common/Onboarding/OnboardingTopNav";
import Typography from "../../common/Typography/Typography";
import SignInForm from "../../common/Forms/SignInForm";
import Image from "./../../common/Image/Image";

type SignInProps = {};
const SignIn: React.FC<SignInProps> = () => {
  return (
    <>
      <OnboardingTopNav buttonType="signup" />
      <OnboardingContentLayout>
        <Image source="iconLogo" cssClass="onboarding__icon" />
        <Typography
          type="h2"
          cssClass="head-1 m-t-10px"
          text="Welcome to Timbo"
        />
        <Typography
          type="p"
          cssClass="p-1 m-b-60px"
          text="Enter your details to proceed further"
        />

        <SignInForm />
        <OnboardingFooter />
      </OnboardingContentLayout>
    </>
  );
};

export default SignIn;
