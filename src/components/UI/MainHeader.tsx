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
import { Galleria } from "primereact/galleria";
import { GoodsActions, GoodsSelectors, Slide } from "store/goods";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";

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

const itemTemplate = (item: Slide) => {
  return (
    <img
      src={item.image}
      alt={""}
      style={{
        height: "500px",
        width: "100%",
        display: "block",
        objectFit: "cover",
      }}
    />
  );
};

const MainHeader = ({ isCart }: { isCart: boolean }) => {
  const [isPartnerModalVisible, setPartnerModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPresentationModalVisible, setPresentationModalVisible] =
    useState(false);

  const dispatch = useDispatch();

  const slides = useSelector(GoodsSelectors.slidesList);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await axios.get("http://localhost:3000/slides");

      if (res.data) {
        dispatch(GoodsActions.setSlides(res.data));
      }
      setIsLoading(false);
    };

    slides.length === 0 && fetch();
  }, []);

  const nodes = [
    {
      key: "0",
      label: "О нас",
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
        {
          key: "1-0",
          label: "Соки, сиропы, сбитни, пр. напитки",
          url: "/goods",
        },
        {
          key: "1-1",
          label: "Мёд натуральный и продукты пчеловодства",
          url: "/goods",
        },
        {
          key: "1-2",
          label: "Сибирское варенье из шишек и ягод",
          url: "/goods",
        },
        {
          key: "1-3",
          label: "Сушеная ягода, вяленая ягода",
          url: "/goods",
        },
        {
          key: "1-4",
          label: "Грибы (в т.ч. продукция из грибов)",
          url: "/goods",
        },
        {
          key: "1-5",
          label:
            "Десерты таежные (пралине, сгущеное молоко, урбеч, цукаты и т.д.), десерты из яблок (печенье и пр.)",
          url: "/goods",
        },
        {
          key: "1-6",
          label: "Иван-чай, травяные чаи/сборы",
          url: "/goods",
        },
        {
          key: "1-7",
          label: "Масла",
          url: "/goods",
        },
        {
          key: "1-8",
          label: "Косметическая продукция, эфирные масла",
          url: "/goods",
        },
        {
          key: "1-9",
          label: "Бады",
          url: "/goods",
        },
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
  const isMobile = useScreenSize("smallMobile");
  const isTablet = useScreenSize("mobile");

  const [isSticky, setSticky] = useState(false);
  const [isLongPopupVisible, setLongPopupVisible] = useState(false);
  const [isProductsPopupVisible, setProductsPopupVisible] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpened) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }
  }, [isMobileMenuOpened]);

  return (
    <>
      <div id={"backButton"} style={{ visibility: "hidden", height: "0" }}>
        O_o
      </div>
      {isTablet && (
        <img
          onClick={() => setMobileMenuOpened(!isMobileMenuOpened)}
          src={isMobileMenuOpened ? cross : menu}
          width="30"
          style={{ zIndex: 999, position: "fixed", top: 50, right: 30 }}
          alt=""
        />
      )}
      <Header isMobileMenuOpened={isMobileMenuOpened}>
        {isMobile ? (
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
                  height: "103vh",
                  paddingTop: "60px",
                  border: "none",
                  position: "fixed",
                  zIndex: 99999,
                }}
              />
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </Header>
      {!isMobile && isSticky ? <div style={{ height: "127.5px" }}></div> : null}
      <Navbar
        setSticky={setSticky}
        isSticky={isSticky}
        setPresentationModalVisible={setPresentationModalVisible}
        setPartnerModalVisible={setPartnerModalVisible}
        setLongPopupVisible={setLongPopupVisible}
        isLongPopupVisible={isLongPopupVisible}
        isMobileMenuOpened={isMobileMenuOpened}
        setProductsPopupVisible={setProductsPopupVisible}
        isProductsPopupVisible={isProductsPopupVisible}
      />
      {!isCart && (
        <>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "500px",
              }}
            >
              <ProgressSpinner />
            </div>
          ) : !isLoading && slides.length === 0 ? (
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
          ) : (
            <Galleria
              value={slides}
              numVisible={1}
              circular
              style={{ height: "500px", width: "100%" }}
              showItemNavigatorsOnHover
              showItemNavigators
              showThumbnails={false}
              item={itemTemplate}
              autoPlay
              transitionInterval={5000}
            />
          )}
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
