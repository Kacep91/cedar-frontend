import { ProductCardType } from "components/UI/types";
import { CurrentUserDto } from "../models/users/currentUserDto";

export const getToken = (storage?: Storage) => {
  const tokenStorage = (storage || localStorage).getItem("yaId") || "{}";
  return JSON.parse(tokenStorage).token;
};

export const setToken = (
  data: { token: string; expires: string },
  storage?: Storage
) => {
  (storage || localStorage).setItem("yaId", JSON.stringify(data));
};

export const getCurrentUserInfo = (
  storage?: Storage
): CurrentUserDto | undefined => {
  const userInfoStorage = (storage || localStorage).getItem("userInfo") || "{}";
  return JSON.parse(userInfoStorage);
};

export const setCurrentUserInfo = (info: CurrentUserDto, storage?: Storage) => {
  (storage || localStorage).setItem("userInfo", JSON.stringify(info));
};

export const clearStorage = (storage?: Storage) => {
  clearCurrentUserInfo(storage);
  clearToken(storage);
};

export const clearCurrentUserInfo = (storage?: Storage) => {
  (storage || localStorage).removeItem("userInfo");
};

export const clearToken = (storage?: Storage) => {
  (storage || localStorage).removeItem("yaId");
};

export const getSavedCartInfo = (
  storage?: Storage
): (ProductCardType & { amount: number; id: string })[] | undefined => {
  const cartInfoStorage = (storage || localStorage).getItem("cartInfo") || "[]";
  return JSON.parse(cartInfoStorage);
};
