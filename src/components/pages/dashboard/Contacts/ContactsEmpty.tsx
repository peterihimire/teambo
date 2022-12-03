import React from "react";
import { Link } from "react-router-dom";

import Typography from "./../../../common/Typography/Typography";
import DashboardLayoutOneLeft from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneLeft";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
import Svg from "./../../../common/Svg/Svg";
import Image from "./../../../common/Image/Image";
import Button from "./../../../common/Button/Button";

interface Props {
  history?: any;
}
const ContactsEmpty: React.FC<Props> = ({ history }) => {
  return (
    <>
      <DashboardLayoutOneLeft>
        <aside className="prev-calls-list">
          <Svg
            cssClass="img-calls-empty-space"
            iconId="img-calls-empty-space"
          />
        </aside>
      </DashboardLayoutOneLeft>
      <DashboardLayoutOneRight>
        <div className="flex-r-jccenter">
          <div className="empty-state">
            <Image
              source="pic9"
              maxWidth="23.1rem"
              maxHeight="20.6rem"
              cssClass="m-t-70px m-b-50px m-x-auto display-block"
            />
            <Typography
              text="No contacts found?"
              type="h3"
              cssClass="head-4 text-center m-b-10px"
            />
            <Typography
              text="Try to create more new contacts"
              type="p"
              cssClass="head-5 text-center"
            />

            <Link to="/user/add-contact" className="text-deco-none">
              <Button
                cssClass="btn btn--primary btn--small btn-center m-t-40px"
                text="Add New Contact"
              />
            </Link>
          </div>
        </div>
      </DashboardLayoutOneRight>
    </>
  );
};

export default ContactsEmpty;
