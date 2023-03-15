import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

const productDeleteSlice = createSlice({
  name: "productDelete",
  initialState,
  reducers: {
    productDeleteRequest: (state) => {
      return { loading: true };
    },
    productDeleteSuccess: (state) => {
      return { loading: false, success: true };
    },
    productDeleteFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(productDeleteActions.productDeleteRequest());
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/products/${id}`, config);
      dispatch(productDeleteActions.productDeleteSuccess());
    } catch (error) {
      productDeleteActions.productDeleteFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };
};

export default productDeleteSlice.reducer;
export const productDeleteActions = productDeleteSlice.actions;
