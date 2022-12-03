import React, { useState } from "react";
import Image from "../../common/Image/Image";
import Typography from "../../common/Typography/Typography";
import { Link } from "react-router-dom";
import { useHistory, useRouteMatch } from "react-router-dom";
import * as yup from "yup";
import { Form, Field, Formik } from "formik";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import auth from "./../../../services/authService";

interface FormValues {
  email: string;
  password: string;
  // rememberMe: boolean;
}

interface FieldRenderProps {
  field: any;
  meta: any;
}

const initialValues: FormValues = {
  email: "",
  password: "",
  // rememberMe: false,
};

const validationSchema = yup.object({
  email: yup.string().email().required("Required *"),
  password: yup.string().required("Required *"),
  // rememberMe: yup.string(),
});

// type SignInProps = {
//   history?: any;
//   match?: any;
//   location?: any;
// };

type ErrorProps = {
  setErrors?: any;
};

type Props = {};

// interface Props {}

const LogIn: React.FC<Props> = () => {
  const history = useHistory();
  const match = useRouteMatch("/auth");
  const path = match?.path;
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const showPass = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = async (values: any, { setErrors }: ErrorProps) => {
    setIsLoading(true);
    console.log(values);
    const { email, password } = values;
    await auth
      .login(email, password)
      .then(({ data }) => {
        // console.log(data);
        auth.storeUserData(data);
        auth.runTokenExpiration(data);
        setIsLoading(false);
        history.push("/user");
        history.go(0);
      })
      .catch((ex: any) => {
        if (ex.response && ex.response.status === 401) {
          setErrors({ email: ex.response.data.message });
          setIsLoading(false);
        }
      });
    console.log(auth.getCurrentUser());
  };
  const loggedInUser = auth.getCurrentUser();
  if (loggedInUser) {
    history.push(`/user`);
    history.go(0);
  }
  return (
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
        <div className="login-form-content">
          <div className="signup-hud">
            <a href="/home">
              <Image source="newTimboLogo" />
            </a>
            <div className="form-nav-btn m-t-100px">
              <Typography
                type="h3"
                text="Log In"
                cssClass="head-29  m-t-10px m-b-20px m-r-0px"
              />
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form className="timbo-form-width">
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
                      type={passwordShown ? "text" : "password"}
                      iconId={passwordShown ? "password-eye-hide" : "password-eye"}
                      iconClickAction={showPass}
                      cssClass="white-input-text"
                      error={meta.touched && meta.error ? meta.error : null}
                      {...field}
                    />
                  );
                }}
              </Field>
              {/* <Typography
                type="p"
                text="Forgot Password?"
                cssClass="p-20 text-right"
              /> */}
              <Link to={`${path}/recover`} className="link link--primary">
                Forgot Password?
              </Link>

              <Button
                cssClass="btn--primary btn--medium btn--full m-t-20px"
                isLoading={isLoading}
                text={"Log In"}
                type="submit"
              />
            </Form>
          </Formik>

          <div className="already-account-div">
            <Typography
              type="p"
              text="Don't have an account?"
              cssClass="p-21  m-b-0px m-r-10px"
            />
            <Link to={`${path}/signup-individual`} className="link">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
