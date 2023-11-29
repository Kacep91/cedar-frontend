import { ProductPresentationWrapper, ProductPresentationHeader, ProductPresentationHeaderImage, DecriptionBlock, ProductPresentationDescriptionWrapper } from "components/atoms"
import { BackLinkAtom } from "./BackLink"
import { Footer } from "./Footer"
import MainHeader from "./MainHeader"
import honey1 from "../../assets/images/honey1.jpg";

export const Honey = () => {

    return <>
        <MainHeader isCart={false} />
        <BackLinkAtom to={"/"} children={"Назад"} />

        <div>
            <h1 style={{ textAlign: "center", margin: '60px 0' }}>Сибирский мёд</h1>
        </div>
        <ProductPresentationWrapper>
            <ProductPresentationHeader>
                <ProductPresentationHeaderImage
                    src={
                        honey1
                    }
                />
                <DecriptionBlock>Сибирский мед - это уникальный продукт, который отличается своими вкусовыми качествами, питательной ценностью и полезными свойствами.
                    Сибирский мед обладает насыщенным и плотным вкусом с мягким долгим послевкусием</DecriptionBlock>
            </ProductPresentationHeader>
            <ProductPresentationDescriptionWrapper>
                <ol className={"gradient-list"}>
                    <li>Сибирский мед богат питательными веществами. Он содержит витамины группы В, витамины А и С, а также множество минералов, включая марганец, хром, медь, цинк, бор, натрий, йод, железо и другие</li>

                    <li>Гречишный мед, например, является питательным и целебным продуктом, который отличается особенно богатым и насыщенным вкусом</li>


                    <li>Сибирский мед также обладает рядом полезных свойств. Он оказывает противовоспалительное, противомикробное и антивирусное действие</li>

                    <li>Благотворно влияет на общее состояние организма, оказывает успокаивающее действие, благотворно влияет на работу органов ЖКТ</li>

                    <li>Рекомендован при больших физических нагрузках и умственном перенапряжении</li>

                    <li>Цвет сибирского меда варьируется от светло-коричневого  до насыщенного от янтарно-красного до темно-янтарного</li>
                    <li>Сибирский мед - это эксклюзивный мед, собранный в одной из самых диких частей сибирской тайги</li>

                    <li>Эти отдаленные леса содержат разнообразные эндемичные растения и цветы, что придает меду уникальный вкус и аромат</li>


                    <li>Сибирский мед - это не только вкусный и питательный продукт, но и ценный источник витаминов и минералов, который может стать отличным дополнением к вашему рациону.</li>

                </ol>
            </ProductPresentationDescriptionWrapper>
        </ProductPresentationWrapper>
        <Footer />
    </>
}