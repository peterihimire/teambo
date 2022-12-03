import React from "react";

import ModalLayout from "./../Modal/ModalLayout";
import ModalChild from "./../Modal/ModalChild";
import Typography from "./../Typography/Typography";
import Button from "./../Button/Button";
import FormJoinNewConferenceCall from "./../Forms/FormJoinConferenceCall";

interface Props {
  handleClick: () => void;
}

const ModalJoinMeetingWithLink: React.FC<Props> = ({ handleClick }) => {
  return (
    <ModalLayout>
      <ModalChild padding="2rem 3rem 3rem" width="40rem">
        <div className="modal__head m-b-40px">
          <Typography type="h3" text="Join Meeting" />
          <Button
            cssClass="btn btn-icon small"
            icon="icon-times"
            iconClass="icon-times"
            handleClick={handleClick}
          />
        </div>

        <FormJoinNewConferenceCall />
      </ModalChild>
    </ModalLayout>
  );
};

export default ModalJoinMeetingWithLink;
