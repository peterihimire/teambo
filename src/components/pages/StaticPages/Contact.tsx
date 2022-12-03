import React, { useState } from "react";
import TopNav from "./../../common/StaticPages/TopNav";
import Footer from "./../../common/StaticPages/Footer";
import Image from "../../common/Image/Image";
import Typography from "../../common/Typography/Typography";
import { Link } from "react-router-dom";
import { useHistory, useRouteMatch } from "react-router-dom";
import * as yup from "yup";
import { Form, Field, Formik } from "formik";
import FormikControl from "../../../components/common/Forms/FormikContainer/FormikControl";
import GridView from "../../common/GridView/GridView";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import Textarea from "../../common/Input/Textarea";
import user from "../../../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import auth from "./../../../services/authService";
// IMPORTED ZUSTAND FAQ-STORE
import countriesStore from "../../../store/countriesStore";
// import ModalContactUs from "../../common/Modals/ModalContactUs";
interface FormValues {
  businessEmail: any;
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  message: string;
  companyName: string;

  // "firstName": "Ganiu",
  //   "lastName": "Akowanu",
  //   "businessEmail": "ennytech@gmail.com",
  //   "companyName": "EnnyTech Solutions",
  //   "phone": "+2347063352013",
  //   "country": "Nigeria",
  //   "message": "I need to know more"
}

interface FieldRenderProps {
  field: any;
  meta: any;
}

const validationSchema = yup.object({
  businessEmail: yup.string().email().required("Required *"),
  firstName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter a valid name")
    .required("Required *"),
  lastName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter a valid name")
    .required("Required *"),
  phone: yup.number().required("Required *"),
  companyName: yup.string().required("Required *"),
  country: yup.string().required("Required *"),
  message: yup.string().required("Required *"),
});

type ErrorProps = {
  setErrors?: any;
};

type Props = {
  onClick: () => void;
  show: any;
};

// interface Props {}

