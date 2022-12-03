import React from "react";

import Typography from "./../../../common/Typography/Typography";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
import Image from "./../../../common/Image/Image";

interface Props {
  history?: any;
}
const ProfileSettingsIndex: React.FC<Props> = ({ history }) => {
  return (
    <DashboardLayoutOneRight>
      <div className="flex-r-jccenter">
        <div className="empty-state">
          <Image
            source="pic24"
            maxWidth="23.1rem"
            maxHeight="12.7rem"
            cssClass="m-t-70px m-b-50px m-x-auto display-block"
          />
          <Typography
            text="Select category"
            type="h3"
            cssClass="head-4 text-center m-b-10px"
          />
          <Typography
            text="You can select required category to setup"
            type="p"
            cssClass="head-5 text-center"
          />
          <Typography
            text="details about your account"
            type="p"
            cssClass="head-5 text-center m-b-35px"
          />
        </div>
      </div>
    </DashboardLayoutOneRight>
  );
};

export default ProfileSettingsIndex;
