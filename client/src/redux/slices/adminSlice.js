import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  totalPage: 0,
  totalUsers: 0,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.users = action.payload;
    },
    deleteUser: (state, action) => {
      const newUsers = state.users.filter((p) => p._id !== action.payload);
      state.users = newUsers;
    },
    updateUsers: (state, action) => {
      const newUsers = state.users.map((p) => {
        if (p._id === action.payload._id) {
          return action.payload;
        }
        return p;
      });
      state.users = newUsers;
    },
    setTotalPageUsers: (state, action) => {
      state.totalPage = action.payload;
    },
    setTotalUsers: (state, action) => {
      state.totalUsers = action.payload;
    },
  },
});

export const { addUsers, deleteUser, updateUsers, setTotalPageUsers, setTotalUsers } =
  adminSlice.actions;

export default adminSlice.reducer;
