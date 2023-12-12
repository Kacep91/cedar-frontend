import {
  MainPageImage,
  MainPageImageContainer,
  SiberiaLogo,
  SiberiaLogoWrapper,
} from "components/atoms";
import alcenero from "../../assets/images/alcenero2.jpg";
import alceneroNoLogo from "../../assets/images/alceneroNoLogo.jpg";
import nologo3 from "../../assets/images/nologo3.png";
import siberiaLogo from "../../assets/images/siberiaLogo.png";
import React from "react";
import { useScreenSize } from "utils/hooks";

export const Bublik = () => {
  const isMobile = useScreenSize("smallTablet");
  return (
    <>
      <MainPageImageContainer height={window?.innerHeight}>
        <MainPageImage
          src={isMobile ? nologo3 : alcenero}
          height={window?.innerHeight}
        />
        <SiberiaLogoWrapper>
          <SiberiaLogo src={siberiaLogo} />
        </SiberiaLogoWrapper>
      </MainPageImageContainer>
    </>
  );
};
