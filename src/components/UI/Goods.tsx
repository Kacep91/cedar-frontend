import React from "react";
import MainHeader from "./MainHeader";
import { GoodsBlock } from "./GoodsBlock";
import { ScrollTop } from "primereact/scrolltop";

export const Goods = () => {
  return (
    <>
      <MainHeader isCart={true} />
      <GoodsBlock />
      <ScrollTop />
    </>
  );
};
