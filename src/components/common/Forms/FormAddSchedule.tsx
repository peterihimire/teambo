import React,{useState,useEffect} from "react";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { Form, Formik, FastField } from "formik";

import contactService from "../../../services/contactService";
import scheduleService from "../../../services/scheduleService";
import GridView from "../GridView/GridView";
import Button from "../Button/Button";
import Input from "../Input/Input";
import FormikControl from "./FormikContainer/FormikControl";
import Svg  from "../Svg/Svg";
import { toast } from 'react-toastify';

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
  date: yup.string().required("Required *"),
  startTime: yup.string().required("Required *"),
  endTime: yup.string().required("Required *"),
  // members: yup.array().required("Required *"),
  note: yup.string().required("Required *"),
  group: yup.string().required("Required *"),
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


const FormAddSchedule: React.FC<SignupOneProps> = () => {
  

  const history = useHistory();
  const [contacts,setContacts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [customEmail, setCustomEmail] = useState("");
  const [customParticipants, setCustomParticipants] :any  = useState([]); 
  
  useEffect(()=>{
    contactService.getAllUserContacts().then(({ data }) => {
      setContacts(data);
    }).catch((err)=>{
      console.log("error",err.response);
    });
  },[])
  const customHandleEmailChange = (e:any)=>{
    const {value} = e.target;
    setCustomEmail(value);
  }
  const handleAddParticipant = ()=>{
    if(!customParticipants.includes(customEmail) && customEmail !== ""){
      setCustomParticipants([...customParticipants ,customEmail])
    }
    setCustomEmail("")
  }
  const handleRemoveParticipant = (participant:string)=>{
    setCustomParticipants(customParticipants.filter((participants:string)=>participants!==participant)) 
  }
  const onSubmit = async (values: any) => {
    // const {date, endTime, note, startTime, title,members,group} =  values
    const {date, endTime, note, startTime, title, group} =  values
    const started_at = `${date}T${startTime}`
    let duration = getDuration(startTime,endTime);
    let token = "token"
    let participants:string[] = customParticipants
    const data = {type:"VIDEO", 
    privacy: group,
    stages:[],
    title, note, token, started_at, duration, participants}
    console.log(data);
    try{
      setLoading(true);
      const response = await scheduleService.createNewSchdule(data);
      console.log(response);
      return history.push("/user/schedule-list");
    }catch(err:any){
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
    history.push("/user/schedule-list");
    history.go(0);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
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
          <FastField name="date">
            {({ field, meta }: FieldRenderProps) => {
              return (
                <Input
                  label="Date"
                  type="date"
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
        </GridView>
        {/* <FormikControl
          control="datalist"
          name="members"
          label="Members"
          list="members"
          options={contacts}
        /> */}
        <div className="input-container">
          <label htmlFor="member" className="input__label">Member</label>
            <div className="input__holder">
              <input className="input__ele" list="members" placeholder="add participant's email" onChange={customHandleEmailChange} value={customEmail}/>
              <Svg
                iconId="icon-plan-check"
                handleClick={handleAddParticipant}
                cssClass="member-checkbox__button" 
              />
              <datalist id="members" className="input__ele">
                {contacts?.map((contact:any) =>
                  <option value={contact.email} />
                )}
              </datalist>
            </div>
            <div className="member-checkbox">
              {customParticipants?.map((item:string)=>
                <div key={item} className="member-checkbox__label">
                    <span className="member-checkbox__text">{item}</span>
                    <Svg
                      iconId="icon-delete"
                      handleClick={handleRemoveParticipant.bind(this,item)}
                      cssClass="member-checkbox__delete" 
                    />
                </div>)
                }
            </div>
        </div>
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

        <FormikControl
          control="select"
          name="group"
          label="Select group"
          placeholder="Select group"
          options={["PUBLIC", "PRIVATE"]}
        />

        <div className="flex-r-jcbetween m-t-120px">
          <div>
            <Button
              cssClass="btn--primary btn--small"
              text="Create New Event"
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

export default FormAddSchedule;