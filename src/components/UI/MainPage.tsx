import React, { useEffect, useState } from "react";
import {
  AboutUsBlock,
  AboutUsContainer,
  AboutUsImage,
  AboutUsText,
  AboutUsWrapper,
  Branch,
  LoadMoreButton,
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
import cranberryIcon from "../../assets/images/cranberryIcon.png";
import mushroomIcon from "../../assets/images/mushroomIcon.png";
import honeyIcon from "../../assets/images/honeyIcon.png";
import willowIcon from "../../assets/images/willowIcon.png";
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

export const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categorizedProducts = useSelector(GoodsSelectors.categorizedProducts);

  const recipes = [
    { src: pasta, text: "Кремовая паста с грибами", link: "/pastaRecipe" },
    { src: risotto, text: "Ризотто с лисичками", link: "/risottoRecipe" },
    { src: toast, text: "Тост с лисичками", link: "/toastRecipe" },
  ];

  const recipesList = useSelector(GoodsSelectors.recipesList);
  const recipesResult = [
    ...recipes,
    ...recipesList.map((item) => {
      return {
        id: item.id,
        text: item.name,
        src: item.image,
        link: `/recipe/${item.id}`,
      };
    }),
  ];

  const [listLength, setListLength] = useState(3);
  const totalLength = [...recipesResult].length || 1;

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://79.174.95.133:3000/recipes");

      if (res.data) {
        dispatch(GoodsActions.setRecipes(res.data));
      }
    };

    recipesList.length === 0 && fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://79.174.95.133:3000/goods");

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
  }, []);

  const products2 = [
    { src: cranberryIcon, text: "Ягоды", url: "/berries" },
    { src: mushroomIcon, text: "Грибы", url: "/mushrooms" },
    { src: honeyIcon, text: "Мёд", url: "/honey" },
    { src: willowIcon, text: "Чай", url: "/willow" },
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
          {recipesResult.slice(0, listLength).map((product) => (
            <AboutUsWrapper
              key={product.text}
              onClick={() => navigate(product.link)}
            >
              <RecipesImage src={product.src} />
              <AboutUsText>{product.text}</AboutUsText>
            </AboutUsWrapper>
          ))}
          {listLength >= totalLength ? null : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
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
        </RecipesContainer>
      </AboutUsBlock>
      <Footer />
    </>
  );
};
