import { SagaIterator } from "redux-saga";
import { takeLatest, call, put } from "redux-saga/effects";
import { AuthActions } from "./index";
import { PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../../api/auth";
import { ApiResponse } from "../../models/apiResponse";
import { CurrentUserDto } from "../../models/users/currentUserDto";
import { AxiosError } from "axios";

type GetCurrentUser = {
  isSuccess: boolean;
  data?: CurrentUserDto;
  error?: AxiosError;
};
function* tryGetCurrentUser() {
  const userDto: ApiResponse<CurrentUserDto> = yield call(
    authApi.getCurrentUser
  );
  if (userDto.data) {
    yield put(AuthActions.setCurrentUser(userDto.data));
    yield put(AuthActions.authRequestSuccess());
    return { isSuccess: true, data: userDto.data, error: undefined };
  } else {
    return { isSuccess: false, data: undefined, error: userDto.error! };
  }
}

function* checkWhoIAm() {
  // yield call(tryGetCurrentUser);
  yield put(AuthActions.checkSessionFinish());
}

function* logout() {
  yield call(authApi.logout);
}

export function* authSagas(): SagaIterator {
  // yield takeLatest(AuthActions.authRequestStart.type, postAuthToken);
  yield takeLatest(AuthActions.checkSessionStart.type, checkWhoIAm);
  yield takeLatest(AuthActions.logout.type, logout);
}
