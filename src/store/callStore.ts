import create from "zustand";
import callService from "./../services/callService";
import { toast } from 'react-toastify';

interface CallsStoreType {
  calls: Array<object>;
  conferenceCalls: Array<object>;
  currentCall: any;
  isLoading: boolean;
  fetchCalls: () => void;
  setCurrentCall: (payload: any) => void;
  sendCallInvitatiion: (payload: any) => void;
  fetchConferenceCalls: () => void;
}

const initialState = {
  calls: [],
  conferenceCalls: [],
  currentCall: {},
};

const callsStore = create<CallsStoreType>((set) => ({
  ...initialState,
  isLoading: true,
  fetchCalls: async () => {
    try {
      await callService.getAllUserCalls().then(({ data }) => {
        set((state) => ({ calls: [...data], isLoading: false }));
        //   console.log("From the Store: ", data);
      });
    } catch (error) {
      set((state) => ({ isLoading: false }));
    }
  },
  fetchConferenceCalls: async () => {
    try {
      await callService.getAllUserConferenceCalls().then(({ data }) => {
        set((state) => ({ conferenceCalls: [...data], isLoading: false }));
        //   console.log("From the Store: ", data);
      });
    } catch (error) {
      set((state) => ({ isLoading: false }));
    }
  },
  setCurrentCall: (payload: any) => {
    set((prevState) => ({
      ...prevState,
      currentCall: payload,
    }));
  },
  sendCallInvitatiion: async (data) => {
    try {
      const response = await callService.addMeetingParticipant(data);
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (error: any) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  },
}));

export default callsStore;
