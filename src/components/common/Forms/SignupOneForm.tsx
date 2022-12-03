import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import * as yup from "yup";
import { Form, Field, Formik } from "formik";

import Button from "../Button/Button";
import Input from "../Input/Input";
import Radio from "../Input/Radio";

import userService from "./../../../services/userService";
import onboardingStore from "./../../../store/onboardingStore";

interface FormValues {
  email: string;
  agreeToTerms: boolean;
}

interface FieldRenderProps {
  field: any;
  meta: any;
}

const initialValues: FormValues = {
  email: "",
  agreeToTerms: false,
};

const validationSchema = yup.object({
  email: yup.string().email().required("Required *"),
  agreeToTerms: yup.boolean(),
});

type ErrorProps = {
  setErrors?: any;
};

type SignupOneProps = {};

const SignupOneForm: React.FC<SignupOneProps> = () => {
  const { setNewUserEmail } = onboardingStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [agree, setAgree] = useState<boolean>(false);
  const history = useHistory();
  const match = useRouteMatch("/auth");
  const path = match?.path;

  const onSubmit = async (values: any, { setErrors }: ErrorProps) => {
    setIsLoading(true);
    const { email } = values;

    try {
      await userService.checkEmail(email).then(({ data }) => {
        const { email } = data;
        userService.saveNewUserEmail(email);
        setNewUserEmail(email);
        setIsLoading(false);
        history.push(`${path}/signup/2`);
      });
    } catch (error) {
      setErrors({ email: "User already exist" });
      setIsLoading(false);
    }
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

        <Field name="agreeToTerms">
          {({ field }: FieldRenderProps) => {
            return (
              <Radio
                label="I agree with terms &amp; conditions"
                name="agreeToTerms"
                // handleClick={() => setAgree((prev) => !prev)}
                {...field}
              />
            );
          }}
        </Field>

        <Button
          cssClass="btn--primary btn--medium btn--full m-t-40px"
          text="Sign Up"
          type="submit"
          // disable={!agree ? true : false}
          isLoading={isLoading}
        />
      </Form>
    </Formik>
  );
};

export default SignupOneForm;
