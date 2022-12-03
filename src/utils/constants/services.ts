import httpService from "../../services/httpService";
import api from "./api";

const { get, post } = httpService;

export enum FETCH_STATUS {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export const fetchMessages = async (conversationId: string) => {
  try {
    const response = await get(api.GET_CONVERSATION_MESSAGES(conversationId));
    let data = await response.data;
    return data;
  } catch (err) {
    return "Error Fetching data";
  }
};

export const postMessage = async (conversationId: string, message: any) => {
  try {
    const response = await post(api.POST_CONVERSATION_MESSAGE(conversationId), {
      text: message,
    });
    return response.data;
  } catch (err) {}
};


/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  FETCH_STATUS,
  fetchMessages,
  postMessage
}