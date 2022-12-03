export enum EVENT_TYPES {
    ONLINE = 'event::user::online',
    AWAY = 'event::user::away',
    OFFLINE = 'event::user::offline',
    STATUS = 'event::user::status-update',
    
    NEW_CONVERSATION = 'event::conversation::new-conversation',
    NEW_CONVERSATION_REQUEST = 'event::conversation::new-conversation-request',
    NEW_PARTICIPANT = 'event::conversation::new-participant',
    JOIN_CONVERSATION = 'event::conversation::join-conversation',
    LEAVE_CONVERSATION = 'event::conversation::leave-conversation',
    
    TYPE_START = 'event::conversation::type-start',
    TYPING = 'event::conversation::typing',
    TYPE_END = 'event::conversation::type-end',
    
    NEW_MESSAGE = 'event::conversation::new-message',
    READ_MESSAGE = 'event::conversation::read-message',
    
    DRAWING = 'event::whiteboard::drawing',
    COLOR_UPDATE = 'event:whiteboard::color-update',

    START_CALL = 'event::call::join-call',
    END_CALL_NOTIFICATION = 'event::call::end-meeting-notification',
    END_CALL = 'event::call::end-meeting',
   }


   export default EVENT_TYPES;