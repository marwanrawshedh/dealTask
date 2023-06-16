import { openSnackbar, closeSnackbar } from "../slices/common";

export const openSnackbarAction =
  ({ snackbarType, snackbarMessage, snackbarDuration = 3000 }) =>
  async (dispatch) => {
    console.log(snackbarType);
    dispatch(
      openSnackbar({
        show: true,
        snackbarType,
        snackbarMessage,
        snackbarDuration,
      })
    );
  };
export const closeSnackbarAction = () => async (dispatch) => {
  dispatch(
    closeSnackbar({
      show: false,
    })
  );
};
