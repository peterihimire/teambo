import React from "react";
import Typography from "./../../../common/Typography/Typography";
// import { Link } from "react-router-dom";
// import Button from "./../../../common/Button/Button";

interface EmailVerifiedProps {}
const EmailNotVerified: React.FC<EmailVerifiedProps> = () => {
  return (
    <>
      <Typography
        type="h2"
        cssClass="head-1 m-t-40px m-t-40px--sm m-b-15px"
        text="Email not verified"
      />
      <Typography
        type="p"
        cssClass="p-1 m-b-5px"
        text={`Invalid verification token or token expired`}
      />
      {/* <Typography
        type="p"
        cssClass="p-1 m-b-60px m-b-60px--sm"
        text="Kindly proceed to login"
      />
      <Link to="/auth">
        <Button cssClass="btn--primary btn--medium btn--full" text="Sign In" />
      </Link> */}
    </>
  );
};

export default EmailNotVerified;
