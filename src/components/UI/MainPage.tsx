import React, { useEffect, useState } from "react";
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
import cranberryIcon from "../../assets/images/cranberryIcon.png";
import mushroomIcon from "../../assets/images/mushroomIcon.png";
import honeyIcon from "../../assets/images/honeyIcon.png";
import willowIcon from "../../assets/images/willowIcon.png";
import video1 from "../../assets/video/video1.mp4";
import video2 from "../../assets/video/video2.mp4";
import { Bublik } from "./Bublik";
import { useNavigate } from "react-router";
import { Footer } from "./Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GoodsSelectors, GoodsActions } from "store/goods";
import { categorizeProducts, selectedLabels } from "utils/utils";
import { ProductPresentationPageProps } from "./ProductPresentationPage";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { ScrollTop } from "primereact/scrolltop";
import ReactPlayer from "react-player/lazy";
import { useScreenSize } from "utils/hooks";

export const products = [{ src: aboutUs, text: "", link: "/aboutUs" }];

export const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categorizedProducts = useSelector(GoodsSelectors.categorizedProducts);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Вызываем функцию при первой загрузке страницы
    console.log(getResponsiveValue(width));

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function getResponsiveValue(width: number) {
    if (width > 1660) {
      return 4;
    } else if (width > 1220) {
      return 3;
    } else if (width > 800) {
      return 2;
    } else {
      return 1;
    }
  }

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

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("https://siberia-organic.com:3000/recipes");

      if (res.data) {
        dispatch(GoodsActions.setRecipes(res.data));
      }
    };

    recipesList.length === 0 && fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("https://siberia-organic.com:3000/goods");

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

  const videos = [video1, video2];
  const isMobile = useScreenSize("mobile");

  return (
    <>
      <Bublik />
      <MainHeader isCart={false} />
      <ScrollTop />
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

      <RecipesContainer style={{ marginBottom: "20px" }}>
        <h1>Наши продукты</h1>
        <Swiper
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          spaceBetween={40}
          slidesPerView={
            width > 1660 ? 3 : width > 1220 ? 3 : width > 800 ? 2 : 1
          }
        >
          {products2.map((product) => (
            <SwiperSlide key={Math.random()}>
              <AboutUsWrapper
                key={product.text}
                onClick={() => navigate(product.url)}
              >
                <ProductPageImage src={product.src} />
                <AboutUsText>{product.text}</AboutUsText>
              </AboutUsWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      </RecipesContainer>

      <RecipesContainer id="video" style={{ marginBottom: "20px" }}>
        <h1 style={{ marginBottom: "-20px" }}>Видео о нас</h1>
        <Swiper
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          spaceBetween={40}
          centeredSlides
          slidesPerView={1}
        >
          {videos.map((video) => (
            <SwiperSlide key={Math.random()}>
              {" "}
              <AboutUsWrapper key={Math.random()}>
                <ReactPlayer
                  controls
                  url={video}
                  width={isMobile ? "92vw" : 450}
                  height={800}
                  style={{ display: "flex", justifyContent: "center" }}
                />
              </AboutUsWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      </RecipesContainer>

      <RecipesContainer>
        <h1>Рецепты</h1>
        <Swiper
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          spaceBetween={40}
          slidesPerView={
            width > 1660 ? 4 : width > 1220 ? 3 : width > 800 ? 2 : 1
          }
        >
          {recipesResult.map((product) => (
            <SwiperSlide key={product.link}>
              <AboutUsWrapper
                key={product.text}
                onClick={() => navigate(product.link)}
              >
                <RecipesImage src={product.src} />
                <AboutUsText>{product.text}</AboutUsText>
              </AboutUsWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      </RecipesContainer>
      <Footer />
    </>
  );
};
