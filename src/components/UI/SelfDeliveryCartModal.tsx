import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { InputMask } from "primereact/inputmask";
import { phoneRegex, emailRegex, formatPrice } from "utils/utils";
import { useScreenSize } from "utils/hooks";
import axios from "axios";
import { Toast } from "primereact/toast";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { CartActions, CartSelectors } from "store/cart";
import { useDispatch } from "react-redux";
import {
  FinalCartListWrapper,
  FinalCartList,
  FinalCartListItem,
  FinalCartTotalPrice,
} from "components/atoms";
import { Accordion, AccordionTab } from "primereact/accordion";

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

export const SelfDeliveryCartModal = ({
  isOpen,
  setModalOpen,
}: PresentationModalType) => {
  const cartList = useSelector(CartSelectors.list);
  const totalPrice = cartList?.reduce((total, item) => {
    return total + (item?.quantity || 1) * (Number(item?.price) || 1);
  }, 0);
  const dispatch = useDispatch();
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
  const [userPhone, setUserPhone] = useState<string | undefined>(undefined);
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
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
        header="Заявка на самовывоз"
        visible={isOpen}
        onHide={onClose}
        style={!isMobile && !isTablet ? { width: "50vw" } : {}}
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

          <Accordion style={{ width: "100%", marginTop: "20px" }}>
            <AccordionTab header="Состав заказа">
              <FinalCartListWrapper>
                <FinalCartList>
                  {cartList?.map((item) => (
                    <FinalCartListItem key={item.id}>
                      {item.name}, {item.quantity} шт.,{" "}
                      {item.price ? `${formatPrice(item.price)} ₽` : "Скоро"}
                    </FinalCartListItem>
                  ))}
                </FinalCartList>
                <FinalCartTotalPrice>
                  {" "}
                  Общая цена: {formatPrice(totalPrice)} ₽
                </FinalCartTotalPrice>
              </FinalCartListWrapper>
            </AccordionTab>
          </Accordion>

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
            onClick={async () => {
              if (
                userName &&
                userEmail &&
                userEmail.match(emailRegex) &&
                userRegionOrCity &&
                userPhone &&
                userPhone.match(phoneRegex)
              ) {
                const result = new FormData();
                result.append("id", uuidv4());
                result.append("name", userName || "");
                result.append("userRegionOrCity", userRegionOrCity || "");
                result.append("userPatronymic", userPatronymic || "");
                result.append("userSurname", userSurname || "");
                result.append("userPhone", userPhone || "");
                result.append("userEmail", userEmail || "");
                result.append("userMessage", userMessage || "");

                let object: any = {};
                result.forEach((value, key) => {
                  object[key] = value;
                });

                const postBody = {
                  ...object,
                  cartList,
                };

                await axios.post(
                  `https://siberia-organic.com:3000/buyOut`,
                  postBody,
                );

                await axios
                  .post("https://siberia-organic.com:5000/sendTelegramBuyout", {
                    ...postBody,
                  })
                  .then((res) => console.log(res));

                setTimeout(() => onClose());
                toast.current?.show({
                  severity: "success",
                  summary: "Успех",
                  detail: "Ваша заявка на самовывоз успешно принята!",
                });
                dispatch(CartActions.reset());
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
        </div>
      </Dialog>
    </>
  );
};
