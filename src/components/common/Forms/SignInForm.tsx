import React, { useState } from "react";
import * as yup from "yup";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Form, Field, Formik } from "formik";

import Button from "../Button/Button";
import Input from "../Input/Input";
import Radio from "../Input/Radio";

import auth from "./../../../services/authService";

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FieldRenderProps {
  field: any;
  meta: any;
}

const initialValues: FormValues = {
  email: "",
  password: "",
  rememberMe: false,
};

const validationSchema = yup.object({
  email: yup.string().email().required("Required *"),
  password: yup.string().required("Required *"),
  rememberMe: yup.string(),
});

type SignInProps = {
  history?: any;
  match?: any;
  location?: any;
};

type ErrorProps = {
  setErrors?: any;
};

const SignInForm: React.FC<SignInProps> = () => {
  const history = useHistory();
  const match = useRouteMatch("/auth");
  const path = match?.path;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = async (values: any, { setErrors }: ErrorProps) => {
    setIsLoading(true);
    // console.log(values);
    const { email, password } = values;
    await auth.login(email, password)
      .then(({ data }) => {
        // console.log(data);
        auth.storeUserData(data);
        setIsLoading(false);
        history.push("/user");
        history.go(0);
      }).catch ((ex) => {
        if (ex.response && ex.response.status === 401) {
          setErrors({ email: ex.response.data.message });
          setIsLoading(false);
        }
      })
    // console.log(auth.getCurrentUser());
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Field name="email">
          {({ field, meta }: FieldRenderProps) => {
            return (
              <Input
                label="email"
                iconId="icon-message"
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
                label="password"
                type="password"
                iconId="icon-lock"
                error={meta.touched && meta.error ? meta.error : null}
                {...field}
              />
            );
          }}
        </Field>

        <div className="flex-rw-jcb-aic m-b-40px">
          <Field name="rememberMe">
            {({ field, meta }: FieldRenderProps) => {
              return <Radio label="Remember me" name="rememberMe" {...field} />;
            }}
          </Field>

          <Link to={`${path}/recover`} className="link link--primary">
            Recover password
          </Link>
        </div>
        <Button
          cssClass="btn--primary btn--medium btn--full"
          isLoading={isLoading}
          text={"Sign In"}
          type="submit"
        />
      </Form>
    </Formik>
  );
};

export default SignInForm;
