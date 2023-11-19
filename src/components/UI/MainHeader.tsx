import React, { useEffect, useState } from "react";
import {
  GoodsButton,
  Header,
  MenuButton,
  MenuButtonWrapper,
  MenuDropdownContent,
  MenuHeader,
  NavigationHeader,
  SmallBackground,
} from "../atoms";
import arrowDown from "../../assets/images/arrowDown.svg";
import phone from "../../assets/images/phone.svg";
import cross from "../../assets/images/cross.svg";
import menu from "../../assets/images/menu.svg";
import logo from "../../assets/images/logo.png";
import snowFlake from "../../assets/images/snowFlake.png";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { PresentationModal } from "components/PresentationModal";
import { PartnerModal } from "components/PartnerModal";
import { useScreenSize } from "utils/hooks";
import { Tree, TreeEventNodeEvent } from "primereact/tree";
import { classNames } from "primereact/utils";
import { TreeNode } from "primereact/treenode";
import { useNavigate } from "react-router";
import { Badge } from "primereact/badge";
import { useSelector } from "react-redux";
import { CartSelectors } from "store/cart";

const nodeTemplate = (node: any, options: any) => {
  let label = <b>{node.label}</b>;

  if (node.url) {
    label = (
      <a
        href={node.url}
        className="text-700 hover:text-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        {node.label}
      </a>
    );
  }

  return <span className={options.className}>{label}</span>;
};

const togglerTemplate = (node: any, options: any) => {
  if (!node) {
    return;
  }

  const expanded = options.expanded;
  const iconClassName = classNames("p-tree-toggler-icon pi pi-fw", {
    "pi-caret-right": !expanded,
    "pi-caret-down": expanded,
  });

  return (
    <button
      type="button"
      className="p-tree-toggler p-link"
      tabIndex={-1}
      onClick={options.onClick}
    >
      <span className={iconClassName} aria-hidden="true"></span>
    </button>
  );
};

