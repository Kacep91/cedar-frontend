import { Footer } from "components/UI/Footer";
import MainHeader from "components/UI/MainHeader";
import risotto from "../../assets/images/risotto.jpg";
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

export const RisottoRecipe = (recipe: any) => {
  const isTablet = useScreenSize("mobile");
  return (
    <>
      <MainHeader isCart={true} />
      <BackLinkAtom to={"/"} children={"Назад"} />
      <RecipeWrapper>
        <RecipeHeader>
          <RecipeHeaderImage src={risotto} />
          <RecipeText>Ризотто с лисичками</RecipeText>
        </RecipeHeader>
        <div style={{ margin: "50px 0" }}>
          <h1 style={{ textAlign: "center" }}>Способ приготовления</h1>
        </div>
        <InstructionsWrapper>
          <Ingridients>
            <h3 style={{ textAlign: "center" }}>Ингредиенты:</h3>
            <ol className={isTablet ? "gradient-list" : "gradient-list line"}>
              <li>6 стаканов бульона</li>
              <li>1 пинта сухого яблочного сидра (или сухого белого вина)</li>
              <li>1 маленькая луковица, мелко нарезанная</li>
              <li>2-3 зубчика чеснока, мелко нарезанных</li>
              <li>2 столовые ложки оливкового масла</li>
              <li>1 чайная ложка тимьяна, свежего или сушеного</li>
              <li>1/4 фунта лисичек, разделенных (или 1-2 унции сушеных)</li>
              <li>1 стакан риса Арборио</li>
              <li>1/2 стакана пармезана или пекорино, тонко натертого</li>
              <li>2 столовые ложки масла</li>
            </ol>
          </Ingridients>
          <Instructions>
            <h3 style={{ textAlign: "center" }}>Инструкции:</h3>
            <ol className="gradient-list">
              <li>
                Доведите до кипения бульон и вино или сидр в средней кастрюле.
              </li>
              <li>
                В другой средней кастрюле обжарьте мелко нарезанный лук и чеснок
                на оливковом масле до прозрачности, около 5 минут.
              </li>
              <li>
                Добавьте около половины грибов (все, если используете сушеные),
                вместе с тимьяном и обжарьте еще 1-2 минуты.
              </li>
              <li>
                Добавьте сушеный рис Арборио в смесь лука и обжарьте рис на
                масле около 1-2 минут, чтобы он подрумянился.
              </li>
              <li>
                Постоянно помешивая, добавляйте кипящую смесь бульона/вина по
                одному половнику за раз, каждые 2-3 минуты. Цель - пропарить
                рис, а не варить его. Уровень воды должен быть низким, и она
                должна быстро кипеть прямо под уровнем риса.
              </li>
              <li>
                Продолжайте добавлять бульон, немного за раз, постоянно
                помешивая, пока весь бульон не будет впитан. Это должно занять
                около 30 минут на медленном огне и постоянного помешивания.
                Помешивание помогает удалить крахмал с поверхности риса, что
                создает кремовый ризотто.
              </li>
              <li>
                Когда рис впитает всю жидкость и станет кремовым, снимите его с
                огня. Добавьте тонко натертый сыр и перемешайте, пока он
                полностью не расплавится.
              </li>
              <li>
                Обжарьте оставшиеся 1/8 фунта грибов на 2 столовых ложках масла
                около 5 минут. Подайте ризотто, украсив каждую тарелку
                обжаренными лисичками и маслом с лисичками.
              </li>
              <li>Подавайте немедленно, добавив соль по вкусу</li>
            </ol>
          </Instructions>
        </InstructionsWrapper>
      </RecipeWrapper>

      <Footer />
    </>
  );
};