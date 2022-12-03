import React from "react";
import * as yup from "yup";
import { Form, Field, Formik } from "formik";

import Button from "../Button/Button";
import Input from "../Input/Input";

interface FieldRenderProps {
  field: any;
  meta: any;
}

interface FormValues {
  meetingLink: string;
}
const initialValues: FormValues = {
  meetingLink: "catherine.shaw@gmail.com",
};

const onSubmit = (values: any) => {
  console.log(values);
};

const validationSchema = yup.object({
  meetingLink: yup.string().required("Required *"),
});

const FormJoinMeeting: React.FC = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Field name="meetingLink">
          {({ field, meta }: FieldRenderProps) => {
            return (
              <Input
                label="Meeting link"
                iconId='icon-link'
                error={meta.touched && meta.error ? meta.error : null}
                {...field}
              />
            );
          }}
        </Field>

        <Button
          cssClass="btn--primary btn--medium btn--full m-t-40px"
          text="Join meeting"
          type="submit"
        />
      </Form>
    </Formik>
  );
};

export default FormJoinMeeting;
