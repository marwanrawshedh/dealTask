import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { closeSnackbarAction } from "../store/actions/CommonActions";
const CustomizedSnackBar = () => {
  const dispatch = useDispatch();
  const { snackbar } = useSelector((state) => state.common);

  const closeHandle = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackbarAction());
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div>
      <Snackbar
        open={snackbar.show}
        onClose={closeHandle}
        autoHideDuration={snackbar.snackbarDuration || 3000}
        color={snackbar.snackbarType}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={closeHandle}
          severity={snackbar.snackbarType}
          sx={{ width: "100%" }}
        >
          {snackbar.snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackBar;
