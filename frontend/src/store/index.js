import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/users";
import dealsReducer from "./slices/deals";
import profileReducer from "./slices/profile";
import authReducer from "./slices/authentication";
import commonReducer from "./slices/common";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    users: usersReducer,
    deals: dealsReducer,
    auth: authReducer,
    profile: profileReducer,
    common: commonReducer,
  },
});
