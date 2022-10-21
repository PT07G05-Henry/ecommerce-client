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
    user: { toBeField: true },
    
    
}

export const getUsersById = createAsyncThunk("api/getUsersById", async (id) => {
    try {
        const response = await axios.get(
            `http://${process.env.REACT_APP_DEV_API || document.domain}/users/${id}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
});

export const userByIdSlice = createSlice(
    {
        name: "userById",
        initialState,
        reducers: {
            start: (state) => {
                state.user = { toBeField: true };
            }
        },
        extraReducers: (builder) => {
            builder
            .addCase(getUsersById.pending, (state) => {
                state.user = { idle: true };
            })
            .addCase(getUsersById.rejected, (state) => {
                state.user = [{ error: "Something went wrong" }];
            })
            .addCase(getUsersById.fulfilled, (state, action) => {
                state.user = action.payload;
            });
        }
    }
)

export const selectuserById = (state) => state.userById.userById;

export const { start } = userByIdSlice.actions

export default userByIdSlice.reducer