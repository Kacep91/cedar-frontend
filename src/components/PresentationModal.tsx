import React, { useEffect, useRef, useState } from "react";
import { PersonalDataAgreement } from "./atoms";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type PresentationModalType = {
  isOpen: boolean;
  setModalOpen: (value: boolean) => void;
};
type ModalError = { email: string; name: string };

export const PresentationModal = ({
  isOpen,
  setModalOpen,
}: PresentationModalType) => {
  const [error, setError] = useState({ email: "", name: "" });
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const onClose = () => {
    setModalOpen(false);
    setError({ name: "", email: "" });
    setUserName("");
    setUserEmail("");
  };

  return (
    <Dialog
      draggable={false}
      blockScroll
      dismissableMask
      closeOnEscape
      position={"center"}
      resizable={false}
      header="Запрос на презентацию/каталог"
      visible={isOpen}
      onHide={onClose}
      style={{ width: "28vw" }}
      breakpoints={{ "960px": "50vw", "641px": "75vw" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <InputText
          id="userName"
          required
          aria-describedby="userName-help"
          placeholder="Ваше имя или должность"
          value={userName}
          style={{ width: "100%", margin: "10px 0 0 0" }}
          className={error?.name ? "p-invalid" : ""}
          onChange={(e) => setUserName(e.target.value)}
          validateOnly={true}
          onFocus={() => setError({ ...error, name: "" })}
          onBlur={() => {
            if (!userName) {
              setError({ ...error, name: "Поле не может быть пустым" });
            }
          }}
        />
        <small
          id="userName-help"
          style={
            error
              ? {
                  color: "red",
                  fontSize: "12px",
                  marginTop: "5px",
                  userSelect: "none",
                }
              : { fontSize: "10px", marginTop: "5px", userSelect: "none" }
          }
        >
          {error.name || ""}
        </small>
        <InputText
          id="userEmail"
          required
          aria-describedby="userEmail-help"
          placeholder="Ваш E-mail"
          value={userEmail}
          style={{ width: "100%", margin: "10px 0 0 0" }}
          className={error?.email ? "p-invalid" : ""}
          onChange={(e) => setUserEmail(e.target.value)}
          validateOnly={true}
          onFocus={() => setError({ ...error, email: "" })}
          onBlur={() => {
            if (userEmail.match(emailRegex)) {
              setError({ ...error, email: "" });
            } else {
              setError({ ...error, email: "Некорректное значение" });
            }
          }}
        />
        <small
          id="userEmail-help"
          style={
            error
              ? {
                  color: "red",
                  fontSize: "12px",
                  marginTop: "5px",
                  userSelect: "none",
                }
              : { fontSize: "10px", marginTop: "5px", userSelect: "none" }
          }
        >
          {error.email || ""}
        </small>

        <Button
          rounded
          text
          style={{
            display: "flex",
            justifyContent: "center",
            height: "40px",
            backgroundColor: "#008054",
            width: "220px",
            padding: "10px 20px",
            color: "white",
            outline: "none",
            margin: "10px auto",
          }}
          onClick={() => {
            if (userName && userEmail && userEmail.match(emailRegex)) {
              alert(
                "Информация отправлена на почту 123@mail.ru и записана в БД",
              );
              onClose();
            } else {
              let errors = {} as ModalError;

              if (!userName) {
                errors = { ...errors, name: "Поле не может быть пустым" };
              }

              if (!userEmail) {
                errors = { ...errors, email: "Поле не может быть пустым" };
              }
              setError(errors);
            }
          }}
        >
          Отправить
        </Button>
        <PersonalDataAgreement>
          Заполняя данные, Вы даёте согласие на обработку персональных данных.
        </PersonalDataAgreement>
      </div>
    </Dialog>
  );
};
