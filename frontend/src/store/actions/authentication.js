import { signIn } from "../slices/authentication";
import api from "../../interceptors";
import jwtDecode from "jwt-decode";
import { openSnackbarAction } from "./CommonActions";

export const signInAction = (user, navigate) => async (dispatch) => {
  try {
    const { data } = await api.post(`/authentication/sign-in`, user);
    sessionStorage.setItem("accessToken", data?.accessToken);
    const { role, email, id, name } = jwtDecode(data.accessToken);
    dispatch(signIn({ role, email, id, name }));
    console.log();
    navigate(role !== "User" ? `/users` : "/deals");
    dispatch(
      openSnackbarAction({
        snackbarType: "success",
        snackbarMessage: "Sign In successfully",
      })
    );
  } catch (error) {
    dispatch(
      openSnackbarAction({
        snackbarType: "error",
        snackbarMessage: "Email or password wrong",
      })
    );
    console.log(error);
  }
};
export const checkAuth = async () => {
  try {
    const { data } = await api.post(`/authentication/check-access`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const signOutAction = async (navigate) => {
  try {
    sessionStorage.removeItem("accessToken");
    navigate(`/`);
  } catch (error) {
    console.log(error);
  }
};
