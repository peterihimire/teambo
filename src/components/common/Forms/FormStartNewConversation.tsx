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
  startConversationLink?: string;
}
const initialValues: FormValues = {
  startConversationLink: "https://timboo.me/sdflwe40",
};

const validationSchema = yup.object({
  startConversationLink: yup.string(),
});

type Props = {
  history?: any;
};
const FormStartNewConversation: React.FC<Props> = () => {
  const onSubmit = (values: any) => {
    console.log(values);
    // history.push("/user/conference-invite");
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Field name="startConversationLink">
          {({ field, meta }: FieldRenderProps) => {
            return (
              <Input
                cssClass="text-center"
                name="startConversationLink"
                {...field}
              />
            );
          }}
        </Field>

        <Button
          cssClass="btn--primary btn--big m-t-15px btn-center"
          text="Copy and share link"
          type="submit"
        />
      </Form>
    </Formik>
  );
};

export default FormStartNewConversation;
