import { combineReducers } from "redux";
import { authSlice } from "./auth";
import { cartSlice } from "./cart";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  cart: cartSlice.reducer,
});
