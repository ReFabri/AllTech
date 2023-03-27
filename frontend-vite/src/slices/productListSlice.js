import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
};

export const productListSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productList: (state) => state,
    productListRequest: (state) => {
      return { loading: true, products: [] };
    },
    productListSuccess: (state, action) => {
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    },
    productListFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

export const listProducts = (keyword = "", pageNumber = "") => {
  return async (dispatch) => {
    try {
      dispatch(productListActions.productListRequest());
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch(productListActions.productListSuccess(data));
    } catch (error) {
      dispatch(
        productListActions.productListFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export const productListActions = productListSlice.actions;
export default productListSlice.reducer;
