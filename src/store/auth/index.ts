import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CurrentUserDto } from "../../models/users/currentUserDto";
import { getCurrentUserInfo, getToken } from "../../utils/localStorageHelper";
import { AxiosError } from "axios";

export type AuthState = {
  isLoading: boolean;
  error?: AxiosError;
  token?: string;
  isLoggedIn: boolean;
  current?: CurrentUserDto;
  isSessionLoading: boolean;
};

export const initialState: AuthState = {
  isLoading: false,
  error: undefined,
  isLoggedIn: !!getToken(),
  current: getCurrentUserInfo(),
  isSessionLoading: true,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    authGetYandexToken: (state) => {
      return { ...state, isLoading: true, isError: false, isLoggedIn: false };
    },
    authRequestStart: (
      state,
      action: PayloadAction<{
        token: string | undefined;
      }>
    ) => {
      return {
        isLoading: true,
        error: undefined,
        isLoggedIn: false,
        token: action.payload.token,
        isSessionLoading: false,
      };
    },
    authRequestSuccess: (state) => {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
      };
    },
    authRequestFailure: (state, action: PayloadAction<AxiosError>) => {
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        error: action.payload,
      };
    },
    setCurrentUser: (state, action: PayloadAction<CurrentUserDto>) => {
      return {
        ...state,
        current: action.payload,
      };
    },
    logout: (_state) => {
      return {
        isLoading: false,
        error: undefined,
        current: undefined,
        isLoggedIn: false,
        isSessionLoading: false,
      };
    },
    checkSessionStart: (state) => {
      return {
        ...state,
        isSessionLoading: true,
      };
    },
    checkSessionFinish: (state) => {
      return {
        ...state,
        isSessionLoading: false,
      };
    },
  },
});

export const AuthActions = { ...authSlice.actions };

export const AuthSelectors = {
  isLoading: (state: RootState) => state.auth.isLoading,
  error: (state: RootState) => state.auth.error,
  isLoggedIn: (state: RootState) => state.auth.isLoggedIn,
  currentUser: (state: RootState) => state.auth.current,
  isSessionLoading: (state: RootState) => state.auth.isSessionLoading,
  token: (state: RootState) => state.auth.token,
};
