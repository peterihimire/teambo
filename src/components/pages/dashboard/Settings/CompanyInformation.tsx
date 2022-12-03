import React from "react";

import Typography from "../../../common/Typography/Typography";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
import FormCompanyInfo from "../../../common/Forms/FormCompanyInfo";

interface Props {
  history?: any;
}
const CompanyInformation: React.FC<Props> = ({ history }) => {
  return (
    <DashboardLayoutOneRight>
      <Typography
        type="h5"
        text="Company information"
        cssClass="head-9 m-b-40px"
      />

      <FormCompanyInfo history={history} />
    </DashboardLayoutOneRight>
  );
};

export default CompanyInformation;
