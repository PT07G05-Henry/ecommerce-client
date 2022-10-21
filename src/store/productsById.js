import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const NAME = "name";
export const PAGE = "page";
export const QUANTITY = "quantity";
export const CATEGORY = "category";
export const TYPE_ORDER = "typeOrder";
export const ASC = "ASC";
export const DESC = "DESC";
export const ORDERBY = "orderBy";
export const ID = "id";
export const PRICE = "price";
export const DESCRIPTION = "description";
export const STOCK = "stock";
export const RATING = "rating";
export const USER_ROL_ID = "usersRolId";

const initialState = {
    productsById: { toBeField: true },
    products: { noProduct: true },
    
}

export const getProductById = createAsyncThunk("api/getProductById", async (id) => {
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
                state.products = { idle: true };
            })
            .addCase(getProductById.rejected, (state) => {
                state.products = { error: "Something went wrong" };
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.products = action.payload;
            })
        }
    }
)

export const selectproductsById = (state) => state.productsById.productsById;

export const { start } = productsByIdSlice.actions

export default productsByIdSlice.reducer