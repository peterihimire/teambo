import SampleCall from "../../components/pages/dashboard/Conference/SampleCall";
import Calls from "../../components/pages/dashboard/Calls/Calls";
import ConferenceEmpty from "../../components/pages/dashboard/Conference/ConferenceEmpty";
import MessageConversations from "../../components/pages/dashboard/Messages/MessageConversations";
import Contacts from "../../components/pages/dashboard/Contacts/Contacts";
import ContactDetail from "../../components/pages/dashboard/Contacts/ContactsDetail";
import AddContacts from "../../components/pages/dashboard/Contacts/AddNewContacts";
import ShareVideo from "../../components/pages/dashboard/Screenshare/ShareVideo";
import ShareNewRecord from "../../components/pages/dashboard/Screenshare/ShareNewRecord";
import VideoDescription from "../../components/pages/dashboard/Screenshare/VideoDescription";
import ScheduleEmpty from "../../components/pages/dashboard/Schedule/ScheduleEmpty";
import AddNewSchedule from "../../components/pages/dashboard/Schedule/AddNewSchedule";
import EditSchedule from "../../components/pages/dashboard/Schedule/EditSchedule";
import ScheduledEventList from "../../components/pages/dashboard/Schedule/ScheduledEventsList";
import CallScreen from "../../components/pages/dashboard/Conference/CallScreen";
import Call from "../../components/pages/dashboard/Conference/Call";
import ProfileSettings from "../../components/pages/dashboard/Settings/ProfileSettings";
import GeneralProfileSettings from "../../components/pages/dashboard/Settings/GeneralProfileSettings";
import ProfileSettingsSecurity from "../../components/pages/dashboard/Settings/ProfileSettingsSecurity";
import BillingSettings from "../../components/pages/dashboard/Settings/BillingSettings";
import SupportSettings from "../../components/pages/dashboard/Settings/SupportSettings";
import DashboardIndex from "../../components/pages/dashboard/DashboardIndex";
import Settings from "../../components/pages/dashboard/Settings/Settings";

const dashboardRoutes = [
  {
    id: 1,
    key: "sample-call",
    path: "/sample-call",
    component: SampleCall,
  },
  {
    id: 2,
    key: "calls",
    path: "/calls",
    component: Calls,
  },
  {
    id: 3,
    key: "conference",
    path: "/conference",
    component: ConferenceEmpty,
  },
  {
    id: 4,
    key: "messages",
    path: "/messages",
    component: MessageConversations,
  },
  {
    id: 5,
    key: "contacts",
    path: "/contacts",
    component: Contacts,
  },
  {
    id: 6,
    key: "contacts-detail",
    path: "/contacts-detail",
    component: ContactDetail,
  },
  {
    id: 7,
    key: "add-contact",
    path: "/add-contact",
    component: AddContacts,
  },
  {
    id: 8,
    key: "recordings",
    path: "/recordings/:type",
    component: ShareVideo,
  },
  {
    id: 9,
    key: "share-new-video",
    path: "/share-new-video",
    component: ShareNewRecord,
  },
  {
    id: 10,
    key: "recording-description/",
    path: "/recording-description/:id",
    component: VideoDescription,
  },
  {
    id: 11,
    key: "schedule",
    path: "/schedule",
    component: ScheduleEmpty,
  },
  {
    id: 12,
    key: "schedule-list",
    path: "/schedule-list",
    component: ScheduledEventList,
  },
  {
    id: 13,
    key: "conference-start",
    path: "/conference-start",
    component: CallScreen,
  },
  {
    id: 14,
    key: "settings",
    path: "/settings",
    component: Settings,
  },
  {
    id: 15,
    key: "profile-settings",
    path: "/profile-settings",
    component: ProfileSettings,
  },
  {
    id: 16,
    key: "general-profile-settings",
    path: "/general-profile-settings",
    component: GeneralProfileSettings,
  },
  {
    id: 17,
    key: "profile-settings-security",
    path: "/profile-settings-security",
    component: ProfileSettingsSecurity,
  },
  {
    id: 18,
    key: "billing-settings",
    path: "/billing-settings",
    component: BillingSettings,
  },
  {
    id: 19,
    key: "notification-settings",
    path: "/notification-settings",
    component: ProfileSettingsSecurity,
  },
  {
    id: 20,
    key: "support-settings",
    path: "/support-settings",
    component: SupportSettings,
  },
  {
    id: 21,
    key: "add-schedule",
    path: "/add-schedule",
    component: AddNewSchedule,
  },
  {
    id: 22,
    key: "call",
    path: "/call/:code",
    component: Call,
  },
  {
    id: 23,
    key: "edit-schedule",
    path: "/edit-schedule/:id",
    component: EditSchedule,
  },
  {
    id: 24,
    key: "dashboard-index",
    path: "/",
    component: DashboardIndex,
  },

];

export default dashboardRoutes;
