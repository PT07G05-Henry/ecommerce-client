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
    user: [{ toBeField: true }]
}

export const getUsers = createAsyncThunk("api/getUsers", async (email) => {
    try {
        const response = await axios.get(
            `http://${process.env.REACT_APP_DEV_API || document.domain}/users?email=${email}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
});

export const userSlice = createSlice(
    {
        name: "user",
        initialState,
        reducers: {
            start: (state) => {
                state.user = [{ toBeField: true }];
            }
        },
        extraReducers: (builder) => {
            builder
            .addCase(getUsers.pending, (state) => {
                state.user = [{ idle: true }];
            })
            .addCase(getUsers.rejected, (state) => {
                state.comments = [{ error: "Something went wrong" }];
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.comments = action.payload;
            })
        }
    }
)

export const selectUser = (state) => state.user.user

export const { start } = userSlice.actions

export default userSlice.reducer
