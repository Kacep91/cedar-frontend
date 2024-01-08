import React from "react";
import MainHeader from "./MainHeader";
import { BackLinkAtom } from "./BackLink";
import {
  AboutUsBlock,
  AboutUsContainer,
  Map,
  ProductsText,
  BlockQuote,
  CEOImage,
  CeoFigure,
  CeoName,
  CeoWrapper,
  SiberiaLogo,
  SiberiaLogoAboutUs,
  SiberiaBrandInfo,
} from "components/atoms";
import siberiaLogo from "../../assets/images/siberiaLogo.png";
import aleksandr from "../../assets/images/aleksandr.jpg";
import { Footer } from "./Footer";
import ScrollToTopOnMount from "utils/scrollRestorationFix";

export const AboutUs = () => {
  return (
    <>
      <MainHeader isCart={true} />
      <ScrollToTopOnMount />
      <BackLinkAtom id={"backButton"} to={"/"} children={"Назад"} />
      <AboutUsBlock>
        <h1>О нас</h1>
        <AboutUsContainer>
          <SiberiaBrandInfo>
            <SiberiaLogoAboutUs src={siberiaLogo} />
            <p>
              <b>Бренд «SIBERIA organic» - это:</b>
            </p>
            <ul>
              <li>
                Снежинка, напоминающая нам о хрупкости экосистемы и одновременно
                ее устойчивости к суровым климатическим условиям Сибири
                (сибирские морозы и кристально чистый морозный воздух
                обеспечивают естественный отбор растений).
              </li>
              <li>
                Зеленый цвет логотипа, символизирующий бескрайние просторы дикой
                Сибирской тайги и полноводные чистые реки .
              </li>
            </ul>
            <p>
              В нашем логотипе, как и в продукции бренда «SIBERIA organic», нет
              ничего лишнего, только таежные дикоросы, только СИЛА СИБИРИ,
              доступная каждому!
            </p>
          </SiberiaBrandInfo>
        </AboutUsContainer>
        <ProductsText style={{ marginTop: "40px" }}>
          С 2019 года, объединившись в Органический кластер, разделяя принципы
          органического производства, мы создаем качественные продукты питания,
          косметику и биологические добавки.
        </ProductsText>
        <CeoWrapper>
          <CeoFigure>
            <CEOImage src={aleksandr} />
            <CeoName>
              Александр Граматунов, <br />
              Председатель совета Ассоциации &quot;Содействие производителям и
              переработчикам органической продукции Красноярского края&quot;
            </CeoName>
          </CeoFigure>
          <div className="bigQuote">
            <blockquote>
              <p>
                Величественные леса и бескрайние просторы Сибири, которые мы
                унаследовали от наших предков, являются источником несметных
                богатств. Эти земли, окутанные тайной и магией, дарят нам
                уникальные продукты, созданные самой природой. Наши предки их
                бережно хранили, брали только то, что было необходимо для
                поддержания жизни и здоровья, и передали нам эти ценности.
              </p>

              <p>
                Сибирь - это не просто территория, это место, где живут люди,
                которые любят и ценят свою землю. Здесь, в глубинах сибирских
                лесов, скрываются несметные богатства, которые могут принести
                счастье людям по всему миру.
              </p>

              <p>
                Наша миссия - обеспечить баланс, сохранить хрупкое равновесие
                между использованием этих богатств и сохранением природы в ее
                первозданном виде. Мы стремимся открыть эти богатства для всего
                человечества, предлагая продукты, которые воплощают силу и
                энергию сибирской земли.
              </p>

              <p>
                Наша продукция - это не просто товары, это часть нашего
                наследия, часть нашей души. Мы предлагаем вам продукты,
                созданные из натуральных ингредиентов. Это продукты, которые
                укрепляют иммунитет и дают живительную силу, продукты, которые
                воплощают в себе всю любовь к Сибирскому краю.
              </p>

              <p>
                Мы гордимся тем, что можем предложить вам эти уникальные
                продукты, и мы верим, что они смогут принести в вашу жизнь
                немного сибирской магии. Почувствуйте Сибирь! Откройте для себя
                её уникальность и неповторимость!
              </p>
            </blockquote>
          </div>
        </CeoWrapper>
      </AboutUsBlock>

      <Footer />
    </>
  );
};
