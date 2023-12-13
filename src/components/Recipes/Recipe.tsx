import { Footer } from "components/UI/Footer";
import MainHeader from "components/UI/MainHeader";
import placeHolder from "../../assets/images/placeHolder.png";
import {
  Ingridients,
  Instructions,
  InstructionsWrapper,
  ItemListContainer,
  ItemListLabel,
  ItemListWrapper,
  LoadMoreButton,
  RecipeHeader,
  RecipeHeaderImage,
  RecipeText,
  RecipeWrapper,
} from "components/atoms";
import { BackLinkAtom } from "components/UI/BackLink";
import { useScreenSize } from "utils/hooks";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoodsSelectors, GoodsActions, Slide } from "store/goods";
import { useParams } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { ProductPresentationPageProps } from "components/UI/ProductPresentationPage";
import {
  arrayBufferToBase64,
  categorizeProducts,
  categorizeRecipeByName,
  selectedLabels,
  transformRecipesToSlidesArray,
} from "utils/utils";
import { ItemListUnit } from "components/ItemListUnit";
import ScrollToTopOnMount from "utils/scrollRestorationFix";
import { Galleria } from "primereact/galleria";

export const GeneralRecipe = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const categorizedProducts = useSelector(GoodsSelectors.categorizedProducts);

  const [listLength, setListLength] = useState(4);
  const recipes = useSelector(GoodsSelectors.recipesList);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await axios.get("http://79.174.95.133:3000/recipes");

      if (res.data) {
        dispatch(GoodsActions.setRecipes(res.data));
        setIsLoading(false);
      }
    };

    recipes.length === 0 && fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await axios.get("http://79.174.95.133:3000/goods");

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

    categorizedProducts.length === 0 && fetch();
  }, []);

  const isTablet = useScreenSize("mobile");
  const data = recipes.find((item: any) => item.id === id);

  const categorizedLabel =
    data && categorizeRecipeByName(data?.name?.split(" "));
  console.log("categorizedLabel", categorizedLabel);
  const totalLength = useMemo(
    () =>
      [...categorizedProducts].filter((item) =>
        categorizedLabel ? item.label?.includes(categorizedLabel) : Boolean,
      )[0]?.items.length || 1,
    [categorizedLabel, categorizedProducts],
  );

  const slidesResult = transformRecipesToSlidesArray(data);

  const itemTemplate = (item: Slide) => {
    if (item.video) {
      return (
        <div style={{ width: "100%" }}>
          <iframe
            width="100%"
            height="500"
            src={`${item.video}?autoplay=1&mute=1`}
            title="Siberia Organic Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      );
    }
    return <RecipeHeaderImage src={data?.image ? data?.image : placeHolder} />;
  };

  return (
    <>
      <MainHeader isCart={true} />
      <ScrollToTopOnMount />
      <BackLinkAtom id={"backButton"} to={"/"} children={"Назад"} />
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
          <RecipeWrapper>
            <RecipeHeader>
              <Galleria
                value={slidesResult}
                numVisible={1}
                circular
                style={{ width: "100%" }}
                showItemNavigatorsOnHover
                showItemNavigators
                showThumbnails={false}
                item={itemTemplate}
                autoPlay
                transitionInterval={5000}
              />

              <RecipeText>{data?.name}</RecipeText>
            </RecipeHeader>
            <div style={{ margin: "50px 0" }}>
              <h1 style={{ textAlign: "center" }}>Способ приготовления</h1>
            </div>
            <InstructionsWrapper>
              <Ingridients>
                <h3 style={{ textAlign: "center" }}>Ингредиенты:</h3>
                <ol
                  className={isTablet ? "gradient-list" : "gradient-list line"}
                >
                  {data?.ingridients
                    ?.split("\n")
                    .filter(Boolean)
                    .map((item) => {
                      return <li key={item}>{item}</li>;
                    })}
                </ol>
              </Ingridients>
              <Instructions>
                <h3 style={{ textAlign: "center" }}>Инструкции:</h3>
                <ol className="gradient-list">
                  {data?.instructions
                    ?.split("\n")
                    .filter(Boolean)
                    .map((item) => {
                      return <li key={item}>{item}</li>;
                    })}
                </ol>
              </Instructions>
            </InstructionsWrapper>
          </RecipeWrapper>
          <ItemListWrapper>
            {categorizedProducts && categorizedProducts.length > 0
              ? categorizedProducts
                .filter((item) =>
                  categorizedLabel
                    ? item.label?.includes(categorizedLabel)
                    : Boolean,
                )
                .map(
                  (
                    item: {
                      label: string;
                      items: ProductPresentationPageProps[];
                    },
                    index: number,
                  ) => {
                    const allItems = item.items
                      .slice(0, listLength)
                      .map((item2) => (
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
                        <ItemListLabel id={`product_id_${index}`}>
                          {item.label}
                        </ItemListLabel>
                        <ItemListContainer>{allItems}</ItemListContainer>
                      </>
                    );
                  },
                )
              : null}
          </ItemListWrapper>
          {listLength >= totalLength ? null : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LoadMoreButton
                text
                rounded
                onClick={() =>
                  setListLength(
                    listLength + 4 < totalLength ? listLength + 4 : totalLength,
                  )
                }
              >
                Загрузить еще...
              </LoadMoreButton>
            </div>
          )}
          <Footer />
        </>
      )}
    </>
  );
};
