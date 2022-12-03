import React from "react";

import Typography from "./../../../common/Typography/Typography";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
import SwitchOption from "./../../../common/SwitchOptions/SwitchOption";
import Button from "./../../../common/Button/Button";

interface Props {
  history?: any;
}
const IntegrationSettings: React.FC<Props> = ({ history }) => {
  return (
    <DashboardLayoutOneRight>
      <Typography type="h5" text="Integrations" cssClass="head-9 m-b-40px" />

      <SwitchOption
        pic="dropbox"
        title="Dropbox"
        subTitle="Bring a faster teamwork and faster file synchronization"
      />
      <SwitchOption
        pic="invision"
        title="Invision"
        subTitle="Design better and faster"
      />
      <SwitchOption
        pic="jira"
        title="Jira"
        subTitle="Stay agile and increase productivity"
      />
      <SwitchOption
        pic="intercom"
        title="Intercom"
        subTitle="Communicate faster with clients"
      />
      <SwitchOption
        pic="trello"
        title="Trello"
        subTitle="Collaborate with your teammates faster"
      />
      <SwitchOption
        pic="producthunt"
        title="Product Hunt"
        subTitle="Get new products notifications right on your dashboard"
      />
      <SwitchOption
        pic="gdocs"
        title="Google Docs"
        subTitle="Connect all your documents in one place"
      />

      <div className="flex-r-jcbetween m-t-120px">
        <div>
          <Button
            cssClass="btn--primary btn--small"
            text="Update Settings"
            type="submit"
          />
          <Button cssClass="btn--grey btn--small m-l-10px" text="Cancel" />
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

export default IntegrationSettings;
