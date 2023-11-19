import { fork } from "redux-saga/effects";
import { authSagas } from "./auth/saga";

export function* rootSaga(): Generator {
  yield fork(authSagas);
}
