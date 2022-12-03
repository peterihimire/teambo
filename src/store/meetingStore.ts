import create from "zustand";
// import callService from "./../services/callService";

interface MeetingStoreType {
  meetingCode: string | any;
  callId: string | any;
  chimeAttendeeId: string | any;
  externalUserId: string | any;
  setMeetingCode: (code: any) => void;
  setExternalUserId: (id: any) => void;
  setCallId: (id: any) => void;
  setChimeAttendeeId: (id: any) => void;
}

const MeetingStore = create<MeetingStoreType>((set) => ({
  meetingCode: "",
  callId: "",
  chimeAttendeeId: "",
  externalUserId: "",
  setMeetingCode: (code) => {
    set((store) => ({ meetingCode: code, callId: code }));
  },
  setCallId: (id) => {
    set((store) => ({ callId: id }));
  },
  setExternalUserId: (id) => {
    set((store) => ({ externalUserId: id }));
  },
  setChimeAttendeeId: (id) => {
    set((store) => ({ externalUserId: id }));
  },
}));

export default MeetingStore;
