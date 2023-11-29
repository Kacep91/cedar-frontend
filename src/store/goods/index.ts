import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ProductPresentationPageProps } from "components/UI/ProductPresentationPage";

export type GoodsState = {
  isLoading: boolean;
  goodsList: ProductPresentationPageProps[];
};

export const initialState: GoodsState = {
  isLoading: false,
  goodsList: [],
};

export const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        isLoading: false,
        goodsList: [],
      };
    },
    setGoods: (
      state,
      action: PayloadAction<ProductPresentationPageProps[]>
    ) => {
      console.log("action.payload", action.payload);

      return {
        ...state,
        goodsList: action.payload,
      };
    },
  },
});

export const GoodsActions = { ...goodsSlice.actions };

export const GoodsSelectors = {
  isLoading: (state: RootState) => state.goods.isLoading,
  goodsList: (state: RootState) => state.goods.goodsList,
};
