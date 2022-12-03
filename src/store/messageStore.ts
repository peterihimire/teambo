import create, { SetState, GetState } from "zustand";
// import jwtDecode from "jwt-decode";
// import { getToken } from "../services/authService";
import httpService from "../services/httpService";
import api from "../utils/constants/api";
// import io from "socket.io-client";

// const socket = io(`${process.env.REACT_APP_API_URL}/conversation`);

const socket = "";
const initialState = {
  socket,
  allConversations: [],
  message: {
    conversationDetails: {
      fetched: false,
    },
    participants: [],
    conversationId: "",
  },
  group: {
    singleContact: {},
    allContacts: [],
  },
};

type messageStoreType = {
  socket: any;
  allConversations: Array<IAllConversations>;
  message: {
    conversationDetails: any;
    participants: Array<any>;
    conversationId: string;
  };
  group: {
    singleContact: any;
    allContacts: Array<any>;
  };

  fetchAllUserConversations: () => void;
  setAllUserconversations: (payload: any) => void;
  setParticipants: (payload: any) => void;
  setConversationDetails: (payload: any) => void;
  setAllGroupContacts: (payload: any) => void;
  removeContactFromGroup: (payload: any) => void;
  setConversationId: (payload: string) => void;
  addNewConversation: (payload: any) => void;
};

// const token = getToken();
// const decode: any = token ? jwtDecode(token) : null;
const { get: getApi, delete: deleteApi } = httpService;
const deleteConversationApi = "/conversation";

export const deleteConversation =  (id: number) => {
  return deleteApi(`${deleteConversationApi}/${id}`);
};
export const messageStore = create<messageStoreType>(
  (set: SetState<messageStoreType>, get: GetState<messageStoreType>) => ({
    ...initialState,
    fetchAllUserConversations: async () => {
      const response = await getApi(api.GET_ALL_USER_CONVERSATION);
      set((prevState) => ({
        ...prevState,
        allConversations: response.data,
      }));
    },
    setAllUserconversations: (payload: any) => {
      set((prevState) => ({
        ...prevState,
        allConversations: payload,
      }));
    },
    addNewConversation: (payload: any) => {
      set((prevState) => ({
        ...prevState,
        allConversations: [payload, ...prevState.allConversations],
      }));
    },
    setParticipants: (payload: any) => {
      set((prevState) => ({
        ...prevState,
        message: {
          ...prevState.message,
          participants: [...payload],
        },
      }));
    },
    setConversationId: (payload: string) => {
      set((prevState) => ({
        ...prevState,
        message: {
          ...prevState.message,
          conversationId: payload,
        },
      }));
    },
    setConversationDetails: (payload: any) => {
      set((prevState) => ({
        ...prevState,
        message: {
          ...prevState.message,
          conversationDetails: { fetched: true, ...payload },
        },
      }));
    },
    setAllGroupContacts: (payload: any) => {
      set((prevState) => ({
        ...prevState,
        group: {
          ...prevState.group,
          allContacts: payload,
        },
      }));
    },
    removeContactFromGroup: (id: number) => {
      const allContacts = get().group.allContacts;
      allContacts.splice(id, 1);
      set((prevState) => ({
        ...prevState,
        group: {
          ...prevState.group,
          allContacts: allContacts,
        },
      }));
    },
  })
);

export interface IAllConversations {
  call_id: string;
  id: string;
  uid: string;
  type: string;
  initiator_id: any;
  title: string;
  description: string;
  privacy: string;
  participants: Array<string>;
  moderators: Array<string>;
  created_at: string;
  updated_at: string;
  last_message: any;
}
