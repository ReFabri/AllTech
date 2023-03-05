import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  success: false,
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderCreateRequest: (state) => {
      return { ...state, loading: true };
    },
    orderCreateSuccess: (state, action) => {
      return { ...state, loading: false, success: true, order: action.payload };
    },
    orderCreateFail: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    orderDetailsRequest: (state) => {
      return { ...state, success: false, loading: true };
    },
    orderDetailsSuccess: (state, action) => {
      return { ...state, loading: false, order: action.payload };
    },
    orderDetailsFail: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    orderPayRequest: (state) => {
      return { ...state, paymentLoading: true };
    },
    orderPaySuccess: (state) => {
      return { ...state, paymentLoading: false, paymentSuccess: true };
    },
    orderPayFail: (state, action) => {
      return { ...state, paymentLoading: false, error: action.payload };
    },
    orderPayReset: (state) => {
      return { ...state, paymentLoading: false, paymentSuccess: false };
    },
    orderUserListRequest: (state) => {
      return { ...state, loadingOrders: true };
    },
    orderUserListSuccess: (state, action) => {
      return { ...state, loadingOrders: false, orders: action.payload };
    },
    orderUserListFail: (state, action) => {
      return { ...state, loadingOrders: false, errorOrders: action.payload };
    },
    orderUserListReset: (state) => {
      return { ...state, loadingOrders: false, orders: [] };
    },
  },
});

export const createOrder = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderActions.orderCreateRequest());
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post("/api/orders", order, config);

      dispatch(orderActions.orderCreateSuccess(data));
    } catch (error) {
      dispatch(
        orderActions.orderCreateFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export const getOrderDetails = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderActions.orderDetailsRequest());
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders/${id}`, config);

      dispatch(orderActions.orderDetailsSuccess(data));
    } catch (error) {
      dispatch(
        orderActions.orderDetailsFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export const payOrder = (orderId, paymentResult) => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderActions.orderPayRequest());
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch(orderActions.orderPaySuccess(data));
    } catch (error) {
      dispatch(
        orderActions.orderPayFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export const listUserOrders = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderActions.orderUserListRequest());
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders/myorders`, config);

      dispatch(orderActions.orderUserListSuccess(data));
    } catch (error) {
      dispatch(
        orderActions.orderPayFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export default orderSlice.reducer;
export const orderActions = orderSlice.actions;
