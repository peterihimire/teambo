import React, { useState } from "react";
import Image from "../../common/Image/Image";
import Typography from "./../../common/Typography/Typography";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { Form, Field, Formik } from "formik";
import GridView from "./../../common/GridView/GridView";
import Button from "./../../common/Button/Button";
import Input from "./../../common/Input/Input";
import user from "./../../../services/userService";
// import auth from "./../../../services/authService";
import onboardingStore from "./../../../store/onboardingStore";

interface FormValues {
  email: any;
  firstname: string;
  lastname: string;
  password: string;
  accountType: string;
  companyName: string;
  passwordConfirm: string;
}

interface FieldRenderProps {
  field: any;
  meta: any;
}

const validationSchema = yup.object({
  email: yup.string().email().required("Required *"),
  firstname: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter a valid name")
    .required("Required *"),
  lastname: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter a valid name")
    .required("Required *"),
  password: yup
    .string()
    .min(8)
    .required("Required *")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
    ),
  passwordConfirm: yup.string().required("Required *"),
  rememberMe: yup.string(),
  companyName: yup.string().required("Required *"),
});

type ErrorProps = {
  setErrors?: any;
};

type Props = {};

const SignUpCompany: React.FC<Props> = () => {
  const history = useHistory();
  const { setNewUserEmail } = onboardingStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialValues: FormValues = {
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    accountType: "COMPANY",
    companyName: "",
    passwordConfirm: "",
    // rememberMe: false,
  };

  const onSubmit = async (values: any, { setErrors }: ErrorProps) => {
    console.log(values);

    if (values.password !== values.passwordConfirm)
      return setErrors({ passwordConfirm: "Password do not match" });

    setIsLoading(true);

    const {
      email,
      firstname,
      lastname,
      password,
      accountType,
      companyName,
      passwordConfirm,
    } = values;
    const userData = {
      email,
      firstname,
      lastname,
      password,
      accountType,
      companyName,
      passwordConfirm,
    };

    await user
      .register(userData)
      .then(({ data }) => {
        // auth.storeUserData(data);
        user.saveNewUserEmail(email);
        setNewUserEmail(email);
        setIsLoading(false);
        history.push(`signup/3`);
      })
      .catch((ex: any) => {
        if (ex.response) {
          const { message } = ex.response.data;
          setErrors({ email: message });
          setIsLoading(false);
        }
      });
  };
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [confirmPasswordShown, setConfirmPasswordShown] =
    useState<boolean>(false);

  const showPass = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const showConfirmPass = () => {
    setConfirmPasswordShown(confirmPasswordShown ? false : true);
  };
  // const loggedInUser = auth.getCurrentUser();
  // if(loggedInUser){
  //   history.push(`/user`);
  //   history.go(0);
  // }
  return (
    //
    <div className="wrapper">
      <div className="left">
        <div className="left-bg-text">
          <Typography
            type="h3"
            text="Conferencing Refactored"
            cssClass="head-29  m-t-10px m-b-20px m-r-0px"
          />
          <Typography
            type="p"
            text="Time and space isn’t a factor anymore. Be unlimited with stellar messaging, video conferencing, and meeting transcription features. Only on Timbo."
            cssClass="p-21  m-b-0px m-r-10px"
          />
        </div>
      </div>

      <div className="right">
        <div className="signup-company-form-content">
          <div className="signup-hud">
            <a href="/home">
              <Image source="newTimboLogo" />
            </a>
            <div className="form-nav-btn m-t-50px">
              <Typography
                type="h3"
                text="Sign Up"
                cssClass="head-29  m-t-10px m-b-20px m-r-0px"
              />
              <NavLink
                to="/auth/signup-individual"
                activeClassName="btn-link-active"
                className="link btn-link  btn btn--transparent-light link-btn-size  radius-10px"
              >
                Individual
              </NavLink>

              <NavLink
                to="/auth/signup-company"
                activeClassName="btn-link-active"
                className="link btn-link  btn btn--transparent-light link-btn-size  radius-10px"
              >
                Company
              </NavLink>
            </div>
          </div>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form style={{ maxWidth: "50rem", margin: "0px auto" }}>
              <GridView grid={2}>
                <Field name="firstname">
                  {({ field, meta }: FieldRenderProps) => {
                    return (
                      <Input
                        placeholder="First name"
                        cssClass="white-input-text"
                        error={meta.touched && meta.error ? meta.error : null}
                        {...field}
                      />
                    );
                  }}
                </Field>

                <Field name="lastname">
                  {({ field, meta }: FieldRenderProps) => {
                    return (
                      <Input
                        placeholder="Last name"
                        cssClass="white-input-text"
                        error={meta.touched && meta.error ? meta.error : null}
                        {...field}
                      />
                    );
                  }}
                </Field>
              </GridView>
              <Field name="companyName">
                {({ field, meta }: FieldRenderProps) => {
                  return (
                    <Input
                      placeholder="Company Name"
                      cssClass="white-input-text"
                      error={meta.touched && meta.error ? meta.error : null}
                      {...field}
                    />
                  );
                }}
              </Field>

              <Field name="email">
                {({ field, meta }: FieldRenderProps) => {
                  return (
                    <Input
                      placeholder="email"
                      cssClass="white-input-text"
                      error={meta.touched && meta.error ? meta.error : null}
                      {...field}
                    />
                  );
                }}
              </Field>

              <Field name="password">
                {({ field, meta }: FieldRenderProps) => {
                  return (
                    <Input
                      placeholder="password"
                      cssClass="white-input-text"
                      type={passwordShown ? "text" : "password"}
                      iconId={passwordShown ? "password-eye-hide" : "password-eye"}
                      iconClickAction={showPass}
                      error={meta.touched && meta.error ? meta.error : null}
                      {...field}
                    />
                  );
                }}
              </Field>

              <Field name="passwordConfirm">
                {({ field, meta }: FieldRenderProps) => {
                  return (
                    <Input
                      placeholder="Confirm password"
                      cssClass="white-input-text"
                      type={confirmPasswordShown ? "text" : "password"}
                      iconId={confirmPasswordShown ? "password-eye-hide" : "password-eye"}
                      iconClickAction={showConfirmPass}
                      error={meta.touched && meta.error ? meta.error : null}
                      {...field}
                    />
                  );
                }}
              </Field>

              <Button
                cssClass="btn--primary btn--medium btn--full"
                text="Sign Up"
                type="submit"
                isLoading={isLoading}
              />
            </Form>
          </Formik>
          <div className="policy-account-div">
            <Typography
              type="p"
              text="By clicking Sign Up on Timbo,"
              cssClass="p-21b m-b-0px text-center"
            />
            <Typography
              type="p"
              text="you agree to our Terms and Privacy Policy."
              cssClass="p-21b m-b-0px text-center"
            />
            <div className="already-account-div">
              <Typography
                type="p"
                text="Already have an account?"
                cssClass="p-21 m-b-0px m-r-10px"
              />
              <Link to="/auth/signin" className="link">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpCompany;
