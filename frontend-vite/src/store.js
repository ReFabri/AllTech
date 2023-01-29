import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    orders: "",
    users: "",
  },
});
