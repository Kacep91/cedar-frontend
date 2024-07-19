import { Footer } from "components/UI/Footer";
import MainHeader from "components/UI/MainHeader";
import placeHolder from "../../assets/images/placeHolder.png";
import {
  DecriptionBlock,
  ItemListContainer,
  ItemListLabel,
  ItemListWrapper,
  ProductBuyButton,
  ProductBuySection,
  ProductPresentationDescriptionWrapper,
  ProductPresentationHeader,
  ProductPresentationHeaderImage,
  ProductPresentationRecipes,
  ProductPresentationWrapper,
  RecipeText,
  StickyImage,
  StickyName,
  StickyProductInfo,
  ToastHeader,
  ToastLink,
  ToastText,
  ToastWrapper,
} from "components/atoms";
import { BackLinkAtom } from "components/UI/BackLink";
import {
  arrayBufferToBase64,
  categorizeProducts,
  categorizeRecipeByName,
  isInViewport,
  selectedLabels,
} from "utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { GoodsActions, GoodsSelectors } from "store/goods";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { ItemListUnit } from "components/ItemListUnit";
import ScrollToTopOnMount from "utils/scrollRestorationFix";
import { CartActions, CartSelectors } from "store/cart";
import { Toast } from "primereact/toast";
import { useScreenSize } from "utils/hooks";
import { ScrollTop } from "primereact/scrolltop";

export type ProductPresentationPageProps = {
  minRequest: any;
  id?: string;
  name?: string;
  amount?: number;
  image?: string | null;
  url?: string;
  isHit?: boolean;
  isNew?: boolean;
  price?: number;
  isSale?: boolean;
  volume?: string;
  weight?: string;
  reviews?: number;
  oldPrice?: number;
  dueDate?: string;
  ingridients?: string;
  pack?: string;
  description?: string;
  creationDate?: string;
  tags?: string;
};

export type PresentationPropDescription = {
  name?: string;
  volume?: string;
  dueDate?: string;
  pack?: string;
  minRequest?: string;
  description?: string;
  ingridients?: string;
  companyManufacturer?: string;
  priceForUnitWithVAT?: number;
  priceForUnitWithoutVAT?: number;
};

