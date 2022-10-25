import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [{ toBeField: true }],
};

export const getUsers = createAsyncThunk("users/getUsers", async (email) => {
  try {
    if (email) {
      const response = await axios.get(
        `https://${
          process.env.REACT_APP_DEV_API || document.domain
        }/users?email=${email}`
      );
      return response.data;
    } else {
      const response = await axios.get(
        `https://${process.env.REACT_APP_DEV_API || document.domain}/users`
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    start: (state) => {
      state.users = [{ toBeField: true }];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.users = [{ idle: true }];
      })
      .addCase(getUsers.rejected, (state) => {
        state.users = [{ error: "Something went wrong" }];
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export const selectUser = (state) => state.users.users;

export const { start } = usersSlice.actions;

export default usersSlice.reducer;
