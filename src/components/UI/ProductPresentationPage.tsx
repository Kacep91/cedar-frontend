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
  ProductPresentationWrapper,
  RecipeText,
} from "components/atoms";
import { BackLinkAtom } from "components/UI/BackLink";
import {
  arrayBufferToBase64,
  categorizeProducts,
  selectedLabels,
} from "utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { GoodsActions, GoodsSelectors } from "store/goods";
import { useParams } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { ItemListUnit } from "components/ItemListUnit";

export type ProductPresentationPageProps = {
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
  description?: PresentationPropDescription;
  creationDate?: string;
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
  }, [goods]);

  const { id } = useParams<{ id: string }>();

  const data = goods.find((item: any) => item.id === id);
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
  data && console.log(data.image);
  return (
    <>
      <MainHeader isCart={true} />
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
                {data?.description?.description}
              </DecriptionBlock>
            </ProductPresentationHeader>
            <ProductPresentationDescriptionWrapper>
              <div>
                <h1 style={{ textAlign: "center" }}>
                  Дополнительная информация
                </h1>
              </div>
              <ol className={"gradient-list"}>
                {data?.description?.volume ? (
                  <li>
                    <b>ОБЪЕМ</b>: {data?.description?.volume}
                  </li>
                ) : null}
                {data?.description?.dueDate ? (
                  <li>
                    <b>Срок годности</b>: {data?.description?.dueDate}
                  </li>
                ) : null}
                {data?.description ? (
                  <li>
                    <b>Условия хранения</b>: Хранить в прохладном, сухом месте.
                    Избегать прямого попадания солнечных лучей.
                  </li>
                ) : null}
                {data?.description?.package ? (
                  <li>
                    <b>Упаковка</b>: {data?.description?.package}
                  </li>
                ) : null}
                {data?.description?.ingridients ? (
                  <li>
                    <b>Состав</b>: {data?.description?.ingridients}
                  </li>
                ) : null}
                {data?.description ? (
                  <li>
                    <b>Место происхождения</b>: Красноярский край
                  </li>
                ) : null}
                {data?.description?.priceForUnitWithVAT ? (
                  <li>
                    <b>Цена</b>: {data?.description?.priceForUnitWithVAT}
                  </li>
                ) : null}
              </ol>
            </ProductPresentationDescriptionWrapper>
          </ProductPresentationWrapper>
          <ItemListWrapper>
            {coProducts ? coproductsRender() : null}
          </ItemListWrapper>
          <Footer />
        </>
      )}
    </>
  );
};
