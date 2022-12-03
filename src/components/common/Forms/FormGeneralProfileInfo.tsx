import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Form, Field, Formik } from "formik";

import GridView from "../GridView/GridView";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { toast } from 'react-toastify';


import { userStore } from "./../../../store/userStore";
import userService from "../../../services/userService";
import { useHistory } from "react-router";

interface FormValues {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phonenumber: string;
  address: string;
  theme: string;
  gender: string;
  socialProfiles: any;
}

interface FieldRenderProps {
  field: any;
  meta: any;
}

const validationSchema = yup.object({
  firstname: yup.string().required("Required *").nullable(),
  lastname: yup.string().required("Required *").nullable(),
  email: yup.string().email().required("Required *").nullable(),
  username: yup.string().nullable(),
  phonenumber: yup.string().required("Required *").nullable(),
  address: yup.string().nullable(),
  theme: yup.string().nullable(),
  gender: yup.string().nullable(),
  socialProfiles: yup.array()
     .of(
       yup.object().shape({
         name: yup.string().nullable(),
         link: yup.string().nullable(),
       })
     ),
  link: yup.string().nullable(),
});

type ProfileInfoProps = {
  match?: any; 
  location?: any;
};
const FormGeneralProfileInfo: React.FC<ProfileInfoProps> = () => {
  const { user, getUser } = userStore();
  const history = useHistory();
  const cancel = async () => {
    history.push("/user/profile-settings");
  };
  const [userInfo, setUserInfo] = useState<FormValues>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phonenumber: "",
    address: "",
    theme: "",
    gender: "",
    socialProfiles: [
      {
          name: "Facebook",
          link: ""
      },
      {
        name: "Twitter",
        link: ""
      },
      {
        name: "Instagram",
        link: ""
      }
    ]
  })
  useEffect(() => {
    setUserInfo({
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      username: user.username || "",
      email: user.email || "",
      phonenumber: user.phonenumber || "",
      address: user.address || "",
      theme: user.theme || "",
      gender: user.gender || "",
      socialProfiles: user.social_profiles
    });
  }, [user]);

  const onSubmit = (values: any) => {
    const data = {
      firstname: values.firstname,
      lastname: values.lastname,
      username: values.username,
      phonenumber: values.phonenumber,
      address: values.address,
      theme: values.theme,
      gender: values.gender,
      socialProfiles: values.social_profiles
    };
    userService.update(data)
    .then(response => {
      getUser();
      toast.success('Profile Updated Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        onClose: () => history.push("/user/profile-settings"),
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
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      initialValues={userInfo}
      enableReinitialize
    >
      <Form>
        <GridView grid={2}>
          <Field name="firstname">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  label="First name"
                  iconId="icon-user"
                  error={meta.touched && meta.error ? meta.error : null}
                  {...field}
                />
              );
            }}
          </Field>

          <Field name="lastname">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  label="Last name"
                  iconId="icon-user"
                  error={meta.touched && meta.error ? meta.error : null}
                  {...field}
                />
              );
            }}
          </Field>
        </GridView>

        <GridView grid={2}>
          <Field name="email">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  disable={true}
                  label="email"
                  iconId="icon-message"
                  error={meta.touched && meta.error ? meta.error : null}
                  {...field}
                />
              );
            }}
          </Field>
          <Field name="phonenumber">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  label="phone"
                  iconId="icon-phone-right"
                  error={meta.touched && meta.error ? meta.error : null}
                  {...field}
                />
              );
            }}
          </Field>
        </GridView>
        {/* <GridView grid={2}>
          <Field name="username">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  label="username"
                  iconId="icon-user"
                  error={meta.touched && meta.error ? meta.error : null}
                  {...field}
                />
              );
            }}
          </Field>
        </GridView> */}

        <GridView grid={2}>
          <Field name="address">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  label="Address line"
                  iconId="icon-map"
                  error={meta.touched && meta.error ? meta.error : null}
                  {...field}
                />
              );
            }}
          </Field>
        </GridView>

        {/* <GridView grid={2}>
          <Field name="gender">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <div className="input-container">
                  <label htmlFor="gender" className="input__label">
                  gender
                  </label>
                  <div className="input__holder">
                    <select
                      id="gender"
                      name="gender"
                      className={`input__ele`}
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <option>Select your Gender</option>
                      <option value="MALE">MALE</option>
                      <option value="FEMALE">FEMALE</option>
                    </select>
                  </div>
                  {meta.touched && meta.error ? (
                    <div className="input__error">
                      <span className="input__error-text">{meta.error}</span>
                    </div>
                  ) : null}
                </div>
              );
            }}
          </Field>
          <Field name="theme">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <div className="input-container">
                  <label htmlFor="theme" className="input__label">
                    theme
                  </label>
                  <div className="input__holder">
                    <select
                      id="theme"
                      name="theme"
                      className={`input__ele`}
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <option>Select a Theme</option>
                      <option value="LIGHT">LIGHT</option>
                      <option value="DARK">DARK</option>
                    </select>
                  </div>
                  {meta.touched && meta.error ? (
                    <div className="input__error">
                      <span className="input__error-text">{meta.error}</span>
                    </div>
                  ) : null}
                </div>
              );
            }}
          </Field>
        </GridView> */}

        
        {/* <FieldArray
          name="socialProfiles"
          render={arrayHelpers => (
          <div>
            {userInfo.socialProfiles && userInfo.socialProfiles.map((socialProfile: any, index: any) => (
              <div key={index}>
                <GridView grid={2}>
                  <Field name={`socialProfiles[${index}].name`}>
                    {({ field, meta }: FieldRenderProps) => {
                      return (
                        <Input
                          label="social"
                          disable={true}
                          iconId="icon-lock"
                          error={meta.touched && meta.error ? meta.error : null}
                          {...field}
                        />
                      );
                    }}
                  </Field>
                  <Field name={`socialProfiles[${index}].link`}>
                    {({ field, meta }: FieldRenderProps) => {
                      return (
                        <Input
                          label="link"
                          iconId="icon-link"
                          error={meta.touched && meta.error ? meta.error : null}
                          {...field}
                        />
                      );
                    }}
                  </Field>
                </GridView>
              </div>
            ))}
          </div>
          )}
        /> */}

        <div className="flex-r-jcbetween m-t-120px">
          <div>
            <Button
              cssClass="btn--primary btn--small"
              text="Update Settings"
              type="submit"
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
  );
};

export default FormGeneralProfileInfo;
