import http from "./httpService";
import api from "../utils/constants/api";

export const saveLcoalRecording = (data: any) => {
  return http.post(api.SAVE_RECORD, data);
};

export const getLocalRecordings = (type: any) => {
  return http.get(api.GET_RECORDINGS(`?storage=${type}`));
};
export const getSingleRecording = (id: any) => {
  return http.get(api.GET_SINGLE_RECORDING(id));
};
export const deleteSingleRecording = (id: any) => {
  return http.delete(api.DELETE_SINGLE_RECORDING(id));
};

export const startMeetingRecording = (data: any) => {
  return http.post(api.START_MEETING_RECORDING, data);
};

export const startRecording = (id: any) => {
  return http.post(api.START_RECORDING, id);
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  saveLcoalRecording,
  getLocalRecordings,
  deleteSingleRecording,
  startMeetingRecording,
  startRecording,
};
