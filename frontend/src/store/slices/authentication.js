import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, { payload }) => {
      state.auth = payload;
    },
  },
});

export const { signIn } = authSlice.actions;

export default authSlice.reducer;
