import React from "react";

import ModalLayout from "./../Modal/ModalLayout";
import ModalChild from "./../Modal/ModalChild";
import Typography from "./../Typography/Typography";
import Button from "./../Button/Button";

interface Props {
  handleClick: () => void;
  success: string;
}

const ModalContactUs: React.FC<Props> = ({ handleClick, success }) => {
  return (
    <ModalLayout>
      <ModalChild>
        <div className="modal__head m-b-100px">
          <Typography type="h3" text="Message Sent" />
          <Button
            cssClass="btn btn-icon"
            icon="icon-times"
            iconClass="icon-times"
            handleClick={handleClick}
          />
        </div>

        <Typography
          type="p"
          text={success}
          cssClass="modal-join-meeting__footer-text"
        />
      </ModalChild>
    </ModalLayout>
  );
};

export default ModalContactUs;
