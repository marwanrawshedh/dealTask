import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackbar: { show: false },
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    openSnackbar: (state, { payload }) => {
      console.log(payload);
      state.snackbar = payload;
    },
    closeSnackbar: (state, { payload }) => {
      state.snackbar = payload;
    },
  },
});

export const { openSnackbar, closeSnackbar } = commonSlice.actions;

export default commonSlice.reducer;
