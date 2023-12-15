import React, { useEffect, useRef, useState } from "react";
import { PersonalDataAgreement } from "./atoms";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { phoneRegex, emailRegex } from "utils/utils";
import { useScreenSize } from "utils/hooks";
import { Checkbox } from "ui/Checkbox";
import axios from "axios";
import { Toast } from "primereact/toast";
import { v4 as uuidv4 } from "uuid";

type PresentationModalType = {
  isOpen: boolean;
  setModalOpen: (value: boolean) => void;
};

type ModalError = {
  email: string;
  name: string;
  regionOrCity: string;
  userSurname: string;
  phone: string;
  tradeType: string;
};

export const tradeTypes = [
  {
    label: "Собирать и сдавать дикоросы на заготовительный пункт",
    value: "wildGrowthGathering",
  },
  {
    label: "Организовать заготовительный пункт по сбору дикоросов",
    value: "wildGrowthPoint",
  },
  {
    label: "Участвовать как производитель органической продукции",
    value: "participation",
  },
  {
    label: "Продавать нашу продукцию",
    value: "sellGoods",
  },
  {
    label: "Не определился, но интересуюсь этой темой и прошу направлять",
    value: "dontKnow",
  },
];

export const tradeTypeEnum = {
  wildGrowthGathering: "Собирать и сдавать дикоросы на заготовительный пункт",
  wildGrowthPoint: "Организовать заготовительный пункт по сбору дикоросов",
  participation: "Участвовать как производитель органической продукции",
  sellGoods: "Продавать нашу продукцию",
  dontKnow: "Не определился, но интересуюсь этой темой и прошу направлять",
};

