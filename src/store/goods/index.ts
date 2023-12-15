import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ProductPresentationPageProps } from "components/UI/ProductPresentationPage";

export type Recipe = {
  id: string;
  name: string;
  ingridients: string;
  instructions: string;
  image: string;
  video: string;
  tags: string;
};

export type Slide = {
  id: string;
  image: string;
  video: string;
};

export type Partner = {
  id: string;
  name: string;
  userRegionOrCity: string;
  userPatronymic: string;
  userSurname: string;
  userTradeType: string;
  userPhone: string;
  userEmail: string;
  userMessage: string;
};

export type Catalogue = {
  id: string;
  name: string;
  userEmail: string;
};

export type GoodsState = {
  isLoading: boolean;
  goodsList: ProductPresentationPageProps[];
  categorizedProducts: {
    label: string;
    items: ProductPresentationPageProps[];
  }[];
  recipesList: Recipe[];
  slidesList: Slide[];
  partnersList: Partner[];
  catalogueList: Catalogue[];
};

export const initialState: GoodsState = {
  isLoading: false,
  goodsList: [],
  categorizedProducts: [],
  recipesList: [],
  slidesList: [],
  partnersList: [],
  catalogueList: [],
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
      return {
        ...state,
        goodsList: action.payload,
      };
    },
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      return {
        ...state,
        recipesList: action.payload,
      };
    },
    setSlides: (state, action: PayloadAction<Recipe[]>) => {
      return {
        ...state,
        slidesList: action.payload,
      };
    },
    setPartners: (state, action: PayloadAction<Partner[]>) => {
      return {
        ...state,
        partnersList: action.payload,
      };
    },
    setCatalogue: (state, action: PayloadAction<Catalogue[]>) => {
      return {
        ...state,
        catalogueList: action.payload,
      };
    },
    setCategorizedData: (
      state,
      action: PayloadAction<
        { label: string; items: ProductPresentationPageProps[] }[]
      >
    ) => {
      return {
        ...state,
        categorizedProducts: action.payload,
      };
    },
  },
});

export const GoodsActions = { ...goodsSlice.actions };

export const GoodsSelectors = {
  isLoading: (state: RootState) => state.goods.isLoading,
  goodsList: (state: RootState) => state.goods.goodsList,
  categorizedProducts: (state: RootState) => state.goods.categorizedProducts,
  recipesList: (state: RootState) => state.goods.recipesList,
  slidesList: (state: RootState) => state.goods.slidesList,
  partnersList: (state: RootState) => state.goods.partnersList,
  catalogueList: (state: RootState) => state.goods.catalogueList,
};
