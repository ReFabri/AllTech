import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

const productCreateReviewSlice = createSlice({
  name: "productReview",
  initialState,
  reducers: {
    productCreateReviewRequest: (state) => {
      return { loading: true };
    },
    productCreateReviewSuccess: (state) => {
      return { loading: false, success: true };
    },
    productCreateReviewFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
    productCreateReviewReset: (state, action) => {
      return {};
    },
  },
});

export const createProductReview = (productId, review) => {
  return async (dispatch, getState) => {
    try {
      dispatch(productCreateReviewActions.productCreateReviewRequest());

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/products/${productId}/reviews`, review, config);
      dispatch(productCreateReviewActions.productCreateReviewSuccess());
    } catch (error) {
      dispatch(
        productCreateReviewActions.productCreateReviewFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export default productCreateReviewSlice.reducer;
export const productCreateReviewActions = productCreateReviewSlice.actions;
