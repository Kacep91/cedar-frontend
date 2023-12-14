import React, { ReactNode } from "react";
import { Navigate, RouteProps, useLocation } from "react-router";
import { getEnv, stringToBoolean } from "../../utils/utils";
import { useSelector } from "react-redux";
import { AuthSelectors } from "../../store/auth";

const isAuthEnabled = stringToBoolean(getEnv("REACT_AUTH_ENABLED"));

type AuthRouteProps = {
  children: ReactNode;
} & RouteProps;

const AuthRoute = ({ children, ...props }: AuthRouteProps) => {
  const location = useLocation();
  const token = useSelector(AuthSelectors.token);
  const decodedToken = `${token}`?.replace(/%22/g, "");
  const isLoggedWithId =
    decodedToken === "kacep91@gmail.com" ||
    decodedToken === "annadaluk6963@gmail.com" ||
    decodedToken === "Tokmakov.ruslan@gmail.com";

  if (isAuthEnabled)
    return !isLoggedWithId ? (
      <Navigate to={"/auth"} state={location} replace={true} {...props} />
    ) : (
      <>{children}</>
    );

  return <>{children}</>;
};

export default AuthRoute;
