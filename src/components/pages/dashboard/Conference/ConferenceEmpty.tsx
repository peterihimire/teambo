import React, { useState, useEffect } from "react";

import Typography from "./../../../common/Typography/Typography";
import DashboardLayoutOne from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOne";
import DashboardLayoutOneLeft from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneLeft";
import DashboardLayoutOneRight from "../../../common/DashboardLayouts/LayoutOne/DashboardLayoutOneRight";
import Svg from "./../../../common/Svg/Svg";
import Image from "./../../../common/Image/Image";
import FormStartNewConferenceCall from "../../../common/Forms/FormStartNewConferenceCall";
// import CallVisibility from "./../../../common/CallVisibility/CallVisibility";
import DashboardTopNav from "./../DashboardTopNav";
import Button from "./../../../common/Button/Button";
import ModalJoinMeetingWithLink from "./../../../common/Modals/ModalJoinMeetingWithLink";
import callsStore from "../../../../store/callStore";
import SearchConferenceInput from "../../../common/SearchInput/SearchConferenceInput";
import PreviousConferenceCall from "../../../common/Calls/PreviousConferenceCall";

// Amazon chime shii

interface Props {}

const ConferenceEmpty: React.FC<Props> = () => {
  const { fetchConferenceCalls, conferenceCalls } = callsStore();
  // const fetchCalls = callsStore((state) => state.fetchCalls);
  // const calls = callsStore((state) => state.calls);

  useEffect(() => {
    fetchConferenceCalls();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [searchKey, setSearchKey] = useState<any>("");
  const allCalls = conferenceCalls;

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
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <main className="dashboard__main">
        <DashboardTopNav title="Conference" />

        <DashboardLayoutOne>
          <DashboardLayoutOneLeft>
            {conferenceCalls.length > 0 ? (
              <aside className="prev-calls-list">
                <Typography
                  type="p"
                  cssClass="para-1 m-b-10px"
                  text="Search for a Conference call"
                />

                <SearchConferenceInput
                  handleChange={handleSearchKey}
                  value={searchKey}
                />

                {filteredCalls?.length === 0
                  ? "No Search Found"
                  : filteredCalls?.map((call: any, index) => (
                      <PreviousConferenceCall
                        key={index}
                        meetingId={call["uid"]}
                        participants={call["participants"]}
                        date={call["created_at"]}
                        type={call["type"]}
                        privacy={call["privacy"]}
                        title={call["title"]}
                      />
                    ))}
              </aside>
            ) : (
              <Svg
                cssClass="img-calls-empty-space"
                iconId="img-calls-empty-space"
              />
            )}
          </DashboardLayoutOneLeft>
          <DashboardLayoutOneRight>
            <div className="flex-r-jccenter">
              <div className="empty-state">
                <Image source="pic5" cssClass="empty-state__conference-img" />
                <Typography
                  text="Start new conference call"
                  type="h3"
                  cssClass="head-4 text-center m-b-10px"
                />
                <Typography
                  text="Start new conversation with an existing contact or invite"
                  type="p"
                  cssClass="head-5 text-center"
                />
                <Typography
                  text="anyone with the link"
                  type="p"
                  cssClass="head-5 text-center m-b-35px"
                />

                <FormStartNewConferenceCall />
                <div className="flex-r-jccenter-aicenter m-t-20px text-center pointer bbb">
                  <Button
                    cssClass="btn-total-naked btn--xxxsmall btn-join-meeting"
                    text="🖐🏻 Click here to join a meeting"
                    handleClick={() => setShowModal(true)}
                  />
                </div>
                {/* <CallVisibility /> */}
              </div>
            </div>
          </DashboardLayoutOneRight>
        </DashboardLayoutOne>

        {showModal && (
          <ModalJoinMeetingWithLink handleClick={() => setShowModal(false)} />
        )}
      </main>
    </>
  );
};

export default ConferenceEmpty;
