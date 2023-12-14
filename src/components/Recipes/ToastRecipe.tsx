import { Footer } from "components/UI/Footer";
import MainHeader from "components/UI/MainHeader";
import toast from "../../assets/images/toast.jpg";
import {
  RecipeHeader,
  RecipeHeaderImage,
  RecipeText,
  RecipeWrapper,
  InstructionsWrapper,
  Ingridients,
  Instructions,
  ItemListContainer,
  ItemListLabel,
  ItemListWrapper,
  LoadMoreButton,
} from "components/atoms";
import { BackLinkAtom } from "components/UI/BackLink";
import { useScreenSize } from "utils/hooks";
import axios from "axios";
import { ItemListUnit } from "components/ItemListUnit";
import { ProductPresentationPageProps } from "components/UI/ProductPresentationPage";
import { ProgressSpinner } from "primereact/progressspinner";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoodsSelectors, GoodsActions } from "store/goods";
import {
  categorizeProducts,
  selectedLabels,
  arrayBufferToBase64,
} from "utils/utils";
import ScrollToTopOnMount from "utils/scrollRestorationFix";

export const ToastRecipe = (recipe: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const categorizedProducts = useSelector(GoodsSelectors.categorizedProducts);
  const [listLength, setListLength] = useState(4);
  const totalLength =
    [...categorizedProducts].filter((item) => item.label.includes("гриб"))?.[0]
      ?.items.length || 1;

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await axios.get("https://79.174.95.133:3000/goods");

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
  }, [categorizedProducts]);
  const isTablet = useScreenSize("mobile");
  return (
    <>
      <MainHeader isCart={true} />
      <BackLinkAtom id={"backButton"} to={"/"} children={"Назад"} />
      <ScrollToTopOnMount />
      <RecipeWrapper>
        <RecipeHeader>
          <RecipeHeaderImage src={toast} />
          <RecipeText>Тост с лисичками</RecipeText>
        </RecipeHeader>
        <div style={{ margin: "50px 0" }}>
          <h1 style={{ textAlign: "center" }}>Способ приготовления</h1>
        </div>
        <InstructionsWrapper>
          <Ingridients>
            <h3 style={{ textAlign: "center" }}>Ингредиенты:</h3>
            <ol className={isTablet ? "gradient-list" : "gradient-list line"}>
              <li>1/4 фунта лисичек (около 1,5-2 стакана целых лисичек)</li>
              <li>2 столовые ложки сливочного масла</li>
              <li>1/4 стакана сливок</li>
              <li>соль по вкусу</li>
            </ol>
          </Ingridients>
          <Instructions>
            <h3 style={{ textAlign: "center" }}>Инструкции:</h3>
            <ol className="gradient-list">
              <li>
                Обжарьте свежие лисички на небольшом количестве сливочного масла
                в течение примерно 5 минут. Грибы немного увянут, но сохранят
                свою форму, начиная выделять свой аромат. Добавьте сливки и
                перемешайте смесь силиконовой лопаткой, чтобы равномерно покрыть
                лисички.
              </li>
              <li>
                {" "}
                Уменьшите огонь до минимума и медленно готовьте лисички в
                сливках. Важно готовить их медленно, чтобы сливки загустели, но
                не свернулись. Установите плиту на самый низкий уровень и будьте
                терпеливы. Медленно варите смесь в течение примерно 10 минут,
                пока сливки не загустеют. Посолите по вкусу и положите на свой
                любимый хрустящий хлеб.
              </li>
            </ol>
          </Instructions>
        </InstructionsWrapper>
      </RecipeWrapper>{" "}
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
        <ItemListWrapper>
          {categorizedProducts && categorizedProducts.length > 0
            ? categorizedProducts
              .filter((item) => item.label.includes("гриб"))
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
      )}
      {listLength >= totalLength ? null : (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
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
  );
};
