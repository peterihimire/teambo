import { useState } from "react";

import {ModalChild, ModalLayout, Typography, Button, Input} from "../../../../common";
import { ToastContainer, toast } from 'react-toastify';

import userService from "../../../../../services/userService";

interface Props {
  handleClick: () => void;
}
const CreateNewSupportModal: React.FC<Props> = ({ handleClick }) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    setLoading(true)

    const data: any = {};
    data.title = title;
    data.description = description;
    userService.createSupport(data)
    .then(response => {
      toast.success('Support Request Created Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        onClose: () => handleClick(),
      })
      setLoading(false)
    }).catch (err => {
      setLoading(false)
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.error[0], {
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
          <Typography type="h3" text="Create New Support Message" />
          <Button
            cssClass="btn btn-icon"
            icon="icon-times"
            iconClass="icon-times"
            handleClick={handleClick}
          />
        </div>
        <Input
          onChange={(e: any) => setTitle(e.target.value)}
          value={title}
          name="title"
          label="title"
        />
        <Input
          name="description"
          label="Message"
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        />

        <div className="modal-invite-people__actions m-t-60px">
          <Button
            cssClass="btn btn--small btn--primary"
            isLoading={loading}
            text="Create"
            handleClick={onSubmit}
          />
        </div>
      </ModalChild>
    </ModalLayout>
  );
};

export default CreateNewSupportModal;
