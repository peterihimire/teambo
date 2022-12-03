import React from "react";
import InputControl from "./InputControl";
import SelectControl from "./SelectControl";
import DataListControl from "./DataListControl";
import FancyCheckbox from "./FancyCheckbox";

interface Props {
  control?: any;
  name: any;
  list?: any;
  label?: any;
  hasIcon?: boolean;
  iconId?: any;
  options?: any;
  optionClass?: string;
  cssClass?: string;
  placeholder?: any;
}
const FormikControl: React.FC<Props> = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <InputControl {...rest} />;
    case "textarea":
      return <InputControl {...rest} />;
    case "select":
      return <SelectControl {...rest} />;
    case "radio":
      return <InputControl {...rest} />;
    case "checkbox":
      return <InputControl {...rest} />;
    case "date":
      return <InputControl {...rest} />;
    case "datalist":
      return <DataListControl {...rest} />;
    case "fancycheckbox":
      return <FancyCheckbox {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
