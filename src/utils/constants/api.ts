const getConversationMessageQuery =
  "?select=uid,text,read_by,attachments,created_at,sender.(uid|firstname|lastname|email),conversation.(uid|title)";
const getConversationByIdQuery =
  "?select=uid,type,call_id,initiator_id,title,description,privacy,participants.(uid|firstname|lastname|email),moderators.(uid|firstname|lastname|email),created_at,files_count,unread_message_count";

const getContactQuery =
  "?select=additional_email,additional_phone,address,created_at,email,external_email,id,owner_id,role,social,uid,fullname,phone,user.(uid|firstname|lastname|image)";

// const allConversationQuery =
//   "?select=uid,type,participants,call_id,initiator.(uid|firstname|email_verified_at),last_message.(uid|text|attachments|read_by|created_at|sender_id),title,description,privacy,participants,moderators,created_at,updated_at";

class API {
  API_LOGIN: string;

  //user
  GET_USER_DETAILS: (userId: string) => string;

  //conversation
  GET_ALL_USER_CONVERSATION: string;
  GET_CONVERSATION_MESSAGES: (conversationId: string) => string;
  POST_CONVERSATION_MESSAGE: (conversationId: string) => string;
  GET_CONVERSATION_BY_ID: (conversationId: string) => string;
  GET_PARTICIPANTS: (ids: string) => string;
  POST_START_CONVERSATION: string;
  POST_ADD_PARTICIPANT_TO_CONVERSATION: (conversationId: string) => string;
  REMOVE_PARTICIPANT_FROM_CONVERSATION: (
    conversationId: string,
    participantId: string,
  ) => string;
  GET_ALL_FILE_ATTACHMENTS: (conversationId: string) => string;

  //contacts
  GET_ALL_CONTACTS: string;

  //record
  SAVE_RECORD: string;
  GET_RECORDINGS: (query: string) => string;
  GET_SINGLE_RECORDING: (id: string) => string;
  DELETE_SINGLE_RECORDING: (id: string) => string;
  START_MEETING_RECORDING: string;
  START_RECORDING: string;

  // Schedules
  GET_SCHEDULES: string;

  // Company Report
  GET_COMPANY_REPORT: string;

  constructor() {
    this.API_LOGIN = "/auth/sign-in";
    this.GET_USER_DETAILS = (userId: string) => "/users/" + userId;

    //conversation
    //this.GET_ALL_USER_CONVERSATION = `/conversation${allConversationQuery}`;
    this.GET_ALL_USER_CONVERSATION = `/conversation/get-user-joined-conversations`;
    this.GET_CONVERSATION_MESSAGES = (conversationId) =>
      `/conversation/${conversationId}/messages${getConversationMessageQuery}`;
    this.POST_CONVERSATION_MESSAGE = (conversationId) =>
      `/conversation/${conversationId}/messages`;
    this.POST_START_CONVERSATION = "/conversation";
    this.GET_CONVERSATION_BY_ID = (conversationId) =>
      `/conversation/${conversationId}${getConversationByIdQuery}`;
    this.POST_ADD_PARTICIPANT_TO_CONVERSATION = (conversationId) =>
      `/conversation/${conversationId}/add-participants`;
    this.REMOVE_PARTICIPANT_FROM_CONVERSATION = (
      conversationId,
      participantId,
    ) => `/conversation/${conversationId}/remove-participants/${participantId}`;

    this.GET_ALL_FILE_ATTACHMENTS = (conversationId) =>
      `/conversation/${conversationId}/attachments`;

    //participants
    this.GET_PARTICIPANTS = (ids) => `/users/group/${ids}`;

    this.GET_ALL_CONTACTS = `/contact${getContactQuery}`;

    //record
    this.SAVE_RECORD = "/recordings/save";
    this.GET_RECORDINGS = (query) => `/recordings${query}`;
    this.GET_SINGLE_RECORDING = (id) => `/recordings/${id}`;
    this.DELETE_SINGLE_RECORDING = (id) => `/recordings/${id}`;
    this.START_MEETING_RECORDING = `/recordings/start`;
    this.START_RECORDING = `/app/join-call-record`;

    // Schedules
    this.GET_SCHEDULES = `/schedule/calls`;

    // Company Report
    this.GET_COMPANY_REPORT = `/settings/report`;
  }
}

const api = new API();

export default api;
