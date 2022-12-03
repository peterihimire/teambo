import http from "./httpService";

// Constant
const fetchAllPlans = "/payment/plans";
const paystckPayment = "/payment/pay/paystack"
const stripePayment = "/payment/pay/stripe"
const getUserSub = "/payment/check_subscription"
const changePlanApi = "/payment/change-plan"
const changeCardApi = "/payment/change-card"
const getUserCardApi = "/payment/get-user-card"

export function getAllPlans() {
  return http.get(fetchAllPlans);
}
export function makePaystackPayment(data: any) {
  return http.post(paystckPayment, data);
}
export function makeStripePayment(data: any) {
  return http.post(stripePayment, data);
}
export function getUserSubscription() {
  return http.get(getUserSub);
}
export function changePlan(data: any) {
  return http.post(changePlanApi, data);
}
export function changeCard(data: any) {
  return http.put(changeCardApi, data);
}
export function getUserCard() {
  return http.get(getUserCardApi);
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAllPlans,
  makePaystackPayment,
  makeStripePayment,
  getUserSubscription,
  changePlan,
  changeCard,
  getUserCard
};
