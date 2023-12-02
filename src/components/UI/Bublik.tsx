import { MainPageImage, MainPageImageContainer } from "components/atoms";
import alcenero from "../../assets/images/alcenero2.jpg";
import React from "react";

export const Bublik = () => {
  return (
    <>
      <MainPageImageContainer>
        <MainPageImage src={alcenero} />
      </MainPageImageContainer>
    </>
  );
};
