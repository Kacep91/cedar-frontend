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
import { arrayBufferToBase64 } from "utils/utils";
import { useSelector } from "react-redux";
import { GoodsSelectors } from "store/goods";
import { useParams } from "react-router";

export type ProductPresentationPageProps = {
  id?: string;
  name?: string;
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

// "description": {
//     "name": "Варенье с жимолостью и кедровым орехом",
//     "volume": "100 мл",
//     "dueDate": "12 месяцев, при температуре от 5С до 25С и относительной влажности воздуха не более 75%",
//     "package": "стеклобанка",
//     "minRequest": "100 штук",
//     "description": "общеукрепляющий и противовоспалительный эффект,способствует снижению артериального давления,помогает справится с анемией,способствует нормализации работы ЖКТ и улучшает состояние сосудов",
//     "ingridients": "Сахар, сосновый сироп, вода, плоды жимолости, кедровый орех.",
//     "companyManufacturer": "ИП Комаров А. А.",
//     "priceForUnitWithVAT": 348,
//     "priceForUnitWithoutVAT": 290
// }

export const ProductPresentationPage = () => {
  const goods = useSelector(GoodsSelectors.goodsList);

  const { id } = useParams<{ id: string }>();

  const data = goods.find((item: any) => item.id === id);

  return (
    <>
      <MainHeader isCart={true} />
      <BackLinkAtom to={"/"} children={"Назад"} />
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
              <b> Мин. объем закупки</b>: {data?.description?.minRequest}
            </li>
            <li>
              <b>Производитель</b>: {data?.description?.companyManufacturer}
            </li>
            <li>
              <b>Цена с НДС</b>: {data?.description?.priceForUnitWithVAT}
            </li>
            <li>
              <b>Цена без НДС</b>: {data?.description?.priceForUnitWithoutVAT}
            </li>
          </ol>
        </ProductPresentationDescriptionWrapper>
      </ProductPresentationWrapper>

      <Footer />
    </>
  );
};
