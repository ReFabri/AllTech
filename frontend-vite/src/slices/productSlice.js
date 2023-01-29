import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
2;

const initialState = {
  products: [],
  loading: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productList: (state) => state,
    productListRequest: (state) => {
      return { loading: true, products: [] };
    },
    productListSuccess: (state, action) => {
      return { loading: false, products: action.payload };
    },
    productListFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

export const listProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(productActions.productListRequest());
      const { data } = await axios.get("/api/products");
      dispatch(productActions.productListSuccess(data));
    } catch (error) {
      dispatch(
        productActions.productListFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export const productActions = productSlice.actions;

export default productSlice.reducer;
