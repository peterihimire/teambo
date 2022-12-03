import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import * as yup from "yup";
import { Form, Field, Formik } from "formik";

import GridView from "../GridView/GridView";
import Button from "../Button/Button";
import Input from "../Input/Input";
import FormikControl from "./FormikContainer/FormikControl";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import contactService from "./../../../services/contactService";

interface FieldRenderProps {
  field: any;
  meta: any;
}
// interface FieldArrayConfig {
//   push: any;
//   remove: any;
//   form: any;
// }

// type Key = string | number;

// interface ReactElement {
//   type: any;
//   props: any;
//   key: Key | null;
// }

interface FormValues {
  fullname: string;
  role: string;
  email: string;
  // emails: Array<any>;
}

const initialValues: FormValues = {
  fullname: "",
  role: "",
  email: "",
  // emails: [""],
};

const validationSchema = yup.object({
  fullname: yup.string().required("Required *"),
  role: yup.string().required("Required *"),
  email: yup.string().email().required("Required *"),
  // emails: yup.array(yup.string().email().required("Required *")),
});

type SignupOneProps = {};
const FormContactInformation: React.FC<SignupOneProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();
  const match = useRouteMatch("/user");
  const path = match?.path;

  const cancel = async () => {
    history.push("/user/contacts");
  };

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    const { fullname, email } = values;
    const data = {
      fullname,
      email: email,
    };
    // let remainingEmail =  [...emails];
    // const primaryEmail = remainingEmail.shift();
    // const data = {
    //   fullname,
    //   email: primaryEmail,
    //   role,
    // };

    await contactService.createContact(data).then((res) => {
      setIsLoading(false);
      history.push(`${path}/contacts`);
    }).catch (error => {
      setIsLoading(false);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    })
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <GridView grid={2}>
          <FormikControl
            control="input"
            name="fullname"
            label="Full name *"
            hasIcon={true}
            iconId="icon-user"
          />

          <Field name={`email`}>
            {({ field, meta, ...rest }: FieldRenderProps) => {
              return (
                <Input
                  label={`email *`}
                  iconId="icon-message"
                  error={meta.touched && meta.error ? meta.error : null}
                  {...field}
                />
              );
            }}
          </Field>
        </GridView>
        

        {/* <FieldArray name="emails">
          {(
            { remove, push, form }: FieldArrayConfig,
            context?: any
          ): ReactElement => {
            const { values } = form;
            const { emails } = values;
            return emails.map((email: any, index: any) => (
              <GridView grid={2} key={index}>
                <Field name={`emails[${index}]`}>
                  {({ field, meta, ...rest }: FieldRenderProps) => {
                    return (
                      <Input
                        label={`email ${index > 0 ? index + 1 : ""}*`}
                        iconId="icon-message"
                        error={meta.touched && meta.error ? meta.error : null}
                        {...field}
                      />
                    );
                  }}
                </Field>
              </GridView>
            ));
          }}
        </FieldArray> */}

        <div className="flex-r-jcbetween m-t-100px">
          <Button
            cssClass="btn--primary btn--small btn--fix-width-197px"
            text="Add New Contact"
            type="submit"
            isLoading={isLoading}
          />
          <Button cssClass="btn--grey btn--small" text="Cancel" handleClick={cancel} />
        </div>
      </Form>
    </Formik>
  );
};

export default FormContactInformation;