export const PartnerModal = ({
  isOpen,
  setModalOpen,
}: PresentationModalType) => {
  const [error, setError] = useState<ModalError>({
    email: "",
    name: "",
    regionOrCity: "",
    userSurname: "",
    phone: "",
    tradeType: "",
  });
  const [userName, setUserName] = useState("");
  const [userRegionOrCity, setUserRegionOrCity] = useState("");
  const [userPatronymic, setUserPatronymic] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userTradeType, setUserTradeType] = useState();
  const [userPhone, setUserPhone] = useState<string | undefined>(undefined);
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [agreement, setAgreement] = useState(false);
  const onClose = () => {
    setModalOpen(false);
    setError({
      email: "",
      name: "",
      regionOrCity: "",
      userSurname: "",
      phone: "",
      tradeType: "",
    });
    setUserName("");
    setUserEmail("");
    setUserSurname("");
    setUserPatronymic("");
    setUserRegionOrCity("");
    setUserTradeType(undefined);
    setUserPhone("");
    setUserMessage("");
  };

  const isTablet = useScreenSize("mobile");
  const isMobile = useScreenSize("smallMobile");
  const toast = useRef<Toast>(null);
  return (
    <>
      <Toast ref={toast}></Toast>

      <Dialog
        draggable={false}
        blockScroll
        dismissableMask
        closeOnEscape
        position={"center"}
        resizable={false}
        header="Хочу стать партнёром"
        visible={isOpen}
        onHide={onClose}
        style={!isMobile && !isTablet ? { width: "28vw" } : {}}
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
            placeholder="Ваше имя"
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
            id="userPatronymic"
            required
            aria-describedby="userPatronymic-help"
            placeholder="Ваше отчество"
            value={userPatronymic}
            style={{ width: "100%", margin: "10px 0 0 0" }}
            onChange={(e) => setUserPatronymic(e.target.value)}
            validateOnly={true}
          />

          <InputText
            id="userSurname"
            required
            aria-describedby="userSurname-help"
            placeholder="Ваша фамилия"
            value={userSurname}
            style={{ width: "100%", margin: "10px 0 0 0" }}
            className={error?.userSurname ? "p-invalid" : ""}
            onChange={(e) => setUserSurname(e.target.value)}
            validateOnly={true}
            onFocus={() => setError({ ...error, userSurname: "" })}
            onBlur={() => {
              if (!userSurname) {
                setError({
                  ...error,
                  userSurname: "Поле не может быть пустым",
                });
              }
            }}
          />
          <small
            id="userSurname-help"
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
            {error.userSurname || ""}
          </small>

          <InputText
            id="userRegionOrCity"
            required
            aria-describedby="userRegionOrCity-help"
            placeholder="Регион (город)"
            value={userRegionOrCity}
            style={{ width: "100%", margin: "10px 0 0 0" }}
            className={error?.regionOrCity ? "p-invalid" : ""}
            onChange={(e) => setUserRegionOrCity(e.target.value)}
            validateOnly={true}
            onFocus={() => setError({ ...error, regionOrCity: "" })}
            onBlur={() => {
              if (!userRegionOrCity) {
                setError({
                  ...error,
                  regionOrCity: "Поле не может быть пустым",
                });
              }
            }}
          />
          <small
            id="userRegionOrCity-help"
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
            {error.regionOrCity || ""}
          </small>

          <Dropdown
            value={userTradeType}
            onChange={(e) => setUserTradeType(e.value)}
            className={error?.tradeType ? "p-invalid" : ""}
            options={tradeTypes}
            optionLabel="label"
            showClear
            placeholder="В рамках проекта Вы хотите"
            style={{ width: "100%", margin: "10px 0 0 0" }}
          />

          <small
            id="userTradeType-help"
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
            {error.tradeType || ""}
          </small>

          <InputMask
            id="userPhone"
            required
            aria-describedby="userPhone-help"
            placeholder="Ваш телефон"
            value={userPhone}
            mask="+7(999)999-99-99"
            style={{ width: "100%", margin: "10px 0 0 0" }}
            className={error?.phone ? "p-invalid" : ""}
            onChange={(e) =>
              setUserPhone(e.target.value || e.value || undefined)
            }
            validateOnly={true}
            onFocus={() => setError({ ...error, phone: "" })}
            onBlur={() => {
              if (userPhone?.match(phoneRegex)) {
                setError({ ...error, phone: "" });
              } else {
                setError({ ...error, phone: "Некорректное значение" });
              }
            }}
          />
          <small
            id="userPhone-help"
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
            {error.phone || ""}
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
          <InputTextarea
            placeholder="Сообщение"
            autoResize
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            rows={5}
            cols={30}
            style={{ width: "100%", margin: "10px 0 0 0" }}
          />

          <Button
            rounded
            text
            disabled={!agreement}
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
            onClick={async () => {
              if (
                userName &&
                userEmail &&
                userEmail.match(emailRegex) &&
                userRegionOrCity &&
                userPhone &&
                userPhone.match(phoneRegex) &&
                userTradeType
              ) {
                const result = new FormData();
                result.append("id", uuidv4());
                result.append("name", userName || "");
                result.append("userRegionOrCity", userRegionOrCity || "");
                result.append("userPatronymic", userPatronymic || "");
                result.append("userSurname", userSurname || "");
                result.append("userTradeType", userTradeType || "");
                result.append("userPhone", userPhone || "");
                result.append("userEmail", userEmail || "");
                result.append("userMessage", userMessage || "");

                let object: any = {};
                result.forEach((value, key) => {
                  object[key] = value;
                });

                await axios.post(
                  `https://siberia-organic.com:3000/partners`,
                  object,
                );

                setTimeout(() => onClose());
                toast.current?.show({
                  severity: "success",
                  summary: "Успех",
                  detail: "Ваша заявка принята!",
                });
              } else {
                let errors = {} as ModalError;

                if (!userName) {
                  errors = { ...errors, name: "Поле не может быть пустым" };
                }

                if (!userEmail) {
                  errors = { ...errors, email: "Поле не может быть пустым" };
                }

                if (!userPhone) {
                  errors = { ...errors, phone: "Поле не может быть пустым" };
                }

                if (!userTradeType) {
                  errors = {
                    ...errors,
                    tradeType: "Поле не может быть пустым",
                  };
                }

                if (!userRegionOrCity) {
                  errors = {
                    ...errors,
                    regionOrCity: "Поле не может быть пустым",
                  };
                }

                if (userEmail && !userEmail.match(emailRegex)) {
                  errors = { ...errors, email: "Некорректное значение" };
                }

                if (userPhone && !userPhone.match(phoneRegex)) {
                  errors = { ...errors, phone: "Некорректное значение" };
                }
                setError(errors);
              }
            }}
          >
            Отправить
          </Button>
          <PersonalDataAgreement>
            <Checkbox
              onChange={() => setAgreement(!agreement)}
              checked={agreement}
              value={agreement}
              label=""
            >
              <div>
                <span>
                  Согласен с{" "}
                  <a href="/personalAgreement">
                    условиями использования формы заявки
                  </a>{" "}
                  и политикой конфиденциальности лица, разместившего форму
                  заявки
                </span>
              </div>
            </Checkbox>
          </PersonalDataAgreement>
        </div>
      </Dialog>
    </>
  );
};
