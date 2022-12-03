import React from "react";

import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";

import FormProfileSecurity from "../../../common/Forms/FormProfileSecurity";

interface Props {
  history?: any;
}
const ProfileSettingsSecurity: React.FC<Props> = ({ history }) => {
  return (
    <DashboardLayoutOneRight>
      <FormProfileSecurity />
    </DashboardLayoutOneRight>
  );
};

export default ProfileSettingsSecurity;
