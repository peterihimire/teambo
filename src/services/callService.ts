import http from "./httpService";

const allCallsApi = "/call?privacy=PRIVATE";
const allConferenceCallsApi = "/call?privacy=PUBLIC";
const startConferenceCallApi = "/call/new";
const joinConferenceCallApi = "/call";
const getMeetingParticipantApi = "/call";
const addMeetingParticipantApi = "/call/add-participants";

export const getAllUserCalls = () => {
  return http.get(allCallsApi);
};

export const getAllUserConferenceCalls = () => {
  return http.get(allConferenceCallsApi);
};

export const startConferenceCall = (data: any) => {
  return http.post(startConferenceCallApi, data);
};

export const joinConferenceCall = (call_id: any, data: any) => {
  return http.post(`${joinConferenceCallApi}/${call_id}/join`, data);
};

export const beginConferenceCall = (call_id: any) => {
  return http.get(`${joinConferenceCallApi}/${call_id}/start`);
};

export const getMeetingParticipant = (call_id: any, participantId: any) => {
  return http.get(
    `${getMeetingParticipantApi}/${call_id}/participants/${participantId}`
  );
};

export const addMeetingParticipant = (data: any) => {
  return http.post(addMeetingParticipantApi, data);
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAllUserCalls,
  startConferenceCall,
  joinConferenceCall,
  beginConferenceCall,
  getMeetingParticipant,
  addMeetingParticipant,
  getAllUserConferenceCalls,
};
