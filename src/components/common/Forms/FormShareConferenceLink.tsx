import React, { useState } from "react";
import * as yup from "yup";
import { Form, Field, Formik } from "formik";

import Button from "../Button/Button";
import Input from "../Input/Input";
import copyToClipBoard from './../../../utils/helpers/copyToClipboard';
import MeetingStore from './../../../store/meetingStore';
import Typography from "../Typography/Typography";

interface FieldRenderProps {
  field: any;
  meta: any;
}

interface FormValues {
  conferenceCallCode: string;
}


const validationSchema = yup.object({
  conferenceCallCode: yup.string().required("Required *"),
});

type Props = {};
const FormShareConferenceLink: React.FC<Props> = () => {
  const {meetingCode} = MeetingStore()
  const initialValues: FormValues = {
    conferenceCallCode: `${meetingCode}`,
  };
  const onSubmit = (values: any) => {
    console.log(values);
  };
  const successMessage = 'Meeting Link copied Successfully!';
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const copied = () => {
    setShowSuccessMessage(true)
    let timer = setInterval(() => {
      setShowSuccessMessage(false)
      clearInterval(timer);
    }, 5000);
  
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Field name="conferenceCallCode">
          {({ field, meta }: FieldRenderProps) => {
            return (
              <Input
                disabled={true}
                id="copyMeetingCode"
                error={meta.touched && meta.error ? meta.error : null}
                {...field}
              />
            );
          }}
        </Field>
        <Typography
          text={showSuccessMessage? successMessage : ''}
          type="p"
          cssClass="head-5"
        />

        <Button
          cssClass="btn--primary btn--big m-t-15px"
          text="Copy and share link"
          handleClick={() => {
            copyToClipBoard("copyMeetingCode");
            copied();
          }}
        />
      </Form>
    </Formik>
  );
};

export default FormShareConferenceLink;
