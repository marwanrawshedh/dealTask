import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deals: { data: [], count: 0, currentPage: 1, pages: 1 },
};

export const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    saveDeals: (state, { payload }) => {
      state.deals = {
        data: payload.deals,
        count: payload.count,
        currentPage: payload.currentPage,
        pages: payload.pages,
      };
    },
    addDeal: (state, { payload }) => {
      state.deals = {
        data: [...state.deals.data, payload.deal],
        count: state.deals.count + 1,
      };
    },
    checkDeal: (state, { payload }) => {
      state.checkedDeals = [...state.checkedDeals, payload?.id];
    },
    unCheckDeal: (state, { payload }) => {
      state.checkedDeals = state.checkedDeals?.filter(
        (id) => id !== payload?.id
      );
    },
    deleteDeals: (state, { payload }) => {
      const newDeals = state?.deals?.data?.filter(
        (element) => !payload?.dealsIds?.includes(element?.id)
      );
      state.deals = { data: newDeals, count: newDeals?.length };
      state.checkedDeals = [];
    },
    updateDeal: (state, { payload }) => {
      state.deals.data = state.deals?.data?.map((deal) => {
        return deal.id === payload?.deal?.id ? payload.deal : deal;
      });
    },
  },
});

export const { saveDeals, addDeal, checkDeal, updateDeal } = dealsSlice.actions;

export default dealsSlice.reducer;
