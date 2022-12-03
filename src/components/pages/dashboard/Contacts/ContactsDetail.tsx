import React from "react";

import Typography from "./../../../common/Typography/Typography";
import DashboardLayoutOne from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOne";
import DashboardLayoutOneLeft from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneLeft";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
import Svg from "./../../../common/Svg/Svg";
import DashboardTopNav from "./../DashboardTopNav";
import UserDetails from "./../../../common/Contact/UserDetails";

interface Props {
  history?: any;
}
const Contacts: React.FC<Props> = ({ history }) => {
  return (
    <>
      <main className="dashboard__main">
        <DashboardTopNav title="Contacts" />

        <DashboardLayoutOne>
          <DashboardLayoutOneLeft cssClass="color-2 flex-shrink-0" width="46.2rem">
            <aside className="prev-calls-list">
              <Typography
                type="p"
                cssClass="para-1 m-b-10px"
                text="Search for a call"
              />
              <div className="prev-calls-list__search m-b-50px">
                <Typography
                  type="h3"
                  text="Name, email or phone number"
                  cssClass="head-6"
                />
                <Svg iconId="icon-lens" cssClass="icon-lens" />
              </div>

            </aside>
          </DashboardLayoutOneLeft>
          <DashboardLayoutOneRight>
            <UserDetails />
          </DashboardLayoutOneRight>
        </DashboardLayoutOne>
      </main>
    </>
  );
};

export default Contacts;
