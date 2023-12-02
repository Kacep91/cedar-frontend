import {
  ProductPresentationWrapper,
  ProductPresentationHeader,
  ProductPresentationHeaderImage,
  DecriptionBlock,
  ProductPresentationDescriptionWrapper,
  ItemListContainer,
  ItemListLabel,
  ItemListWrapper,
  LoadMoreButton,
} from "components/atoms";
import { BackLinkAtom } from "./BackLink";
import { Footer } from "./Footer";
import MainHeader from "./MainHeader";
import soup from "../../assets/images/soup.jpg";
import ScrollToTopOnMount from "utils/scrollRestorationFix";
import axios from "axios";
import { ItemListUnit } from "components/ItemListUnit";
import { ProgressSpinner } from "primereact/progressspinner";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoodsSelectors, GoodsActions } from "store/goods";
import {
  categorizeProducts,
  selectedLabels,
  arrayBufferToBase64,
} from "utils/utils";
import { ProductPresentationPageProps } from "./ProductPresentationPage";

export const Mushrooms = () => {
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
  return (
    <>
      <ScrollToTopOnMount />
      <MainHeader isCart={true} />
      <BackLinkAtom id={"backButton"} to={"/"} children={"Назад"} />
      <div>
        <h1 style={{ textAlign: "center", margin: "60px 0" }}>Грибы</h1>
      </div>
      <ProductPresentationWrapper>
        <ProductPresentationHeader>
          <ProductPresentationHeaderImage src={soup} />
          <DecriptionBlock>
            Грибы из таежного леса, такие как лисички и белые грибы, обладают
            уникальными свойствами, делающими их не только вкусным, но и
            полезным продуктом питания
          </DecriptionBlock>
        </ProductPresentationHeader>
        <ProductPresentationDescriptionWrapper>
          <ol className={"gradient-list"}>
            <li>
              Лисички являются отличным источником витамина D2 и содержат в
              своем составе хиноманнозу - биологически активное вещество,
              способное уничтожать членистоногих и глистов. Благодаря большому
              количеству витамина А, эти грибы служат отличной профилактикой
              болезней глаз и восстанавливают глазную слизистую. Они также
              благотворно влияют на состояние волос, ногтей и кожи. Важно
              отметить, что лисички не накапливают радиоактивные вещества, а
              наоборот, выводят радионуклиды из организма человека, что делает
              их отличным продуктом для профилактики рака
            </li>

            <li>
              Белые грибы содержат витамины А, В1, С и особенно много витамина
              D. Они также богаты рибофлавином, который отвечает за здоровье и
              рост ногтей, волос, кожи и за здоровье организма в целом. Белые
              грибы стимулируют секрецию пищеварительных соков, превосходя в
              этом отношении даже мясные бульоны. Благодаря содержанию большого
              количества серы и полисахаридов, они помогают бороться с
              онкологическими заболеваниями
            </li>

            <li>
              Оба этих гриба обладают прекрасными вкусовыми качествами и могут
              быть использованы в различных блюдах, включая супы, вторые блюда,
              подливы, соусы и различные начинки для мучных изделий. Однако
              стоит помнить, что они содержат большое количество
              трудноперевариваемой клетчатки, поэтому их не рекомендуется
              употреблять в больших количествах
            </li>
          </ol>
        </ProductPresentationDescriptionWrapper>
      </ProductPresentationWrapper>
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
      )}{" "}
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
