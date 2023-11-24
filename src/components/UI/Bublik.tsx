import {
  MainPageImage,
  MainPageImageContainer,
  Sale,
  SiberiaLogo,
  SiberiaText,
} from "components/atoms";
import snowFlake from "../../assets/images/snowFlake.png";
import alcenero from "../../assets/images/alcenero.jpg";
import React from "react";

export const Bublik = () => {
  return (
    <>
      <MainPageImageContainer>
        <MainPageImage src={alcenero} />
        <SiberiaLogo>
          <img src={snowFlake} alt="" width="200" height="200" />
        </SiberiaLogo>
        <SiberiaText>
          Siberia Organic <span>since 2021</span>
        </SiberiaText>
      </MainPageImageContainer>
    </>
  );
};
