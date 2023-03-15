import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

const productCreateSlice = createSlice({
  name: "productCreate",
  initialState,
  reducers: {
    productCreateRequest: (state) => {
      return { loading: true };
    },
    productCreateSuccess: (state, action) => {
      return { loading: false, success: true, product: action.payload };
    },
    productCreateFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
    productCreateReset: () => {
      return {};
    },
  },
});

export const createProduct = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(productCreateActions.productCreateRequest());

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post("/api/products", {}, config);
      dispatch(productCreateActions.productCreateSuccess(data));
    } catch (error) {
      dispatch(
        productCreateActions.productCreateFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export default productCreateSlice.reducer;
export const productCreateActions = productCreateSlice.actions;
