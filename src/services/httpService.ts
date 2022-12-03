import axios from "axios";
import logger from "./logService";

const res: any = null;
// axios.defaults.baseURL = "https://api.jointimbo.com";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(res, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

  if (!expectedError) {
    logger.log(error);
    console.log(error);
  }

  return Promise.reject(error);
});

function setToken(token: any) {
  axios.defaults.headers.common["token"] = token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  post: axios.post,
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  setToken,
};
