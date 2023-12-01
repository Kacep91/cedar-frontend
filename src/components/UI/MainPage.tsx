import React, { useEffect } from "react";
import {
  AboutUsBlock,
  AboutUsContainer,
  AboutUsImage,
  AboutUsText,
  AboutUsWrapper,
  Branch,
  ProductPageImage,
  ProductsBlock,
  RecipesContainer,
  RecipesImage,
} from "components/atoms";
import MainHeader from "./MainHeader";
import pasta from "../../assets/images/pasta.jpg";
import risotto from "../../assets/images/risotto.jpg";
import toast from "../../assets/images/toast.jpg";
import aboutUs from "../../assets/images/aboutUs.jpg";
import branch from "../../assets/images/branch.png";
import granola from "../../assets/images/granola.jpg";
import soup from "../../assets/images/soup.jpg";
import honey1 from "../../assets/images/honey1.jpg";
import willow from "../../assets/images/willow.jpg";
import { Bublik } from "./Bublik";
import { useNavigate } from "react-router";
import { Footer } from "./Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GoodsSelectors, GoodsActions } from "store/goods";
import { categorizeProducts, selectedLabels } from "utils/utils";
import { ProductPresentationPageProps } from "./ProductPresentationPage";

export const products = [
  { src: aboutUs, text: "Наше производство", link: "/aboutUs" },
];

const recipes = [
  { src: pasta, text: "Кремовая паста с грибами", link: "/pastaRecipe" },
  { src: risotto, text: "Ризотто с лисичками", link: "/risottoRecipe" },
  { src: toast, text: "Тост с лисичками", link: "/toastRecipe" },
];

export const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categorizedProducts = useSelector(GoodsSelectors.categorizedProducts);

  useEffect(() => {
    const fetch = async () => {
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
      }
    };

    categorizedProducts.length === 0 && fetch();
  }, [categorizedProducts]);

  const products2 = [
    { src: granola, text: "Ягоды", url: "/berries" },
    { src: soup, text: "Грибы", url: "/mushrooms" },
    { src: honey1, text: "Мёд", url: "/honey" },
    { src: willow, text: "Чай", url: "/willow" },
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
            <AboutUsWrapper
              key={product.text}
              onClick={() => navigate(product.link)}
            >
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
            <AboutUsWrapper
              key={product.text}
              onClick={() => navigate(product.url)}
            >
              <ProductPageImage src={product.src} />
              <AboutUsText>{product.text}</AboutUsText>
            </AboutUsWrapper>
          ))}
        </AboutUsContainer>
      </ProductsBlock>

      <AboutUsBlock>
        <h1>Рецепты</h1>
        <RecipesContainer>
          {recipes.map((product) => (
            <AboutUsWrapper
              key={product.text}
              onClick={() => navigate(product.link)}
            >
              <RecipesImage src={product.src} />
              <AboutUsText>{product.text}</AboutUsText>
            </AboutUsWrapper>
          ))}
        </RecipesContainer>
      </AboutUsBlock>
      <Footer />
    </>
  );
};
