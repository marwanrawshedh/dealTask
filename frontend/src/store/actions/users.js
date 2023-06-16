import {
  saveUsers,
  addUser,
  checkUser,
  unCheckUser,
  deleteUsers,
  updateUser,
} from "../slices/users";
import { openSnackbarAction } from "./CommonActions";

import api from "../../interceptors";
export const getUsersAction = (search, page, limit) => async (dispatch) => {
  try {
    const { data } = await api.get(
      `users?size=${limit}&page=${page}&searchTerm=${search}`
    );
    let { rows: users, count, currentPage, pages } = data;
    dispatch(saveUsers({ users, count, currentPage, pages }));
  } catch (error) {
    console.log(error);
  }
};
export const addUserAction = (user) => async (dispatch) => {
  try {
    const { data } = await api.post("/users", user);
    dispatch(addUser({ user: data }));
    dispatch(
      openSnackbarAction({
        snackbarType: "success",
        snackbarMessage: "User Added",
      })
    );
  } catch (error) {
    dispatch(
      openSnackbarAction({
        snackbarType: "error",
        snackbarMessage: "Add user failed",
      })
    );
    console.log(error);
  }
};
export const checkUserAction = (id, isChecked) => async (dispatch) => {
  try {
    if (isChecked) {
      dispatch(checkUser({ id }));
    } else {
      dispatch(unCheckUser({ id }));
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUsersAction = (usersIds) => async (dispatch) => {
  try {
    await api.post("/users/delete", { usersIds });
    dispatch(deleteUsers({ usersIds }));
    dispatch(
      openSnackbarAction({
        snackbarType: "success",
        snackbarMessage: "User Deleted",
      })
    );
  } catch (error) {
    console.log(error);
  }
};
export const changeStatusAction = (userId, status) => async (dispatch) => {
  try {
    const { data } = await api.put(`/users/${userId}`, { status });
    dispatch(updateUser({ user: data }));
  } catch (error) {
    console.log(error);
  }
};
