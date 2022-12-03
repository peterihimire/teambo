import React, { useEffect } from "react";

import DashboardLayoutOne from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOne";

import DashboardTopNav from "./../DashboardTopNav";
import ConferenceEmpty from "./ConferenceEmpty";
import ConferenceList from "./ConferenceList";

// Store
import callsStore from "./../../../../store/callStore";
import LoadingCalls from "../Calls/LoadingCalls";

interface CallsProps {}
const Conferences: React.FC<CallsProps> = () => {
  const { fetchConferenceCalls, conferenceCalls, isLoading } = callsStore();
  // const fetchCalls = callsStore((state) => state.fetchCalls);
  // const calls = callsStore((state) => state.calls);
  
  console.log("g")
  useEffect(() => {
    fetchConferenceCalls();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className="dashboard__main">
        <DashboardTopNav title="Conference" />

        <DashboardLayoutOne>
          {isLoading ? (
            <LoadingCalls />
          ) : conferenceCalls.length >= 1 ? (
            <ConferenceList calls={conferenceCalls} />
          ) : (
            <ConferenceEmpty />
          )}
        </DashboardLayoutOne>
      </main>
    </>
  );
};

export default Conferences;
