import http from "./httpService";
import jwtDecode from "jwt-decode";

const authApi = "/auth/sign-in";
const resendVerificationEmailApi = "/auth/resend-verification";
const verifyEmailApi = "/auth/verify-email";
export const userDataKey = "userData";
export const timbo__token = "timbo_token";
export const timbo__asset__token = "timbo_asset_token";

http.setToken(getToken());

export function login(email: any, password: any) {
  return http.post(authApi, { email, password });
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
  localStorage.removeItem(timbo__token);
  localStorage.removeItem(timbo__asset__token);
}

export function runTokenExpiration(data: any) {
  let timbo_token: any = data.token;
  timbo_token = jwtDecode(timbo_token);
  let timbo_token_exp: any = timbo_token.exp;
  setTimeout(() => {
    logout();
  }, timbo_token_exp)
}

export function getCurrentUser() {
  let user: any = localStorage.getItem(userDataKey);
  if (user) {
    user = JSON.parse(user);
    return user;
  }
  return null;
}

export function checkCurrentUserIsAdmin() {
  let user: any = localStorage.getItem(userDataKey);
  if (user) {
    user = JSON.parse(user);
    if(user.data.type === 'ADMIN'){
      return true;
    }
    return false;
  }
  return false;
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
  login,
  loginWithToken,
  logout,
  getCurrentUser,
  checkCurrentUserIsAdmin,
  getToken,
  storeUserData,
  getAssetToken,
  resendVerificationEmail,
  verifyEmail,
  runTokenExpiration
};
