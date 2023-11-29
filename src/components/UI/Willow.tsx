import {
  ProductPresentationWrapper,
  ProductPresentationHeader,
  ProductPresentationHeaderImage,
  DecriptionBlock,
  ProductPresentationDescriptionWrapper,
} from "components/atoms";
import { BackLinkAtom } from "./BackLink";
import { Footer } from "./Footer";
import MainHeader from "./MainHeader";
import willow from "../../assets/images/willow.jpg";

export const Willow = () => {
  return (
    <>
      <MainHeader isCart={false} />
      <BackLinkAtom to={"/"} children={"Назад"} />

      <div>
        <h1 style={{ textAlign: "center", margin: "60px 0" }}>
          Напитки из ивы
        </h1>
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
      <Footer />
    </>
  );
};
