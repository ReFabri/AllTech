import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : { address: "", city: "", postalCode: "", country: "" };

const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartItems: (state) => state,
    cartAddItem: (state, action) => {
      const item = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (x) => x.productId === item.productId
      );

      if (itemIndex !== -1) {
        state.cartItems[itemIndex] = item;
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    cartRemoveItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
    },
    cartSaveShippingAddress: (state, action) => {
      return { ...state, shippingAddress: action.payload };
    },
    cartSavePaymentMethod: (state, action) => {
      return { ...state, paymentMethod: action.payload };
    },
  },
});

export const addToCart = (id, qty) => {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
    const item = {
      productId: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    };
    dispatch(cartActions.cartAddItem(item));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const removeFromCart = (id) => {
  return async (dispatch, getState) => {
    dispatch(cartActions.cartRemoveItem(id));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const saveShippingAddress = (data) => {
  return async (dispatch) => {
    dispatch(cartActions.cartSaveShippingAddress(data));
    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };
};

export const savePaymentMethod = (data) => {
  return async (dispatch) => {
    dispatch(cartActions.cartSavePaymentMethod(data));
    localStorage.setItem("paymentMethod", JSON.stringify(data));
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
