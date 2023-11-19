import styled from "styled-components";
import { Icon } from "../../Icon";

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  height: var(--header-height);
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background: #ffffff;
  box-shadow: 0 2px 4px #e1dfdf;
  z-index: 1099;

  @media screen and (max-width: 1023px) {
    padding: 0 20px;
    justify-content: space-between;
  }
`;

export const UserBlock = styled.div<{ isUserMenuOpened: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  position: relative;
  transition: height 1s;

  ${(props) =>
    props.isUserMenuOpened
      ? `
  background: #F8F9FF;
  box-shadow: 0px 2px 8px rgba(73, 73, 73, 0.2);
  border-radius: 20px;
  flex-direction: column;
  justify-content: flex-start;
  height: 80px;`
      : ""}

  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

export const UserBlockMobile = styled.div<{ isUserMenuOpened: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  position: relative;
  transition: height 1s;

  ${(props) =>
    props.isUserMenuOpened
      ? `
background: #F8F9FF;
box-shadow: 0px 2px 8px rgba(73, 73, 73, 0.2);
border-radius: 20px;
flex-direction: column;
justify-content: flex-start;
height: 80px;`
      : ""}

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

export const WrapperIcon = styled(Icon)`
  cursor: pointer;
  margin: 0 10px;
`;

export const UserName = styled.div`
  font-family: var(--body-font-family);
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-align: right;
  color: var(--main-text-color);

  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

export const UserLogout = styled.div`
  display: flex;
  padding: 10px;
  cursor: pointer;
`;

export const UserLogoutText = styled.div`
  font-family: var(--body-font-family);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: var(--main-text-color);
`;

export const InputSwitchWrapper = styled.div`
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

export const MobileMenu = styled.div`
  @media screen and (min-width: 1024px) {
    display: none;
  }
`;
