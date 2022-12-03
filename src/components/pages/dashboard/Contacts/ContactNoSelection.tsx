import React from "react";

import {Typography, Image, Button} from "./../../../common";
import { Link } from "react-router-dom";

interface CallsProps {}
const ContactNoSelection: React.FC<CallsProps> = () => {
  return (
    <>
      <div className="flex-r-jccenter">
        <div className="empty-state">
          <Image
            source="pic5"
            maxWidth="23.1rem"
            maxHeight="19.81rem"
            cssClass="empty-state__conference-img"
          />
          <Typography
            text="Add a timbo user as your contact"
            type="p"
            cssClass="head-5 text-center m-b-35px"
          />

    
          <Link to="/user/add-contact" className="text-deco-none">
            <Button
              cssClass="btn btn--primary btn--small btn-center btn-icon-n-text"
              text="Add Contact"
            />
          </Link>

          {/* <Button
            cssClass="btn btn-icon-naked btn--small btn-center btn-icon-n-text m-t-90px"
            withIcon={true}
            iconClass="icon-cancel-arrow m-r-5px"
            btnIcon="icon-cancel-arrow"
            text="Deselect All"
          /> */}
        </div>
      </div>
    </>
  );
};

export default ContactNoSelection;
