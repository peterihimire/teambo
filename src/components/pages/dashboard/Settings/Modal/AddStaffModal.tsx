import { useState } from "react";

import {ModalChild, ModalLayout, Typography, Button} from "../../../../common";
import { toast, ToastContainer } from 'react-toastify';

import companyService from "../../../../../services/companyService";
import Svg  from "../../../../common/Svg/Svg";
import { userStore } from "../../../../../store/userStore";

interface Props {
  handleClick: () => void;
}
const AddStaffModal: React.FC<Props> = ({ handleClick }) => {
  const { getUser } = userStore();

  // const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [customEmail, setCustomEmail] = useState("");
  const [customParticipants, setCustomParticipants] :any  = useState([]); 
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
  const onSubmit = async () => {
    let participants:string[] = customParticipants
    console.log(participants)
    setLoading(true)

    // const data: any = {
    //   participants
    // };
    // data.email = email;
    companyService.addStaff(participants)
    .then(response => {
      getUser();
      handleClick();
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      setLoading(false)
    }).catch (err => {
      setLoading(false)
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message, {
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
    <ModalLayout>
    <ToastContainer />
      <ModalChild width="46.5rem" padding="3rem 3rem 5rem">
        <div className="modal__head m-b-30px">
          <Typography type="h3" text="Add a Staff Member to the Team" />
          <Button
            cssClass="btn btn-icon"
            icon="icon-times"
            iconClass="icon-times"
            handleClick={handleClick}
          />
        </div>
        {/* <Input
          onChange={(e: any) => setEmail(e.target.value)}
          value={email}
          name="email"
          label="email"
        /> */}
        <div className="input-container">
          <label htmlFor="member" className="input__label">Staff</label>
            <div className="input__holder">
              <input className="input__ele" list="members" placeholder="add staff's email" onChange={customHandleEmailChange} value={customEmail}/>
              <Svg
                iconId="icon-plan-check"
                handleClick={handleAddParticipant}
                cssClass="member-checkbox__button" 
              />
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

        <div className="modal-invite-people__actions m-t-60px">
          <Button
            cssClass="btn btn--small btn--primary"
            isLoading={loading}
            text="Add"
            handleClick={onSubmit}
          />
        </div>
      </ModalChild>
    </ModalLayout>
  );
};

export default AddStaffModal;
