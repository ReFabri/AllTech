import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { products: [] };

const productTopSlice = createSlice({
  name: "productTop",
  initialState,
  reducers: {
    productTopRequest: (state) => {
      return { loading: true, products: [] };
    },
    productTopSuccess: (state, action) => {
      return { loading: false, products: action.payload };
    },
    productTopFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

export const listTopProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(productTopActions.productTopRequest());

      const { data } = await axios.get("/api/products/top");
      dispatch(productTopActions.productTopSuccess(data));
    } catch (error) {
      dispatch(
        productTopActions.productTopFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export default productTopSlice.reducer;
export const productTopActions = productTopSlice.actions;
