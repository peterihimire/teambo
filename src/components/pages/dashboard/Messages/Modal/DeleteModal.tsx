import React, {useState } from "react";

import {ModalChild, ModalLayout, Typography, Button} from "../../../../common";

interface Props {
  handleClick: () => void;
  handleSubmit: ()=>void;
  afterSubmit:()=>void;
}
const DeleteModal: React.FC<Props> = ({ handleClick, handleSubmit, afterSubmit }) => {
  const [loading, setLoading] = useState(false);

  //the api to post the group details
  const handleDelete = async ()=>{
    console.log("let us delete")
    setLoading(true);
    try{
        const response = await handleSubmit()
        afterSubmit();
        handleClick();
        console.log(response)
    }catch(err:any){
      console.log(err?.response)
    }finally{
      setLoading(false)
    }  
  }

  return (
    <ModalLayout>
      <ModalChild width="46.5rem" padding="3rem 3rem 5rem">
        <div className="modal__head m-b-30px">
          <Typography type="h3" text="Delete" />
          <Button
            cssClass="btn btn-icon"
            icon="icon-times"
            iconClass="icon-times"
            handleClick={handleClick}
          />
        </div>
        <Typography type="p" text="Are you sure you want to delete schedule" />
        <div className="modal-invite-people__actions m-t-60px">     
          <Button
            cssClass="btn btn--small btn--danger"
            isLoading={loading}
            text={"delete"}
            handleClick={handleDelete}
          />
        </div>
      </ModalChild>
    </ModalLayout>
  );
};

export default DeleteModal;
