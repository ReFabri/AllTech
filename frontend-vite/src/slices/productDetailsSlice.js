import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: [{ reviews: [] }],
};

export const productDetailsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productDetails: (state) => state,
    productDetailsRequest: (state) => {
      return { loading: true, product: state.product };
    },
    productDetailsSuccess: (state, action) => {
      return { loading: false, product: action.payload };
    },
    productDetailsFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

export const listProductDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch(productDetailsActions.productDetailsRequest());
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(productDetailsActions.productDetailsSuccess(data));
    } catch (error) {
      dispatch(
        productDetailsActions.productDetailsFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export const productDetailsActions = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
