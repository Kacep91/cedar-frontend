import React, { useEffect, useState } from "react";
import { Header, SmallBackground } from "../atoms";
import cross from "../../assets/images/cross.svg";
import menu from "../../assets/images/menu.svg";
import { PresentationModal } from "components/PresentationModal";
import { PartnerModal } from "components/PartnerModal";
import { useScreenSize } from "utils/hooks";
import { Tree, TreeEventNodeEvent } from "primereact/tree";
import { classNames } from "primereact/utils";
import { TreeNode } from "primereact/treenode";
import Navbar from "./NavigationHeader";

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

  const nodes = [
    {
      key: "0",
      label: "Siberia Organic",
      icon: "pi pi-fw pi-inbox",
      children: [
        { key: "0-0", label: "О нас", url: "/aboutUs" },
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

  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  const isTablet = useScreenSize("wip");

  const [isSticky, setSticky] = useState(false);

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
          style={{ zIndex: 999, position: "fixed", top: 30, right: 30 }}
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
            {/* <MenuButtonWrapper>
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
            </MenuButtonWrapper> */}
          </>
        )}
      </Header>
      {isSticky ? <div style={{ height: "127.5px" }}></div> : null}
      <Navbar
        setSticky={setSticky}
        isSticky={isSticky}
        setPresentationModalVisible={setPresentationModalVisible}
        setPartnerModalVisible={setPartnerModalVisible}
      />
      {!isCart && (
        <>
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