const MainHeader = ({ isCart }: { isCart: boolean }) => {
  const [isPartnerModalVisible, setPartnerModalVisible] = useState(false);
  const [isPresentationModalVisible, setPresentationModalVisible] =
    useState(false);

  const list = useSelector(CartSelectors.list);

  const listLength = list.length;

  const nodes = [
    {
      key: "0",
      label: "Компания Siberia Organic",
      icon: "pi pi-fw pi-inbox",
      children: [
        { key: "0-0", label: "О компании", url: "" },
        { key: "0-1", label: "О нас пишут", url: "" },
        { key: "0-2", label: "Контакты", url: "" },
      ],
    },
    {
      key: "1",
      label: "Наша продукция",
      icon: "pi pi-fw pi-inbox",
      children: [
        { key: "1-0", label: "Чипсы яблочные", url: "" },
        { key: "1-1", label: "Гранола", url: "" },
        { key: "1-2", label: "Контакты", url: "" },
        { key: "1-3", label: "Сироп", url: "" },
        { key: "1-4", label: "Сосновое варенье", url: "" },
        { key: "1-5", label: "Грибной суп", url: "" },
        { key: "1-6", label: "Чай", url: "" },
      ],
    },
    {
      key: "2",
      label: "Запрос на презентацию/каталог",
      icon: "pi pi-fw pi-inbox",
      onClick: () => {
        setPresentationModalVisible(true);
        setMobileMenuOpened(false);
      },
    },
    {
      key: "3",
      label: "Хочу стать партнёром",
      icon: "pi pi-fw pi-inbox",
      onClick: () => {
        setPartnerModalVisible(true);
        setMobileMenuOpened(false);
      },
    },
  ];

  const menuButtons = [
    {
      text: "Компания Siberia Organic",
      links: [
        {
          text: "О компании",
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
      text: "Награды",
      links: [
        {
          text: "Чипсы яблочные",
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

  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  const isTablet = useScreenSize("wip");
  const navigate = useNavigate();
  useEffect(() => {
    if (isMobileMenuOpened) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }
  }, [isMobileMenuOpened]);

  return (
    <>
      {isTablet && (
        <img
          onClick={() => setMobileMenuOpened(!isMobileMenuOpened)}
          src={isMobileMenuOpened ? cross : menu}
          width="30"
          style={{ zIndex: 999, position: "fixed", top: 30, left: 30 }}
          alt=""
        />
      )}
      <Header isMobileMenuOpened={isMobileMenuOpened}>
        {isTablet ? (
          <>
            {isMobileMenuOpened ? (
              <Tree
                value={nodes}
                nodeTemplate={nodeTemplate}
                togglerTemplate={togglerTemplate}
                selectionMode="single"
                onSelect={(
                  e: TreeEventNodeEvent & {
                    node: TreeNode & { onClick: () => void };
                  },
                ) => e.node?.onClick && e.node.onClick()}
                style={{
                  width: "100vw",
                  height: "100vh",
                  paddingTop: "50px",
                  border: "none",
                  position: "fixed",
                }}
              />
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            {menuButtons.map((item) => {
              return (
                <MenuButtonWrapper key={item.text}>
                  <MenuButton onClick={item.onClick || undefined}>
                    {item.text}{" "}
                    {item.links && item.links.length > 0 && (
                      <img src={arrowDown} alt="" />
                    )}
                  </MenuButton>
                  {item.links && item.links.length > 0 && (
                    <MenuDropdownContent>
                      {item.links.map((item) => (
                        <a key={item.url} href={`${item.url}`}>
                          {item.text}
                        </a>
                      ))}
                    </MenuDropdownContent>
                  )}
                </MenuButtonWrapper>
              );
            })}
            <MenuButtonWrapper>
              <MenuButton>
                <a
                  style={{ color: "#666", textDecoration: "none" }}
                  href="tel:+79230012345"
                >
                  <img src={phone} alt="" />
                  +7-923-001-23-45
                </a>{" "}
                <img src={arrowDown} alt="" />
              </MenuButton>
              <MenuDropdownContent style={{ minWidth: "200px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <a href="mailto:123@mail.ru">123@mail.ru</a>
                  <a style={{ textDecoration: "none" }} href="tel:+79230012345">
                    <img src={phone} width="16" alt="" />
                    +7-923-001-23-45
                  </a>
                </div>
              </MenuDropdownContent>
            </MenuButtonWrapper>
          </>
        )}
      </Header>
      <NavigationHeader>
        {isTablet ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
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
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <Button
                  icon="pi pi-heart"
                  rounded
                  text
                  raised
                  severity="success"
                  aria-label="Favorite"
                />
                <Button
                  icon="pi pi-user"
                  rounded
                  text
                  raised
                  severity="success"
                  aria-label="User"
                />
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
          </>
        ) : (
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
                  marginLeft: "20px",
                  cursor: "pointer",
                }}
                alt=""
                onClick={() => navigate("/")}
              />
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
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Button
                icon="pi pi-heart"
                rounded
                text
                raised
                severity="success"
                aria-label="Favorite"
              />
              <Button
                icon="pi pi-user"
                rounded
                text
                raised
                severity="success"
                aria-label="User"
              />
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
          </>
        )}
      </NavigationHeader>
      {!isCart && (
        <>
          {" "}
          <MenuHeader>
            <GoodsButton style={{ fontWeight: "bold" }}>
              <img src={snowFlake} alt="" />
              Сладости
            </GoodsButton>
            <GoodsButton style={{ fontWeight: "bold" }}>
              <img src={snowFlake} alt="" />
              Снеки
            </GoodsButton>
            <GoodsButton style={{ fontWeight: "bold" }}>
              <img src={snowFlake} alt="" />
              Гранола
            </GoodsButton>
            <GoodsButton style={{ fontWeight: "bold" }}>
              <img src={snowFlake} alt="" />
              Чай
            </GoodsButton>
            <GoodsButton style={{ fontWeight: "bold" }}>
              <img src={snowFlake} alt="" />
              Суп
            </GoodsButton>
          </MenuHeader>
          <SmallBackground>
            <div className="catalog-banner-c1">
              <div className="catalog-banner-head">
                <h1>SIBERIA Organic</h1>
              </div>
              <div className="catalog-banner-text">
                Уникальные напитки, сладости и снеки из натуральных сибирских
                продуктов!{" "}
              </div>
            </div>
          </SmallBackground>
        </>
      )}

      <PresentationModal
        isOpen={isPresentationModalVisible}
        setModalOpen={setPresentationModalVisible}
      />
      <PartnerModal
        isOpen={isPartnerModalVisible}
        setModalOpen={setPartnerModalVisible}
      />
    </>
  );
};

export default MainHeader;
