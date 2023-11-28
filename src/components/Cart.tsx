import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading } from "ui/Typography";
import {
  CartWrapper,
  CheckOrderWrapper,
  CheckOrderHeading,
  OrderConfirmWrapper,
  OrderConfirmForm,
  OrderSummaryWrapper,
  RadioGroup,
  OrderListItem,
  OrderListImage,
  OrderListName,
  OrderListPrice,
  OrderListTotal,
  OrderListCustom,
  RadioButtonWrapper,
  RadioButtonText,
  OrderListHeaders,
} from "./atoms";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { CartActions, CartSelectors } from "store/cart";
import MainHeader from "./UI/MainHeader";
import { amountOptions, categories } from "mocks/helpers";
import { Dropdown } from "primereact/dropdown";
import placeHolder from "./../assets/images/placeHolder.png";
import {
  cardNotion,
  emailRegex,
  formatPrice,
  phoneRegex,
  stableSort,
} from "utils/utils";
import { LoaderComponent } from "react-fullscreen-loader";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputTextarea } from "primereact/inputtextarea";
import { InputMask } from "primereact/inputmask";
import { Checkbox } from "primereact/checkbox";
import { useScreenSize } from "utils/hooks";

type CartError = {
  email: string;
  surname: string;
  name: string;
  phone: string;
  city: string;
};

