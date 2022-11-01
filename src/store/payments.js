import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { endPoint } from "../lib/api";

const initialState = {
  payments: [{ toBeField: true }],
};

export const getPayments = createAsyncThunk(
  "payments/getPayments",
  async () => {
    try {
      const response = await api.get(endPoint.payments);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    start: (state) => {
      state.payments = [{ toBeField: true }];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPayments.pending, (state) => {
        state.payments = [{ idle: true }];
      })
      .addCase(getPayments.rejected, (state) => {
        state.payments = [{ error: "Something went wrong" }];
      })
      .addCase(getPayments.fulfilled, (state, action) => {
        state.payments = action.payload;
      });
  },
});

export const selectPayments = (state) => state.payments.payments;

export const { start } = paymentsSlice.actions;

export default paymentsSlice.reducer;
