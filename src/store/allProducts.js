import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { endPoint } from "../lib/api";

const initialState = {
    allProducts: [{ toBeField: true }],
};

export const getAllProducts = createAsyncThunk("allProducts/getAllProducts", async () => {
    try {
        const response = await api.get(endPoint.allProducts);
        return response.data;
    } catch (error) {
        console.error(error);
    }
    });

export const allProductsSlice = createSlice({
    name: "allProducts",
    initialState,
    reducers: {
        start: (state) => {
        state.allProducts = [{ toBeField: true }];
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllProducts.pending, (state) => {
            state.allProducts = [{ idle: true }];
        })
        .addCase(getAllProducts.rejected, (state) => {
            state.allProducts = [{ error: "Something  went wrong" }];
        })
        .addCase(getAllProducts.fulfilled, (state, action) => {
            state.allProducts = action.payload;
        });
    },
});

export const selectAllProducts = (state) => state.allProducts.allProducts;

export const { start } = allProductsSlice.actions;

export default allProductsSlice.reducer;
