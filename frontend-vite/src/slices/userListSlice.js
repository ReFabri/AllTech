import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
};

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    userListRequest: (state) => {
      return { loading: true };
    },
    userListSuccess: (state, action) => {
      return { loading: false, users: action.payload };
    },
    userListFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
    userListReset: (state) => {
      return { loading: false, users: [] };
    },
  },
});

export const listUsers = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(userListActions.userListRequest());

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/users`, config);

      dispatch(userListActions.userListSuccess(data));

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(
        userListActions.userListFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export default userListSlice.reducer;
export const userListActions = userListSlice.actions;
