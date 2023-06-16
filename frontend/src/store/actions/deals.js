import { saveDeals, addDeal, updateDeal } from "../slices/deals";
import api from "../../interceptors";
import { openSnackbarAction } from "./CommonActions";

export const getDealsAction = (search, page, limit) => async (dispatch) => {
  try {
    const { data } = await api.get(
      `deals?size=${limit}&page=${page}&searchTerm=${search}`
    );
    let { rows: deals, count, currentPage, pages } = data;
    dispatch(saveDeals({ deals, count, currentPage, pages }));
  } catch (error) {
    console.log(error);
  }
};

export const addDealAction = (deal) => async (dispatch) => {
  try {
    const { data } = await api.post("/deals", deal);
    dispatch(addDeal({ deal: data }));

    dispatch(
      openSnackbarAction({
        snackbarType: "success",
        snackbarMessage: "Deal Added",
      })
    );
  } catch (error) {
    dispatch(
      openSnackbarAction({
        snackbarType: "error",
        snackbarMessage: "Create  Deal failed",
      })
    );
    console.log(error);
  }
};
export const changeStatusAction = (id, status) => async (dispatch) => {
  try {
    const { data } = await api.put(`/deals/${id}`, { status });
    dispatch(updateDeal({ deal: data }));
  } catch (error) {
    console.log(error);
  }
};
export const claimDealAction = (dealId) => async (dispatch) => {
  try {
    const { data } = await api.post(`/claimed-deals/${dealId}`);
    console.log();
  } catch (error) {
    console.log(error);
  }
};
