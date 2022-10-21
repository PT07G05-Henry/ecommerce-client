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
    productsByName: { toBeField: true },
    products: { toBeField: true },
}

export const getProductsByName = createAsyncThunk("api/getProductsByName", async (flags) => {
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

export const selectproductsByName = (state) => state.productsByName.productsByName;

export const { start } = productsByNameSlice.actions

export default productsByNameSlice.reducer