import { saveMyDeals } from "../slices/profile";
import api from "../../interceptors";
export const getMyDealsAction = () => async (dispatch) => {
  try {
    const { data } = await api.get(`claimed-deals`);
    let { rows: myDeals, count } = data;
    dispatch(saveMyDeals({ myDeals, count }));
  } catch (error) {
    console.log(error);
  }
};
