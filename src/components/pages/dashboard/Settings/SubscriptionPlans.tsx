import { Button, CircularProgress, Grid, Switch } from "@material-ui/core";
import {
  Field,
  FieldArray,
  Form,
  Formik,
  FormikConfig,
  FormikValues,
} from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { userStore } from "../../../../store/userStore";
import { GridView, Typography, Image, Input } from "../../../common";
import { SubscriptionPlan } from "../../../common/SubscriptionPlan";
import paymentStore from "../../../../store/paymentStore";
import paymentService from "../../../../services/paymentService";
import { toast, ToastContainer } from "react-toastify";

interface Props {}

const SubscriptionPlans: React.FC<Props> = () => {
  const email = userStore((state) => state.user.email);

  const paymentInfo = {
    firstName: "",
    lastName: "",
    package: "",
    email: email,
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
  };

  interface FieldRenderProps {
    field: any;
    meta: any;
  }

  const validationSchema = yup.object({
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
    }),
  });

  // FOR THE CARD PAYMENT METHOD TYPE
  const [paymentType, setPaymentType] = useState<string>("stripe");
  const paymentChange = (e: any) => {
    setPaymentType(e);
  };

  // FOR PACKAGE TYPE
  const [packageId, setPackageId] = useState<string>("");
  const [step, setStep] = useState(0);

  const choosePackage = (uid: string) => {
    setPackageId(uid);
    setStep(1);
  };

  //Submit
  const onSubmit = async (values: any) => {
    const data = {
      plan: packageId,
      transaction_email: email,
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
      paymentMode: paymentType.toUpperCase(),
      city: values.city,
      state: values.state,
      zip_code: values.zip_code,
      region: values.region,
    };

    return await paymentService
      .changePlan(data)
      .then((response) => {
        toast.success("Successful");
        return true;
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        return false;
      });
  };

  // FOR THE MONTHLY/ ANNUALLY PLAN SELECT
  const [checked, setChecked] = useState<boolean>(false);
  const handleChange = (event: any) => {
    setChecked(event.target.checked);
  };

  //Packages
  const [packages, setPackages] = useState<any>([]);
  const { fetchPackagePlans, getUserSub, packagePlans, isLoading } =
    paymentStore();

  useEffect(() => {
    // if (checked === false) {
    //   setPackages(
    //     packagePlans.filter(
    //       (packagePlan: any) => packagePlan?.interval === "MONTHLY"
    //     )
    //   );
    // } else if (checked === true) {
    //   setPackages(
    //     packagePlans.filter(
    //       (packagePlan: any) => packagePlan?.interval === "YEARLY"
    //     )
    //   );
    // } else {
      setPackages(packagePlans);
    // }
    // eslint-disable-next-line
  }, [packagePlans, checked]);

  useEffect(() => {
    fetchPackagePlans();
    getUserSub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ToastContainer />
      <FormikStepper
        onSubmit={onSubmit}
        initialValues={paymentInfo}
        step={step}
        setStep={setStep}
        pId={packageId}
        enableReinitialize
      >
        {/* FIRST STEP  OF THE MULTI-STEP FORM*/}
        <FormikStep label="Choose Product Package">
          {/* PACKAGE PLAN SECTION */}
          <div className="m-b-40px">
            <div className="m-b-100px switch-invisible">
              <Typography type="p" text="Monthly" cssClass="p-16  m-b-0px " />

              <Switch
                onChange={handleChange}
                color="primary"
                checked={checked}
                name="checked"
              />
              <Typography type="p" text="Annually" cssClass="p-16  m-b-0px " />
            </div>
          </div>

          {isLoading ? (
            "Loading..."
          ) : (
            <GridView grid={4}>
              {packages.map((plan: any, idx: number) => (
                <SubscriptionPlan
                  key={idx}
                  {...plan}
                  onSelect={choosePackage}
                />
              ))}
            </GridView>
          )}
        </FormikStep>

        {/* SECOND STEP OF THE MULTI-STEP FORM */}
        <FormikStep label="Payment" validationSchema={validationSchema}>
          <div className="">
            <div className="billing-payment-info">
              <div className="billing-info-section">
                <div className="">
                  <div className="billing-info-text">
                    <div className="billing-info-num">
                      <Typography type="p" text="1" cssClass="p-20 " />
                    </div>
                    <Typography
                      type="p"
                      text="Billing Information"
                      cssClass="p-16  m-b-0px"
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
                            cssClass=""
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
                            cssClass=""
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
                          cssClass=""
                          readOnly
                          error={meta.touched && meta.error ? meta.error : null}
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
                          cssClass=""
                          error={meta.touched && meta.error ? meta.error : null}
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
                          cssClass=""
                          error={meta.touched && meta.error ? meta.error : null}
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
                          cssClass=""
                          error={meta.touched && meta.error ? meta.error : null}
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
                            cssClass=""
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
                            cssClass=""
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
                          cssClass=""
                          error={meta.touched && meta.error ? meta.error : null}
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
                          cssClass=""
                          error={meta.touched && meta.error ? meta.error : null}
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
                    <Typography type="p" text="2" cssClass="p-20 " />
                  </div>
                  <Typography
                    type="p"
                    text="Payment Method"
                    cssClass="p-16  m-b-0px"
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
                    <div className="single-radio settings single-radio-margin">
                      <input
                        type="radio"
                        id="stripe"
                        name="payment"
                        className="radio-privacy"
                        // value={privacyPublic}
                        value="stripe"
                        defaultChecked
                        onChange={(e) => paymentChange(e.target.value)}
                      />
                      <label htmlFor="stripe">
                        <div className="payment-background">
                          <Image
                            source="stripeLogo"
                            cssClass="payment-card-img stripe-img"
                          />
                        </div>
                      </label>
                    </div>

                    <div className="single-radio settings">
                      <input
                        type="radio"
                        id="paystack"
                        name="payment"
                        className="radio-privacy"
                        // value={privacyPrivate}
                        value="paystack"
                        // defaultChecked
                        onChange={(e) => paymentChange(e.target.value)}
                      />
                      <label htmlFor="paystack">
                        <div className="payment-background">
                          <Image
                            source="paystackLogo"
                            cssClass="payment-card-img"
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <FieldArray
                  name="cardDetails"
                  render={(arrayHelpers) => (
                    <div>
                      <Field name={`cardDetails.number`}>
                        {({ field, meta }: FieldRenderProps) => {
                          return (
                            <Input
                              label="Card Number"
                              cssClass=""
                              error={
                                meta.touched && meta.error ? meta.error : null
                              }
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
                                cssClass=""
                                error={
                                  meta.touched && meta.error ? meta.error : null
                                }
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
                                cssClass=""
                                error={
                                  meta.touched && meta.error ? meta.error : null
                                }
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
                                cssClass=""
                                error={
                                  meta.touched && meta.error ? meta.error : null
                                }
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
                                cssClass=""
                                error={
                                  meta.touched && meta.error ? meta.error : null
                                }
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
        </FormikStep>
      </FormikStepper>
    </div>
  );
};

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

interface FSt extends FormikConfig<FormikValues> {
  step: number;
  setStep: (e: number) => void;
  pId: string;
}

export function FormikStepper({ children, step, setStep, pId, ...props }: FSt) {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];

  const currentChild = childrenArray[step];

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  const { packagePlans } = paymentStore();
  const pPrice: any = packagePlans.filter((p: any) => p?.uid === pId);

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          const ff = await props.onSubmit(values, helpers);
          if (ff) {
            setTimeout(() => {
              window.location.href = "/user/dashboard";
            }, 1500);
          }
        } else {
          setStep(step + 1);

          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          {currentChild}
          {/* CONTROL BUTTONS FOR THE MULTI-STEP FORM */}
          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              {isLastStep() && (
                <Button
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={isSubmitting}
                  variant="contained"
                  type="submit"
                >
                  {isSubmitting
                    ? "Submitting"
                    : `Submit - $${pPrice[0]?.price}`}
                </Button>
              )}
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default SubscriptionPlans;
