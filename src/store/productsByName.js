import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsEndpoint } from "./products";

const initialState = {
    productsByName: { toBeField: true },
}

export const getProductsByName = createAsyncThunk("productsByName/getProductsByName", getProductsEndpoint);

export const productsByNameSlice = createSlice(
    {
        name: "productsByName",
        initialState,
        reducers: {
            start: (state) => {
                state.productsByName = { toBeField: true };
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(getProductsByName.pending, (state) => {
                    state.productsByName = { idle: true };
                })
                .addCase(getProductsByName.rejected, (state) => {
                    state.productsByName = { error: "Something went wrong" };
                })
                .addCase(getProductsByName.fulfilled, (state, action) => {
                    state.productsByName = action.payload;
                })
        }
    }
)

export const selectProductsByName = (state) => state.productsByName.productsByName;

export const { start } = productsByNameSlice.actions

export default productsByNameSlice.reducer