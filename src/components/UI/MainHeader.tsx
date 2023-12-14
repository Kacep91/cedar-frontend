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
import { useLocation, useNavigate } from "react-router";
import { transformArray } from "utils/utils";

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
  if (item.video) {
    return (
      <div style={{ width: "100%" }}>
        <iframe
          id={"iframeYouTube"}
          onClick={() => console.log("dsd")}
          width="100%"
          height="500"
          src={`${item.video}?autoplay=1&mute=1&rel=0&loop=1&modestbranding=1`}
          title="Siberia Organic Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  return (
    <img
      src={item.image || ""}
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
  const location = useLocation();

  const slides = useSelector(GoodsSelectors.slidesList);
  const slidesResult = transformArray(slides);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await axios.get("https://siberia-organic.com:3000/slides");

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
      url: "/goods",
      children: [
        {
          key: "1-0",
          label: "Сибирские напитки",
          url: "/goods/#product_id_0",
        },
        {
          key: "1-1",
          label: "Сибирские сладости",
          url: "/goods/#product_id_1",
        },
        {
          key: "1-2",
          label: "Сибирский мёд",
          url: "/goods/#product_id_2",
        },
        {
          key: "1-3",
          label: "Сибирская ягода",
          url: "/goods/#product_id_3",
        },
        {
          key: "1-4",
          label: "Сибирские грибы",
          url: "/goods/#product_id_4",
        },
        {
          key: "1-5",
          label: "Сибирское масло",
          url: "/goods/#product_id_5",
        },
        {
          key: "1-6",
          label: "Сибирская косметика",
          url: "/goods/#product_id_6",
        },
        {
          key: "1-7",
          label: "Сибирские бады",
          url: "/goods/#product_id_7",
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
    {
      key: "4",
      label: "Админка",
      icon: "pi pi-fw pi-inbox",
      url: "/adminPanel",
    },
  ];

  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  const isMobile = useScreenSize("smallMobile");
  const isTablet = useScreenSize("mobile");

  const [isSticky, setSticky] = useState(false);
  const [isLongPopupVisible, setLongPopupVisible] = useState(false);
  const [isProductsPopupVisible, setProductsPopupVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isMobileMenuOpened) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }
  }, [isMobileMenuOpened]);

  useEffect(() => {
    // Функция для проверки видимости элемента на экране
    function isElementInViewport(el: any) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
        (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    // Функция для запуска анимации
    function runAnimation() {
      const elements = document.querySelectorAll(".t-animate");

      elements?.forEach((element) => {
        if (isElementInViewport(element)) {
          element.classList.add("t-animate_started");
        } else {
          element.classList.remove("t-animate_started");
        }
      });
    }

    // Запуск анимации при прокрутке страницы
    window.addEventListener("scroll", runAnimation);

    // Запуск проверки каждые 3 секунды
    const intervalId = setInterval(runAnimation, 3000);

    // Очистка интервала при размонтировании компонента
    return () => {
      window.removeEventListener("scroll", runAnimation);
      clearInterval(intervalId);
    };
  }, [location.pathname]);

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
                    node: TreeNode & { onClick: () => void; url: "" };
                  },
                ) => {
                  e.node?.onClick && e.node.onClick();
                  e.node?.url && navigate(e.node?.url);
                }}
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
              value={slidesResult}
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
