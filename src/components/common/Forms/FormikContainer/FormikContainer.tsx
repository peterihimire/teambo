import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const initialValues = {};
const validationSchema = Yup.object({});
const onSubmit = (values: any) => console.log(values);

interface Props {}
const FormikContainer: React.FC<Props> = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikContainer;
