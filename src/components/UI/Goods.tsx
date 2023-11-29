import React from "react";
import { Bublik } from "./Bublik";
import MainHeader from "./MainHeader";
import { GoodsBlock } from "./GoodsBlock";
import { ProductPresentationPage } from "./ProductPresentationPage";

export const Goods = () => {
  return (
    <>
      <MainHeader isCart={true} />
      <GoodsBlock />
      {/* <ProductPresentationPage /> */}
    </>
  );
};
// data={{
//   "id": "ca12c793-5a39-4405-b836-6b6f035ed9b2",
//   "name": "Варенье с черникой и кедровым орехом",
//   "volume": "100 мл",
//   "price": 499,
//   "oldPrice": undefined,
//   "isSale": false,
//   "isHit": false,
//   "isNew": true,
//   "reviews": 72,
//   "image": null,
//   "description": {
//     "name": "Варенье с черникой и кедровым орехом",
//     "volume": "100 мл",
//     "dueDate": "12 месяцев, при температуре от 5С до 25С и относительной влажности воздуха не более 75%",
//     "package": "стеклобанка",
//     "minRequest": "100 штук",
//     "description": "Обладает общеукрепляющим и противовоспалительным действием,снижает артериальное давление,борется с анемией,нормализует работу пищеварительного тракта и улучшает состояние сосудов.",
//     "ingridients": "Сахар, сосновый сироп, вода, плоды черники, кедровый орех.",
//     "companyManufacturer": "ИП Комаров А. А.",
//     "priceForUnitWithVAT": 348,
//     "priceForUnitWithoutVAT": 290
//   },
// }}
