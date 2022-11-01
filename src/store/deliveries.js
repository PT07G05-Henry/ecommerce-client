import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { endPoint } from "../lib/api";

const initialState = {
  deliveries: [{ toBeField: true }],
};

export const getDeliveries = createAsyncThunk(
  "deliveries/getDeliveries",
  async () => {
    try {
      const response = await api.get(endPoint.deliveries);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deliveriesSlice = createSlice({
  name: "deliveries",
  initialState,
  reducers: {
    start: (state) => {
      state.deliveries = [{ toBeField: true }];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDeliveries.pending, (state) => {
        state.deliveries = [{ idle: true }];
      })
      .addCase(getDeliveries.rejected, (state) => {
        state.deliveries = [{ error: "Something went  wrong" }];
      })
      .addCase(getDeliveries.fulfilled, (state, action) => {
        state.deliveries = action.payload;
      });
  },
});

export const selectDeliveries = (state) => state.deliveries.deliveries;

export const { start } = deliveriesSlice.actions;

export default deliveriesSlice.reducer;
