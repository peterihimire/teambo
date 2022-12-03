import * as yup from "yup";
import { Formik, Field } from "formik";

import {
  ModalLayout,
  Typography,
  Button,
  ModalChild,
  Input,
  TagInputSecondary,
} from "../../../../common";

export type RecordingModalProps = {
  mediaBlobUrl: string;
  closeModal: () => void;
  saveRecording: (valus: Record<string, any>) => void;
};

interface FieldRenderProps {
  field: any;
  meta: any;
}

interface FormValues {}
const initialValues: FormValues = {
  title: "",
  description: "",
  tags: [],
};

const validationSchema = yup.object({
  title: yup.string().required("Required *"),
  description: yup.string().required("Required *"),
});

const RecordingModal = ({
  mediaBlobUrl,
  closeModal,
  saveRecording,
}: RecordingModalProps): JSX.Element => {
  const onSubmit = (values: any) => {
    saveRecording(values);
  };
  return (
    <ModalLayout>
      <ModalChild width="55.3rem" padding="3rem 3rem 5rem">
        <div className="modal__head m-b-50px">
          <Typography type="h3" text="Recording Preview" />
          <Button
            cssClass="btn btn-icon"
            icon="icon-times"
            iconClass="icon-times"
            handleClick={closeModal}
          />
        </div>

        <div className="m-b-40px">
          <video
            src={mediaBlobUrl as string}
            width="100%"
            controls
            autoPlay={false}
            loop
          />
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <div>
              <Field name="title">
                {({ field, meta }: FieldRenderProps) => {
                  return (
                    <Input
                      label="Title"
                      iconId="icon-link"
                      error={meta.touched && meta.error ? meta.error : null}
                      {...field}
                    />
                  );
                }}
              </Field>
              <Field name="description">
                {({ field, meta }: FieldRenderProps) => {
                  return (
                    <Input
                      label="Description"
                      iconId="icon-link"
                      error={meta.touched && meta.error ? meta.error : null}
                      {...field}
                    />
                  );
                }}
              </Field>
              <Field name="tags">
                {({ field, meta }: FieldRenderProps) => {
                  return (
                    <TagInputSecondary
                      label="Tags"
                      // error={meta.touched && meta.error ? meta.error : null}
                      setFieldValue={props.setFieldValue}
                      // {...field}
                    />
                  );
                }}
              </Field>

              <Button
                // isLoading={}
                disable={!props.dirty}
                cssClass="btn--primary btn--medium btn--full m-t-10px"
                text="Save Recording"
                type="submit"
                handleClick={() => onSubmit(props.values)}
              />
            </div>
          )}
        </Formik>
      </ModalChild>
    </ModalLayout>
  );
};

export default RecordingModal;
