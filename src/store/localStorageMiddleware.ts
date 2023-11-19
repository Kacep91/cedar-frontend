import { Middleware } from "redux";
import { AuthActions } from "./auth";
import { clearStorage, setCurrentUserInfo } from "../utils/localStorageHelper";

export const localStorageMiddleware: Middleware = (_) => (next) => (action) => {
  if (action.type === AuthActions.setCurrentUser.type) {
    setCurrentUserInfo(action.payload);
  }

  if (action.type === AuthActions.logout.type) {
    clearStorage();
  }

  if (action.type === AuthActions.authRequestFailure.type) {
    clearStorage();
  }

  return next(action);
};
