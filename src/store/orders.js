import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [{ toBeField: true }],
};

export const getOrders = createAsyncThunk("orders/getOrders", async () => {
  try {
    const response = await axios.get(
      `https://${process.env.REACT_APP_DEV_API || document.domain}/orders/all`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    start: (state) => {
      state.orders = [{ toBeField: true }];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.orders = [{ idle: true }];
      })
      .addCase(getOrders.rejected, (state) => {
        state.orders = [{ error: "Something  went wrong" }];
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export const selectOrders = (state) => state.orders.orders;

export const { start } = ordersSlice.actions;

export default ordersSlice.reducer;
