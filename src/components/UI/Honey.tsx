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
import honey1 from "../../assets/images/honey1.jpg";
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

export const Honey = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const categorizedProducts = useSelector(GoodsSelectors.categorizedProducts);
  const [listLength, setListLength] = useState(4);
  const totalLength =
    [...categorizedProducts].filter((item) =>
      item.label.includes("десерт"),
    )?.[0]?.items.length || 1;

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
      <MainHeader isCart={true} />
      <BackLinkAtom id={"backButton"} to={"/"} children={"Назад"} />
      <ScrollToTopOnMount />

      <div>
        <h1 style={{ textAlign: "center", margin: "60px 0" }}>Сибирский мёд</h1>
      </div>
      <ProductPresentationWrapper>
        <ProductPresentationHeader>
          <ProductPresentationHeaderImage src={honey1} />
          <DecriptionBlock>
            Сибирский мед - это уникальный продукт, который отличается своими
            вкусовыми качествами, питательной ценностью и полезными свойствами.
            Сибирский мед обладает насыщенным и плотным вкусом с мягким долгим
            послевкусием
          </DecriptionBlock>
        </ProductPresentationHeader>
        <ProductPresentationDescriptionWrapper>
          <ol className={"gradient-list"}>
            <li>
              Сибирский мед богат питательными веществами. Он содержит витамины
              группы В, витамины А и С, а также множество минералов, включая
              марганец, хром, медь, цинк, бор, натрий, йод, железо и другие
            </li>

            <li>
              Гречишный мед, например, является питательным и целебным
              продуктом, который отличается особенно богатым и насыщенным вкусом
            </li>

            <li>
              Сибирский мед также обладает рядом полезных свойств. Он оказывает
              противовоспалительное, противомикробное и антивирусное действие
            </li>

            <li>
              Благотворно влияет на общее состояние организма, оказывает
              успокаивающее действие, благотворно влияет на работу органов ЖКТ
            </li>

            <li>
              Рекомендован при больших физических нагрузках и умственном
              перенапряжении
            </li>

            <li>
              Цвет сибирского меда варьируется от светло-коричневого до
              насыщенного от янтарно-красного до темно-янтарного
            </li>
            <li>
              Сибирский мед - это эксклюзивный мед, собранный в одной из самых
              диких частей сибирской тайги
            </li>

            <li>
              Эти отдаленные леса содержат разнообразные эндемичные растения и
              цветы, что придает меду уникальный вкус и аромат
            </li>

            <li>
              Сибирский мед - это не только вкусный и питательный продукт, но и
              ценный источник витаминов и минералов, который может стать
              отличным дополнением к вашему рациону.
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
              .filter((item) => item.label.includes("десерт"))
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
