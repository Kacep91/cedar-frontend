import { Button } from "primereact/button";
import styled from "styled-components";
import smallBg from "../assets/images/smallBg.jpg";
import clipart from "../assets/images/clipart.png";
import { Image } from "primereact/image";
import { BackLink } from "./UI/BackLink";

export const Header = styled.div<{ isMobileMenuOpened: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  height: auto;
  gap: 10px;
  justify-content: center;

  @media screen and (max-width: 1400px) {
    transition: all 0.2s;
  }

  @media screen and (max-width: 1060px) {
    position: absolute;
    top: 0;
    left: 0;
    display: ${(props) => (props.isMobileMenuOpened ? "flex" : "none")};
    flex-wrap: wrap;
    max-width: 100vw;
    padding: 0;
    height: 100vh;
    width: 100vw;
    background-color: white;
    z-index: 12;
  }
`;

export const MenuHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  height: auto;
  gap: 10px;
  align-items: center;
  gap: 10px;
  transition: all 0.2s;

  @media screen and (max-width: 1400px) {
    transition: all 0.2s;
  }

  @media screen and (max-width: 1060px) {
    padding: 10px 20px;
    align-items: center;
    gap: 5px;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 10px;
  }
`;

export const SortingHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  height: auto;
  gap: 10px;
  background-color: #56af31;

  @media screen and (max-width: 1060px) {
    padding: 10px 20px;
  }
`;

export const NavigationWrapper = styled.div<{ isOnTop?: boolean }>`
  top: 0;
  position: ${(props) => (props.isOnTop ? "fixed" : "sticky")};
  width: 100%;
  z-index: 997;
`;

export const NavigationHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  z-index: 998;

  @media screen and (max-width: 1400px) {
    transition: all 0.2s;
  }

  @media screen and (max-width: 1060px) {
    padding: 10px 20px;
  }
`;

export const MenuDropdownContent = styled.div`
  display: none;
  transition: all 0.5s;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 3;

  a {
    padding: 10px 25px;
    line-height: 1.25;
    text-decoration: none;
    color: #585757;
    border-radius: 15px;
  }

  a:hover {
    background-color: #439646;
    width: 100%;
    color: white;
    transition: all 0.2s;
  }
`;

export const MenuButton = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  font-size: 16px;
  border: none;
  border-radius: 15px;
  text-transform: uppercase;

  img {
    font-size: 12px;
    width: 16px;
  }

  @media screen and (min-width: 1155px) and (max-width: 1500px) {
    font-size: 14px;
    padding: 8px;
  }

  @media screen and (max-width: 1155px) {
    font-size: 12px;
    padding: 8px;
  }
`;

export const MenuButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  border-radius: 15px;

  &:hover ${MenuDropdownContent} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-radius: 15px;
  }

  &:hover ${MenuButton} {
    border-radius: 15px;
    color: #585757;
    text-decoration: underline;
  }
`;

export const GoodsButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 8px;
  padding: 8px;
  font-size: 16px;
  height: 40px;
  border: none;
  border-radius: 15px;
  transition: all 0.2s;

  &:hover {
    transition: all 0.2s;
    font-size: 20px;
    text-decoration: underline;
    img {
      transition: all 0.2s;
      font-size: 18px;
      width: 22px;
      margin-right: 5px;
    }
  }

  img {
    transition: all 0.2s;
    font-size: 12px;
    width: 16px;
    margin-right: 5px;
  }

  @media screen and (max-width: 1060px) {
    margin: 4px;
    padding: 4px;
    font-size: 14px;
    height: 36px;

    img {
      transition: all 0.2s;
      font-size: 12px;
      width: 12px;
      margin-right: 5px;
    }

    &:hover {
      transition: all 0.2s;
      font-size: 16px;
      text-decoration: underline;

      img {
        transition: all 0.2s;
        font-size: 14px;
        width: 14px;
        margin-right: 5px;
      }
    }
  }
`;

export const SmallBackground = styled.div`
  background-image: url(${smallBg});
  height: 500px;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
`;

export const ItemListWrapper = styled.div`
  width: 100%;
  min-height: 400px;
`;

export const ItemListContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin: 20px auto;
  justify-content: center;
  max-width: 1550px;
`;
export const ProductCard = styled.div`
  position: relative;
  width: auto;
  padding: 20px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  cursor: pointer;
  outline: none;
  border-radius: 0px;
  transition: all 0.1s;
  border-bottom: thin solid grey;

  &:hover {
    outline: thin solid grey;
    transition: all 0.2s;
    border-bottom: none;
    border-radius: 25px;
  }
`;
export const ProductImage = styled(Image)`
  width: 250px;
  height: 250px;
  margin: 20px auto;
`;
export const ProductHeader = styled.div`
  font-size: 18px;
  display: flex;
  margin: 5px 0px;
  color: black;
  flex-wrap: wrap;
  max-width: 250px;
`;
export const ProductWeight = styled.div`
  font-size: 18px;
  color: black;
  margin-top: 5px;
`;
export const ProductReviews = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 5px 0px;
`;
export const ProductReviewsText = styled.div`
  font-size: 14px;
  color: black;
  margin-left: 5px;
`;
export const ProductBuySection = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0px;
  padding-top: 20px;
  width: 100%;
`;
export const ProductOldPrice = styled.div`
  position: absolute;
  top: 5px;
  left: 0px;
  .price {
    position: relative;
    display: inline-block;
    color: #9d9d9d;
    font-size: 16px;
  }

  .price::before {
    content: "";
    position: absolute;
    top: 47%;
    left: -4px;
    right: 11px;
    height: 1px;
    background: #9d9d9d;
    transform: rotate(-13deg);
  }
`;
export const ProductNewPrice = styled.div<{ isOldPrice: boolean }>`
  color: ${(props) => (props.isOldPrice ? "red" : "black")};
  font-size: 22px;
  font-weight: bold;
`;
export const ProductBuyButton = styled.div<{ isDelete?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 120px;
  width: 120px;
  outline: thin solid black;
  border-radius: 15px;
  padding: 10px 10px;
  transition: all 0.2s;

  &:hover {
    outline: none;
    transition: all 0.2s;
    background-color: ${(props) => (props.isDelete ? "red" : "#37a26e")};
    color: white;
    i {
      color: white !important;
    }
  }
`;

export const PersonalDataAgreement = styled.p`
  text-align: center;
  font-size: 12px;
  font-style: italic;
  max-width: 300px;
  margin: 10px auto;
`;

export const BackLinkAtom = styled(BackLink)`
  margin-left: 0 !important;
  position: fixed;
  top: 20px;
  z-index: 9999;
  left: 20px;
`;

export const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 0 20px;
`;

export const CheckOrderWrapper = styled.div`
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  box-shadow:
    0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14),
    0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  width: 100%;
  padding: 20px;
`;

export const CheckOrderHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const OrderConfirmWrapper = styled.div`
  border-radius: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  box-shadow:
    0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14),
    0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  width: 100%;
  padding: 20px;
`;

export const OrderConfirmForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 500px;

  @media screen and (max-width: 1060px) {
    width: 100%;
  }
`;

export const OrderSummaryWrapper = styled.div``;

export const RadioGroup = styled.div<{ isMobile?: boolean }>`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  width: 100%;
`;

export const OrderListItem = styled.div`
  display: grid;
  width: 100%;
  padding: 20px;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 100%;
  gap: 20px;
  align-items: center;

  @media screen and (max-width: 1060px) {
    display: grid;
    width: 100%;
    padding: 0px;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    align-items: center;
    grid-template-rows: 40% 40% 20%;
  }
`;

export const OrderListImage = styled.img`
  width: 100px;
  height: 100px;
  box-shadow:
    0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14),
    0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
`;

export const OrderListName = styled.div`
  display: flex;
  flex-direction: column;
  position: "relative" span {
    font-weight: bold;
  }
`;

export const OrderListPrice = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: bold;
  position: relative;
`;

export const OrderListTotal = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: bold;
  position: relative;
`;
export const OrderListHeaders = styled.div`
  display: grid;
  width: 100%;
  padding: 20px;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  grid-template-rows: 100%;
  gap: 20px;
  align-items: center;
`;

export const OrderListCustom = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 15px;
  width: 100%;
  @media screen and (max-width: 1060px) {
    gap: 80px;
  }
`;

export const ToastWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  cursor: pointer;
`;

export const ToastHeader = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;
export const ToastText = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const ToastLink = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-decoration: underline;

  &::after {
    content: "→";
  }
`;

export const RadioButtonWrapper = styled.div`
  position: relative;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  outline: thin solid grey;
  padding: 20px;
  border-radius: 15px;
  cursor: pointer;
  width: 100%;

  .p-radiobutton.p-component {
    display: flex;
  }
`;

export const RadioButtonText = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
`;

export const MainPageImageContainer = styled.div`
  max-width: 100%;
  height: 970px;
  transition: height 1s;
  position: relative;
`;
export const MainPageImage = styled.img`
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
`;

export const SiberiaLogo = styled.div`
  font-size: 4rem;
  font-weight: 500;
  left: 50%;
  position: absolute;
  text-align: center;
  top: 50%;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  z-index: 1;
  height: 6.81em;
  width: 6.81em;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 50%;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  }
