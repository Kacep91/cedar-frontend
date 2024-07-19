import { ProductCardType } from "components/UI/types";
import hit from "../../assets/images/hit.svg";
import sale from "../../assets/images/sale.svg";
import React, { useRef } from "react";
import {
  ProductCard,
  ProductImage,
  ProductHeader,
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
import { getWord } from "utils/utils";
import placeHolder from "../../assets/images/placeHolder.png";
import { CartActions, CartSelectors } from "store/cart";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router";
import { ProductPresentationPageProps } from "components/UI/ProductPresentationPage";

export const ItemListUnit = (props: ProductPresentationPageProps) => {
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
        <ProductImage
          src={`${props.url || props.image || placeHolder}`}
          width="250"
          // preview
          height="250"
          loading="lazy"
          imageStyle={{ objectFit: "cover" }}
          onClick={() => navigate(`/goods/product/${props.id}`)}
        />
        <ProductHeader onClick={() => navigate(`/goods/product/${props.id}`)}>
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
            {`${props.reviews || "0"} ${getWord(
              String(props.reviews),
              "отзыв",
            )}` || "Нет отзывов"}
          </ProductReviewsText>
        </ProductReviews>
        <ProductBuySection>
          {/* {props.oldPrice && Number(props.oldPrice) !== 0 && (
            <ProductOldPrice>
              <span className="price">{formatPrice(props.oldPrice)} ₽</span>
            </ProductOldPrice>
          )} */}
          <ProductNewPrice
            isOldPrice={
              false
              // Boolean(props.oldPrice && Number(props.oldPrice) !== 0)
            }
          >
            {
              // props.price
              //   ? `${formatPrice(String(props.price)?.trim())} ₽`
              //   :
              "Скоро"
            }
          </ProductNewPrice>
          {isUnitInList ? (
            <ProductBuyButton
              isDelete={true}
              onClick={() => {
                dispatch(CartActions.deleteItem({ id: id || "" }));
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
                dispatch(CartActions.setItem(props as any));
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
              Купить
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
