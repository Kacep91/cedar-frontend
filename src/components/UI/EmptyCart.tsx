import {
  EmptyCartIcon,
  EmptyCartGoodsButton,
  EmptyCartText,
  EmptyCartWrapper,
} from "components/atoms";
import emptyCart from "../../assets/images/emptyCart.png";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";

export const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <EmptyCartWrapper>
      <EmptyCartIcon src={emptyCart} />
      <EmptyCartText>
        В корзине ничего нет, выберите товар и добавьте его в корзину
      </EmptyCartText>
      <EmptyCartGoodsButton
        text
        rounded
        raised
        onClick={() => navigate("/goods")}
      >
        Товары
      </EmptyCartGoodsButton>
    </EmptyCartWrapper>
  );
};