`;

export const SiberiaText = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 2rem;
  font-weight: 500;
  left: 50%;
  position: absolute;
  text-align: center;
  top: 62%;
  width: 230px;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-shadow: 1px 1px 2px black;
`;

export const Sale = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #212121;
  height: 26px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #454545;
  }
`;

export const AdditionalInfoWrapper = styled.div<{ isOpened?: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 40px;
  padding: 20px;
  min-height: 340px;
  height: 100%;
  transition: all 0.5s;
  transform: ${(props) =>
    props.isOpened ? "translate3d(0,7%,0)" : "translate3d(0,20%,0)"};
  position: absolute;
  opacity: ${(props) => (props.isOpened ? 1 : 0)};
  background-color: #ffffff;
  top: 92px;
  left: 0;
  padding: 0 120px;
  z-index: 999;
`;

export const InfoCardHeader = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const InfoCardImage = styled.img`
  width: 308px;
  height: 175px;
  object-fit: cover;
  border-radius: 15px;
`;
export const InfoCardText = styled.div`
  font-size: 20px;
  max-width: 298px;
  line-height: 25px;
  padding: 10px;
  text-shadow: 1px 1px 2px white;
`;

export const AboutUsBlock = styled.div`
  margin-top: 20px;
  padding: 0 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  h1 {
    margin: 40px 0;
  }
`;

export const AboutUsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const AboutUsImage = styled.img`
  width: 655px;
  height: 655px;
  object-fit: cover;
  border-radius: 15px;
`;
export const ProductPageImage = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 15px;
`;

export const AboutUsText = styled.div`
  font-size: 2rem;
  margin: 20px 0;
`;

export const AboutUsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 40px;
  z-index: 2;
`;

export const Branch = styled.img`
  height: 25vh;
  left: -258px;
  max-height: 500px;
  max-width: none;
  position: absolute;
  top: 173px;
  -webkit-transform: translate3d(-45%, 0, 0);
  transform: translate3d(-45%, 0, 0);
  width: auto;
  transform: rotate(-87deg);
`;

export const ProductsBlock = styled.div`
  margin-top: 20px;
  padding: 0 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  h1 {
    margin: 40px 0;
  }
`;
