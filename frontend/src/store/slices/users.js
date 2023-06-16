import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: { data: [], count: 0, currentPage: 1, pages: 1 },
  checkedUsers: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    saveUsers: (state, { payload }) => {
      state.users = {
        data: payload.users,
        count: payload.count,
        currentPage: payload.currentPage,
        pages: payload.pages,
      };
    },
    addUser: (state, { payload }) => {
      state.users = {
        data: [...state.users.data, payload.user],
        count: state.users.count + 1,
      };
    },
    checkUser: (state, { payload }) => {
      state.checkedUsers = [...state.checkedUsers, payload?.id];
    },
    unCheckUser: (state, { payload }) => {
      state.checkedUsers = state.checkedUsers?.filter(
        (id) => id !== payload?.id
      );
    },
    deleteUsers: (state, { payload }) => {
      const newUsers = state?.users?.data?.filter(
        (element) => !payload?.usersIds?.includes(element?.id)
      );
      state.users = { data: newUsers, count: newUsers?.length };
      state.checkedUsers = [];
    },
    updateUser: (state, { payload }) => {
      state.users.data = state.users?.data?.map((user) => {
        return user.id === payload?.user?.id ? payload.user : user;
      });
    },
  },
});

export const {
  saveUsers,
  addUser,
  checkUser,
  unCheckUser,
  deleteUsers,
  updateUser,
} = usersSlice.actions;

export default usersSlice.reducer;
