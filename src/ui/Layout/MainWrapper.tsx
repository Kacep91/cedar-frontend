import React, { ReactNode } from "react";
import { Header } from "./Header";
import { Nav } from "./Nav";
import { Wrapper } from "./atoms";
import "rc-tooltip/assets/bootstrap.css";
import { useScreenSize } from "utils/hooks";

type MainWrapperProps = {
  children?: ReactNode;
  isOpen?: boolean;
};

const MainWrapper = ({ children, isOpen }: MainWrapperProps) => {
  const isMobile = useScreenSize("mobile");
  return (
    <Wrapper isMobile={isMobile} isOpen={isOpen}>
      <Header />
      <Nav />
      {children}
    </Wrapper>
  );
};

export default MainWrapper;
