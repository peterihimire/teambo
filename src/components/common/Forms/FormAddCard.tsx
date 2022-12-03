import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import { Button, GridView, Input } from "..";
import paymentService from "../../../services/paymentService";

interface Props {}

const FormAddCard: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object({
    cardHolderName: yup.string().required("Required *").nullable(),
    cardNumber: yup
      .number()
      .typeError("Only numbers are allowed")
      .required("Required *")
      .nullable(),
    exp: yup
      .string()
      .typeError("Invalid expiration date. Example MM/YYYY")
      .max(7, "Not a valid expiration date. Example: MM/YYYY")
      .matches(
        /([0-9]{2})\/([0-9]{4})/,
        "Not a valid expiration date. Example: MM/YYYY"
      )
      .test(
        "test-credit-card-expiration-date",
        "Invalid Expiration Month",
        (expirationDate) => {
          if (!expirationDate) {
            return false;
          }

          const [expMonth] = expirationDate.split("/");

          if (Number(expMonth) > 12) {
            return false;
          }

          return true;
        }
      )
      .test(
        "test-credit-card-expiration-date",
        "Invalid Expiration Date has past",
        (expirationDate) => {
          if (!expirationDate) {
            return false;
          }

          const today = new Date();
          const monthToday = today.getMonth() + 1;
          const yearToday = today.getFullYear().toString();

          const [expMonth, expYear] = expirationDate.split("/");

          if (Number(expYear) < Number(yearToday)) {
            return false;
          } else if (
            Number(expMonth) < monthToday &&
            Number(expYear) <= Number(yearToday)
          ) {
            return false;
          }

          return true;
        }
      )
      .required("Required *")
      .nullable(),
    cvv: yup
      .number()
      .typeError("Must be a number!")
      .required("Required *")
      .nullable(),
    pin: yup.number().required("Required *").nullable(),
  });

  interface FormValues {
    cardHolderName: string;
    cardNumber: string;
    exp: string;
    cvv: string;
    pin: string;
  }

  interface FieldRenderProps {
    field: any;
    meta: any;
  }

  const details: FormValues = {
    cardHolderName: "",
    cardNumber: "",
    exp: "",
    cvv: "",
    pin: "",
  };

  const history = useHistory();

  const onSubmit = (values: any) => {
    const exp = values.exp.split("/");
    const data = {
      cardDetails: {
        cvv: values.cvv,
        number: values.cardNumber,
        expiry_month: exp[0],
        expiry_year: exp[1],
        pin: values.pin,
      },
    };

    setLoading(true);

    paymentService
      .changeCard(data)
      .then(() => {
        toast.success("Card saved");
        setLoading(false);
        history.push("/user/profile-settings/payments");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          if (err.response.data.message) {
            toast.error(err.response.data.message);
          } else {
            toast.error("An error occurred");
          }
        } else {
          toast.error("An error occurred error");
        }
      });
  };

  return (
    <div style={{ width: "100%", maxWidth: 500 }}>
      <ToastContainer />
      <Formik
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={details}
        enableReinitialize
      >
        <Form>
          <Field name="cardHolderName">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  label="Card Holder"
                  error={meta.touched && meta.error ? meta.error : null}
                  {...field}
                />
              );
            }}
          </Field>
          <Field name="cardNumber">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  label="Card Number"
                  error={meta.touched && meta.error ? meta.error : null}
                  {...field}
                />
              );
            }}
          </Field>
          <Field name="exp">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  label="Expiry Date"
                  placeholder="Expiry Date (MM/YYYY)"
                  error={meta.touched && meta.error ? meta.error : null}
                  {...field}
                />
              );
            }}
          </Field>
          <GridView grid={2}>
            <Field name="cvv">
              {({ field, meta }: FieldRenderProps) => {
                return (
                  <Input
                    label="CVV"
                    error={meta.touched && meta.error ? meta.error : null}
                    {...field}
                  />
                );
              }}
            </Field>
            <Field name="pin">
              {({ field, meta }: FieldRenderProps) => {
                return (
                  <Input
                    label="Pin"
                    error={meta.touched && meta.error ? meta.error : null}
                    {...field}
                  />
                );
              }}
            </Field>
          </GridView>

          <div>
            <Button
              cssClass="btn--primary btn--small"
              text="Add Card"
              type="submit"
              disable={loading}
              isLoading={loading}
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default FormAddCard;
