import React, { useEffect } from "react";

import DashboardLayoutOne from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOne";

import DashboardTopNav from "./../DashboardTopNav";
import CallsEmpty from "./CallsEmpty";
import CallsList from "./CallsList";

// Store
import callsStore from "./../../../../store/callStore";
import LoadingCalls from "./LoadingCalls";

interface CallsProps {}
const Calls: React.FC<CallsProps> = () => {
  const { fetchCalls, calls, isLoading } = callsStore();
  // const fetchCalls = callsStore((state) => state.fetchCalls);
  // const calls = callsStore((state) => state.calls);
  
  useEffect(() => {
    fetchCalls();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className="dashboard__main">
        <DashboardTopNav title="Calls" />

        <DashboardLayoutOne>
          {isLoading ? (
            <LoadingCalls />
          ) : calls.length >= 1 ? (
            <CallsList calls={calls} />
          ) : (
            <CallsEmpty />
          )}
        </DashboardLayoutOne>
      </main>
    </>
  );
};

export default Calls;
