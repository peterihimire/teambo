import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import OnboardingContentLayout from "../../common/Onboarding/OnboardingContentLayout";
import OnboardingTopNav from "../../common/Onboarding/OnboardingTopNav";
import Typography from "../../common/Typography/Typography";
import Image from "./../../common/Image/Image";

import auth from "./../../../services/authService";
import onboardingStore from "./../../../store/onboardingStore";
import authService from "./../../../services/authService";

interface Props {}
const SignUpThree: React.FC<Props> = () => {
  const [currentUserEmail, setCurretUserEmail] = useState<any>();
  const [isSending, setIsSending] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const { newUserEmail } = onboardingStore();

  useEffect(() => {
    if (auth.getCurrentUser()) {
      const userData: any = auth.getCurrentUser();
      const email: any = userData.data.email;
      setCurretUserEmail(email);
    }
  }, []);

  const newUserEmailLocal = localStorage.getItem("newUserEmail");
  console.log(currentUserEmail);

  const resendEmail = async (e: any) => {
    e.preventDefault();
    setEmailSent(false);
    setIsSending(true);
    const em = newUserEmail || newUserEmailLocal;
    try {
      const res = await authService.resendVerificationEmail(em);
      console.log(res.data);
      setEmailSent(true);
      setIsSending(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <OnboardingTopNav />
      <OnboardingContentLayout>
        <Image
          source="pic1"
          maxWidth="25rem"
          maxHeight="23.1rem"
          cssClass="onboarding__icon-2 animate-zoomOut"
        />
        <Typography
          type="h2"
          cssClass="head-1 m-t-40px m-t-40px--sm m-b-15px"
          text="Thank you"
        />
        <Typography
          type="p"
          cssClass="p-1 m-b-5px"
          text={`We sent an email to ${newUserEmail || newUserEmailLocal}`}
        />
        <Typography
          type="p"
          cssClass="p-1 m-b-60px m-b-60px--sm"
          text="Click the confirmation link in the email to verify your account"
        />

        {emailSent && (
          <Typography
            type="p"
            cssClass="p-1 m-b-10px animate-slideFromTop"
            text={`Email sent successfully`}
          />
        )}

        <Link to="#" onClick={(e) => resendEmail(e)} className="link link--1">
          {isSending ? "Resending Email...." : "Resend Email"}
        </Link>
      </OnboardingContentLayout>
    </>
  );
};

export default SignUpThree;
