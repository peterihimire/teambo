import React,{useState} from "react";
import * as yup from "yup";
import { useHistory , useParams} from "react-router-dom";
import { Form, Formik, FastField } from "formik";
import scheduleService from "../../../services/scheduleService";
import GridView from "../GridView/GridView";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormValues {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  members: "";
  note: string;
  group: string;
}

interface FieldRenderProps {
  field: any;
  meta: any;
}

const initialValues: FormValues = {
  title: "",
  date: "",
  startTime: "",
  endTime: "",
  members: "",
  note: "",
  group: "",
};

const validationSchema = yup.object({
  title: yup.string().required("Required *"),
  startTime: yup.string().required("Required *"),
  endTime: yup.string().required("Required *"),
  note: yup.string().required("Required *"),
});

const getDuration = (start:any, end:any)=>{
  const [startHr, startMin] = start.split(":")
  const [endHr, endMin] = end.split(":")
  // console.log(startHr,startMin,endHr,endMin);
  const startDate: any = new Date(2000, 0, 1,  startHr, startMin); // 9:00 AM
  const endDate: any = new Date(2000, 0, 1, endHr, endMin); // 5:00 PM
  if (endDate < startDate) {
      endDate.setDate(endDate.getDate() + 1);
  }
  return endDate - startDate;
}
type SignupOneProps = {};


const FormEditSchedule: React.FC<SignupOneProps> = () => {
  
  const {id}:any = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
   
  
  const onSubmit = async (values: any) => {
    const {endTime, note, startTime, title} =  values
    let duration = getDuration(startTime,endTime);
    const data = {title, note, duration}
    console.log(data);
    try{
      setLoading(true);
      const response = await scheduleService.editSchedule(id,data);
      console.log(response);
      return history.push("/user/schedule-list");
    }catch(err:any){
        console.log(err.response)
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }finally{
      setLoading(false);
    }
  };
  const cancel = async () => {
    history.push("/user/schedule-lists");
    history.go(0);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <ToastContainer />
        <FastField name="title">
          {({ field, meta }: FieldRenderProps) => {
            return (
              <Input
                label="Title"
                iconId="icon-message-open"
                placeholder="Start typing..."
                error={meta.touched && meta.error ? meta.error : null}
                {...field}
              />
            );
          }}
        </FastField>
          <GridView grid={2}>
            <FastField name="startTime">
              {({ field, meta }: FieldRenderProps) => {
                return (
                  <Input
                    type="time"
                    label="Time from"
                    // iconId="icon-solid-time"
                    // placeholder="4:00"
                    error={meta.touched && meta.error ? meta.error : null}
                    {...field}
                  />
                );
              }}
            </FastField>
            <FastField name="endTime">
              {({ field, meta }: FieldRenderProps) => {
                return (
                  <Input
                    type="time"
                    label="Time to"
                    // iconId="icon-solid-time"
                    // placeholder="5:00"
                    error={meta.touched && meta.error ? meta.error : null}
                    {...field}
                  />
                );
              }}
            </FastField>
          </GridView>
        <FastField name="note">
          {({ field, meta }: FieldRenderProps) => {
            return (
              <Input
                label="Note"
                iconId="icon-message-open"
                placeholder="Start typing..."
                error={meta.touched && meta.error ? meta.error : null}
                {...field}
              />
            );
          }}
        </FastField>

        <div className="flex-r-jcbetween m-t-120px">
          <div>
            <Button
              cssClass="btn--primary btn--small"
              text="Edit Event"
              type="submit"
              isLoading={loading}
            />
          </div>

          <Button handleClick={cancel} cssClass="btn--grey btn--small m-l-10px" text="Cancel" />
        </div>
      </Form>
    </Formik>
  );
};

export default FormEditSchedule;
