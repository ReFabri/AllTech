import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: {},
};

const productUpdateSlice = createSlice({
  name: "productUpdate",
  initialState,
  reducers: {
    productUpdateRequest: (state) => {
      return { loading: true };
    },
    productUpdateSuccess: (state, action) => {
      return { loading: false, success: true, product: action.payload };
    },
    productUpdateFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
    productUpdateReset: (state) => {
      return { product: {} };
    },
  },
});

export const updateProduct = (product) => {
  return async (dispatch, getState) => {
    try {
      dispatch(productUpdateActions.productUpdateRequest());

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        config
      );
      dispatch(productUpdateActions.productUpdateSuccess(data));
    } catch (error) {
      dispatch(
        productUpdateActions.productUpdateFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export default productUpdateSlice.reducer;
export const productUpdateActions = productUpdateSlice.actions;
