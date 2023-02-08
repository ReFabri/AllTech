import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./slices/productListSlice";
import productDetailsReducer from "./slices/productDetailsSlice";

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    orders: "",
    users: "",
  },
});
