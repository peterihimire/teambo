import http from "./httpService";
import api from '.././utils/constants/api'

// Constant
// const getContactsApi = "/contact";
const createContactsApi = "/contact";

export function getAllUserContacts() {
  return http.get(api.GET_ALL_CONTACTS);
}

export function createContact(data: any) {

  return http.post(createContactsApi, data);
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAllUserContacts,
  createContact,
};
