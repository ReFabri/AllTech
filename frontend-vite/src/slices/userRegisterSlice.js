import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userLoginActions } from "./userLoginSlice";

const initialState = {};

const userRegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    userRegisterRequest: (state) => {
      return { loading: true };
    },
    userRegisterSuccess: (state, action) => {
      return { loading: false, userInfo: action.payload };
    },
    userRegisterFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

export const register = (name, email, password) => {
  return async (dispatch) => {
    try {
      dispatch(userRegisterActions.userRegisterRequest());

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users",
        {
          name,
          email,
          password,
        },
        config
      );

      dispatch(userRegisterActions.userRegisterSuccess(data));
      dispatch(userLoginActions.userLoginSuccess(data));

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(
        userRegisterActions.userRegisterFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export default userRegisterSlice.reducer;
export const userRegisterActions = userRegisterSlice.actions;
