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
import willow from "../../assets/images/willow.jpg";
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

export const Willow = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const categorizedProducts = useSelector(GoodsSelectors.categorizedProducts);
  const [listLength, setListLength] = useState(4);
  const totalLength =
    [...categorizedProducts].filter((item) => item.label.includes("чай"))?.[0]
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
        <h1 style={{ textAlign: "center", margin: "60px 0" }}>Иван-чай</h1>
      </div>
      <ProductPresentationWrapper>
        <ProductPresentationHeader>
          <ProductPresentationHeaderImage src={willow} />
          <DecriptionBlock>
            Напитки из ивы обладают уникальными свойствами, которые делают их не
            только вкусными, но и полезными для здоровья. Они могут быть
            приготовлены из различных частей растения, включая кору, листья и
            молодые веточки
          </DecriptionBlock>
        </ProductPresentationHeader>
        <ProductPresentationDescriptionWrapper>
          <ol className={"gradient-list"}>
            <li>
              Одним из ключевых свойств напитков из ивы является их способность
              стимулировать выработку интерферона в организме. Это делает их
              незаменимым средством при простуде и вирусных заболеваниях, а
              также при болезнях верхних дыхательных путей и воспалении
              мочеполовой системы
            </li>

            <li>
              Кроме того, напитки из ивы обладают противовоспалительными,
              жаропонижающими, антисептическими, обезболивающими, тонизирующими
              и кровоостанавливающими свойствами
            </li>

            <li>
              {" "}
              Они также могут использоваться в качестве успокаивающего средства
            </li>

            <li>
              Напитки из ивы также могут быть использованы в косметических
              целях. Ванны из ивы могут помочь избавиться от неприятного запаха
              при потливости ног, устранить зуд, а отвары советуют мыть голову,
              чтобы избавиться от перхоти, и умываться, чтобы надолго сохранить
              молодость лица
            </li>

            <li>
              Приготовление напитка из ивы довольно простое. Для приготовления
              отвара из коры ивы нужно залить столовую ложку измельченной коры
              стаканом кипятка и варить в течение 30 минут на водяной бане.
              Затем отвар следует процедить и довести до первоначального объема.
              Принимать его рекомендуется по столовой ложке три-пять раз в день
              до еды
            </li>

            <li>
              Напитки из ивы - это не только вкусное, но и полезное дополнение к
              вашему рациону. Они обладают целым рядом полезных свойств, которые
              могут помочь улучшить ваше здоровье и благополучие.
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
                .filter((item) => item.label.includes("чай"))
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
