import React, { useState } from "react";
import { BrowserRouter, Switch, Route, useRouteMatch } from "react-router-dom";

import Typography from "./../../../common/Typography/Typography";
import DashboardLayoutOneLeft from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneLeft";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
// import Svg from "./../../../common/Svg/Svg";
import PreviousCall from "./../../../common/Calls/PreviousCall";
import CallsNoSelection from "./CallsNoSelection";
import CallDetail from "./CallDetail";
import SearchCallsInput from "./../../../common/SearchInput/SearchCallsInput";

interface CallObject {
  _id?: any;
  fullName?: any;
  phoneNumber?: any;
}
interface Props {
  calls?: Array<CallObject>;
}
const CallsList: React.FC<Props> = ({ calls }) => {
  const { path } = useRouteMatch();
  const [searchKey, setSearchKey] = useState<any>("");
  const allCalls = calls;

  const handleSearchKey = (query: any) => {
    setSearchKey(query);
  };

  let filteredCalls = allCalls;
  if (searchKey) {
    filteredCalls = allCalls?.filter((call: any) =>
      call["title"].toLowerCase().includes(searchKey.toLocaleLowerCase())
    );
    // console.log("Filtered calls: ", filteredCalls);
  }

  return (
    <>
      <BrowserRouter>
        <DashboardLayoutOneLeft>
          <aside className="prev-calls-list">
            <Typography
              type="p"
              cssClass="para-1 m-b-10px"
              text="Search for a call"
            />

            <SearchCallsInput
              handleChange={handleSearchKey}
              value={searchKey}
            />

            {filteredCalls?.length === 0
              ? "No Search Found"
              : filteredCalls?.map((call: any, index) => (
                  <PreviousCall
                    key={index}
                    title={call["title"]}
                    meetingId={call["uid"]}
                    participants={call["participants"]}
                    date={call["created_at"]}
                    type={call["type"]}
                    privacy={call["privacy"]}
                  />
                ))}
          </aside>
        </DashboardLayoutOneLeft>
        <DashboardLayoutOneRight>
          <Switch>
            <Route path={`${path}/:id`} component={CallDetail} />
            <Route path={`${path}`} component={CallsNoSelection} />
          </Switch>
        </DashboardLayoutOneRight>
      </BrowserRouter>
    </>
  );
};

export default CallsList;
