import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { endPoint } from "../lib/api";

const initialState = {
    allOrders: [{ toBeField: true }],
};

export const getAllOrders = createAsyncThunk("allOrders/getAllOrders", async () => {
    try {
        const response = await api.get(endPoint.allOrders);
        return response.data;
    } catch (error) {
        console.error(error);
    }
    });

export const allOrdersSlice = createSlice({
    name: "allOrders",
    initialState,
    reducers: {
        start: (state) => {
        state.allOrders = [{ toBeField: true }];
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllOrders.pending, (state) => {
            state.allOrders = [{ idle: true }];
        })
        .addCase(getAllOrders.rejected, (state) => {
            state.allOrders = [{ error: "Something  went wrong" }];
        })
        .addCase(getAllOrders.fulfilled, (state, action) => {
            state.allOrders = action.payload;
        });
    },
});

export const selectAllOrders = (state) => state.allOrders.allOrders;

export const { start } = allOrdersSlice.actions;

export default allOrdersSlice.reducer;
