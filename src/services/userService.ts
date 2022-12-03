import http from "./httpService";

// Constant
const usersApi = "/auth/sign-up";
const recoverPasswordApi = "/auth/recover-password";
const resetPasswordApi = "/auth/reset-password";
const checkEmailApi = "/auth/check-email";
const usersPatchApi = "/settings/update_user_profile";
const fetchBillingInfoApi = "/settings/get_billing_info";
const changePasswordApi = "/settings/change_password";
const createSecurityQuestionApi = "/settings/create_security_question";
const fetchSecurityQuestionsApi = "/settings/fetch_questions";
const updateProfileImageApi = "/settings/update_profile_image";
const setNotificationSettingsApi = "/settings/update_notification_settings";
const fetchCompanySettingsReportApi = "/settings/report";
const createSupportMessageApi = "/supports";
const getSupportMessagesApi = "/supports";
const contactUs = "/supports/contact-us";

export const newUserEmailKey = "newUserEmail";
export const assetToken = "timbo_asset_token";

export function checkEmail(email: any) {
  return http.post(checkEmailApi, { email });
}
export function saveNewUserEmail(email: any) {
  localStorage.setItem(newUserEmailKey, email);
}
export function register(userData: any) {
  return http.post(usersApi, userData);
}
export function update(userData: any) {
  return http.put(usersPatchApi, userData);
}
export function updateProfileImage(userData: any) {
  return http.put(updateProfileImageApi, userData);
}
export function billingInfo() {
  return http.get(fetchBillingInfoApi);
}
export function changePassword(data: any) {
  return http.put(changePasswordApi, data);
}
export function createSecurityQuestion(data: any) {
  return http.post(createSecurityQuestionApi, data);
}
export function getSecurityQuestions() {
  return http.get(fetchSecurityQuestionsApi);
}
export function recoverPassword(email: any) {
  return http.post(recoverPasswordApi, email);
}
export function resetPassword(data: any, token: any) {
  return http.post(`${resetPasswordApi}/${token}`, data);
}
export function setNotificationSettings(data: any) {
  return http.put(setNotificationSettingsApi, data);
}
export function createSupport(data: any) {
  return http.post(createSupportMessageApi, data);
}
export function getSupportMessages() {
  return http.get(getSupportMessagesApi);
}
export function getCompanySettingsReport() {
  return http.get(fetchCompanySettingsReportApi);
}

export function createContactUs(data: any) {
  return http.post(contactUs, data);
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  checkEmail,
  saveNewUserEmail,
  register,
  update,
  recoverPassword,
  resetPassword,
  billingInfo,
  changePassword,
  createSecurityQuestion,
  getSecurityQuestions,
  updateProfileImage,
  setNotificationSettings,
  createSupport,
  getSupportMessages,
  getCompanySettingsReport,
  createContactUs,
};
