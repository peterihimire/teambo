import React from "react";
import Image from "./../../../common/Image/Image";
import Typography from "./../../../common/Typography/Typography";
import { Link } from "react-router-dom";
import Button from "./../../../common/Button/Button";

interface EmailVerifiedProps {}
const EmailVerified: React.FC<EmailVerifiedProps> = () => {
  return (
    <>
      <Image
        source="pic1"
        maxWidth="25rem"
        maxHeight="23.1rem"
        cssClass="onboarding__icon-2 animate-zoomOut"
      />
      <Typography
        type="h2"
        cssClass="head-1 m-t-40px m-t-40px--sm m-b-15px"
        text="Email successfully verified"
      />
      <Typography
        type="p"
        cssClass="p-1 m-b-5px"
        text={`We have successfully verified your email `}
      />
      <Typography
        type="p"
        cssClass="p-1 m-b-60px m-b-60px--sm"
        text="Kindly proceed to login"
      />
      <Link to="/auth">
        <Button cssClass="btn--primary btn--medium btn--full" text="Sign In" />
      </Link>
    </>
  );
};

export default EmailVerified;
