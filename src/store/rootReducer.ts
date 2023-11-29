import { combineReducers } from "redux";
import { authSlice } from "./auth";
import { cartSlice } from "./cart";
import { goodsSlice } from "./goods";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  cart: cartSlice.reducer,
  goods: goodsSlice.reducer,
});
