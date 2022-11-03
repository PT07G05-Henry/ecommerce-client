import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { endPoint } from "../lib/api";

const initialState = {
  categories: [{ toBeField: true }],
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    try {
      const response = await api.get(endPoint.categories);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const postCategories = createAsyncThunk(
  "categories/postCategories",
  async ({ input, sid }) => {
    try {
      const response = await api.post(endPoint.categories, { data: input });
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
      })
      .addCase(postCategories.pending, (state) => {
        state.categories = [{ idle: true }];
      })
      .addCase(postCategories.rejected, (state) => {
        state.categories = [{ error: "Something went wrong" }];
      })
      .addCase(postCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const selectCategories = (state) => state.categories.categories;

export const { start } = categoriesSlice.actions;

export default categoriesSlice.reducer;
