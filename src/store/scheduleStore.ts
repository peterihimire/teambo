import create from "zustand";
import scheduleService from "./../services/scheduleService"; 

const testarray = [
  {
    caller_id: "45559fa4-1b2e-4946-bf6d-85fc9ea30d6f",
    created_at: "2021-08-25T14:27:50.257Z",
    duration: 0,
    id: 1,
    note: "string",
    participants: [],
    started_at: "2021-08-30T15:00:00.000Z",
    title: "string",
    token: "LAIVg5yZcFGejDFzm7Ci",
    uid: "baa21640-9764-48a4-848c-c7c3f4415ba3",
    updated_at: "2021-08-25T14:27:50.257Z"
  },
  {
    caller_id: "45559fa4-1b2e-4946-bf6d-85fc9ea30d6f",
    created_at: "2021-08-25T14:27:50.257Z",
    duration: 0,
    id: 1,
    note: "A note Adeola",
    participants: [],
    started_at: "2021-08-30T15:00:00.000Z",
    title: "stringtring tringtringtringtring tringtring",
    token: "LAIVg5yZcFGejDFzm7Ci",
    uid: "baa21640-9764-48a4-848c-c7c3f4415ba3",
    updated_at: "2021-08-25T14:27:50.257Z"
  },
  {
    caller_id: "45559fa4-1b2e-4946-bf6d-85fc9ea30d6f",
    created_at: "2021-08-25T14:27:50.257Z",
    duration: 0,
    id: 1,
    note: "string",
    participants: [],
    started_at: "2021-08-30T15:00:00.000Z",
    title: "string",
    token: "LAIVg5yZcFGejDFzm7Ci",
    uid: "baa21640-9764-48a4-848c-c7c3f4415ba3",
    updated_at: "2021-08-25T14:27:50.257Z"
  },
  {
    caller_id: "45559fa4-1b2e-4946-bf6d-85fc9ea30d6f",
    created_at: "2021-08-25T14:27:50.257Z",
    duration: 0,
    id: 1,
    note: "A note Adeola",
    participants: [],
    started_at: "2021-08-30T15:00:00.000Z",
    title: "stringtring tringtringtringtring tringtring",
    token: "LAIVg5yZcFGejDFzm7Ci",
    uid: "baa21640-9764-48a4-848c-c7c3f4415ba3",
    updated_at: "2021-08-25T14:27:50.257Z"
  },
  {
    caller_id: "45559fa4-1b2e-4946-bf6d-85fc9ea30d6f",
    created_at: "2021-08-25T14:27:50.257Z",
    duration: 0,
    id: 1,
    note: "string",
    participants: [],
    started_at: "2021-08-26T12:19:33.087Z",
    title: "string",
    token: "LAIVg5yZcFGejDFzm7Ci",
    uid: "baa21640-9764-48a4-848c-c7c3f4415ba3",
    updated_at: "2021-08-25T14:27:50.257Z"
  },
  {
    caller_id: "45559fa4-1b2e-4946-bf6d-85fc9ea30d6f",
    created_at: "2021-08-25T14:27:50.257Z",
    duration: 0,
    id: 1,
    note: "A note Adeola",
    participants: [],
    started_at: "2021-08-26T12:19:33.087Z",
    title: "stringtring tringtringtringtring tringtring",
    token: "LAIVg5yZcFGejDFzm7Ci",
    uid: "baa21640-9764-48a4-848c-c7c3f4415ba3",
    updated_at: "2021-08-25T14:27:50.257Z"
  }
]





interface CallsStoreType {
  schedules: Array<object>;
  fetchSchedules: () => void;
  fetchStaticData:()=>void;
  isLoading: boolean;
}

const initialState = {
schedules: []
}
const callsStore = create<CallsStoreType>((set) => ({
  ...initialState,
  isLoading: true,
  fetchSchedules: async () => {
    await scheduleService.getAllSchedule().then(({ data }) => {
      set((state) => ({ schedules: data, isLoading: false }));
    }).catch(err=>console.log(err.response));
  },
  createSchedule: async ()=>{

  },
  fetchStaticData: ()=>{
    set((state)=>{
      return{schedules:testarray}
    })
  }
}));

export default callsStore;
// import scheduleService from "../services/scheduleService";
// // import callService from "./../services/callService";

// interface ScheduleStoreType {
//   schedules: [] | any;
//   fetchSchedules: () => void;
// }

// const ScheduleStore = create<ScheduleStoreType>((set) => ({
//   schedules: [],
//   fetchSchedules: async () => {
//     const res = await scheduleService.getSchedules();
//     // set((store) => ({ meetingCode: code, callId: code }));
//   },
// }));

// export default ScheduleStore;
