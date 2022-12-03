import create, { SetState, GetState } from "zustand";
import jwtDecode from "jwt-decode";
import { getToken } from "../services/authService";
import httpService from "../services/httpService";
import api from "../utils/constants/api";

const initialState = {
  fetched: false,
  authenticated: false,
};

type useStoreType = {
  user: any;
  getUser: () => void | any;
};

const token = getToken();
const decode: any = token ? jwtDecode(token) : null;
const { get: getApi } = httpService;

export const userStore = create<useStoreType>(
  (set: SetState<useStoreType>, get: GetState<useStoreType>) => ({
    user: initialState,
    getUser: async () => {
      const userId = api.GET_USER_DETAILS(decode?.id);
      const response: any = await getApi(userId);
      set({
        user: {
          ...response.data,
          fetched: true,
          authenticated: true,
          assetToken: response.assetToken,
        },
      });
    },
  })
);