export const Cart = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(CartSelectors.isLoading);
  const isMobile = useScreenSize("mobile");

  const [error, setError] = useState<CartError>({
    email: "",
    name: "",
    surname: "",
    phone: "",
    city: "",
  });
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userTradeType, setUserTradeType] = useState();
  const [userPhone, setUserPhone] = useState<string | undefined>(undefined);
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const onClose = () => {
    setError({
      email: "",
      name: "",
      phone: "",
      surname: "",
      city: "",
    });
    setUserName("");
    setUserEmail("");
    setUserSurname("");
    setUserCity("");
    setUserTradeType(undefined);
    setUserPhone("");
    setUserMessage("");
  };
  const cartList = useSelector(CartSelectors.list);

  const [selectedCategory, setSelectedCategory] = useState("");

  const ItemTemplate = (item: any) => {
    return (
      <OrderListItem key={item.id}>
        <div
          style={
            isMobile
              ? { display: "flex", position: "relative" }
              : { display: "flex", position: "relative", alignItems: "center" }
          }
        >
          {!isMobile && (
            <span
              style={{
                fontSize: "1rem",
                position: "absolute",
                borderRadius: "15px",
                color: "#9f9e9e",
                top: "-30px",
                left: "250px",
              }}
            >
              Наименование
            </span>
          )}

          <i
            className="pi pi-times"
            style={
              isMobile
                ? {
                    fontSize: "1rem",
                    cursor: "pointer",
                    position: "absolute",
                    color: "red",
                    border: "2px solid red",
                    borderRadius: "15px",
                  }
                : { fontSize: "2rem", cursor: "pointer", marginRight: "5px" }
            }
            onClick={() => {
              dispatch(CartActions.setLoadingList(true));
              dispatch(CartActions.deleteItem({ id: item.id }));
              setTimeout(
                () => dispatch(CartActions.setLoadingList(false)),
                250,
              );
            }}
          ></i>
          <OrderListImage
            src={item.image || placeHolder}
            style={{ objectFit: "cover" }}
            alt={item.name}
          />
        </div>
        <OrderListName>
          <span>{item.name}</span>
          <span>{item.volume || ""}</span>
        </OrderListName>
        <OrderListPrice>
          {!isMobile && (
            <span
              style={{
                fontSize: "1rem",
                position: "absolute",
                borderRadius: "15px",
                fontWeight: "normal",
                color: "#9f9e9e",
                top: "-65px",
                left: "-10px",
              }}
            >
              Цена за штуку
            </span>
          )}

          <span>{item.price ? `${formatPrice(item.price)} ₽` : "Скоро"}</span>
        </OrderListPrice>
        <OrderListTotal>
          {!isMobile && (
            <span
              style={{
                fontSize: "1rem",
                position: "absolute",
                fontWeight: "normal",
                borderRadius: "15px",
                color: "#9f9e9e",
                top: "-65px",
                left: "22px",
              }}
            >
              Итого
            </span>
          )}
          <span>
            {item.price
              ? `${formatPrice(item.price * (item.amount || 1))} ₽`
              : "Скоро"}
          </span>
        </OrderListTotal>
        {isMobile && <div>Количество</div>}
        <div style={{ display: "flex", position: "relative" }}>
          {!isMobile && (
            <span
              style={{
                fontSize: "1rem",
                position: "absolute",
                fontWeight: "normal",
                borderRadius: "15px",
                color: "#9f9e9e",
                top: "-65px",
                left: "-13px",
              }}
            >
              Количество
            </span>
          )}
          <Dropdown
            defaultValue={item.amount || 1}
            value={item.amount || 1}
            onChange={(e) => {
              dispatch(
                CartActions.setItem({ ...item, amount: e.target.value }),
              );
            }}
            options={amountOptions}
            optionLabel="label"
          />
        </div>
      </OrderListItem>
    );
  };

  return (
    <>
      <CartWrapper>
        <MainHeader isCart={true} />
        <CheckOrderWrapper>
          <CheckOrderHeading>
            <Heading.H1>Проверьте ваш заказ</Heading.H1>
            <Button>Очистить</Button>
          </CheckOrderHeading>

          {isLoading ? (
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="4"
              animationDuration="1s"
            />
          ) : (
            <OrderListCustom style={{ width: "100%" }}>
              {cartList
                .slice(0, cartList.length)
                ?.sort(stableSort)
                .map((item) => {
                  return item ? ItemTemplate(item) : null;
                })}
            </OrderListCustom>
          )}
        </CheckOrderWrapper>
        <OrderConfirmWrapper>
          <OrderConfirmForm>
            <Heading.H1>Оформление заказа</Heading.H1>
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
              id="userSurname"
              required
              aria-describedby="userSurname-help"
              placeholder="Ваша фамилия"
              value={userSurname}
              style={{ width: "100%", margin: "10px 0 0 0" }}
              className={error?.surname ? "p-invalid" : ""}
              onChange={(e) => setUserSurname(e.target.value)}
              validateOnly={true}
              onFocus={() => setError({ ...error, surname: "" })}
              onBlur={() => {
                if (!userSurname) {
                  setError({ ...error, surname: "Поле не может быть пустым" });
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
              {error.surname || ""}
            </small>
            <InputMask
              id="userPhone"
              required
              aria-describedby="userPhone-help"
              placeholder="Ваш телефон"
              value={userPhone}
              mask="+7(999)99-99-99"
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
          </OrderConfirmForm>
          {!isMobile && (
            <OrderConfirmForm style={{ width: "100%" }}>
              <Heading.H1 style={{ marginBottom: "10px" }}>
                Город доставки
              </Heading.H1>
              <InputText
                id="userCity"
                required
                aria-describedby="userCity-help"
                placeholder="Ваш город"
                value={userCity}
                style={{ width: "100%", padding: "20px" }}
                className={error?.city ? "p-invalid" : ""}
                onChange={(e) => setUserCity(e.target.value)}
                validateOnly={true}
                onFocus={() => setError({ ...error, city: "" })}
                onBlur={() => {
                  if (!userCity) {
                    setError({ ...error, city: "Поле не может быть пустым" });
                  }
                }}
              />
              <small
                id="userCity-help"
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
                {error.city || ""}
              </small>
              <Heading.H1 style={{ marginBottom: "20px" }}>
                Способ доставки
              </Heading.H1>
              <RadioGroup>
                {categories.map((category) => {
                  return (
                    <RadioButtonWrapper
                      key={category.name}
                      onChange={() => setSelectedCategory(category.name)}
                    >
                      <div style={{ display: "flex" }}>
                        <Checkbox
                          onChange={() => setSelectedCategory(category.name)}
                          checked={selectedCategory === category.name}
                        ></Checkbox>
                        <div style={{ marginLeft: "10px" }}>
                          {category.name}
                        </div>
                      </div>

                      <RadioButtonText>{category.text}</RadioButtonText>
                      <RadioButtonText style={{ marginTop: 0 }}>
                        {category.price}
                      </RadioButtonText>
                    </RadioButtonWrapper>
                  );
                })}
              </RadioGroup>
            </OrderConfirmForm>
          )}
        </OrderConfirmWrapper>
        <OrderSummaryWrapper></OrderSummaryWrapper>
        {isMobile && (
          <OrderConfirmWrapper>
            <OrderConfirmForm style={{ width: "100%" }}>
              <Heading.H1 style={{ marginBottom: "10px" }}>
                Город доставки
              </Heading.H1>
              <InputText
                id="userCity"
                required
                aria-describedby="userCity-help"
                placeholder="Ваш город"
                value={userCity}
                style={{ width: "100%", padding: "20px" }}
                className={error?.city ? "p-invalid" : ""}
                onChange={(e) => setUserCity(e.target.value)}
                validateOnly={true}
                onFocus={() => setError({ ...error, city: "" })}
                onBlur={() => {
                  if (!userCity) {
                    setError({ ...error, city: "Поле не может быть пустым" });
                  }
                }}
              />
              <small
                id="userCity-help"
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
                {error.city || ""}
              </small>
            </OrderConfirmForm>
          </OrderConfirmWrapper>
        )}
        {isMobile && (
          <OrderConfirmWrapper>
            <OrderConfirmForm>
              <Heading.H1 style={{ marginBottom: "20px" }}>
                Способ доставки
              </Heading.H1>
              <RadioGroup isMobile={isMobile}>
                {categories.map((category) => {
                  return (
                    <RadioButtonWrapper
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <div style={{ display: "flex" }}>
                        <Checkbox
                          onChange={() => setSelectedCategory(category.name)}
                          checked={selectedCategory === category.name}
                        ></Checkbox>
                        <div style={{ marginLeft: "10px" }}>
                          {category.name}
                        </div>
                      </div>

                      <RadioButtonText>{category.text}</RadioButtonText>
                      <RadioButtonText style={{ marginTop: 0 }}>
                        {category.price}
                      </RadioButtonText>
                    </RadioButtonWrapper>
                  );
                })}
              </RadioGroup>
            </OrderConfirmForm>
          </OrderConfirmWrapper>
        )}
      </CartWrapper>
    </>
  );
};
