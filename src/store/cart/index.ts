import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getSavedCartInfo } from "../../utils/localStorageHelper";
import { ProductCardType } from "components/UI/types";

export type CartState = {
  isLoading: boolean;
  list: ProductCardType[];
};

export const initialState: CartState = {
  isLoading: false,
  list: getSavedCartInfo() || [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state) => {
      localStorage.setItem("cartInfo", "[]");
      return {
        ...state,
        isLoading: false,
        list: [],
      };
    },
    setLoadingList: (state, action: PayloadAction<boolean>) => {
      const value = action.payload;

      return {
        ...state,
        isLoading: value,
      };
    },
    setItem: (state, action: PayloadAction<ProductCardType>) => {
      const item = action.payload;
      const isItemInList = state.list.find((item2) => item2.id === item.id);
      const listWithoutItem = state.list.filter(
        (item2) => item2.id !== item.id
      );
      const result = isItemInList ? { ...isItemInList, ...item } : { ...item };

      return {
        ...state,
        list: [...listWithoutItem, result],
      };
    },
    deleteItem: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const listWithoutItem = [...state.list].filter(
        (item2) => item2.id !== id
      );

      return {
        ...state,
        list: [...listWithoutItem],
      };
    },
  },
});

export const CartActions = { ...cartSlice.actions };

export const CartSelectors = {
  isLoading: (state: RootState) => state.cart.isLoading,
  list: (state: RootState) => state.cart.list,
};
