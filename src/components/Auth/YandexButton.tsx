import React from "react";
import { useDispatch } from "react-redux";
import { AuthActions } from "../../store/auth";
import yandexWhite from "assets/images/yandexButtonWhite.svg";

function getYandexAuthUrl(clientID: string, redirectUrl: string) {
  let requestUrl =
    "https://oauth.yandex.ru/authorize?response_type=code&client_id=" +
    clientID;
  requestUrl += "&redirect_uri=" + encodeURIComponent(redirectUrl);
  requestUrl += "&display=popup";
  return requestUrl;
}

export type YandexButtonProps = {
  clientID: string;
  redirectURL: string;
};
export function YandexButton({ clientID, redirectURL }: YandexButtonProps) {
  const dispatch = useDispatch();
  return (
    <img
      src={yandexWhite}
      onClick={() => {
        const requestUrl = getYandexAuthUrl(clientID, redirectURL);
        const h = 650;
        const w = 550;
        const y = window.top!.outerHeight / 2 + window.top!.screenY - h / 2;
        const x = window.top!.outerWidth / 2 + window.top!.screenX - w / 2;
        dispatch(AuthActions.authGetYandexToken());
        window.open(
          requestUrl,
          "popup",
          `width=${w},height=${h},top=${y},left=${x}`,
        );
      }}
      alt={"Войти через Яндекс"}
      style={{ marginBottom: 30, cursor: "pointer", borderRadius: "40px" }}
    />
  );
}
