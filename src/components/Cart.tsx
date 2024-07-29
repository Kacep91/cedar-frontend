import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading } from "ui/Typography";
import {
  CartWrapper,
  CheckOrderWrapper,
  CheckOrderHeading,
  OrderConfirmWrapper,
  OrderConfirmForm,
  OrderSummaryWrapper,
  OrderListItem,
  OrderListImage,
  OrderListName,
  OrderListPrice,
  OrderListTotal,
  OrderListCustom,
  CartBuyButton,
  CartSelfDeliveryButton,
  CartButtonsWrapper,
  CheckOrderClearButton,
  OrderListCustomWrapper,
  OrderListTotalHeading,
  OrderListTotalPrice,
} from "./atoms";
import { InputText } from "primereact/inputtext";
import { CartActions, CartSelectors } from "store/cart";
import MainHeader from "./UI/MainHeader";
import placeHolder from "./../assets/images/placeHolder.png";
import { emailRegex, formatPrice, phoneRegex, stableSort } from "utils/utils";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputTextarea } from "primereact/inputtextarea";
import { InputMask } from "primereact/inputmask";
import { useScreenSize } from "utils/hooks";
import { EmptyCart } from "./UI/EmptyCart";
import { ClearCartModal } from "./UI/ClearCartModal";
import { InputNumber } from "ui/InputNumber";
import { SelfDeliveryCartModal } from "./UI/SelfDeliveryCartModal";

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
  const [isClearCartModalOpen, setClearCartModalOpen] = useState(false);
  const [isSelfDeliveryModalOpen, setSelfDeliveryModalOpen] = useState(false);

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
    setUserPhone("");
    setUserMessage("");
  };
  const cartList = useSelector(CartSelectors.list);
  const totalPrice = cartList?.reduce((total, item) => {
    return total + (item?.quantity || 1) * (Number(item?.price) || 1);
  }, 0);

  const ItemTemplate = (item: any) => {
    console.log("item", item);
    return (
      <OrderListItem key={item.id}>
        <div
          style={
            !isMobile
              ? { display: "flex" }
              : { display: "flex", flexDirection: "column" }
          }
        >
          <OrderListImage
            src={item.url || item.image || placeHolder}
            style={{ objectFit: "cover" }}
            alt={item.name}
          />
          <OrderListName>
            <span>{item.articule}</span>
            <span>{`${item.name}`}</span>
            <span>
              {item.pack} - {item.volume || ""}
            </span>
            <OrderListPrice>
              <span>
                {item.price ? `${formatPrice(item.price)} ₽` : "Скоро"}
              </span>
            </OrderListPrice>
          </OrderListName>
        </div>
        <div style={{ display: "flex", position: "relative" }}>
          <InputNumber
            className="cart-price-input"
            showButtons
            buttonLayout="horizontal"
            value={item?.quantity || 1}
            onValueChange={(e) =>
              dispatch(
                CartActions.setItem({
                  data: item,
                  quantity: e.target.value || 1,
                }),
              )
            }
            min={1}
            max={100}
            step={1}
            decrementButtonClassName="p-button-danger"
            incrementButtonClassName="p-button-success"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
            mode="decimal"
          />
        </div>
        <i
          className="pi pi-times"
          style={
            !isMobile
              ? {
                  position: "absolute",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  top: "0",
                  right: "0",
                }
              : {
                  position: "absolute",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  top: "15px",
                  right: "19px",
                }
          }
          onClick={() => {
            dispatch(CartActions.setLoadingList(true));
            dispatch(CartActions.deleteItem({ id: item.id }));
            setTimeout(() => dispatch(CartActions.setLoadingList(false)), 250);
          }}
        ></i>
      </OrderListItem>
    );
  };

  return (
    <>
      <CartWrapper>
        <MainHeader isCart={true} />
        <CheckOrderWrapper>
          <CheckOrderHeading>
            <Heading.H1>Корзина</Heading.H1>
            {!isLoading && cartList?.length > 0 && (
              <CheckOrderClearButton
                text
                className="pi pi-trash"
                onClick={() => {
                  setClearCartModalOpen(true);
                }}
              >
                <span>&nbsp;Очистить</span>
              </CheckOrderClearButton>
            )}
          </CheckOrderHeading>

          {isLoading ? (
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="4"
              animationDuration="1s"
            />
          ) : !isLoading && cartList?.length === 0 ? (
            <EmptyCart />
          ) : (
            <OrderListCustomWrapper>
              <OrderListCustom style={{ width: "100%" }}>
                {cartList
                  .slice(0, cartList.length)
                  ?.sort(stableSort)
                  .map((item) => {
                    return item ? ItemTemplate(item) : null;
                  })}
              </OrderListCustom>
              <OrderListTotal>
                <OrderListTotalHeading>
                  Общая стоимость:{" "}
                  <OrderListTotalPrice>
                    {formatPrice(totalPrice)} ₽
                  </OrderListTotalPrice>
                </OrderListTotalHeading>
                <CartButtonsWrapper>
                  <CartBuyButton
                    icon="pi pi-shopping-cart"
                    rounded
                    text
                    raised
                    severity="success"
                    aria-label="Buy"
                  >
                    &nbsp;Купить
                  </CartBuyButton>
                  <CartSelfDeliveryButton
                    icon="pi pi-car"
                    rounded
                    text
                    raised
                    severity="secondary"
                    aria-label="Buy"
                    onClick={() => setSelfDeliveryModalOpen(true)}
                  >
                    &nbsp;Самовывоз
                  </CartSelfDeliveryButton>
                </CartButtonsWrapper>
              </OrderListTotal>
            </OrderListCustomWrapper>
          )}
        </CheckOrderWrapper>
      </CartWrapper>
      <ClearCartModal
        isDeleteModalOpened={isClearCartModalOpen}
        setDeleteModalOpen={setClearCartModalOpen}
      />
      <SelfDeliveryCartModal
        isOpen={isSelfDeliveryModalOpen}
        setModalOpen={setSelfDeliveryModalOpen}
      />
    </>
  );
};
