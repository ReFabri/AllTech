import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userLoginActions } from "./userLoginSlice";

const initialState = {};

const userUpdateProfileSlice = createSlice({
  name: "userUpdateProfile",
  initialState,
  reducers: {
    userUpdateProfileRequest: (state) => {
      return { loading: true };
    },
    userUpdateProfileSuccess: (state, action) => {
      return { loading: false, success: true, userInfo: action.payload };
    },
    userUpdateProfileFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
    userUpdateProfileReset: (state) => {
      return {};
    },
  },
});

export const updateUserProfile = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch(userUpdateProfileActions.userUpdateProfileRequest());

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

      dispatch(userUpdateProfileActions.userUpdateProfileSuccess(data));
      dispatch(userLoginActions.userLoginSuccess(data));

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(
        userUpdateProfileActions.userUpdateProfileFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export default userUpdateProfileSlice.reducer;
export const userUpdateProfileActions = userUpdateProfileSlice.actions;
