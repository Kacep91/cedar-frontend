import axios from "axios";
import { store } from "../store/store";
import { AuthActions } from "../store/auth";

const BASE_API_URL = "/api";
const AUTH_AXIOS_SETTINGS = {
  withCredentials: true,
  baseURL: BASE_API_URL,
};

export const apiProvider = axios.create(AUTH_AXIOS_SETTINGS);

apiProvider.interceptors.response.use(
  (response) => response,
  function (error) {
    if (error.response?.status === 401) {
      store.dispatch(AuthActions.logout());
    }

    return Promise.reject(error);
  }
);
