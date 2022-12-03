import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Form, Field, Formik } from "formik";

import GridView from "../GridView/GridView";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { userStore } from "./../../../store/userStore";
import companyService from "../../../services/companyService";

// interface FormValues {
//   companyName: string;
//   location: string;
//   billingAddress: string;
//   zipCode: string;
//   phone: string;
//   language: string;
//   numberOfEmployees: string;
// }
// const initialValues: FormValues = {
//   companyName: "",
//   location: "",
//   billingAddress: "",
//   zipCode: "",
//   phone: "",
//   language: "",
//   numberOfEmployees: "",
// };

interface FieldRenderProps {
  field: any;
  meta: any;
}

const validationSchema = yup.object({
  name: yup.string().required("Required *").nullable(),
  location: yup.string().required("Required *").nullable(),
  billing_address: yup.string().required("Required *").nullable(),
  zipCode: yup.string().nullable(),
  phone_number: yup.string().required("Required *").nullable(),
  language: yup.string().nullable(),
  numberOfEmployees: yup.string()
});

type SignupOneProps = {
  history?: any;
  match?: any;
  location?: any;
};
const FormCompanyInfo: React.FC<SignupOneProps> = ({ history }) => {
  const { user, getUser } = userStore();

  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    location: "",
    billing_address: "",
    phone_number: "",
  })
  useEffect(() => {
    setCompanyInfo({
      name: user.own_company.name || "",
      phone_number: user.own_company.phone_number || "",
      location: user.own_company.location || "",
      billing_address: user.own_company.billing_address || "",
    });
  }, [user]);
  const onSubmit = (values: any) => {
    companyService.update(values)
    .then(response => {
      getUser();
      toast.success('Company Details Updated Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }).catch (err => {
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
  }

  return (
    <Formik
      initialValues={companyInfo}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <ToastContainer/>
        <GridView grid={2}>
          <Field name="name">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  label="Company name"
                  iconId="icon-user"
                  error={meta.touched && meta.error ? meta.error : null}
                  {...field}
                />
              );
            }}
          </Field>

          <Field name="phone_number">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  label="Phone"
                  iconId="icon-phone-right"
                  error={meta.touched && meta.error ? meta.error : null}
                  {...field}
                />
              );
            }}
          </Field>
        </GridView>

        <GridView grid={2}>
          <Field name="billing_address">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  label="Billing Address"
                  iconId="icon-message"
                  error={meta.touched && meta.error ? meta.error : null}
                  {...field}
                />
              );
            }}
          </Field>
          <Field name="location">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  label="Location"
                  iconId="icon-map"
                  error={meta.touched && meta.error ? meta.error : null}
                  {...field}
                />
              );
            }}
          </Field>
        </GridView>
        <GridView grid={2}>
          <Field name="zipCode">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  label="Zip code"
                  disable={true}
                  iconId="icon-map"
                  error={meta.touched && meta.error ? meta.error : null}
                  {...field}
                />
              );
            }}
          </Field>
          <Field name="language">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  label="Language"
                  disable={true}
                  iconId="icon-user-loud"
                  error={meta.touched && meta.error ? meta.error : null}
                  {...field}
                />
              );
            }}
          </Field>
        </GridView>

        <GridView grid={2}>
          <Field name="numberOfEmployees">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  label="Number of employees"
                  iconId="icon-user-loud"
                  disable={true}
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
            />
            {/* <Button cssClass="btn--grey btn--small m-l-10px" text="Cancel" /> */}
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
  );
};

export default FormCompanyInfo;
