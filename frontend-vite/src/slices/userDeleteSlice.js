import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

const userDeleteSlice = createSlice({
  name: "userDelete",
  initialState,
  reducers: {
    userDeleteRequest: (state, action) => {
      return { loading: true };
    },
    userDeleteSuccess: (state, action) => {
      return { loading: false, success: true };
    },
    userDeleteFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(userDeleteActions.userDeleteRequest());

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/users/${id}`, config);

      dispatch(userDeleteActions.userDeleteSuccess());
    } catch (error) {
      dispatch(
        userDeleteActions.userDeleteFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export default userDeleteSlice.reducer;
export const userDeleteActions = userDeleteSlice.actions;
