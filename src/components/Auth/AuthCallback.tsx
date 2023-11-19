import React from "react";
import { useLocation, useNavigate } from "react-router";
import { setToken } from "../../utils/localStorageHelper";
import { useDispatch } from "react-redux";
import { AuthActions } from "store/auth";

function AuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("location", location);

  let match = location.search.split("?code=");
  let code = match[1];

  setToken({ token: code, expires: "" });
  dispatch(
    AuthActions.authRequestStart({
      token: code,
    }),
  );
  navigate("/adminPanel");

  return <></>;
}

export default AuthCallback;
