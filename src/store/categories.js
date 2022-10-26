import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [{ toBeField: true }],
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    try {
      const response = await axios.get(
        `https://${process.env.REACT_APP_DEV_API || document.domain}/categories`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    start: (state) => {
      state.categories = [{ toBeField: true }];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.categories = [{ idle: true }];
      })
      .addCase(getCategories.rejected, (state) => {
        state.categories = [{ error: "Something went wrong" }];
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const selectCategories = (state) => state.categories.categories;

export const { start } = categoriesSlice.actions;

export default categoriesSlice.reducer;
