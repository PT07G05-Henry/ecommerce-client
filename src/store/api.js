import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
    products: [{ toBeField: true }],
    product: { noProduct: true },
    productsDisplay: [{ toBeField: true }]
};

export const getProducts = createAsyncThunk("api/getProducts", async () => {
    try {
        const response = await axios.get(
            `http://${process.env.REACT_APP_DEV_API || document.domain}/product`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
});

export const getProductById = createAsyncThunk("api/getProductById", async (id) => {
    try {
        const response = await axios.get(
            `http://${process.env.REACT_APP_DEV_API || document.domain}/product/${id}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
});

export const apiSlice = createSlice({
    name: "api",
    initialState,
    reducers: {
        start: (state) => {
            state.products = [{ toBeField: true }];
            state.product = { noProduct: true };
            state.productsDisplay = [{ toBeField: true }];
        },
        display: (state) => {
            let products = state.products;
            //espacio para aplicar filtros y ordenamientos
            state.productsDisplay=products;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.products=[{ idle: true }];
            })
            .addCase(getProducts.rejected, (state) => {
                state.products = [{ error: "Something went wrong" }]; 
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(getProductById.pending, (state) => {
                state.product={ idle: true };
            })
            .addCase(getProductById.rejected, (state) => {
                state.product = { error: "Something went wrong" }; 
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.product = action.payload;
            });
    },
});

export const selectProducts = (state) => state.api.products;
export const selectProduct = (state) => state.api.product;
export const selectProductsDisplay = (state) => state.api.productsDisplay;

export const {
    start
} = apiSlice.actions;

export default apiSlice.reducer;