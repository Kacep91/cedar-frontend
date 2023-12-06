import { Footer } from "components/UI/Footer";
import MainHeader from "components/UI/MainHeader";
import placeHolder from "../../assets/images/placeHolder.png";
import {
  DecriptionBlock,
  ItemListContainer,
  ItemListLabel,
  ItemListWrapper,
  ProductPresentationDescriptionWrapper,
  ProductPresentationHeader,
  ProductPresentationHeaderImage,
  ProductPresentationRecipes,
  ProductPresentationWrapper,
  RecipeText,
} from "components/atoms";
import { BackLinkAtom } from "components/UI/BackLink";
import {
  arrayBufferToBase64,
  categorizeProducts,
  categorizeRecipeByName,
  selectedLabels,
} from "utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { GoodsActions, GoodsSelectors } from "store/goods";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { ItemListUnit } from "components/ItemListUnit";
import ScrollToTopOnMount from "utils/scrollRestorationFix";

export type ProductPresentationPageProps = {
  minRequest: any;
  id?: string;
  name?: string;
  amount?: number;
  image?: string | null;
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
  package?: string;
  description?: PresentationPropDescription;
  creationDate?: string;
  tags?: string;
};

export type PresentationPropDescription = {
  name?: string;
  volume?: string;
  dueDate?: string;
  package?: string;
  minRequest?: string;
  description?: string;
  ingridients?: string;
  companyManufacturer?: string;
  priceForUnitWithVAT?: number;
  priceForUnitWithoutVAT?: number;
};

export const ProductPresentationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const goods = useSelector(GoodsSelectors.goodsList);
  const categorizedProducts = useSelector(GoodsSelectors.categorizedProducts);
  const recipes = useSelector(GoodsSelectors.recipesList);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await axios.get("http://185.70.185.67:3000/goods");

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
      const res = await axios.get("http://185.70.185.67:3000/recipes");

      if (res.data) {
        dispatch(GoodsActions.setRecipes(res.data));
        setIsLoading(false);
      }
    };

    recipes.length === 0 && fetch();
  }, []);

  const { id } = useParams<{ id: string }>();
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
            item2?.image && typeof item2?.image === "string"
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

  return (
    <>
      <MainHeader isCart={true} />
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
                  data?.image && typeof data?.image === "string"
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
              <DecriptionBlock>
                {data?.description?.description ||
                  (data?.description as string)}
              </DecriptionBlock>
            </ProductPresentationHeader>
            {data?.description || data?.image || data?.name ? (
              <ProductPresentationDescriptionWrapper>
                <div>
                  <h1 style={{ textAlign: "center" }}>
                    Дополнительная информация
                  </h1>
                </div>
                <ol className={"gradient-list"}>
                  {data?.description?.volume || data?.volume ? (
                    <li>
                      <b>ОБЪЕМ</b>: {data?.description?.volume || data?.volume}
                    </li>
                  ) : null}
                  {data?.description?.dueDate || data?.dueDate ? (
                    <li>
                      <b>Срок годности</b>:{" "}
                      {data?.description?.dueDate || data?.dueDate}
                    </li>
                  ) : null}
                  {data?.description ? (
                    <li>
                      <b>Условия хранения</b>: Хранить в прохладном, сухом
                      месте. Избегать прямого попадания солнечных лучей.
                    </li>
                  ) : null}
                  {data?.description?.package || (data?.package as string) ? (
                    <li>
                      <b>Упаковка</b>:{" "}
                      {data?.description?.package || (data?.package as string)}
                    </li>
                  ) : null}
                  {data?.description?.ingridients ||
                  (data?.ingridients as string) ? (
                    <li>
                      <b>Состав</b>:{" "}
                      {data?.description?.ingridients ||
                        (data?.ingridients as string)}
                    </li>
                  ) : null}
                  {data?.description ? (
                    <li>
                      <b>Место происхождения</b>: Красноярский край
                    </li>
                  ) : null}
                  {data?.description?.priceForUnitWithVAT || data?.price ? (
                    <li>
                      <b>Цена</b>:{" "}
                      {data?.description?.priceForUnitWithVAT || data?.price}
                    </li>
                  ) : null}
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
                      <img src={item?.image} width="80" />
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
