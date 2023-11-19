import styled from "styled-components";

export const Sidebar = styled.aside<{ isOpen: boolean; isMobile: boolean }>`
  --sidebar-padding-x: 12px;
  --sidebar-width: 263px;
  --sidebar-full-width: 0 calc(var(--sidebar-padding-x) * -1);

  width: var(--sidebar-width);
  border-bottom: none;
  flex: 0 0 auto;
  background-color: var(--white);
  overflow: hidden;
  padding: 0;
  margin: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  height: ${(props) =>
    !props.isMobile || (props.isMobile && props.isOpen) ? "100vh" : "0%"};
  z-index: 2001;
  box-shadow: 0 0 20px rgba(122, 152, 255, 0.15);
  transition: width 0.2s linear;

  @media screen and (max-width: 1023px) {
    position: fixed;
    width: ${(props) =>
      !props.isMobile || (props.isMobile && props.isOpen) ? "97%" : "56px"};
    max-width: ${(props) =>
      !props.isMobile || (props.isMobile && props.isOpen) ? "97%" : "56px"};
    z-index: 100;
    top: 60px;
    left: 6px;
    padding-bottom: 60px;

    &::-webkit-scrollbar,
    &::-webkit-scrollbar {
      width: 2px;
    }
  }
`;

export const SidebarHead = styled.header<{
  isOpen: boolean;
  isMobile: boolean;
}>`
  width: var(--sidebar-width);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  height: var(--header-height);
  border-bottom: thin solid #e7e9eb;
  padding: 0 var(--sidebar-padding-x);
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  transition: width 0.2s linear;

  @media screen and (max-width: 1023px) {
    width: ${(props) =>
      !props.isMobile || (props.isMobile && props.isOpen) ? "97%" : "56px"};
    max-width: ${(props) =>
      !props.isMobile || (props.isMobile && props.isOpen) ? "96%" : "56px"};
    background-color: var(--white);
    top: 60px;
    left: ${(props) =>
      !props.isMobile || (props.isMobile && props.isOpen) ? "8px" : "-42px"};
    display: flex;
    justify-content: ${(props) =>
      !props.isMobile || (props.isMobile && props.isOpen)
        ? "flex-start"
        : "flex-end"};
    align-items: center;
    padding: 0;
  }
`;

export const SidebarFixedTop = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  margin-top: var(--header-height);
  padding: 0 var(--sidebar-padding-x);
  margin: 40px 0px 55px 0;
  top: 32px;
  height: 32px;
`;

export const SidebarScrollable = styled.div`
  padding: 0 var(--sidebar-padding-x);
  overflow: hidden scroll;
  height: 100vh;

  &::-webkit-scrollbar {
    width: 3.5px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d7dcdf;
    border-radius: 100px;
  }

  @media screen and (max-width: 1023px) {
    height: 77vh;
    &::-webkit-scrollbar {
      width: 2px;
    }
  }
`;
