import { Footer } from "components/UI/Footer";
import MainHeader from "components/UI/MainHeader";
import placeHolder from "../../assets/images/placeHolder.png";
import {
  DecriptionBlock,
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

  return (
    <>
      <MainHeader isCart={true} />
      <BackLinkAtom to={"/goods"} children={"Назад"} />
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
        <ProductPresentationWrapper>
          <ProductPresentationHeader>
            <ProductPresentationHeaderImage
              src={
                data?.image
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
            <DecriptionBlock>{data?.description?.description}</DecriptionBlock>
          </ProductPresentationHeader>
          <ProductPresentationDescriptionWrapper>
            <div>
              <h1 style={{ textAlign: "center" }}>Дополнительная информация</h1>
            </div>
            <ol className={"gradient-list"}>
              <li>
                <b>ОБЪЕМ</b>: {data?.description?.volume}
              </li>
              <li>
                <b>Срок годности</b>: {data?.description?.dueDate}
              </li>
              <li>
                <b>Упаковка</b>: {data?.description?.package}
              </li>
              <li>
                <b>Производитель</b>: {data?.description?.companyManufacturer}
              </li>
              <li>
                <b>Цена с НДС</b>: {data?.description?.priceForUnitWithVAT}
              </li>
            </ol>
          </ProductPresentationDescriptionWrapper>
        </ProductPresentationWrapper>
      )}

      <Footer />
    </>
  );
};
