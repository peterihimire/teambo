import React from "react";
// import { MultiSelect } from "react-multi-select-component";
import { FastField } from "formik";
import DataList from "./../../Input/DataList";


interface FieldRenderProps {
  field: any;
  meta: any;
}
interface Props {
  name: any;
  list?: any;
  label?: any;
  hasIcon?: any;
  iconId?: any;
  options?: Array<any>;
  placeholder?: any;
}
const DataListControl: React.FC<Props> = (props) => {
  const { name, options, label, list, placeholder } = props;
  return (
    <FastField name={name} id={name}>
      {({ field, meta }: FieldRenderProps) => {
        return (
          <DataList
            name={name}
            list={list}
            label={label}
            options={options}
            placeholder={placeholder}
            error={meta.touched && meta.error ? meta.error : null}
            {...field}
          />
        );
      }}
    </FastField>
  );
};

export default DataListControl;
