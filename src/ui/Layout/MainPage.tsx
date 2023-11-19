import React, { ReactNode } from "react";
import { useGlobalContext } from "utils/globalContext";
import { MainPageAtom } from "./atoms";
import MainWrapper from "./MainWrapper";

type ProtectedPageProps = {
  children: ReactNode;
};

const MainPage = ({ children }: ProtectedPageProps) => {
  const { isMenuOpened } = useGlobalContext();
  return (
    <MainWrapper>
      <MainPageAtom isMenuOpened={isMenuOpened}>{children}</MainPageAtom>
    </MainWrapper>
  );
};

export default MainPage;
