import React from "react";
import MainHeader from "./MainHeader";
import { GoodsBlock } from "./GoodsBlock";

export const Goods = () => {
  return (
    <>
      <MainHeader isCart={true} />
      <GoodsBlock />
    </>
  );
};
