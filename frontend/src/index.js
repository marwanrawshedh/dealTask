import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import SnackBar from "./components/SnackBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <SnackBar />

    {/* <RouterProvider router={App} /> */}
    <App />
  </Provider>
);
