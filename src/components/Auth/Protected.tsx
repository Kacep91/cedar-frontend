import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router";
import { getEnv, stringToBoolean } from "utils/utils";
import { AuthSelectors } from "store/auth";

const isAuthEnabled = stringToBoolean(getEnv("REACT_AUTH_ENABLED"));

type ProtectedProps = {
  children: ReactNode;
  fallback?: ReactNode;
} & RouteProps;

export const Protected = ({ children, fallback = null }: ProtectedProps) => {
  const isLoggedIn = useSelector(AuthSelectors.isLoggedIn);
  return !isAuthEnabled || isLoggedIn ? <>{children}</> : <>{fallback}</>;
};