const Contact: React.FC<Props> = () => {
  const history = useHistory();
  const match = useRouteMatch("/");
  const path = match?.path;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [success, setSuccess] = useState<string>("");
  // const [showModal, setShowModal] = useState<boolean>(false);

  const countries = countriesStore((state: any) => state["countries"]);
  console.log(countries);

  const initialValues: FormValues = {
    businessEmail: "",
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    message: "",
    companyName: "",
  };

  const onSubmit = async (values: any, { setErrors }: ErrorProps) => {
    console.log(values);

    setIsLoading(true);

    const {
      businessEmail,
      firstName,
      lastName,
      phone,
      country,
      message,
      companyName,
    } = values;
    const data = {
      businessEmail,
      firstName,
      lastName,
      phone,
      country,
      message,
      companyName,
    };
    console.log(data);
    try {
      await user.createContactUs(data).then(({ data }) => {
        // // auth.storeUserData(data);
        // console.log(data.message);
        // setSuccess(data.message);
        // setIsLoading(false);
        // // history.push(`${path}/signup/3`);

        toast.success(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          // onClose: () => history.go(0),
        });
        history.push(`${path}contact`);
        setIsLoading(false);
      });
    } catch (err: any) {
      console.log(err);

      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.error[0], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  return (
    <>
      {/* {success && (
        <ModalContactUs handleClick={() => onclose} success={success} />
      )} */}
      <ToastContainer />

      <TopNav />

      <div className="wrapper-contact">
        <div className="left-contact">
          <div className="left-bg-text">
            <Typography
              type="h3"
              text="Get in touch with Us"
              cssClass="head-29  m-t-10px m-b-20px m-r-0px"
            />
            <Typography
              type="p"
              text="Submit this form and a sales representative will get back to you. "
              cssClass="p-21  m-b-20px m-r-10px"
            />
            <Link to="/" className="link contact-call-link">
              Call sales +234 800 000 000
            </Link>
          </div>
        </div>

        <div className="right-contact">
          <div className="contact-form-content">
            <div className="contact-hud">
              <div className="form-nav-btn m-t-100px">
                <Typography
                  type="h3"
                  text="Talk To Us"
                  cssClass="head-29  m-t-10px m-b-20px m-r-20px"
                />
              </div>
            </div>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              enableReinitialize
            >
              {/* <ToastContainer /> */}
              <Form style={{ maxWidth: "50rem", margin: "0px auto" }}>
                <GridView grid={2}>
                  <Field name="firstName">
                    {({ field, meta }: FieldRenderProps) => {
                      return (
                        <Input
                          placeholder="First name"
                          cssClass="white-input-text"
                          error={meta.touched && meta.error ? meta.error : null}
                          {...field}
                        />
                      );
                    }}
                  </Field>

                  <Field name="lastName">
                    {({ field, meta }: FieldRenderProps) => {
                      return (
                        <Input
                          placeholder="Last name"
                          cssClass="white-input-text"
                          error={meta.touched && meta.error ? meta.error : null}
                          {...field}
                        />
                      );
                    }}
                  </Field>
                </GridView>
                <GridView grid={2}>
                  <Field name="businessEmail">
                    {({ field, meta }: FieldRenderProps) => {
                      return (
                        <Input
                          placeholder="Business email"
                          cssClass="white-input-text"
                          error={meta.touched && meta.error ? meta.error : null}
                          {...field}
                        />
                      );
                    }}
                  </Field>
                  <Field name="phone">
                    {({ field, meta }: FieldRenderProps) => {
                      return (
                        <Input
                          placeholder="phone"
                          cssClass="white-input-text"
                          error={meta.touched && meta.error ? meta.error : null}
                          {...field}
                        />
                      );
                    }}
                  </Field>
                </GridView>

                <Field name="companyName">
                  {({ field, meta }: FieldRenderProps) => {
                    return (
                      <Input
                        placeholder="Company Name"
                        cssClass="white-input-text"
                        error={meta.touched && meta.error ? meta.error : null}
                        {...field}
                      />
                    );
                  }}
                </Field>

                <FormikControl
                  control="select"
                  // optionClass="country-option"
                  name="country"
                  placeholder="Country"
                  cssClass="white-input-text"
                  options={
                    countries.map((country: any, index: any) => {
                      return country.name;
                    })
                    //   [
                    //   "Nigeria",
                    //   "USA",
                    //   "Ghana",
                    //   "United Kingdom",
                    //   "Albania",
                    //   "Ukraine",
                    //   "Australia",
                    //   "Canada",
                    // ]
                  }
                />

                <Field name="message">
                  {({ field, meta }: FieldRenderProps) => {
                    return (
                      <Textarea
                        placeholder="Message"
                        cssClass="white-input-text"
                        error={meta.touched && meta.error ? meta.error : null}
                        {...field}
                      />
                    );
                  }}
                </Field>

                <Button
                  cssClass="btn--primary btn--medium btn--full"
                  text="Submit Request"
                  type="submit"
                  isLoading={isLoading}
                />
              </Form>
            </Formik>
          </div>
        </div>
      </div>

      {/* TRY TIMBO FOR FREE SECTION */}
      <section className="section__meet_from-anywhere">
        <div className="center">
          <div className=" meet_from-anywhere-div">
            <div className="meet_from-anywhere-text-div">
              <Typography
                type="h3"
                text="Try Timbo For Free"
                cssClass=" m-b-20px try-heading"
              />
              <Typography
                type="p"
                text="Schedule up to 30 meetings 
              Up to 100+ people"
                cssClass="p-24  m-b-30px meet_from-anywhere-sub-heading"
              />
              <div className="meet_from-anywhere-btn-div">
                <Link to="/signup-individual" target="_blank" className="link">
                  <Button
                    cssClass="btn-new btn-primary   radius-10px btn-size m-r-20px"
                    text="Start for Free"
                  />
                </Link>

                <Link to="/pricing" target="_blank" className="link">
                  <Button
                    cssClass="btn-new  transparent-dark radius-10px  btn-size"
                    text="See Pricing"
                  />
                </Link>
              </div>
            </div>
            <div className="meet_from-anywhere-img-div">
              <Image source="timboLogoOnBg" cssClass="meet-anywhere-img" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTIOIN*/}
      <Footer />
    </>
  );
};

export default Contact;
