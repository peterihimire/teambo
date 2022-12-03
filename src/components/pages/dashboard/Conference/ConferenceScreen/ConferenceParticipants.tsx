import React, { useCallback, useEffect } from "react";
import Typography from "../../../../common/Typography/Typography";
import Button from "./../../../../common/Button/Button";
import { userStore } from "./../../../../../store/userStore";
// import MeetingStore from "../../../../../store/meetingStore";
// import callService from "../../../../../services/callService";
import {
  useRosterState,
  RosterGroup,
  RosterAttendee,
  useContentShareState,
} from "amazon-chime-sdk-component-library-react";

interface Props {
  handleClick?: () => void;
}
const ConferenceParticipants: React.FC<Props> = ({ handleClick }) => {
  // let [us, setUs] = useState<any>("");
  // const { callId, participantId } = MeetingStore();
  const { isLocalUserSharing } = useContentShareState();
  const { user, getUser } = userStore();
  const { roster } = useRosterState();
  const attendees = Object.values(roster);

  const getUserData = useCallback(() => {
    getUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    getUserData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const attendeeItems = attendees.map((attendee) => {
    const { chimeAttendeeId, name } = attendee;
    return (
      <>
        <RosterAttendee
          key={chimeAttendeeId}
          attendeeId={chimeAttendeeId}
          subtitle={name}
          sharingContent={isLocalUserSharing}
        />
      </>
    );
  });

  return (
    <aside className="call-conference-video__all-participants">
      <div className="call-conference-video__left-top flex-r-aicenter">
        <Typography type="h3" text="Participants" cssClass="head-3" />
        <Button
          cssClass="btn btn-icon btn--xxxsmall m-l-auto"
          icon="icon-times"
          iconClass="icon-times"
          handleClick={handleClick}
        />
      </div>
      <div className="call-conference-video__all-participants-body">
        <main className="call-conference-video__left-main m-t-10px">
          {/* <Roster> */}
          <RosterGroup> {attendeeItems}</RosterGroup>
          {/* </Roster> */}
        </main>
      </div>
    </aside>
  );
};

export default ConferenceParticipants;
