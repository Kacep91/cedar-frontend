import { Footer } from "components/UI/Footer";
import MainHeader from "components/UI/MainHeader";
import risotto from "../../assets/images/risotto.jpg";
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
import { ScrollTop } from "primereact/scrolltop";

export const RisottoRecipe = (recipe: any) => {
  const isTablet = useScreenSize("mobile");

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const categorizedProducts = useSelector(GoodsSelectors.categorizedProducts);

  const [listLength, setListLength] = useState(4);
  const totalLength =
    [...categorizedProducts].filter((item) => item.label.includes("гриб"))[0]
      ?.items.length || 1;

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

    categorizedProducts.length === 0 && fetch();
  }, []);

  return (
    <>
      <MainHeader isCart={true} />
      <BackLinkAtom to={"/"} children={"Назад"} />
      <ScrollToTopOnMount />
      <ScrollTop />
      <RecipeWrapper>
        <RecipeHeader>
          <RecipeHeaderImage src={risotto} />
          <RecipeText>Ризотто с лисичками</RecipeText>
        </RecipeHeader>
        <div style={{ margin: "50px 0" }}>
          <h1 style={{ textAlign: "center" }}>Способ приготовления</h1>
        </div>
        <InstructionsWrapper>
          <Ingridients>
            <h3 style={{ textAlign: "center" }}>Ингредиенты:</h3>
            <ol className={isTablet ? "gradient-list" : "gradient-list line"}>
              <li>6 стаканов бульона</li>
              <li>1 пинта сухого яблочного сидра (или сухого белого вина)</li>
              <li>1 маленькая луковица, мелко нарезанная</li>
              <li>2-3 зубчика чеснока, мелко нарезанных</li>
              <li>2 столовые ложки оливкового масла</li>
              <li>1 чайная ложка тимьяна, свежего или сушеного</li>
              <li>1/4 фунта лисичек, разделенных (или 1-2 унции сушеных)</li>
              <li>1 стакан риса Арборио</li>
              <li>1/2 стакана пармезана или пекорино, тонко натертого</li>
              <li>2 столовые ложки масла</li>
            </ol>
          </Ingridients>
          <Instructions>
            <h3 style={{ textAlign: "center" }}>Инструкции:</h3>
            <ol className="gradient-list">
              <li>
                Доведите до кипения бульон и вино или сидр в средней кастрюле.
              </li>
              <li>
                В другой средней кастрюле обжарьте мелко нарезанный лук и чеснок
                на оливковом масле до прозрачности, около 5 минут.
              </li>
              <li>
                Добавьте около половины грибов (все, если используете сушеные),
                вместе с тимьяном и обжарьте еще 1-2 минуты.
              </li>
              <li>
                Добавьте сушеный рис Арборио в смесь лука и обжарьте рис на
                масле около 1-2 минут, чтобы он подрумянился.
              </li>
              <li>
                Постоянно помешивая, добавляйте кипящую смесь бульона/вина по
                одному половнику за раз, каждые 2-3 минуты. Цель - пропарить
                рис, а не варить его. Уровень воды должен быть низким, и она
                должна быстро кипеть прямо под уровнем риса.
              </li>
              <li>
                Продолжайте добавлять бульон, немного за раз, постоянно
                помешивая, пока весь бульон не будет впитан. Это должно занять
                около 30 минут на медленном огне и постоянного помешивания.
                Помешивание помогает удалить крахмал с поверхности риса, что
                создает кремовый ризотто.
              </li>
              <li>
                Когда рис впитает всю жидкость и станет кремовым, снимите его с
                огня. Добавьте тонко натертый сыр и перемешайте, пока он
                полностью не расплавится.
              </li>
              <li>
                Обжарьте оставшиеся 1/8 фунта грибов на 2 столовых ложках масла
                около 5 минут. Подайте ризотто, украсив каждую тарелку
                обжаренными лисичками и маслом с лисичками.
              </li>
              <li>Подавайте немедленно, добавив соль по вкусу</li>
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
