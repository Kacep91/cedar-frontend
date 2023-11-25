import { Footer } from "components/UI/Footer";
import MainHeader from "components/UI/MainHeader";
import toast from "../../assets/images/toast.jpg";
import {
  RecipeHeader,
  RecipeHeaderImage,
  RecipeText,
  RecipeWrapper,
} from "components/atoms";
import { BackLinkAtom } from "components/UI/BackLink";

export const ToastRecipe = (recipe: any) => {
  return (
    <>
      <MainHeader isCart={true} />
      <BackLinkAtom to={"/"} children={"Назад"} />
      <RecipeWrapper>
        <RecipeHeader>
          <RecipeHeaderImage src={toast} />
          <RecipeText>Тост с лисичками</RecipeText>
        </RecipeHeader>
        <div style={{ margin: "50px 0" }}>
          <h1>Способ приготовления</h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-start",
            margin: "0 auto",
            gap: "50px",
          }}
        >
          <div style={{ width: "50%" }}>
            <h3 style={{ textAlign: "center" }}>Ингредиенты:</h3>
            <ol className="gradient-list line">
              <li>1/4 фунта лисичек (около 1,5-2 стакана целых лисичек)</li>
              <li>2 столовые ложки сливочного масла</li>
              <li>1/4 стакана сливок</li>
              <li>соль по вкусу</li>
            </ol>
          </div>
          <div style={{ width: "50%" }}>
            <h3 style={{ textAlign: "center" }}>Инструкции:</h3>
            <ol className="gradient-list">
              <li>
                Обжарьте свежие лисички на небольшом количестве сливочного масла
                в течение примерно 5 минут. Грибы немного увянут, но сохранят
                свою форму, начиная выделять свой аромат. Добавьте сливки и
                перемешайте смесь силиконовой лопаткой, чтобы равномерно покрыть
                лисички.
              </li>
              <li>
                {" "}
                Уменьшите огонь до минимума и медленно готовьте лисички в
                сливках. Важно готовить их медленно, чтобы сливки загустели, но
                не свернулись. Установите плиту на самый низкий уровень и будьте
                терпеливы. Медленно варите смесь в течение примерно 10 минут,
                пока сливки не загустеют. Посолите по вкусу и положите на свой
                любимый хрустящий хлеб.
              </li>
            </ol>
          </div>
        </div>
      </RecipeWrapper>

      <Footer />
    </>
  );
};
