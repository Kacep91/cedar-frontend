import React, { useEffect, useState } from "react";
import {
  AdditionalInfoBg,
  AdditionalInfoGrid,
  AdditionalInfoWrapper,
  FeaturedProductsImage,
  GridSectionFavourite,
  GridSectionFeatured,
  InfoCardHeader,
  InfoCardImage,
  InfoCardText,
  MenuButton,
  MenuButtonWrapper,
  NavigationHeader,
  NavigationWrapper,
  Sale,
} from "../atoms";
import logo from "../../assets/images/logo.png";
import aboutUs from "../../assets/images/aboutUs.jpg";
import goods from "../../assets/images/goods.jpg";
import offer from "../../assets/images/offer.jpg";
import lees from "../../assets/images/lees.jpg";
import snowFlake from "../../assets/images/snowFlake.png";
import chips1 from "../../assets/images/chips1.png";
import risotto from "../../assets/images/risotto.jpg";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useScreenSize } from "utils/hooks";
import { useNavigate } from "react-router";
import { Badge } from "primereact/badge";
import { useSelector } from "react-redux";
import { CartSelectors } from "store/cart";

type NavbarType = {
  setPresentationModalVisible: (value: boolean) => void;
  setPartnerModalVisible: (value: boolean) => void;
  setLongPopupVisible: (value: boolean) => void;
  setSticky: (value: boolean) => void;
  isSticky: boolean;
  isLongPopupVisible: boolean;
  isMobileMenuOpened: boolean;
  isProductsPopupVisible: boolean;
  setProductsPopupVisible: (value: boolean) => void;
};

