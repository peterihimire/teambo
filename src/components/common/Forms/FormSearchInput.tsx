import React from "react";
import * as yup from "yup";
import { Form, Field, Formik } from "formik";
  
import Input from "../Input/Input";

interface FieldRenderProps {
  field: any;
  meta: any;
}

interface FormValues {
  searchWord: string;
}
const initialValues: FormValues = {
  searchWord: "",
};

const validationSchema = yup.object({
  searchWord: yup.string(),
});

type Props = {
  history?: any;
};
const FormSearchInput: React.FC<Props> = ({ history }) => {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Field name="searchWord">
          {({ field, meta }: FieldRenderProps) => {
            return <Input placeholder="Search..." name="searchWord" />;
          }}
        </Field>
      </Form>
    </Formik>
  );
};

export default FormSearchInput;
