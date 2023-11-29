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
import granola from "../../assets/images/granola.jpg";

export const Granola = () => {
  return (
    <>
      <MainHeader isCart={false} />
      <BackLinkAtom to={"/"} children={"Назад"} />

      <div>
        <h1 style={{ textAlign: "center", margin: "60px 0" }}>Гранола</h1>
      </div>
      <ProductPresentationWrapper>
        <ProductPresentationHeader>
          <ProductPresentationHeaderImage src={granola} />
          <DecriptionBlock>
            Гранола - это вкусный и питательный продукт, который отлично
            подходит для семейного завтрака. Она богата витаминами и минералами,
            такими как кальций, магний, железо, витамины А и С, В6 и В12
          </DecriptionBlock>
        </ProductPresentationHeader>
        <ProductPresentationDescriptionWrapper>
          <ol className={"gradient-list"}>
            <li>
              Гранола также содержит много клетчатки, которая создает ощущение
              сытости и помогает очистить кишечник
            </li>

            <li>
              С питательной точки зрения, гранола является хорошим источником
              железа, цинка и магния, а также витаминов Е, А и группы В
            </li>

            <li>
              Она включает в себя ингредиенты, богатые пищевыми волокнами и
              растительными соединениями, называемыми полифенолами, что влияет
              на разнообразие микробиома кишечника
            </li>

            <li>
              Однако, стоит учесть, что гранола - это довольно калорийный
              продукт, и ее следует употреблять в умеренных количествах
            </li>

            <li>
              Также важно тщательно изучать состав гранолы перед покупкой, так
              как в некоторых продуктах могут содержаться вредные сахара и жиры
            </li>

            <li>
              Вкус гранолы зависит от ее состава. Она может включать в себя
              различные злаки, орехи, семена и сухофрукты, политые медом или
              сахаром, и запеченные до появления хрустящей текстуры
            </li>
            <li>
              Гранола - это отличный выбор для тех, кто ищет питательный и
              вкусный завтрак, способный поддержать здоровье и энергию на
              протяжении всего дня
            </li>
          </ol>
        </ProductPresentationDescriptionWrapper>
      </ProductPresentationWrapper>
      <Footer />
    </>
  );
};
