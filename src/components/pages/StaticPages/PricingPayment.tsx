import {
  Button,
  CircularProgress,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Switch,
} from "@material-ui/core";
import { Field, FieldArray, Form, Formik, FormikConfig, FormikValues } from "formik";
import React, { useState, useEffect } from "react";
import TopNav from "./../../common/StaticPages/TopNav";
import Image from "./../../common/Image/Image";
import Typography from "../../common/Typography/Typography";
import Footer from "./../../common/StaticPages/Footer";
// import { Link } from "react-router-dom";
import * as yup from "yup";
import GridView from "../../common/GridView/GridView";
import Input from "../../common/Input/Input";
// import ReactCodeInput from "react-verification-code-input";
import paymentService from "../../../services/paymentService";
import paymentStore from "./../../../store/paymentStore";
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

interface FieldRenderProps {
  field: any;
  meta: any;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const validationSchemaStep1 = yup.object({
  package: yup.string().required("Required *"),
});

const validationSchemaStep2 = yup.object({
  firstName: yup.string().required("Required *"),
  lastName: yup.string().required("Required *"),
  email: yup.string().email().required("Required *"),
  company: yup.string().required("Required *"),
  employee_count: yup.number().required("Required *"),
  address: yup.string().required("Required *"),
  city: yup.string().required("Required *"),
  state: yup.string().required("Required *"),
  zip_code: yup.number().required("Required *"),
  region: yup.string().required("Required *"),
  cardDetails: yup.object().shape({
    cvv: yup.number().required("Required *"),
    number: yup.number().required("Required *"),
    expiry_month: yup.number().required("Required *"),
    expiry_year: yup.number().required("Required *"),
    pin: yup.number().required("Required *"),
  })
});

const PricingPayment = () => {
  const history = useHistory();
  const paymentInfo = {
    firstName: "",
    lastName: "",
    package: "",
    email: "",
    company: "",
    employee_count: 0,
    address: "",
    city: "",
    state: "",
    zip_code: "",
    region: "",
    cardDetails: {
      expiry_year: "",
      expiry_month: "",
      cvv: "",
      number: "",
      pin: "",
    },
  }

  // FOR THE MONTHLY/ ANNUALLY PLAN SELECT
  const [checked, setChecked] = useState<boolean>(false);
  const handleChange = (event: any) => {
    setChecked(event.target.checked);
  };

  //Packages
  const [packages, setPackages] = useState<any>();
  const {fetchPackagePlans, packagePlans, isLoading} = paymentStore()
  
  useEffect(()=>{
    if(checked === false){
      setPackages(packagePlans.filter((packagePlan:any)=>packagePlan?.interval === "MONTHLY"))
    }else if(checked === true){
      setPackages(packagePlans.filter((packagePlan:any)=>packagePlan?.interval === "YEARLY"))
    }else{
      setPackages(packagePlans);
    }
   // eslint-disable-next-line
  },[packagePlans,checked])

  useEffect(()=>{
    fetchPackagePlans()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // FOR THE CARD PAYMENT METHOD TYPE
  const [paymentType, setPaymentType] = useState<string>("stripe");
  const paymentChange = (e: any) => {
    setPaymentType(e);
  };
  
  //Submit
  const onSubmit = (async (values: any) => {
    const data = {
      plan: values.package,
      transaction_email: values.email,
      address: values.address,
      cardDetails: {
        expiry_year: values.cardDetails.expiry_year,
        expiry_month: values.cardDetails.expiry_month,
        cvv: values.cardDetails.cvv,
        number: values.cardDetails.number,
        pin: values.cardDetails.pin,
      },
      company: values.company,
      employee_count: parseInt(values.employee_count),
      payment_method: "CARD",
      city: values.city,
      state: values.state,
      zip_code: values.zip_code,
      region: values.region,
    }
    if(paymentType === "paystack"){
      await paymentService.makePaystackPayment(data)
        .then((response) => {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            onClose: () => history.push("/login")
          })
        }).catch((err) => {
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        })
    }else{
      await paymentService.makeStripePayment(data)
        .then((response) => {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            onClose: () => history.push("/login")
          })
        }).catch((err) => {
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        })
    }
    // await sleep(3000);
    console.log("values", values);
  })

  return (
    <>
      <TopNav />
      <ToastContainer />

      <section className="section__flexible-pricing">
        <div className="center">
          <FormikStepper
            onSubmit={onSubmit}
            initialValues={paymentInfo}
            enableReinitialize
          >
            {/* FIRST STEP  OF THE MULTI-STEP FORM*/}
            <FormikStep label="Choose Product Package" validationSchema={validationSchemaStep1}>
              {/* PACKAGE PLAN SECTION */}
              <section className="section__package-plan">
                <div className="center">
                  <div className=" package-plan-div">
                    <div className="billing-payment-heading">
                      <Typography
                        type="h3"
                        text="Choose Product Package"
                        cssClass="head-27 text-center  m-b-30px main-heading-second"
                      />
                      <Typography
                        type="p"
                        text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."
                        cssClass="p-20  m-b-30px keep-messages__sub-heading"
                      />
                      {/* SWITCH MONTHLY AND ANNUALLY */}
                      <div className="m-b-100px switch-invisible">
                        <Typography
                          type="p"
                          text="Monthly"
                          cssClass="p-20  m-b-0px "
                        />

                        <Switch
                          onChange={handleChange}
                          color="primary"
                          checked={checked}
                          name="checked"
                        />
                        <Typography
                          type="p"
                          text="Annually"
                          cssClass="p-20  m-b-0px "
                        />
                      </div>
                      {/* END OF SWITCH MONTHLY AND ANNUALLY */}
                    </div>

                    <div className="billing-info-text m-b-60px">
                      <div className="billing-info-num">
                        <Typography type="p" text="1" cssClass="p-20 " />
                      </div>
                      <Typography
                        type="p"
                        text="Choose prefered product package"
                        cssClass="p-20  m-b-0px package-p"
                      />
                    </div>
                    <div className="flexible-grid">   
                      {!isLoading && packages.map((packageP: any, index:any) => (
                        <Field name="package" key={index}>
                          {({ field, meta }: FieldRenderProps) => {
                            return (
                              <div>
                                <label className="package-input-label">
                                  <input
                                    type="radio"
                                    onChange={field.onChange}
                                    value={packageP.uid}
                                    name="package"
                                    className="package-input-element"
                                  />
                                  <div className="package-item">
                                    <div className="package-header">
                                      <Typography
                                        type="p"
                                        text={packageP.title}
                                        cssClass="p-20  m-b-10px keep-messages__sub-heading"
                                      />
                                      <div className="package-plan-price">
                                        <span>
                                          <Typography
                                            type="p"
                                            text="$"
                                            cssClass="p-20  m-b-0px keep-messages__sub-heading"
                                          />
                                        </span>
                                        <Typography
                                          type="h3"
                                          text={packageP.price}
                                          cssClass="head-29 text-center  m-b-0px"
                                        />
                                        <span>
                                          <Typography
                                            type="p"
                                            text={`/${packageP.interval}`}
                                            cssClass="p-20  m-b-0px "
                                          />
                                        </span>
                                      </div>
                                    </div>
                                    <div className="package-text-div">
                                      {packageP.features.map((feature: any, i:any) => (
                                        <div className="package-text-content" key={i}>
                                          <Image source="checkMarkCircle" cssClass="m" />
                                          <span>
                                            <Typography
                                              type="p"
                                              text={feature}
                                              cssClass="p-20  m-b-0px variety-p"
                                            />
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </label>
                                  {meta.touched && meta.error ? (
                                    <div className="input__error">
                                      <span className="input__error-text">{meta.error}</span>
                                    </div>
                                  ) : null}
                              </div>
                            );
                          }}
                        </Field>

                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </FormikStep>
            {/* SECOND STEP OF THE MULTI-STEP FORM*/}
            <FormikStep label="Payment" validationSchema={validationSchemaStep2}>
              <div className="">
                <div className="billing-payment-heading">
                  <Typography
                    type="h3"
                    text="Billing and Payment Information"
                    cssClass="head-27 text-center  m-b-30px main-heading-second"
                  />
                  <Typography
                    type="p"
                    text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."
                    cssClass="p-20  m-b-10px keep-messages__sub-heading"
                  />
                </div>

                <div className="billing-payment-info">
                  <div className="billing-info-section">
                    <div className="">
                      <div className="billing-info-text">
                        <div className="billing-info-num">
                          <Typography type="p" text="2" cssClass="p-20 " />
                        </div>
                        <Typography
                          type="p"
                          text="Billing Information"
                          cssClass="p-20  m-b-0px package-p"
                        />
                      </div>
                    </div>
                    <div className="billing-info-form">
                      {/* <Form> */}
                      <GridView grid={2}>
                        <Field name="firstName">
                          {({ field, meta }: FieldRenderProps) => {
                            return (
                              <Input
                                label="First name"
                                cssClass="text-white"
                                error={
                                  meta.touched && meta.error ? meta.error : null
                                }
                                {...field}
                              />
                            );
                          }}
                        </Field>

                        <Field name="lastName">
                          {({ field, meta }: FieldRenderProps) => {
                            return (
                              <Input
                                label="Last name"
                                cssClass="text-white"
                                error={
                                  meta.touched && meta.error ? meta.error : null
                                }
                                {...field}
                              />
                            );
                          }}
                        </Field>
                      </GridView>

                      <Field name="email">
                        {({ field, meta }: FieldRenderProps) => {
                          return (
                            <Input
                              label="email"
                              cssClass="text-white"
                              error={
                                meta.touched && meta.error ? meta.error : null
                              }
                              {...field}
                            />
                          );
                        }}
                      </Field>

                      <Field name="company">
                        {({ field, meta }: FieldRenderProps) => {
                          return (
                            <Input
                              label="Company Name"
                              cssClass="text-white"
                              error={
                                meta.touched && meta.error ? meta.error : null
                              }
                              {...field}
                            />
                          );
                        }}
                      </Field>
                      <Field name="employee_count">
                        {({ field, meta }: FieldRenderProps) => {
                          return (
                            <Input
                              label="Employee Count"
                              cssClass="text-white"
                              error={
                                meta.touched && meta.error ? meta.error : null
                              }
                              {...field}
                            />
                          );
                        }}
                      </Field>

                      <Field name="address">
                        {({ field, meta }: FieldRenderProps) => {
                          return (
                            <Input
                              label="Address"
                              type="text"
                              cssClass="text-white"
                              error={
                                meta.touched && meta.error ? meta.error : null
                              }
                              {...field}
                            />
                          );
                        }}
                      </Field>
                      <GridView grid={2}>
                        <Field name="city">
                          {({ field, meta }: FieldRenderProps) => {
                            return (
                              <Input
                                label="City"
                                cssClass="text-white"
                                error={
                                  meta.touched && meta.error ? meta.error : null
                                }
                                {...field}
                              />
                            );
                          }}
                        </Field>

                        <Field name="state">
                          {({ field, meta }: FieldRenderProps) => {
                            return (
                              <Input
                                label="State"
                                cssClass="text-white"
                                error={
                                  meta.touched && meta.error ? meta.error : null
                                }
                                {...field}
                              />
                            );
                          }}
                        </Field>
                      </GridView>
                      <Field name="zip_code">
                        {({ field, meta }: FieldRenderProps) => {
                          return (
                            <Input
                              label="Zip/Postal Code"
                              cssClass="text-white"
                              error={
                                meta.touched && meta.error ? meta.error : null
                              }
                              {...field}
                            />
                          );
                        }}
                      </Field>
                      <Field name="region">
                        {({ field, meta }: FieldRenderProps) => {
                          return (
                            <Input
                              label="Region"
                              cssClass="text-white"
                              error={
                                meta.touched && meta.error ? meta.error : null
                              }
                              {...field}
                            />
                          );
                        }}
                      </Field>

                      {/* </Form> */}
                    </div>
                  </div>
                </div>
                <div className="horizontal-line-div">
                  <hr className="horizontal-line" />
                </div>
                <div className="billing-info-section">
                  <div className="">
                    <div className="billing-info-text">
                      <div className="billing-info-num">
                        <Typography type="p" text="3" cssClass="p-20 " />
                      </div>
                      <Typography
                        type="p"
                        text="Payment Method"
                        cssClass="p-20  m-b-0px package-p"
                      />
                    </div>
                  </div>
                  <div className="billing-info-form">
                    {/* <Form> */}

                    <div className="form-group form-group-radio">
                      {/* <div className="form-label-div">
                          <label htmlFor="Featured">Featured</label>
                        </div> */}

                      <div className="card-radio-div">
                        <div className="single-radio single-radio-margin">
                          <input
                            type="radio"
                            // id="radioPublic"
                            name="payment"
                            className="radio-privacy"
                            // value={privacyPublic}
                            value="stripe"
                            defaultChecked
                            onChange={(e) => paymentChange(e.target.value)}
                          />
                          <div className="payment-background">
                            <Image
                              source="stripeLogo"
                              cssClass="payment-card-img stripe-img"
                            />
                          </div>

                          <label
                            className="radio-privacy-label"
                            htmlFor="radioYes"
                          ></label>
                          {/* <p>Will be featured</p> */}
                        </div>

                        <div className="single-radio">
                          <input
                            type="radio"
                            // id="radioPrivate"
                            name="payment"
                            className="radio-privacy"
                            // value={privacyPrivate}
                            value="paystack"
                            // defaultChecked
                            onChange={(e) => paymentChange(e.target.value)}
                          />
                          <div className="payment-background">
                            <Image
                              source="paystackLogo"
                              cssClass="payment-card-img"
                            />
                          </div>
                          <label
                            className="radio-privacy-label"
                            htmlFor="radioNo"
                          ></label>
                          {/* <p>Will not be featured</p> */}
                        </div>
                      </div>
                    </div>
                    <FieldArray
                      name="cardDetails"
                      render={arrayHelpers => (
                      <div>
                        <Field name={`cardDetails.number`}>
                          {({ field, meta }: FieldRenderProps) => {
                            return (
                              <Input
                                label="Card Number"
                                cssClass="text-white"
                                error={meta.touched && meta.error ? meta.error : null}
                                {...field}
                              />
                            );
                          }}
                        </Field>
                        <GridView grid={2}>
                          <Field name={`cardDetails.expiry_month`}>
                            {({ field, meta }: FieldRenderProps) => {
                              return (
                                <Input
                                  label="Exp. Month"
                                  cssClass="text-white"
                                  error={meta.touched && meta.error ? meta.error : null}
                                  {...field}
                                />
                              );
                            }}
                          </Field>
                          <Field name={`cardDetails.expiry_year`}>
                            {({ field, meta }: FieldRenderProps) => {
                              return (
                                <Input
                                  label="Exp. Year"
                                  cssClass="text-white"
                                  error={meta.touched && meta.error ? meta.error : null}
                                  {...field}
                                />
                              );
                            }}
                          </Field>
                        </GridView>
                        <GridView grid={2}>
                          <Field name={`cardDetails.cvv`}>
                            {({ field, meta }: FieldRenderProps) => {
                              return (
                                <Input
                                  label="CVV"
                                  cssClass="text-white"
                                  error={meta.touched && meta.error ? meta.error : null}
                                  {...field}
                                />
                              );
                            }}
                          </Field>
                          <Field name={`cardDetails.pin`}>
                            {({ field, meta }: FieldRenderProps) => {
                              return (
                                <Input
                                  label="Pin"
                                  cssClass="text-white"
                                  error={meta.touched && meta.error ? meta.error : null}
                                  {...field}
                                />
                              );
                            }}
                          </Field>
                        </GridView>
                      </div>
                      )}
                    />
                    {/* </Form> */}
                  </div>
                </div>
              </div>
              {/* </Formik> */}
            </FormikStep>

            {/* THIRD LAST STEP OF THE MULTI-STEP FORM */}
            {/* <FormikStep label="OTP Verification">
              <div className="">
                <div className="billing-payment-heading">
                  <Typography
                    type="h3"
                    text="Verify Purchase($45)"
                    cssClass="head-27 text-center  m-b-30px main-heading-second"
                  />
                  <Typography
                    type="p"
                    text="Hello {Name} Kindly check your email for a verification code to validate your purchase ."
                    cssClass="p-20  m-b-10px keep-messages__sub-heading"
                  />
                  <Typography
                    type="p"
                    text="We sent a 6-digit verification code to {name@gmail.com}."
                    cssClass="p-20  m-b-10px keep-messages__sub-heading"
                  />
                </div>
                <div className="verification-input">
                  <ReactCodeInput />
                </div>
                <div className="email-resend-div">
                  <Typography
                    type="p"
                    text="Didn't receive the email?"
                    cssClass="p-20  m-b-10px keep-messages__sub-heading"
                  />
                  <Link to="" className="link">
                    Resend
                  </Link>
                </div>
              </div>
            </FormikStep> */}
          </FormikStepper>
        </div>
      </section>
      <Footer />
    </>
  );
};

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(
    children,
  ) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);

          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}
          {/* CONTROL BUTTONS FOR THE MULTI-STEP FORM */}
          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  // color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                // color="primary"
                type="submit"
              >
                {isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
export default PricingPayment;