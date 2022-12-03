import React, { useState } from "react";
import * as yup from "yup";
import { Form, Field, Formik } from "formik";

import Button from "../Button/Button";
import Input from "../Input/Input";

import userService from "./../../../services/userService";
import Typography from "./../Typography/Typography";

interface FormValues {
  email: string;
}

interface FieldRenderProps {
  field: any;
  meta: any;
}

const initialValues: FormValues = {
  email: "",
};

type ErrorProps = {
  setErrors?: any;
};

const validationSchema = yup.object({
  email: yup.string().email().required("Required *"),
});

const RecoverForm: React.FC<{}> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const onSubmit = async (values: any,{ setErrors }: ErrorProps) => {
    console.log(values);
    setEmailSent(false);
    setIsLoading(true);
    await userService.recoverPassword(values)
      .then(({ data }) => {
        console.log(data);
        setEmailSent(true);
        setIsLoading(false);
        // history.push(`auth/reset-password/`);
      }).catch ((ex) => {
        if (ex.response && ex.response.status === 401) {
          console.log(ex.response);
          setErrors({ email: "Invalid email provided" });
          setIsLoading(false);
        }else{
          console.log(ex.response);
          setErrors({ email: ex.response.data.error[0] });
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
        <Button
          cssClass="btn--primary btn--medium btn--full"
          text="Recover"
          type="submit"
          isLoading={isLoading}
        />

        {emailSent && (
          <Typography
            type="p"
            cssClass="p-1 m-t-20px animate-slideFromBottom"
            text={`Success! Check your mail for recovering link`}
          />
        )}
      </Form>
    </Formik>
  );
};

export default RecoverForm;
