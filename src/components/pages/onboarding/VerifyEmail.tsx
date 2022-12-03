import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import OnboardingContentLayout from "../../common/Onboarding/OnboardingContentLayout";
import OnboardingTopNav from "../../common/Onboarding/OnboardingTopNav";
import authService from "../../../services/authService";
import EmailVerified from "./VerifyEmail/EmailVerified";
import EmailNotVerified from "./VerifyEmail/EmailNotVerified";
import LoadingVerifications from "./VerifyEmail/LoadingVerification";

interface ParamsTypes {
  token: any;
}

const VerifyEmail: React.FC = () => {
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [verificationLoading, setVerificationLoading] =
    useState<boolean>(false);
  const { token } = useParams<ParamsTypes>();

  const verifyUserEmail = useCallback(() => {
    (async () => {
      setVerificationLoading(true);
      try {
        await authService.verifyEmail(token);
        setVerificationLoading(false);
        setEmailVerified(true);
      } catch (error: any) {
        // console.log(error.response.data);
        if (error.response) {
          setVerificationLoading(false);
          setEmailVerified(false);
        }
      }
    })();
  }, [token]);

  useEffect(() => {
    verifyUserEmail();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <>
      <OnboardingTopNav />
      <OnboardingContentLayout>
        {verificationLoading ? (
          <LoadingVerifications />
        ) : emailVerified ? (
          <EmailVerified />
        ) : (
          <EmailNotVerified />
        )}
      </OnboardingContentLayout>
    </>
  );
};

export default VerifyEmail;
