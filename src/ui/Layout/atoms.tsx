import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { BackLinkAtom } from "./Header/BackLink";

type Props = {
  isMenuOpened?: boolean;
  children: ReactNode;
  className?: string;
};

const withIsMenuOpened = (tagName: string): any =>
  styled(({ isMenuOpened, className, children, ...rest }) => {
    const C = tagName as unknown as FC<Props>;
    return (
      <C className={className} {...rest}>
        {children}
      </C>
    );
  });

export const Wrapper = styled.div<{ isMobile?: boolean; isOpen?: boolean }>`
  display: flex;
  width: auto;
  height: 100vh;
  position: relative;
  font-family: var(--body-font-family);
  font-size: 16px;

  @media screen and (max-width: 1023px) {
    overflow-y: ${(props) =>
      props.isMobile && props.isOpen ? "hidden" : "auto"};
  }
`;

export const NavWrapper = withIsMenuOpened("div")`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.isMenuOpened ? "226px" : "54px")};
  background: var(--gradient-dark-blue);
  border-radius: 0px 8px 8px 0px;
  z-index: 2001;
  transition: width 0.5s;
  height: 100vh;
  position: fixed;
  
  
  @media screen and (max-width:1023px) {
    width: ${(props) => (props.isMenuOpened ? "100%" : "0px")};
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: none;
  }
`;

export const NavWrapperMobile = withIsMenuOpened("div")`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.isMenuOpened ? "226px" : "54px")};
  background: var(--gradient-dark-blue);
  border-radius: 0px 8px 8px 0px;
  z-index: 2001;
  transition: width 0.5s;
  height: 100vh;
  position: fixed;


@media screen and (max-width:1023px) {
  width: ${(props) => (props.isMenuOpened ? "100%" : "0px")};
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
`;

export const NavTop = withIsMenuOpened("div")`
  background: #241d52;
  border-radius: 0px 8px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${(props) =>
    props.isMenuOpened
      ? `padding: 16.5px 20px 16.5px 25px`
      : `padding: 20px 20px`};
`;

export const NavOptions = withIsMenuOpened("div")`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;

  ${(props) =>
    props.isMenuOpened ? `margin: 30px 0px 0px 0px;` : `margin: 30px 0px;`}
    @media screen and (max-width: 1023px) {
      margin: 0px !important;
    }
    `;

export const NavOption = styled(({ isMenuOpened, ...props }) => (
  <NavLink {...props} />
))`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: var(--body-font-family);
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  padding: ${(props) => (props.isMenuOpened ? "12px 0px" : "12px 5px")};
  cursor: pointer;
  text-decoration: none;
  color: var(--white);
  
  &:hover, 
  &:visited {
    color: var(--white);
  }


  &.active {
  ${(props) =>
    props.isMenuOpened
      ? `
    display: flex;
    align-items: center;
    padding: 12px 0px;
    background: linear-gradient(90deg, #6152FF 0%, #978DFF 100%);
    box-shadow: 0px 2px 12px rgba(115, 103, 240, 0.5);
    border-radius: 10px 0px 0px 10px;
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
  `
      : `
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -10px;
    margin-right: -10px;
    padding: 6px 10px 6px 10px;

    background: linear-gradient(90deg, #6152FF 0%, #978DFF 100%);
    box-shadow: 0px 2px 12px rgba(115, 103, 240, 0.5);
    border-radius: 0px 0px 0px 0px;
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;

    & > span {
      margin-right: 8px !important;
      margin-left: 5px !important;      
    }
  `}
  
  &:not(.active) {
    ${(props) =>
      !props.isMenuOpened
        ? `
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 0px;
    border-radius: 90px;
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;

    & > img {
      margin: 0;
    }
  `
        : ``}
  }
`;

export const NavOptionBadge = styled.img`
  margin-left: 4px;
`;

export const NavTitle = styled.div`
  font-family: var(--body-font-family);
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0.01em;
  color: #ffffff;
`;

export const MainPageAtom = withIsMenuOpened("div")`
  padding: ${(props) =>
    props.isMenuOpened ? "90px 40px 40px 266px" : "90px 40px 40px 100px"};
  width: 100%;
  background-color: var(--main-bg-color);
  min-height: 100vh;
  height: fit-content;
  transition: padding 0.5s;

  
  @media screen and (max-width:1023px) {
    padding: 80px 20px 20px 20px;
  }
`;

export const WithSidebarWrapper = withIsMenuOpened("div")`
  padding: ${(props) => (props.isMenuOpened ? "0 0 0 226px" : "0 0 0 54px")};
  width: 100%;
  background-color: var(--main-bg-color);
  min-height: 100vh;
  height: fit-content;
  transition: padding 0.5s;
  display: grid;
  grid-template-columns: 266px auto;
  align-items: flex-start;

  @media screen and (max-width: 650px) {
   display: flex;
       align-items: center;
    justify-content: flex-start;
  }
  @media screen and (max-width: 1023px) {
  padding: ${(props) => (props.isMenuOpened ? "0 0 0 226px" : "0 0 0 0px")};   
  }
`;

export const WithSidebarMain = styled.div`
  display: grid;
  grid-template-columns: auto 273px;
  align-items: flex-start;

  ${BackLinkAtom} {
    position: fixed;
    height: var(--header-height);
    z-index: 2001;
  }

  ${BackLinkAtom} + * {
    margin-top: var(--header-height);
  }

  @media screen and (max-width: 650px) {
    display: flex;
    flex-direction: column;
  }

  @media screen and (max-width: 1023px) {
    ${BackLinkAtom} {
      z-index: 1100;
    }
  }
`;

export const WithSidebarRight = styled.div`
  overflow: hidden auto;
  height: 100vh;
  background-color: var(--white);
  box-shadow: 0 0 20px rgba(122, 152, 255, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: calc(var(--header-height) + 50px) 20px 20px;

  @media screen and (max-width: 650px) {
    height: 150px;
    width: 100vw;
    padding: 20px;
    position: fixed;
    bottom: 0;
  }

  @media screen and (max-width: 1023px) {
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0px;
    }
  }
`;

export const WithSidebarContent = styled.div`
  max-height: calc(100vh - var(--header-height));
  overflow: hidden auto;
  padding: 40px;
  height: 100vh;

  @media screen and (max-width: 650px) {
    width: 100vw !important;
  }

  @media screen and (max-width: 1023px) {
    padding: 75px 20px 20px 20px;
    overflow-x: hidden;
    width: calc(100vw - 273px);
  }
`;

export const SegmentTitle = styled.div`
  font-family: "IBM Plex Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.24px;
  text-transform: uppercase;
  color: #939a9e;
`;

export const SegmentSubtitle = styled.div`
  font-family: "IBM Plex Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  text-align: left;
  letter-spacing: 0.26px;
  color: #939a9e;
  margin-bottom: 25px;
`;

export const HeadingEditable = styled.div`
  font-family: var(--heading-font-family);
  font-style: normal;
  font-size: 28px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0.36px;
  margin: 0px;
  color: var(--main-text-color);
  outline: none;
`;
