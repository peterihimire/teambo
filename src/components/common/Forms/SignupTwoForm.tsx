import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import * as yup from "yup";
import { Form, Field, Formik } from "formik";

import GridView from "../GridView/GridView";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Radio from "../Input/Radio";

import user from "../../../services/userService";
import auth from "./../../../services/authService";
import { newUserEmailKey } from "./../../../services/userService";
import onboardingStore from "./../../../store/onboardingStore";

interface FormValues {
  email: any;
  firstname: string;
  lastname: string;
  password: string;
  passwordConfirm: string;
  rememberMe: boolean;
  accountType: string;
  companyName: string;
}

interface FieldRenderProps {
  field: any;
  meta: any;
}

const validationSchema = yup.object({
  email: yup.string().email().required("Required *"),
  firstname: yup.string().required("Required *"),
  lastname: yup.string().required("Required *"),
  password: yup
    .string()
    .min(8)
    .required("Required *")
    .matches(
      /^[A-Za-z0-9]+$/,
      "Must Contain at least 8 Characters, One Uppercase and a Number"
    ),
  passwordConfirm: yup.string().required("Required *"),
  rememberMe: yup.string(),
  accountType: yup.string().required("Required *"),
  companyName: yup.string().required("Required *"),
});

type ErrorProps = {
  setErrors?: any;
};

type Props = {};
const SignupTwoForm: React.FC<Props> = () => {
  const { newUserEmail } = onboardingStore();
  const history = useHistory();
  const match = useRouteMatch("/auth");
  const path = match?.path;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const newUserEmailLocal = localStorage.getItem(newUserEmailKey);

  const initialValues: FormValues = {
    email: newUserEmail || newUserEmailLocal,
    firstname: "",
    lastname: "",
    password: "",
    passwordConfirm: "",
    rememberMe: false,
    accountType: "PERSONAL",
    companyName: "CC",
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
      passwordConfirm,
      accountType,
      companyName,
    } = values;
    const userData = {
      email,
      firstname,
      lastname,
      password,
      passwordConfirm,
      accountType,
      companyName,
    };
    await user.register(userData)
      .then(({ data }) => {
        auth.storeUserData(data);
        setIsLoading(false);
        history.push(`${path}/signup/3`);
      }).catch ((ex) => {
        if (ex.response) {
          const { error } = ex.response.data;
          if (error[0] === "password too weak")
            setErrors({ password: "Password too weak" });
          else setErrors({ email: "User already exist" });
          setIsLoading(false);
        }
      })
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

        <GridView grid={2}>
          <Field name="firstname">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  label="First name"
                  iconId="icon-user"
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
                  label="Last name"
                  iconId="icon-user"
                  error={meta.touched && meta.error ? meta.error : null}
                  {...field}
                />
              );
            }}
          </Field>
        </GridView>

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

        <Field name="passwordConfirm">
          {({ field, meta }: FieldRenderProps) => {
            return (
              <Input
                label="Confirm password"
                type="password"
                iconId="icon-check"
                error={meta.touched && meta.error ? meta.error : null}
                {...field}
              />
            );
          }}
        </Field>

        <div className="flex-r-jcb-aic m-b-40px">
          <Field name="rememberMe">
            {({ field }: FieldRenderProps) => {
              return <Radio label="Remember me" name="rememberMe" {...field} />;
            }}
          </Field>
        </div>
        <Button
          cssClass="btn--primary btn--medium btn--full"
          text="Sign Up"
          type="submit"
          isLoading={isLoading}
        />
      </Form>
    </Formik>
  );
};

export default SignupTwoForm;
