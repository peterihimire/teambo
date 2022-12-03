import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Form, Field, Formik } from "formik";

import GridView from "../GridView/GridView";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Typography from "../Typography/Typography";

import userService from "../../../services/userService";
import { toast } from 'react-toastify';
import auth from "./../../../services/authService";
import { useHistory } from "react-router";

interface FormValues {
  question: string;
  answer: string;
}

interface FormValuesPassword {
  oldPassword: string;
  newPassword: string;
}

interface FieldRenderProps {
  field: any;
  meta: any;
}

interface FieldRenderPropsPassword {
  field: any;
  meta: any;
}

const initialValues: FormValues = {
  question: "",
  answer: ""
};

const initialValuesPassword: FormValuesPassword = {
  oldPassword: "",
  newPassword: ""
};

const validationSchema = yup.object({
  question: yup.string().required("Required *"),
  answer: yup.string().required("Required *"),
});

const validationSchemaPassword = yup.object({
  oldPassword: yup.string().required("Required *"),
  newPassword: yup.string().required("Required *"),
});

type SignupOneProps = {
  history?: any;
  match?: any;
  location?: any;
};
const FormProfileSecurity: React.FC<SignupOneProps> = ({ history }) => {
  const hist = useHistory();
  const [isPasswordLoading, setIsPasswordLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [securityQuestions, setSecurityQuestions] = useState<any>([])
  const fetchQuestions = () => {
    userService.getSecurityQuestions().then((response) => {
      const info = response.data.data;
      const result = Object.values(info);
      setSecurityQuestions(result)
    });
  };
  const cancel = async () => {
    hist.push("/user/profile-settings");
  };
  useEffect(() => {
    (async () => {
      await fetchQuestions();
    })();
  },[]);
  const onSubmit = (values: any) => {
    setIsLoading(true);
    userService.createSecurityQuestion(values)
    .then(response => {
      fetchQuestions();
      setIsLoading(false);
      toast.success('Security Question Successfully Added!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }).catch (err => {
      setIsLoading(false);
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.error[0], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }else {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    });
  };
  const onSubmitPassword = async (values: any) => {
    setIsPasswordLoading(true);
    userService.changePassword(values)
    .then(response => {
      setIsPasswordLoading(false);
      toast.success('Password Updated Successfully! Please Login again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",  
        onClose: () => auth.logout()
      })
    }).catch (err => {
      setIsPasswordLoading(false);
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.error[0], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }else {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValuesPassword}
        onSubmit={onSubmitPassword}
        validationSchema={validationSchemaPassword}
      >
        <Form>
          <Typography
            type="h5"
            text="Change password"
            cssClass="head-9 m-b-40px"
          />
          <GridView grid={2}>
            <Field name="oldPassword">
              {({ field, meta }: FieldRenderPropsPassword) => {
                return (
                  <Input
                    label="Current password"
                    iconId="icon-lock"
                    error={meta.touched && meta.error ? meta.error : null}
                    {...field}
                  />
                );
              }}
            </Field>

            <Field name="newPassword">
              {({ field, meta }: FieldRenderProps) => {
                return (
                  <Input
                    label="New password"
                    iconId="icon-lock"
                    error={meta.touched && meta.error ? meta.error : null}
                    {...field}
                  />
                );
              }}
            </Field>
          </GridView>
          <div className="flex-r-jcbetween m-b-40px">
            <div>
              <Button
                cssClass="btn--primary btn--small"
                text="Update Settings"
                isLoading={isPasswordLoading}
                type="submit"
              />
            </div>
          </div>
        </Form>
      </Formik>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>

          <Typography
            type="h5"
            text="Security questions"
            cssClass="head-9 m-b-40px"
          />
          <div className="billing-details__container m-b-30px">
            {securityQuestions.map((securityQuestion: { question: string; }) => (
              <div className="billing-details__row">
                <div className="flex-r-aicenter">
                  <Typography
                    type="h6"
                    text={securityQuestion.question}
                    cssClass="p-9 m-l-30px"
                  />
                </div>
                {/* <div className="flex-r-aicenter">
                  <Button text="Delete" cssClass="btn--small btn--danger m-l-15px" />
                </div> */}
              </div>
            ))}

          </div>
          {/* {Object.keys.securityQuestions.map((securityQuestion) => (
            <div>{securityQuestion}</div>
          ))} */}
          <GridView grid={2}>
            <Field name="question">
              {({ field, meta }: FieldRenderProps) => {
                return (
                  <Input
                    label="New Question"
                    iconId="icon-pen"
                    error={meta.touched && meta.error ? meta.error : null}
                    {...field}
                  />
                );
              }}
            </Field>
            <Field name="answer">
              {({ field, meta }: FieldRenderProps) => {
                return (
                  <Input
                    label="Answer"
                    iconId="icon-comment-2"
                    error={meta.touched && meta.error ? meta.error : null}
                    {...field}
                  />
                );
              }}
            </Field>
          </GridView>
          <div className="flex-r-jcbetween m-t-120px">
            <div>
              <Button
                cssClass="btn--primary btn--small"
                text="Update Settings"
                type="submit"
                isLoading={isLoading}
              />
              <Button handleClick={cancel} cssClass="btn--grey btn--small m-l-10px" text="Cancel" />
            </div>

            {/* <Button
              cssClass="btn btn--small btn--all-grey btn-icon-n-text"
              withIcon={true}
              btnIcon="icon-trash-sm"
              iconClass="icon-trash-sm btn-icon-n-text__icon"
              text="Deactivate Account"
            /> */}
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default FormProfileSecurity;
