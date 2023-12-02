import { Footer } from "components/UI/Footer";
import MainHeader from "components/UI/MainHeader";
import placeHolder from "../../assets/images/placeHolder.png";
import {
  Ingridients,
  Instructions,
  InstructionsWrapper,
  RecipeHeader,
  RecipeHeaderImage,
  RecipeText,
  RecipeWrapper,
} from "components/atoms";
import { BackLinkAtom } from "components/UI/BackLink";
import { useScreenSize } from "utils/hooks";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoodsSelectors, GoodsActions } from "store/goods";
import { useParams } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";

export const GeneralRecipe = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const recipes = useSelector(GoodsSelectors.recipesList);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await axios.get("http://localhost:3000/recipes");

      if (res.data) {
        dispatch(GoodsActions.setRecipes(res.data));
        setIsLoading(false);
      }
    };

    recipes.length === 0 && fetch();
  }, []);

  const isTablet = useScreenSize("mobile");
  const data = recipes.find((item: any) => item.id === id);

  return (
    <>
      <MainHeader isCart={true} />
      <BackLinkAtom id={"backButton"} to={"/"} children={"Назад"} />
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
          <RecipeWrapper>
            <RecipeHeader>
              <RecipeHeaderImage
                src={data?.image ? data?.image : placeHolder}
              />
              <RecipeText>{data?.name}</RecipeText>
            </RecipeHeader>
            <div style={{ margin: "50px 0" }}>
              <h1 style={{ textAlign: "center" }}>Способ приготовления</h1>
            </div>
            <InstructionsWrapper>
              <Ingridients>
                <h3 style={{ textAlign: "center" }}>Ингредиенты:</h3>
                <ol
                  className={isTablet ? "gradient-list" : "gradient-list line"}
                >
                  {data?.ingridients?.split("\n").map((item) => {
                    return <li key={item}>{item}</li>;
                  })}
                </ol>
              </Ingridients>
              <Instructions>
                <h3 style={{ textAlign: "center" }}>Инструкции:</h3>
                <ol className="gradient-list">
                  {data?.instructions?.split("\n").map((item) => {
                    return <li key={item}>{item}</li>;
                  })}
                </ol>
              </Instructions>
            </InstructionsWrapper>
          </RecipeWrapper>
          <Footer />
        </>
      )}
    </>
  );
};
