import React, { useEffect, useState } from "react";
import {
  AdditionalInfoWrapper,
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
import lees from "../../assets/images/lees.jpg";
import goods from "../../assets/images/goods.jpg";
import offer from "../../assets/images/offer.jpg";
import teaPot from "../../assets/images/teaPot.png";
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
  setSticky: (value: boolean) => void;
  isSticky: boolean;
};

export function Navbar({
  setSticky,
  isSticky,
  setPresentationModalVisible,
  setPartnerModalVisible,
}: NavbarType) {
  const list = useSelector(CartSelectors.list);

  const listLength = list.length;

  const menuButtons = [
    {
      text: "Siberia Organic",
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
    },
    {
      text: "Наша продукция",
      links: [
        {
          text: "Чипсы яблочные",
          url: "",
        },
        {
          text: "Гранола",
          url: "",
        },
        {
          text: "Сироп",
          url: "",
        },
        {
          text: "Сосновое варенье",
          url: "",
        },
        {
          text: "Грибной суп",
          url: "",
        },
        {
          text: "Чай",
          url: "",
        },
      ],
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

  const isTablet = useScreenSize("wip");
  const [isOpened, setIsOpened] = useState(false);
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
      <Sale>
        <span>Нет минимального заказа. Бесплатная доставка от 4500 рублей</span>
      </Sale>
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
                src={logo}
                width="160"
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
                style={{
                  width: "100%",
                }}
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
                  onMouseEnter: () =>
                    !item.onClick ? setIsOpened(true) : null,
                  onMouseLeave: () =>
                    !item.onClick ? setIsOpened(false) : null,
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
        <AdditionalInfoWrapper isOpened={isOpened}>
          <InfoCardHeader>
            <InfoCardImage src={lees} />
            <InfoCardText>
              Именно из этих лисичек, бережно собранных, вымытых и отобранных -
              мы и делаем наше варенье
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
            <InfoCardImage src={teaPot} />
            <InfoCardText>
              Для чая всегда есть время, особенно с нашим вареньем
            </InfoCardText>
          </InfoCardHeader>
        </AdditionalInfoWrapper>
      </NavigationHeader>
    </NavigationWrapper>
  );
}

export default Navbar;
