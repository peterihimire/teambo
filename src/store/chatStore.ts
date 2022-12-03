import create, { SetState, GetState } from "zustand";

const initialState = {
  chat: "",
  attachments: [],
};

type ChatStoreType = {
  chat: string;
  attachments: Array<any>;

  setAttachments: (payload: any) => void;
  setChat: (payload: any) => void
};

export const chatStore = create<ChatStoreType>(
  (set: SetState<ChatStoreType>, get: GetState<ChatStoreType>) => ({
    ...initialState,

    setChat: (payload: any) => {
      set((prevState) => ({
        ...prevState,
        chat: payload,
      }));
    },
    setAttachments: (payload: any) => {
      set((prevState) => ({
        ...prevState,
        attachments: payload,
      }));
    },
  })
);

export interface IAllConversations {
  call_id: string;
  id: string;
  uid: string;
  type: string;
  initiator_id: string;
  title: string;
  description: string;
  privacy: string;
  participants: Array<string>;
  moderators: Array<string>;
  created_at: string;
  updated_at: string;
}
