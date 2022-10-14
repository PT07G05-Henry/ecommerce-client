import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
    hi: "nothing",
};

export const test = createAsyncThunk("api/test", async () => {
    try {
        const response = await axios.get(
            `http://${document.domain}/test`
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
            state.hi = "nothing";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(test.pending, (state) => {
                state.hi = "loading";
            })
            .addCase(test.rejected, (state) => {
                state.hi = "Something went wrong";
            })
            .addCase(test.fulfilled, (state, action) => {
                state.hi = action.payload;
            });
    },
});

export const selectHi = (state) => state.api.hi;

export const {
    start
} = apiSlice.actions;

export default apiSlice.reducer;