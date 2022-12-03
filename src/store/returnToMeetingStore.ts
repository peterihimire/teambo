import create, { SetState } from "zustand";

interface IReturnToMeetingProps {
  isReturnToMeeting: boolean;
  setIsReturnToMeeting: (arg: boolean) => void;
}

export const returnToMeetingStore = create<IReturnToMeetingProps>(
  (set: SetState<IReturnToMeetingProps>) => ({
    isReturnToMeeting: false,
    setIsReturnToMeeting: (payload: boolean) => {
      set(() => ({ isReturnToMeeting: payload }));
    },
  })
);
