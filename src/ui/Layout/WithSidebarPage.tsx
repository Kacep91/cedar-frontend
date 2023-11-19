import React, { ReactNode } from "react";
import { WithSidebarWrapper } from "./atoms";
import MainWrapper from "./MainWrapper";
import { useGlobalContext } from "utils/globalContext";

type ProtectedPageProps = {
  children: ReactNode;
};

const WithSidebarPage = ({ children }: ProtectedPageProps) => {
  const { isMenuOpened, isAttributesOpened } = useGlobalContext();
  return (
    <MainWrapper isOpen={isAttributesOpened}>
      <WithSidebarWrapper isMenuOpened={isMenuOpened}>
        {children}
      </WithSidebarWrapper>
    </MainWrapper>
  );
};

export default WithSidebarPage;
