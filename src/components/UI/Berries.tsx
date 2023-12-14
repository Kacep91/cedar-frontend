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
import cranberryIcon from "../../assets/images/cranberryIcon.png";
import { ItemListUnit } from "components/ItemListUnit";
import { useDispatch, useSelector } from "react-redux";
import { GoodsActions, GoodsSelectors } from "store/goods";
import {
  arrayBufferToBase64,
  categorizeProducts,
  selectedLabels,
} from "utils/utils";
import { ProductPresentationPageProps } from "./ProductPresentationPage";
import ScrollToTopOnMount from "utils/scrollRestorationFix";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";

export const Berries = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const categorizedProducts = useSelector(GoodsSelectors.categorizedProducts);

  const [listLength, setListLength] = useState(4);
  console.log("categorizedProducts", categorizedProducts);
  const totalLength =
    [...categorizedProducts].filter((item) => item.label.includes("ягода"))?.[0]
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

  return (
    <>
      <ScrollToTopOnMount />
      <MainHeader isCart={true} />
      <BackLinkAtom id={"backButton"} to={"/"} children={"Назад"} />

      <div>
        <h1 style={{ textAlign: "center", margin: "60px 0" }}>Таежные ягоды</h1>
      </div>
      <ProductPresentationWrapper>
        <ProductPresentationHeader>
          <ProductPresentationHeaderImage src={cranberryIcon} />
          <DecriptionBlock>
            Таежные ягоды - это не только вкусное лакомство, но и настоящий
            кладезь полезных веществ. Они обладают уникальными свойствами,
            которые благотворно влияют на здоровье человека и красоту его кожи.
          </DecriptionBlock>
        </ProductPresentationHeader>
        <ProductPresentationDescriptionWrapper>
          <ol className={"gradient-list"}>
            <li>
              Таежные ягоды, такие как клюква, брусника, черника и земляника,
              богаты витаминами, минералами и биологически активными
              соединениями, которые невозможно воссоздать искусственно. Они
              обладают противовоспалительным и антибактериальным действием, что
              делает их незаменимыми в медицине и косметологии
            </li>

            <li>
              Клюква, например, защищает кишечник, снижает уровень холестерина,
              укрепляет иммунитет и улучшает работу мозга. Брусника обладает
              общеукрепляющим, ранозаживляющим, тонизирующим и многими другими
              свойствами. Черника помогает регулировать менструальный цикл,
              снижает уровень сахара в крови и стабилизирует работу органов и
              желез.
            </li>

            <li>
              В косметологии таежные ягоды используются для увлажнения и
              подтяжки кожи, борьбы с морщинами и старением, а также для
              улучшения состояния волос. Они делают кожу сияющей, возвращают ей
              здоровье и насыщают витаминами
            </li>

            <li>
              Таким образом, таежные ягоды - это настоящий дар природы, который
              помогает поддерживать здоровье и красоту. Они являются ценным
              источником питательных веществ и обладают уникальными свойствами,
              которые делают их незаменимыми в медицине и косметологии.
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
              .filter((item) => item.label.includes("ягода"))
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
