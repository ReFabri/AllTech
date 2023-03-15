import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userDetailsActions } from "./userDetailsSlice";

const initialState = {
  user: {},
};

const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState,
  reducers: {
    userUpdateRequest: (state) => {
      return { loading: true };
    },
    userUpdateSuccess: (state, action) => {
      return { loading: false, success: true };
    },
    userUpdateFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
    userUpdateReset: (state) => {
      return { user: {} };
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

      const { data } = await axios.put(`/api/users/${user._id}`, user, config);

      dispatch(userUpdateActions.userUpdateSuccess());
      dispatch(userDetailsActions.userDetailsSuccess(data));

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
