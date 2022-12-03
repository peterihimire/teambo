import http from "./httpService";
// import jwtDecode from "jwt-decode";

const subApi = "/dashboard/subscriptions/stats";
const recents = "/dashboard/subscribers/recent";
const plansd = "/dashboard/plans/";
const accounts = "/dashboard/plans/";
const cplan = "/payment/create-plan";
const supports = "/supports";
const getu = "/users/";
const expo = "/dashboard/plans/stats/export";
const explan = "/dashboard/subscriptions/stats/export";
const ticket = "/supports";
const texport = "/supports/export";
const resendVerificationEmailApi = "/auth/resend-verification";
const verifyEmailApi = "/auth/verify-email";
export const userDataKey = "userData";
export const timbo__token = "timbo_token";
export const timbo__asset__token = "timbo_asset_token";

http.setToken(getToken());

export function subscriptions() {
  return http.get(subApi);
}
export function recent() {
  return http.get(recents);
}
export function plansdetail(id: any) {
  return http.get(plansd + id);
}
export function subaccounts(id: any) {
  return http.get(accounts + id + "/users?page=1&perPage=10");
}
export function createplan(values: any) {
  return http.post(cplan, values);
}
export function exp() {
  return http.get(explan);
}
export function support() {
  return http.get(supports);
}
export function udetail(id: any) {
  return http.get(getu + id);
}
export function exports() {
  return http.get(expo);
}
export function cticket(data: any, id: any) {
  return http.post(ticket + "/" + id + "/message", data);
}
export function gticket(uid: any) {
  return http.get(ticket + "/" + uid);
}
export function gmessage(uid: any) {
  return http.get(ticket + "/" + uid + "/message");
}
export function supexport() {
  return http.get(texport);
}

export function storeUserData(data: any) {
  localStorage.setItem(userDataKey, JSON.stringify(data));
  localStorage.setItem(timbo__token, JSON.stringify(data.token));
  localStorage.setItem(timbo__asset__token, JSON.stringify(data.assetToken));
}

export function loginWithToken(token: any) {
  // localStorage.setItem(userDataKey, token);
}

export function logout() {
  localStorage.removeItem(userDataKey);
}

export function getCurrentUser() {
  let user: any = localStorage.getItem(userDataKey);
  if (user) {
    user = JSON.parse(user);
    return user;
  }
  return null;
}

export function getToken() {
  let token: any = localStorage.getItem(timbo__token);
  if (token) {
    token = JSON.parse(token);
    return token;
  }
  return null;
}
export function getAssetToken() {
  let token: any = localStorage.getItem(timbo__asset__token);
  if (token) {
    token = JSON.parse(token);
    return token;
  }
  return null;
}

export function resendVerificationEmail(email: any) {
  return http.post(`${resendVerificationEmailApi}/${email}`);
}

export function verifyEmail(token: any) {
  return http.get(`${verifyEmailApi}/${token}`);
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  subscriptions,
  recent,
  plansdetail,
  subaccounts,
  createplan,
  exp,
  support,
  udetail,
  exports,
  cticket,
  gticket,
  gmessage,
  supexport,
  loginWithToken,
  logout,
  getCurrentUser,
  getToken,
  storeUserData,
  getAssetToken,
  resendVerificationEmail,
  verifyEmail,
};
