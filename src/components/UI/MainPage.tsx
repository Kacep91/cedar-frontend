import React from "react";
import {
  AboutUsBlock,
  AboutUsContainer,
  AboutUsImage,
  AboutUsText,
  AboutUsWrapper,
  Branch,
  ProductPageImage,
  ProductsBlock,
} from "components/atoms";
import MainHeader from "./MainHeader";
import aboutUs from "../../assets/images/aboutUs.jpg";
import aboutUs2 from "../../assets/images/aboutUs2.jpg";
import branch from "../../assets/images/branch.png";
import jam from "../../assets/images/jam.jpg";
import granola from "../../assets/images/granola.jpg";
import soup from "../../assets/images/soup.jpg";
import honey1 from "../../assets/images/honey1.jpg";
import willow from "../../assets/images/willow.jpg";
import { Bublik } from "./Bublik";

export const MainPage = () => {
  const products = [
    { src: aboutUs, text: "Наши мероприятия" },
    { src: aboutUs2, text: "Наше производство" },
  ];

  const products2 = [
    { src: jam, text: "Джемы" },
    { src: granola, text: "Гранола" },
    { src: soup, text: "Супы" },
    { src: honey1, text: "Мёд" },
    { src: willow, text: "Напитки из ивы" },
  ];

  return (
    <>
      <Bublik />
      <MainHeader isCart={false} />
      <AboutUsBlock>
        <h1>Кто мы? В чём наша миссия?</h1>
        <Branch src={branch} />
        <AboutUsContainer>
          {products.map((product) => (
            <AboutUsWrapper key={product.text}>
              <AboutUsImage src={product.src} />
              <AboutUsText>{product.text}</AboutUsText>
            </AboutUsWrapper>
          ))}
        </AboutUsContainer>
      </AboutUsBlock>

      <ProductsBlock>
        <h1>Наши продукты</h1>
        <AboutUsContainer>
          {products2.map((product) => (
            <AboutUsWrapper key={product.text}>
              <ProductPageImage src={product.src} />
              <AboutUsText>{product.text}</AboutUsText>
            </AboutUsWrapper>
          ))}
        </AboutUsContainer>
      </ProductsBlock>
    </>
  );
};