export function Navbar({
  setSticky,
  isSticky,
  isLongPopupVisible,
  isMobileMenuOpened,
  isProductsPopupVisible,
  setProductsPopupVisible,
  setPresentationModalVisible,
  setPartnerModalVisible,
  setLongPopupVisible,
}: NavbarType) {
  const list = useSelector(CartSelectors.list);

  const listLength = list.length;

  const menuButtons = [
    {
      text: "О нас",
      links: [
        {
          text: "О нас",
          url: "",
        },
        {
          text: "О нас пишут",
          url: "",
        },
        {
          text: "Контакты",
          url: "",
        },
      ],
      onClick: () => {
        setLongPopupVisible(!isLongPopupVisible);
        setProductsPopupVisible(false);
      },
    },
    {
      text: "Наша продукция",
      links: [
        {
          text: "Сибирские напитки",
          url: "/goods/#product_id_0",
        },
        {
          text: "Сибирские сладости",
          url: "/goods/#product_id_1",
        },
        {
          text: "Сибирский мёд",
          url: "/goods/#product_id_2",
        },
        {
          text: "Сибирская ягода",
          url: "/goods/#product_id_3",
        },
        {
          text: "Сибирские грибы",
          url: "/goods/#product_id_4",
        },
        {
          text: "Сибирское масло",
          url: "/goods/#product_id_5",
        },
        {
          text: "Сибирская косметика",
          url: "/goods/#product_id_6",
        },
        {
          text: "Сибирские бады",
          url: "/goods/#product_id_7",
        },
      ],
      onClick: () => {
        setLongPopupVisible(false);
        setProductsPopupVisible(!isProductsPopupVisible);
      },
    },
    {
      text: "Запрос на презентацию/каталог",
      onClick: () => setPresentationModalVisible(true),
    },
    {
      text: "Хочу стать партнёром",
      onClick: () => setPartnerModalVisible(true),
    },
  ];

  const isTablet = useScreenSize("mobile");
  const isMobile = useScreenSize("smallMobile");
  const navigate = useNavigate();

  const checkScrollTop = () => {
    if (!isSticky && window.pageYOffset >= 970) {
      setSticky(true);
    } else if (isSticky && window.pageYOffset < 970) {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [isSticky]);

  return (
    <NavigationWrapper isOnTop={isSticky}>
      {!isMobileMenuOpened && (
        <Sale onClick={() => navigate("/goods")}>
          {isMobile ? (
            <span>
              Нет минимального заказа. <br />
              Бесплатная доставка от 4500 рублей
            </span>
          ) : (
            <span>
              Нет минимального заказа. Бесплатная доставка от 4500 рублей
            </span>
          )}
        </Sale>
      )}
      {!isMobile && (
        <NavigationHeader>
          {isTablet ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <img
                  src={snowFlake}
                  width="60"
                  style={{
                    cursor: "pointer",
                  }}
                  alt=""
                  onClick={() => navigate("/")}
                />
                {menuButtons.map((item) => {
                  return (
                    <MenuButtonWrapper key={item.text}>
                      <MenuButton>{item.text}</MenuButton>
                    </MenuButtonWrapper>
                  );
                })}
                <span
                  className="p-input-icon-left"
                  style={isTablet ? { width: "20%" } : { width: "100%" }}
                >
                  <i className="pi pi-search" />
                  <InputText
                    placeholder="Поиск по сайту"
                    style={{
                      borderRadius: "15px",
                      height: "40px",
                      width: "100%",
                    }}
                  />
                </span>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "10px",
                    width: "min-content",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <Button
                      icon="pi pi-shopping-cart"
                      rounded
                      text
                      raised
                      severity="success"
                      aria-label="Cart"
                      onClick={() => (listLength ? navigate("/cart") : null)}
                    />
                    {listLength ? (
                      <Badge
                        className="small"
                        size={"normal"}
                        style={{ position: "absolute", right: "-5px" }}
                        value={listLength}
                      ></Badge>
                    ) : (
                      <></>
                    )}
                  </div>
                  <Button
                    icon="pi pi-shield"
                    rounded
                    text
                    raised
                    severity="success"
                    aria-label="Shield"
                    onClick={() => navigate("/adminPanel")}
                  />
                </div>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <img
                  src={logo}
                  width="160"
                  style={{
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                  alt=""
                  onClick={() => navigate("/")}
                />
                {menuButtons.map((item) => {
                  const additionalProps = {
                    onClick: () => item.onClick && item.onClick(),
                    onTouchStart: () => item.onClick && item.onClick(),
                  };
                  return (
                    <MenuButtonWrapper key={item.text} {...additionalProps}>
                      <MenuButton>{item.text}</MenuButton>
                    </MenuButtonWrapper>
                  );
                })}
                <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText
                    placeholder="Поиск по сайту"
                    style={{
                      borderRadius: "15px",
                      height: "40px",
                    }}
                  />
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div style={{ position: "relative" }}>
                  <Button
                    icon="pi pi-shopping-cart"
                    rounded
                    text
                    raised
                    severity="success"
                    aria-label="Cart"
                    onClick={() => (listLength ? navigate("/cart") : null)}
                  />{" "}
                  {listLength ? (
                    <Badge
                      className="small"
                      size={"normal"}
                      style={{ position: "absolute", right: "-5px" }}
                      value={listLength}
                    ></Badge>
                  ) : (
                    <></>
                  )}
                </div>
                <Button
                  icon="pi pi-shield"
                  rounded
                  text
                  raised
                  severity="success"
                  aria-label="Shield"
                  onClick={() => navigate("/adminPanel")}
                />
              </div>
            </div>
          )}
          <AdditionalInfoWrapper isOpened={isLongPopupVisible}>
            <AdditionalInfoBg isOpened={isLongPopupVisible}>
              <InfoCardHeader onClick={() => navigate("/aboutUs")}>
                <InfoCardImage src={aboutUs} />
                <InfoCardText>
                  Кто мы? Подробнее о том, что мы делаем
                </InfoCardText>
              </InfoCardHeader>

              <InfoCardHeader>
                <InfoCardImage src={goods} />
                <InfoCardText>
                  Вот такие товары можно найти в нашем ассортименте
                </InfoCardText>
              </InfoCardHeader>

              <InfoCardHeader>
                <InfoCardImage src={offer} />
                <InfoCardText>
                  Гарантия качества - попробовал, понравилось - купил!
                </InfoCardText>
              </InfoCardHeader>

              <InfoCardHeader>
                <InfoCardImage src={lees} />
                <InfoCardText>
                  Именно из этих лисичек, бережно собранных, вымытых и
                  отобранных - мы и делаем наше варенье
                </InfoCardText>
              </InfoCardHeader>
            </AdditionalInfoBg>
          </AdditionalInfoWrapper>

          <AdditionalInfoWrapper isOpened={isProductsPopupVisible}>
            <AdditionalInfoGrid isOpened={isProductsPopupVisible}>
              <GridSectionFavourite>
                <h4>Каталог</h4>
                <a
                  href="/goods"
                  onClick={() => {
                    setProductsPopupVisible(false);
                  }}
                >
                  <h5>Перейти к просмотру товаров</h5>
                </a>
              </GridSectionFavourite>

              <ul className="productsList">
                {[
                  {
                    text: "Сибирские напитки",
                    url: "/goods/#product_id_0",
                  },
                  {
                    text: "Сибирские сладости",
                    url: "/goods/#product_id_1",
                  },
                  {
                    text: "Сибирский мёд",
                    url: "/goods/#product_id_2",
                  },
                  {
                    text: "Сибирская ягода",
                    url: "/goods/#product_id_3",
                  },
                  {
                    text: "Сибирские грибы",
                    url: "/goods/#product_id_4",
                  },
                  {
                    text: "Сибирское масло",
                    url: "/goods/#product_id_5",
                  },
                  {
                    text: "Сибирская косметика",
                    url: "/goods/#product_id_6",
                  },
                  {
                    text: "Сибирские бады",
                    url: "/goods/#product_id_7",
                  },
                ].map((item) => {
                  return (
                    <li key={item.text}>
                      <a
                        href={item.url}
                        onClick={() => {
                          setProductsPopupVisible(false);
                        }}
                      >
                        {item.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <GridSectionFeatured>
                <h4>В тренде</h4>
                <FeaturedProductsImage src={chips1} />
                <FeaturedProductsImage src={risotto} />
              </GridSectionFeatured>
            </AdditionalInfoGrid>
          </AdditionalInfoWrapper>
        </NavigationHeader>
      )}
    </NavigationWrapper>
  );
}

export default Navbar;
