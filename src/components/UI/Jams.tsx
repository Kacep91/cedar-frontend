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
import jam from "../../assets/images/jam.jpg";

export const Jams = () => {
  return (
    <>
      <MainHeader isCart={false} />
      <BackLinkAtom to={"/"} children={"Назад"} />

      <div>
        <h1 style={{ textAlign: "center", margin: "60px 0" }}>
          Джемы с кедровыми ядрами
        </h1>
      </div>
      <ProductPresentationWrapper>
        <ProductPresentationHeader>
          <ProductPresentationHeaderImage src={jam} />
          <DecriptionBlock>
            Джем из кедровых ядер - это не только вкусное, но и невероятно
            полезное лакомство. Кедровые ядра обладают уникальным составом,
            который невозможно воспроизвести в лабораторных условиях
          </DecriptionBlock>
        </ProductPresentationHeader>
        <ProductPresentationDescriptionWrapper>
          <ol className={"gradient-list"}>
            <li>
              Они насыщают организм энергией, улучшают зоркость, поддерживают
              работу сердца и продлевают молодость
            </li>

            <li>
              Ядра кедровых орехов содержат массу полезных микроэлементов, и
              люди давно оценили их пищевую ценность. Считается, что 100 г
              кедровых орехов в день на треть удовлетворяют потребность
              человеческого организма в белке
            </li>

            <li>
              В их состав входит 19 аминокислот, в том числе незаменимые: лизин,
              метионин, триптофан
            </li>

            <li>
              Биологическая ценность ядер кедровых орехов обусловлена высоким
              содержанием витамина В1 и витамина Е
            </li>

            <li>
              Они благотворно влияют на нервную систему, обладают
              общеукрепляющим действием, стимулируют функцию половых желез,
              повышают физическую и умственную работоспособность
            </li>

            <li>
              Кедровый джем обладает сладковатым сливочным вкусом и характерным
              ароматом сосны, что придает ему особую пикантность
            </li>
            <li>
              Визуально джем из кедровых ядер выглядит привлекательно: яркие
              золотистые кусочки ядер в прозрачной амбровой массе создают эффект
              солнечного света, запертого в банке. Это делает его отличным
              подарком для любителей натуральных и полезных сладостей.
            </li>
          </ol>
        </ProductPresentationDescriptionWrapper>
      </ProductPresentationWrapper>
      <Footer />
    </>
  );
};
