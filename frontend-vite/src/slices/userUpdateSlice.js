import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userLoginActions } from "./userLoginSlice";

const initialState = {};

const userUpdateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    userUpdateRequest: (state) => {
      return { loading: true };
    },
    userUpdateSuccess: (state, action) => {
      return { loading: false, success: true, userInfo: action.payload };
    },
    userUpdateFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
    userUpdateReset: (state) => {
      return {};
    },
  },
});

export const updateUser = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch(userUpdateActions.userUpdateRequest());

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(`/api/users/profile`, user, config);

      dispatch(userUpdateActions.userUpdateSuccess(data));
      dispatch(userLoginActions.userLoginSuccess(data));

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(
        userUpdateActions.userUpdateFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export default userUpdateSlice.reducer;
export const userUpdateActions = userUpdateSlice.actions;
