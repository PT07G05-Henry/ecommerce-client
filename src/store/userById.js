import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { endPoint } from "../lib/api";

const initialState = {
  user: { toBeField: true },
};

export const getUsersById = createAsyncThunk(
  "userById/getUsersById",
  async (id) => {
    try {
      const response = await api.get(`${endPoint.users}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const userByIdSlice = createSlice({
  name: "userById",
  initialState,
  reducers: {
    start: (state) => {
      state.user = { toBeField: true };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersById.pending, (state) => {
        state.user = { idle: true };
      })
      .addCase(getUsersById.rejected, (state) => {
        state.user = [{ error: "Something went wrong" }];
      })
      .addCase(getUsersById.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const selectUserById = (state) => state.userById.user;

export const { start } = userByIdSlice.actions;

export default userByIdSlice.reducer;
