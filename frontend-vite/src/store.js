import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./slices/productListSlice";
import productDetailsReducer from "./slices/productDetailsSlice";
import cartReducer from "./slices/cartSlice";
import userLoginReducer from "./slices/userLoginSlice";
import userRegisterReducer from "./slices/userRegisterSlice";
import userDetailsReducer from "./slices/userDetailsSlice";
import userUpdateReducer from "./slices/userUpdateSlice";
import userUpdateProfileReducer from "./slices/userUpdateProfileSlice";
import userListReducer from "./slices/userListSlice";
import userDeleteReducer from "./slices/userDeleteSlice";
import orderReducer from "./slices/orderSlice";
import productDeleteReducer from "./slices/productDeleteSlice";
import productCreateReducer from "./slices/productCreateSlice";
import productUpdateReducer from "./slices/productUpdateSlice";
import productCreateReviewReducer from "./slices/productCreateReviewSlice";
import productTopReducer from "./slices/productTopSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    userLogin: userLoginReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    userDetails: userDetailsReducer,
    userRegister: userRegisterReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDelete: userDeleteReducer,
    productReview: productCreateReviewReducer,
    productTop: productTopReducer,
  },
});
