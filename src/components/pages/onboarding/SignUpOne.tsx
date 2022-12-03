import React from "react";
import Image from "../../common/Image/Image";
import OnboardingContentLayout from "../../common/Onboarding/OnboardingContentLayout";
import OnboardingFooter from "../../common/Onboarding/OnboardingFooter";
import OnboardingTopNav from "../../common/Onboarding/OnboardingTopNav";
import SignupOneForm from "../../common/Forms/SignupOneForm";
import Typography from "../../common/Typography/Typography";

type SignInProps = {};
const SignUpOne: React.FC<SignInProps> = () => {
  return (
    <>
      <OnboardingTopNav />
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
        <SignupOneForm />

        <OnboardingFooter />
      </OnboardingContentLayout>
    </>
  );
};

export default SignUpOne;
