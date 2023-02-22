import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
};

const userDetailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    userDetailsRequest: (state) => {
      return { ...state, loading: true };
    },
    userDetailsSuccess: (state, action) => {
      return { loading: false, user: action.payload };
    },
    userDetailsFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

export const getUserDetails = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(userDetailsActions.userDetailsRequest());

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/users/${id}`, config);

      dispatch(userDetailsActions.userDetailsSuccess(data));
    } catch (error) {
      dispatch(
        userDetailsActions.userDetailsFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export default userDetailsSlice.reducer;
export const userDetailsActions = userDetailsSlice.actions;
