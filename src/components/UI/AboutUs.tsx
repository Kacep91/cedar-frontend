import React from "react";
import MainHeader from "./MainHeader";
import { BackLinkAtom } from "./BackLink";
import {
  AboutUsBlock,
  AboutUsContainer,
  Map,
  ProductsText,
  BlockQuote,
} from "components/atoms";
import map from "../../assets/images/map.png";
import { Footer } from "./Footer";

export const AboutUs = () => {
  return (
    <>
      <MainHeader isCart={true} />
      <BackLinkAtom id={"backButton"} to={"/"} children={"Назад"} />
      <AboutUsBlock>
        <h1>О нас</h1>
        <AboutUsContainer>
          <BlockQuote>
            <div>
              <p>
                <span>МЫ</span> - заготовители, фермеры и переработчики. <br />
              </p>
              <p>
                <span>МЫ</span> бережно используем сибирскую тайгу и землю,
                сохраняя их в первозданном виде.
                <br />
              </p>
              <p>
                <span>МЫ</span> объединяем более 80 предпринимателей
                Красноярского края
                <br />
              </p>
              <p>
                <span>МЫ</span> предлагаем простые и повседневные продукты не
                забывая о вкусе и пользе.
              </p>
              <p>
                <span>МЫ</span> заботимся о хрупком равновесии, существующем
                между нашей планетой и людьми, которые ее населяют, поэтому
                производим продукты, предназначенные для благополучия человека и
                природы
              </p>
            </div>
          </BlockQuote>
          <Map src={map} />
        </AboutUsContainer>
        <h1>Наши продукты</h1>
        <ProductsText>
          С 2019 года, объединившись в Органический кластер, разделяя принципы
          органического производства, мы создаем качественные продукты питания,
          косметику и биологические добавки.
        </ProductsText>
        <div className="bigQuote">
          <blockquote>
            <p>
              Продукты, которые начинаются из сырья, выращенного без химикатов
              или собранного в экологически чистом лесу с максимальным уважением
              к природе и людям.
            </p>
            <p>
              Продукты, произведенные с использованием методов, защищающих и
              улучшающих характеристики нашего сырья, в том числе благодаря
              чистому составу без консервантов и добавок.
            </p>
            <p>
              {" "}
              Продукты, которые доставляют удовольствие собираться за одним
              столом и делиться ими друг с другом.
            </p>
          </blockquote>
        </div>
      </AboutUsBlock>

      <Footer />
    </>
  );
};
