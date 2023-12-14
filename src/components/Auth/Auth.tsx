import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { getEnv } from "../../utils/utils";
import { AuthModal, AuthWrapper, AuthHeader } from "./atoms";
import { YandexButton } from "./YandexButton";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions, AuthSelectors } from "../../store/auth";
import { ProgressSpinner } from "primereact/progressspinner";
import { useLocation, useNavigate } from "react-router";
import { getToken } from "../../utils/localStorageHelper";
import { Toast } from "primereact/toast";
import { VersionInfoUI } from "ui/Layout/VersionInfoUI";
import { GoogleButton } from "./GoogleButton";
import { BackLinkAtom } from "components/atoms";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const googleId = getEnv("GOOGLE_CLIENT_ID");
  const googleRedirect = getEnv("GOOGLE_REDIRECT");
  const token = useSelector(AuthSelectors.token);

  const decodedToken = `${token}`?.replace(/%22/g, "");
  const isLoggedWithId =
    decodedToken === "kacep91@gmail.com" ||
    decodedToken === "annadaluk6963@gmail.com" ||
    decodedToken === "Tokmakov.ruslan@gmail.com";
  const isLoading = useSelector(AuthSelectors.isLoading);
  const error = useSelector(AuthSelectors.error);
  const toast = useRef<Toast>(null);
  const dispatch = useDispatch();

  const callback = useCallback((event: StorageEvent) => {
    if (event.storageArea === localStorage) {
      dispatch(
        AuthActions.authRequestStart({
          token: getToken(event.storageArea),
        }),
      );
    }
  }, []);

  useLayoutEffect(() => {
    window.addEventListener("storage", callback);
    return () => {
      window.removeEventListener("storage", callback);
    };
  }, []);

  useEffect(() => {
    if (error) {
      toast?.current?.show({
        severity: "error",
        summary: error.code,
        detail:
          error.response?.status === 403
            ? "К сожалению, доступ к сервису для Вас запрещен. Для получения доступа обратить к администратору"
            : "Произошла ошибка",
        life: 5000,
      });
    }
  }, [error]);

  useEffect(() => {
    if (isLoggedWithId) {
      const nextLocation = location?.pathname !== "/auth" ? "/adminPanel" : "/";
      navigate(nextLocation);
    }
  }, [isLoggedWithId]);

  return (
    <AuthWrapper>
      <AuthModal>
        <Toast ref={toast} />
        <BackLinkAtom to={"/"} children={"Назад"} />
        <AuthHeader>Вход в админку</AuthHeader>
        <GoogleButton clientId={googleId} redirectUrl={googleRedirect} />
        {isLoading && <ProgressSpinner />}
      </AuthModal>
    </AuthWrapper>
  );
};

export default Auth;
