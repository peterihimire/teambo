import React from "react";

import Typography from "./../../../common/Typography/Typography";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
import Button from "./../../../common/Button/Button";
import TeamAndUserSettings from "./../../../common/TeamAndUserSettings/TeamAndUserSettings";
import useDialogHook from "../../../../utils/hooks/useDialogHook";
import AddStaffModal from "./Modal/AddStaffModal";
import { userStore } from "./../../../../store/userStore";
import { useHistory } from "react-router";

interface Props {
  history?: any;
}
const TeamsSettings: React.FC<Props> = ({ history }) => {
  const hist = useHistory();
  const { user } = userStore();
  const teamMembers = user.own_company.staffs;
  const { open, handleClose, handleOpen } = useDialogHook();
  const cancel = async () => {
    hist.push("/user/settings");
  };
  return (
    <DashboardLayoutOneRight>
      <div className="flex-r-jcbetween-aicenter m-b-40px">
        <Typography type="h5" text="Teams & Users" cssClass="head-9" />

        <div className="flex-r-aicenter">
          <Button cssClass="btn--grey btn--xxsmall m-l-10px" text="All" />
          {/* <Button
            cssClass="btn--grey btn--xxsmall btn--naked m-l-10px"
            text="Business"
          />
          <Button
            cssClass="btn--grey btn--xxsmall btn--naked m-l-10px"
            text="Private"
          /> */}
          <Button
            cssClass="btn btn-icon m-l-10px"
            icon="icon-plus-shadow"
            iconClass="icon-plus-shadow"
            handleClick={handleOpen}
          />

          {open && <AddStaffModal handleClick={handleClose} />}
        </div>
      </div>

      {teamMembers.map((teamMember: { uid: string; image: string; first_name: string; last_name: string; email: string; company_permit: string; }, index:any) => (
        <TeamAndUserSettings key={index} userId={teamMember.uid} pic={teamMember.image} name={ teamMember.first_name ? teamMember.first_name : teamMember.email } company_permit={teamMember.company_permit}/>
      ))}

      <div className="flex-r-jcbetween m-t-200px">
        <div>
          <Button
            cssClass="btn--primary btn--small"
            text="Update Settings"
            type="submit"
          />
          <Button handleClick={cancel} cssClass="btn--grey btn--small m-l-10px" text="Cancel" />
        </div>

        <Button
          cssClass="btn btn--small btn--all-grey btn-icon-n-text"
          withIcon={true}
          btnIcon="icon-trash-sm"
          iconClass="icon-trash-sm btn-icon-n-text__icon"
          text="Deactivate Account"
        />
      </div>
    </DashboardLayoutOneRight>
  );
};

export default TeamsSettings;
