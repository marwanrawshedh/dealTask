import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myDeals: { data: [], count: 0 },
};

export const dealsSlice = createSlice({
  name: "myDeals",
  initialState,
  reducers: {
    saveMyDeals: (state, { payload }) => {
      console.log(payload);
      state.myDeals = { data: payload?.myDeals, count: payload?.count };
    },
  },
});

export const { saveMyDeals } = dealsSlice.actions;

export default dealsSlice.reducer;
