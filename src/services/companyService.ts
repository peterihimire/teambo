import http from "./httpService";

// Constant
const companyPatchApi = "/settings/update_company_profile";
const updateCompanyLogoApi = "/settings/change_company_logo";
const addStaffApi = "/settings/add_staff";
const setNotificationSettingsApi = "/settings/update_notification_settings";
const fetchCompanySettingsReportApi = "/settings/report";

export function update(data: any) {
  return http.put(companyPatchApi, data);
}
export function updateCompanyLogo(data: any) {
  return http.put(updateCompanyLogoApi, data);
}
export function addStaff(data: any) {
  return http.put(addStaffApi, data);
}
export function setNotificationSettings(data: any) {
  return http.put(setNotificationSettingsApi, data);
}
export function getCompanySettingsReport() {
  return http.get(fetchCompanySettingsReportApi);
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  update,
  updateCompanyLogo,
  addStaff,
  setNotificationSettings,
  getCompanySettingsReport,
};
