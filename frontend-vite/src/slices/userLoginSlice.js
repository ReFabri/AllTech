import { createSlice } from "@reduxjs/toolkit";
import { userDetailsActions } from "./userDetailsSlice";
import { orderActions } from "./orderSlice";
import { userListActions } from "./userListSlice";
import axios from "axios";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
  loading: false,
};

const userLoginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoginRequest: (state) => {
      return { loading: true };
    },
    userLoginSuccess: (state, action) => {
      return { loading: false, userInfo: action.payload };
    },
    userLoginFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
    userLogout: (state) => {
      return {};
    },
  },
});

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(userLoginActions.userLoginRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );

      dispatch(userLoginActions.userLoginSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(
        userLoginActions.userLoginFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch(userLoginActions.userLogout());
    dispatch(userDetailsActions.userDetailsReset());
    dispatch(orderActions.orderUserListReset());
    dispatch(userListActions.userListReset());
  };
};

export default userLoginSlice.reducer;
export const userLoginActions = userLoginSlice.actions;
