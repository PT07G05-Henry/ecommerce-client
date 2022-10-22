import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    product: { noProduct: true },
    
}

export const getProductById = createAsyncThunk("productsById/getProductById", async (id) => {
    try {
        const response = await axios.get(
            `http://${process.env.REACT_APP_DEV_API || document.domain}/products/${id}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
});

export const productsByIdSlice = createSlice(
    {
        name: "productsById",
        initialState,
        reducers: {
            start: (state) => {
                state.productsById = { toBeField: true };
            }
        },
        extraReducers: (builder) => {
            builder
            .addCase(getProductById.pending, (state) => {
                state.product = { idle: true };
            })
            .addCase(getProductById.rejected, (state) => {
                state.product = { error: "Something went wrong" };
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.product = action.payload;
            })
        }
    }
)

export const selectProductsById = (state) => state.productsById.product;

export const { start } = productsByIdSlice.actions

export default productsByIdSlice.reducer