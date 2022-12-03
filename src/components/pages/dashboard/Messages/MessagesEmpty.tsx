import React from "react";

import {Typography, Image, Button} from "./../../../common";

import useDialogHook from "../../../../utils/hooks/useDialogHook";
import StartNewChatModal from "./Modal/StartNewChatModal";

interface CallsProps {}
const MessagesEmpty: React.FC<CallsProps> = () => {
  const { open, handleClose, handleOpen } = useDialogHook();
  return (
    <>
      <div className="flex-r-jccenter">
        <div className="empty-state">
          <Image
            source="pic7"
            maxHeight="20.5rem"
            maxWidth="23.1rem"
            cssClass="empty-state__img m-x-auto display-block"
          />
          <Typography
            text="Select message"
            type="h3"
            cssClass="head-4 text-center m-b-10px"
          />
          <Typography
            text="To see your existing conversation or share a link below to start new"
            type="p"
            cssClass="head-5 text-center"
          />
          <Typography
            text="anyone with the link"
            type="p"
            cssClass="head-5 text-center m-b-35px"
          />
          <Button
            cssClass="btn--primary btn--big m-t-15px btn-center"
            text="Start new chat"
            handleClick={handleOpen}
          />

          {open && <StartNewChatModal handleClick={handleClose} />}
        </div>
      </div>
    </>
  );
};

export default MessagesEmpty;
