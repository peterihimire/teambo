import React from "react";

import Typography from "../../../common/Typography/Typography";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
import FormGeneralProfileInfo from "../../../common/Forms/FormGeneralProfileInfo";

interface Props {
  history?: any;
}
const GeneralProfileSettings: React.FC<Props> = ({ history }) => {
  return (
    <DashboardLayoutOneRight>
      <Typography
        type="h5"
        text="General information"
        cssClass="head-9 m-b-40px"
      />
      <FormGeneralProfileInfo />
    </DashboardLayoutOneRight>
  );
};

export default GeneralProfileSettings;
