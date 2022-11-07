import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { endPoint } from "../lib/api";

const initialState = {
  users: { toBeField: true },
};


export const getUsers = createAsyncThunk("users/getUsers", async (flags) => {
  try {
    const response = await api.get(`${endPoint.users}/all`, { params: flags });
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    start: (state) => {
      state.users = { toBeField: true };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.users = { idle: true };
      })
      .addCase(getUsers.rejected, (state) => {
        state.users = { error: "Something went wrong" };
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export const selectUser = (state) => state.users.users;

export const { start } = usersSlice.actions;

export default usersSlice.reducer;
