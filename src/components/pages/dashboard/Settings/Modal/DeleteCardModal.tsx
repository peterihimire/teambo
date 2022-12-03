import React from "react";
import Button from "../../../../common/Button/Button";
import { CreditCard } from "../../../../common/CreditCard";
import ModalChild from "../../../../common/Modal/ModalChild";
import ModalLayout from "../../../../common/Modal/ModalLayout";
import Typography from "../../../../common/Typography/Typography";

interface Props {
  set: (e: boolean) => void;
}

const DeleteCardModal: React.FC<Props> = ({ set }) => {
  return (
    <ModalLayout>
      <ModalChild padding="3rem 3rem 3rem">
        <section className="flex-r-jcbetween-aicenter m-b-40px">
          <Typography type="h5" text="Delete Card" cssClass="head-9" />
          <Button
            handleClick={() => set(false)}
            cssClass="btn btn-icon"
            icon="icon-times"
            iconClass="icon-times"
          />
        </section>

        <section className="flex-r-jccenter">
          <section>
            <Typography
              type="p"
              text="Are you sure you want to delete this card from Timbo"
              cssClass="p-6 m-b-20px"
            />

            <CreditCard />
          </section>
        </section>
        <section className="flex-r-jcbetween-aicenter m-t-120px">
          <Button
            cssClass="btn btn--grey btn--small radius-7px flex-r-jccenter-aicenter"
            text="Cancel"
            type="button"
            handleClick={() => set(false)}
          />
          <Button
            cssClass="btn btn--primary btn--small radius-7px flex-r-jccenter-aicenter"
            text="Yes"
            type="button"
          />
        </section>
      </ModalChild>
    </ModalLayout>
  );
};

export default DeleteCardModal;
