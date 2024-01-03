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
import soup from "../../assets/images/soup.jpg";
import { ScrollTop } from "primereact/scrolltop";

export const Soup = () => {
  return (
    <>
      <MainHeader isCart={true} />
      <BackLinkAtom id={"backButton"} to={"/"} children={"Назад"} />

      <ScrollTop />
      <div>
        <h1 style={{ textAlign: "center", margin: "60px 0" }}>
          Суп из лисичек
        </h1>
      </div>
      <ProductPresentationWrapper>
        <ProductPresentationHeader>
          <ProductPresentationHeaderImage src={soup} />
          <DecriptionBlock>
            {" "}
            Суп с лисичками - это не только вкусное, но и полезное блюдо,
            которое обладает рядом питательных свойств.
          </DecriptionBlock>
        </ProductPresentationHeader>
        <ProductPresentationDescriptionWrapper>
          <ol className={"gradient-list"}>
            <li>
              {" "}
              Во-первых, суп с лисичками богат витаминами и минералами. Он
              содержит витамины группы B, включая В1, В2, В5, В6 и В9, которые
              играют важную роль в обмене веществ и поддержании здоровья нервной
              системы
            </li>

            <li>
              Также в супе присутствуют витамины A, C, D, E и K, которые
              способствуют укреплению иммунной системы, поддержанию здоровья
              кожи и костей, а также обеспечивают антиоксидантную защиту
            </li>

            <li>
              Во-вторых, суп с лисичками содержит белки, которые являются
              важными строительными блоками для тканей организма
            </li>

            <li>
              При этом, суп имеет низкое содержание жиров, что делает его
              отличным выбором для тех, кто следит за своим питанием и стремится
              сохранить фигуру
            </li>

            <li>
              В-третьих, суп с лисичками обладает высоким содержанием пищевых
              волокон, которые способствуют нормализации пищеварения и
              обеспечивают ощущение сытости
            </li>

            <li>
              Наконец, суп с лисичками - это не только полезное, но и вкусное
              блюдо. Деликатный вкус лисичек в сочетании с ароматными специями и
              овощами делает этот суп настоящим кулинарным наслаждением
            </li>
            <li>
              суп с лисичками - это идеальное сочетание вкуса и пользы, которое
              станет отличным дополнением к любому столу.
            </li>
          </ol>
        </ProductPresentationDescriptionWrapper>
      </ProductPresentationWrapper>
      <Footer />
    </>
  );
};
