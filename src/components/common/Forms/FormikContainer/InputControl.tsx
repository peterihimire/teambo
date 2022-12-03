import React from "react";
import { Field } from "formik";
import Input from "../../Input/Input";

interface FieldRenderProps {
  field: any;
  meta: any;
}
interface Props {
  name: any;
  label?: any;
  hasIcon?: any;
  iconId?: any;
}
const InputControl: React.FC<Props> = (props) => {
  const { name, label, hasIcon, iconId } = props;
  return (
    <Field name={name}>
      {({ field, meta }: FieldRenderProps) => {
        return (
          <Input
            label={label ? label : ""}
            iconId={hasIcon ? iconId : null}
            error={meta.touched && meta.error ? meta.error : null}
            {...field}
          />
        );
      }}
    </Field>
  );
};

export default InputControl;
