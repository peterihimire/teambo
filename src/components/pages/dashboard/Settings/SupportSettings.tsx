import React, { useState, useEffect } from "react";
import moment from "moment"

import Typography from "../../../common/Typography/Typography";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
import Button from "./../../../common/Button/Button";
import Svg from "./../../../common/Svg/Svg";
import Request from "./../../../common/Request/Request";
import useDialogHook from "../../../../utils/hooks/useDialogHook";
import CreateNewSupportModal from "./Modal/CreateSupportRequestModal";

import userService from "../../../../services/userService";

interface Props {
  history?: any;
}
const SupportSettings: React.FC<Props> = ({ history }) => {
  const { open, handleClose, handleOpen } = useDialogHook();
  
  const [supportMessages, setSupportMessages] = useState<any>([]);
  const fetchSupportMessages = () => {
    userService.getSupportMessages().then((response: any) => {
      const info = response.data.data;
      const result = Object.values(info);
      setSupportMessages(result)
    });
  };
  useEffect(() => {
    (async () => {
      await fetchSupportMessages();
    })();
  },[open]);
  return (
    <DashboardLayoutOneRight padding="0">
      <div className="flex-r support-settings">
        <div className="support-settings__left">
          <Typography type="h5" text="Support" cssClass="head-9 m-b-40px" />

          <div className="link-with-arrow">
            <div>
              <Typography type="h6" text="Requests" cssClass="head-16" />
              <Typography
                type="p"
                text="Send requests for support"
                cssClass=" p-2"
              />
            </div>
            <Svg iconId="icon-arrow-right" cssClass="icon-arrow-right" />
          </div>
        </div>
        <div className="support-settings__right">
          <Typography type="h5" text="Requests" cssClass="head-9 m-b-40px" />
          {supportMessages.map((supportMessage: { title: string; created_at:any; uid:string; }, index:any) => (
            <Request title={supportMessage.title} date={moment(supportMessage.created_at).format("llll")} identifier={supportMessage.uid} key={index}/>
          ))}

          <Button
            cssClass="btn--primary btn--small m-t-200px"
            text="Request support"
            handleClick={handleOpen}
          />

          {open && <CreateNewSupportModal handleClick={handleClose} />}
        </div>
      </div>
    </DashboardLayoutOneRight>
  );
};

export default SupportSettings;