export const ProductPresentationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useRef<Toast>(null);
  const dispatch = useDispatch();
  const goods = useSelector(GoodsSelectors.goodsList);
  const categorizedProducts = useSelector(GoodsSelectors.categorizedProducts);
  const recipes = useSelector(GoodsSelectors.recipesList);
  const list = useSelector(CartSelectors.list);
  const { id } = useParams<{ id: string }>();
  const isUnitInList =
    list && list.length > 0 && list.find((item: any) => item?.id === id);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await axios.get("https://siberia-organic.com:3000/goods");

      if (res.data) {
        dispatch(GoodsActions.setGoods(res.data));
        const categorizedProducts = Object.entries(
          categorizeProducts(res.data, selectedLabels),
        ).map((item) => ({
          label: item[0],
          items: item[1],
        })) as {
          label: string;
          items: ProductPresentationPageProps[];
        }[];
        dispatch(GoodsActions.setCategorizedData(categorizedProducts));
        setIsLoading(false);
      }
    };

    goods.length === 0 && fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await axios.get("https://siberia-organic.com:3000/recipes");

      if (res.data) {
        dispatch(GoodsActions.setRecipes(res.data));
        setIsLoading(false);
      }
    };

    recipes.length === 0 && fetch();
  }, []);

  const navigate = useNavigate();

  const data = goods.find((item: any) => item.id === id);
  data && console.log("data", data);
  const coProducts = categorizedProducts.find((item) =>
    item.items.some((item) => item.id === id),
  );

  const coproductsRender = () => {
    if (coProducts) {
      const allItems = coProducts.items.map((item2) => (
        <ItemListUnit
          key={item2.name}
          {...item2}
          image={
            item2?.url
              ? item2?.url
              : item2?.image && typeof item2?.image === "string"
                ? item2?.image
                : item2?.image
                  ? arrayBufferToBase64(
                    item2.image as unknown as {
                      type: string;
                      data: any[];
                    },
                  )
                  : ""
          }
        />
      ));

      return (
        <>
          <ItemListLabel>{coProducts.label}</ItemListLabel>
          <ItemListContainer>{allItems}</ItemListContainer>
        </>
      );
    }
    return null;
  };

  const recipesResult = coProducts
    ? recipes?.filter(
      (item) =>
        categorizeRecipeByName(item?.name?.split(" ")) === coProducts?.label,
    )
    : [];

  const [isSticky, setSticky] = useState(false);

  const isTablet = useScreenSize("mobile");
  const checkScrollTop = () => {
    const value = isTablet ? 450 : 250;
    if (value && !isSticky && window.pageYOffset >= value) {
      setSticky(true);
    } else if (value && isSticky && window.pageYOffset < value) {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    window.addEventListener("resize", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
      window.removeEventListener("resize", checkScrollTop);
    };
  }, [isSticky]);

  return (
    <>
      <Toast ref={toast} />
      <ScrollTop />
      <MainHeader isCart={true} />
      {isSticky && isTablet && (
        <StickyProductInfo isOnTop={isSticky}>
          <StickyImage
            src={
              data?.url
                ? data?.url
                : data?.image && typeof data?.image === "string"
                  ? data?.image
                  : data?.image
                    ? arrayBufferToBase64(
                      data.image as unknown as {
                        type: string;
                        data: any[];
                      },
                    )
                    : placeHolder
            }
          />
          <StickyName>{data?.name}</StickyName>
        </StickyProductInfo>
      )}
      <ScrollToTopOnMount />
      <BackLinkAtom id={"backButton"} to={"/goods"} children={"Назад"} />
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "30vh",
          }}
        >
          <ProgressSpinner />
        </div>
      ) : (
        <>
          <ProductPresentationWrapper>
            <ProductPresentationHeader>
              <ProductPresentationHeaderImage
                src={
                  data?.url
                    ? data?.url
                    : data?.image && typeof data?.image === "string"
                      ? data?.image
                      : data?.image
                        ? arrayBufferToBase64(
                          data.image as unknown as {
                            type: string;
                            data: any[];
                          },
                        )
                        : placeHolder
                }
              />
              <RecipeText>{data?.name}</RecipeText>
              <DecriptionBlock>{data?.description}</DecriptionBlock>

              <ProductBuySection style={{ justifyContent: "center" }}>
                {isUnitInList ? (
                  <ProductBuyButton
                    id="buyButton"
                    style={{ maxWidth: "320px", width: "100%" }}
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
                      style={{
                        color: "#708090",
                        width: "16px",
                        height: "16px",
                      }}
                    ></i>
                  </ProductBuyButton>
                ) : (
                  <ProductBuyButton
                    id="buyButton"
                    style={{ maxWidth: "320px", width: "100%" }}
                    onClick={() => {
                      dispatch(CartActions.setItem(data as any));
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
                      style={{
                        color: "#708090",
                        width: "16px",
                        height: "16px",
                      }}
                    ></i>
                  </ProductBuyButton>
                )}
              </ProductBuySection>
            </ProductPresentationHeader>
            {data?.description || data?.image || data?.name ? (
              <ProductPresentationDescriptionWrapper>
                <div>
                  <h1 style={{ textAlign: "center" }}>Характеристики</h1>
                </div>
                <ol className={"gradient-list"}>
                  {data?.volume ? (
                    <li>
                      <b>ОБЪЕМ</b>: {data?.volume}
                    </li>
                  ) : null}
                  {data?.dueDate ? (
                    <li>
                      <b>Срок годности и условия хранения</b>: {data?.dueDate}
                    </li>
                  ) : null}
                  {(data?.pack as string) ? (
                    <li>
                      <b>Упаковка</b>: {data?.pack as string}
                    </li>
                  ) : null}
                  {(data?.ingridients as string) ? (
                    <li>
                      <b>Состав</b>: {data?.ingridients as string}
                    </li>
                  ) : null}
                  {data?.description ? (
                    <li>
                      <b>Место происхождения</b>: Красноярский край
                    </li>
                  ) : null}
                  {/* {data?.description?.priceForUnitWithVAT || data?.price ? (
                    <li>
                      <b>Цена</b>:{" "}
                      {data?.description?.priceForUnitWithVAT || data?.price}
                    </li>
                  ) : null} */}
                </ol>
              </ProductPresentationDescriptionWrapper>
            ) : (
              <></>
            )}
          </ProductPresentationWrapper>
          {recipesResult && recipesResult.length > 0 ? (
            <ProductPresentationRecipes>
              <h4>Связанные рецепты</h4>
              <ol className="gradient-list">
                {recipesResult.map((item) => {
                  return (
                    <li
                      key={item?.id}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                      onClick={() => navigate(`/recipe/${item?.id}`)}
                    >
                      <img src={item?.image} width="80" alt="" />
                      {item?.name}
                    </li>
                  );
                })}
              </ol>
            </ProductPresentationRecipes>
          ) : (
            <></>
          )}
          <ItemListWrapper>
            {coProducts ? coproductsRender() : null}
          </ItemListWrapper>
          <Footer />
        </>
      )}
    </>
  );
};
