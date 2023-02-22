import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./slices/productListSlice";
import productDetailsReducer from "./slices/productDetailsSlice";
import cartReducer from "./slices/cartSlice";
import userLoginReducer from "./slices/userLoginSlice";
import userRegisterReducer from "./slices/userRegisterSlice";
import userDetailsReducer from "./slices/userDetailsSlice";
import userUpdateReducer from "./slices/userUpdateSlice";

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
  },
});
