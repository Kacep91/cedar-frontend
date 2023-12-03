import { Footer } from "components/UI/Footer";
import MainHeader from "components/UI/MainHeader";
import pasta from "../../assets/images/pasta.jpg";
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

export const PastaRecipe = (recipe: any) => {
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

    categorizedProducts.length === 0 && fetch();
  }, [categorizedProducts]);
  const isTablet = useScreenSize("mobile");
  return (
    <>
      <MainHeader isCart={true} />
      <BackLinkAtom id={"backButton"} to={"/"} children={"Назад"} />
      <RecipeWrapper>
        <RecipeHeader>
          <RecipeHeaderImage src={pasta} />
          <RecipeText>Кремовая паста с грибами</RecipeText>
        </RecipeHeader>
        <div style={{ margin: "50px 0" }}>
          <h1 style={{ textAlign: "center" }}>Способ приготовления</h1>
        </div>
        <InstructionsWrapper>
          <Ingridients>
            <h3 style={{ textAlign: "center" }}>Ингредиенты:</h3>
            <ol className={isTablet ? "gradient-list" : "gradient-list line"}>
              <li>
                1 стакан (240 мл) домашнего или купленного в магазине
                низкосолевого куриного бульона (см. примечание)
              </li>
              <li>
                1 1/2 чайной ложки (4 г) пищевого желатина, например, Knox
              </li>
              <li>2 столовые ложки (30 мл) оливкового масла extra virgin</li>
              <li>
                1 1/2 фунта (675 г) смешанных грибов (таких как шиитаке,
                устричные, майтаке, букашки, кремни и лисички), очищенных,
                обрезанных и тонко нарезанных или разорванных вручную (см.
                примечание)
              </li>
              <li>Кошерная соль и свежемолотый черный перец</li>
              <li>
                3 средних шалота, мелко нарезанных (около 3/4 стакана; 120 г)
              </li>
              <li>2 средних (10 г) зубчика чеснока, измельченных</li>
              <li>2 столовые ложки (4 г) нарезанных свежих листьев тимьяна</li>
              <li>
                1/2 стакана (120 мл) сухого белого вина или 1/4 стакана (60 мл)
                сухого хереса
              </li>
              <li>1 чайная ложка (5 мл) рыбного соуса (по желанию)</li>
              <li>
                1 фунт (450 г) короткой сушеной пасты (такой как казаречче или
                джемелли) или длинной свежей пасты из яичного теста (такой как
                тальятелле или феттучине)
              </li>
              <li>6 столовых ложек несоленого масла (3 унции; 85 г)</li>
              <li>3 унции тертого Пармиджано-Реджиано (1 стакан; 85 г)</li>
              <li>
                1/4 стакана (10 г) нарезанных свежих листьев петрушки плоского
                листа
              </li>
            </ol>
          </Ingridients>
          <Instructions>
            <h3 style={{ textAlign: "center" }}>Инструкции:</h3>
            <ol className="gradient-list">
              <li>
                Налейте бульон в небольшую миску или мерный стакан и равномерно
                посыпьте поверхность бульона желатином. Отложите в сторону.
              </li>
              <li>
                В большой 12-дюймовой сковороде из чугуна или нержавеющей стали
                нагрейте масло на средне-высоком огне до мерцания. Добавьте
                грибы, посолите и поперчите, и готовьте, часто помешивая
                деревянной ложкой, пока влага не испарится, а грибы не станут
                глубоко коричневыми, 12-15 минут.
              </li>
              <li>
                Добавьте шалот, чеснок и тимьян и готовьте, постоянно помешивая,
                пока не почувствуете аромат и шалот не станет мягким, 30 секунд
                до 1 минуты. Добавьте вино или херес и готовьте, взбалтывая
                сковороду и соскребая застрявшие кусочки деревянной ложкой, пока
                вино не уменьшится вдвое, около 30 секунд.
              </li>
              <li>
                Добавьте смесь куриного бульона, слегка посолите и доведите до
                кипения. Уменьшите огонь до средне-низкого, добавьте рыбный соус
                (если используете), и готовьте, время от времени помешивая, пока
                смесь грибов не загустеет до соусообразной консистенции, около 5
                минут. Выключите огонь.
              </li>
              <li>
                Тем временем, в кастрюле с кипящей подсоленной водой варите
                пасту. Если используете сухую пасту, варите до состояния
                &quot;аль денте&quot; (на 1-2 минуты меньше, чем указано на
                упаковке). Если используете свежую пасту, варите до тех пор,
                пока лапша не будет едва приготовлена. С помощью ситечка для
                пасты (для короткой пасты) или щипцов (для длинной свежей пасты)
                переложите пасту в сковороду с грибами вместе с 3/4 стакана (180
                мл) воды, в которой варилась паста. В качестве альтернативы,
                отцедите пасту с помощью дуршлага или сита с мелкими ячейками,
                убедившись, что вы сохранили как минимум 2 стакана (475 мл)
                воды, в которой варилась паста.
              </li>
              <li>
                Нагрейте соус и пасту на высоком огне и готовьте, быстро
                помешивая и встряхивая, пока паста не станет &quot;аль
                денте&quot; (свежая паста никогда не будет действительно
                &quot;аль денте&quot;), а соус не загустеет и не покроет лапшу,
                1-2 минуты, добавляя больше воды, в которой варилась паста, по
                1/4 стакана (60 мл) по мере необходимости. На этом этапе соус
                должен покрывать пасту, но все еще быть достаточно жидким, чтобы
                собираться вокруг краев сковороды. Добавьте масло и быстро
                помешивайте и встряхивайте, чтобы оно растаяло и эмульгировало в
                соус. Снимите с огня, добавьте 3/4 тертого сыра и всю петрушку,
                и быстро перемешайте для включения. Посолите по вкусу. Подавайте
                немедленно, подавая оставшийся тертый сыр на столе.
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
                      .slice(0, listLength)
                      .map((item2) => (
                        <ItemListUnit
                          key={item2.name}
                          {...item2}
                          image={
                            item2.image
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
