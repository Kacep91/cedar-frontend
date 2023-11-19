import { ProductCardType } from "components/UI/types";
import hit from "../../assets/images/hit.svg";
import sale from "../../assets/images/sale.svg";
import React, { useRef } from "react";
import {
  ProductCard,
  ProductImage,
  ProductHeader,
  ProductWeight,
  ProductReviews,
  ProductReviewsText,
  ProductBuySection,
  ProductOldPrice,
  ProductNewPrice,
  ProductBuyButton,
  ToastWrapper,
  ToastText,
  ToastHeader,
  ToastLink,
} from "../atoms";
import { formatPrice, getWord } from "utils/utils";
import placeHolder from "../../assets/images/placeHolder.png";
import { CartActions, CartSelectors } from "store/cart";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router";

export const ItemListUnit = (props: ProductCardType) => {
  const toast = useRef<Toast>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const list = useSelector(CartSelectors.list);
  const { id } = props;
  const isUnitInList =
    list && list.length > 0 && list.find((item: any) => item?.id === id);

  return (
    <>
      <Toast ref={toast} />
      <ProductCard>
        <div className="shop-item-badges">
          {props.isSale && (
            <div className="shop-item-badge">
              <div className="b-badge b-badge-sale">
                <img src={sale} width="60" alt="" />
                <span className="b-badge-text">Скидка</span>
              </div>
            </div>
          )}
          {props.isHit && (
            <div className="shop-item-badge">
              <div className="b-badge b-badge-hit">
                <img src={hit} width="60" height={60} alt="Хит продаж" />
                <span className="b-badge-text">
                  Хит <br />
                  продаж
                </span>
              </div>
            </div>
          )}
          {props.isNew && (
            <div className="shop-item-badge">
              <div className="b-badge b-badge-new">
                <div className="b-badge-icon"></div>
                <span className="b-badge-text">Новинка</span>
              </div>
            </div>
          )}
        </div>
        <ProductImage
          src={`${props.image || placeHolder}`}
          width="250"
          preview
          height="250"
          loading="lazy"
          imageStyle={{ objectFit: "cover" }}
        />
        <ProductHeader>
          {props.name} {props.volume || ""}
        </ProductHeader>
        <ProductReviews>
          {props.reviews ? (
            <i
              className="pi pi-star-fill"
              style={{ color: "#FFC42E", width: "16px", height: "16px" }}
            ></i>
          ) : (
            <i
              className="pi pi-star"
              style={{ color: "#708090", width: "16px", height: "16px" }}
            ></i>
          )}
          <ProductReviewsText>
            {`${props.reviews} ${getWord(String(props.reviews), "отзыв")}` ||
              "Нет отзывов"}
          </ProductReviewsText>
        </ProductReviews>
        <ProductBuySection>
          {props.oldPrice && (
            <ProductOldPrice>
              <span className="price">{formatPrice(props.oldPrice)} ₽</span>
            </ProductOldPrice>
          )}
          <ProductNewPrice isOldPrice={Boolean(props.oldPrice)}>
            {props.price ? `${formatPrice(props.price)} ₽` : "Скоро"}
          </ProductNewPrice>
          {isUnitInList ? (
            <ProductBuyButton
              isDelete={true}
              onClick={() => {
                dispatch(CartActions.deleteItem({ id }));
                toast?.current?.show({
                  severity: "warn",
                  content: (
                    <ToastWrapper
                      onClick={() => {
                        navigate("/cart");
                      }}
                    >
                      <ToastHeader>Успешно</ToastHeader>
                      <ToastText>Товар удалён из корзины</ToastText>
                    </ToastWrapper>
                  ),
                  life: 3000,
                });
              }}
            >
              Убрать
              <i
                className="pi pi-cart-plus"
                style={{ color: "#708090", width: "16px", height: "16px" }}
              ></i>
            </ProductBuyButton>
          ) : (
            <ProductBuyButton
              onClick={() => {
                dispatch(CartActions.setItem(props));
                toast?.current?.show({
                  severity: "success",
                  content: (
                    <ToastWrapper
                      onClick={() => {
                        navigate("/cart");
                      }}
                    >
                      <ToastHeader>Успешно</ToastHeader>
                      <ToastText>Товар добавлен в корзину</ToastText>
                      <ToastLink>Перейти</ToastLink>
                    </ToastWrapper>
                  ),
                  life: 3000,
                });
              }}
            >
              Купить{" "}
              <i
                className="pi pi-cart-plus"
                style={{ color: "#708090", width: "16px", height: "16px" }}
              ></i>
            </ProductBuyButton>
          )}
        </ProductBuySection>
      </ProductCard>
    </>
  );
};
