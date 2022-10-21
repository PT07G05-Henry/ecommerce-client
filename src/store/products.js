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
    products: { toBeField: true },
}

export const getProducts = createAsyncThunk("api/getProducts", async (flags) => {
    let queries = '?';
    flags && ((typeof flags) !== "string") && (Object.keys(flags).forEach((e) => { queries = queries + `${e}=${flags[e]}&` }));
    try {
        const response = await axios.get(
            (!flags || (typeof flags !== "string") ? `http://${process.env.REACT_APP_DEV_API || document.domain}/products${queries.length > 1 ? queries : ''}` : flags)
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
});

export const productsSlice = createSlice(
    {
        name: "products",
        initialState,
        reducers: {
            start: (state) => {
                state.products = { toBeField: true };
            }
        },
        extraReducers: (builder) => {
            builder
            .addCase(getProducts.pending, (state) => {
                state.products = { idle: true };
            })
            .addCase(getProducts.rejected, (state) => {
                state.products = { error: "Something went wrong" };
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
        }
    }
)

export const selectProducts = (state) => state.products.products;

export const { start } = productsSlice.actions

export default productsSlice.reducer
