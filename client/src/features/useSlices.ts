import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { user: null, isLoggedIn: false, error: null },
  reducers: {
    handleError: (state: { error: any }, action: { payload: any }) => {
      state.error = action.payload;
    },
    login: (
      state: { user: any; isLoggedIn: any },
      action: { payload: { [x: string]: any; isLoggedIn: boolean } }
    ) => {
      let { isLoggedIn, ...data } = action.payload;
      console.log("data : ", data);
      state.user = data;
      state.isLoggedIn = isLoggedIn;
    },
    logout: (state: { user: any; isLoggedIn: boolean }) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout, handleError } = userSlice.actions;
export const selectUser = (state: { user: { user: any } }) => state.user.user;
export const selectAuthState = (state: { user: { isLoggedIn: any } }) =>
  state.user.isLoggedIn;
export const selectError = (state: { user: { error: any } }) =>
  state.user.error;

export default userSlice.reducer;
