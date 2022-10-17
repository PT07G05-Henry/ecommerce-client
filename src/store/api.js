import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const NAME = "name";
export const PAGE = "page";
export const QUANTITY = "quantity";
export const CATEGORY = "category";
export const TYPE_ORDER = "typeOrder";
export const ASC = "ASC";
export const DESC = "DESC";
export const ORDERBY = "orderBy";
export const NEXT = "NEXT";
export const PREV = "PREV";


let initialState = {
    categories: [{ toBeField: true }],
    comments: [{ toBeField: true }],
    deliveries: [{ toBeField: true }],
    orders: [{ toBeField: true }],
    payments: [{ toBeField: true }],
    products: { toBeField: true },
    product: { noProduct: true },
    user: { toBeField: true },
};

export const getCategories = createAsyncThunk("api/getCategories", async () => {
    try {
        const response = await axios.get(
            `http://${process.env.REACT_APP_DEV_API || document.domain}/categories`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
});

export const getComments = createAsyncThunk("api/getComments", async () => {
    try {
        const response = await axios.get(
            `http://${process.env.REACT_APP_DEV_API || document.domain}/comments`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
});

export const getDeliveries = createAsyncThunk("api/getDeliveries", async () => {
    try {
        const response = await axios.get(
            `http://${process.env.REACT_APP_DEV_API || document.domain}/deliveries`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
});

export const getOrders = createAsyncThunk("api/getOrders", async () => {
    try {
        const response = await axios.get(
            `http://${process.env.REACT_APP_DEV_API || document.domain}/orders`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
});

export const getPayments = createAsyncThunk("api/getPayments", async () => {
    try {
        const response = await axios.get(
            `http://${process.env.REACT_APP_DEV_API || document.domain}/payments`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
});

export const getProducts = createAsyncThunk("api/getProducts", async (flags) => {
    let queries = '';
    flags && ((typeof flags) !== "string") && (Object.keys(flags).forEach((e) => { queries = queries + `?${e}=${flags[e]}` }));
    try {
        const response = await axios.get(
            (!flags || (typeof flags !== "string") ? `http://${process.env.REACT_APP_DEV_API || document.domain}/products${queries}` : flags)
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
});

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



export const apiSlice = createSlice({
    name: "api",
    initialState,
    reducers: {
        start: (state) => {
            state.categories = [{ toBeField: true }];
            state.comments = [{ toBeField: true }];
            state.deliveries = [{ toBeField: true }];
            state.orders = [{ toBeField: true }];
            state.payments = [{ toBeField: true }];
            state.products = { toBeField: true };
            state.product = { noProduct: true };
            state.user = [{ toBeField: true }];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.categories = [{ idle: true }]; //categories[0].toBeField 
            })
            .addCase(getCategories.rejected, (state) => {
                state.categories = [{ error: "Something went wrong" }];
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(getComments.pending, (state) => {
                state.comments = [{ idle: true }];
            })
            .addCase(getComments.rejected, (state) => {
                state.comments = [{ error: "Something went wrong" }];
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.comments = action.payload;
            })
            .addCase(getDeliveries.pending, (state) => {
                state.deliveries = [{ idle: true }];
            })
            .addCase(getDeliveries.rejected, (state) => {
                state.deliveries = [{ error: "Something went wrong" }];
            })
            .addCase(getDeliveries.fulfilled, (state, action) => {
                state.deliveries = action.payload;
            })
            .addCase(getOrders.pending, (state) => {
                state.orders = [{ idle: true }];
            })
            .addCase(getOrders.rejected, (state) => {
                state.orders = [{ error: "Something went wrong" }];
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            .addCase(getPayments.pending, (state) => {
                state.payments = [{ idle: true }];
            })
            .addCase(getPayments.rejected, (state) => {
                state.payments = [{ error: "Something went wrong" }];
            })
            .addCase(getPayments.fulfilled, (state, action) => {
                state.payments = action.payload;
            })
            .addCase(getProducts.pending, (state) => {
                state.products = [{ idle: true }];
            })
            .addCase(getProducts.rejected, (state) => {
                state.products = [{ error: "Something went wrong" }];
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(getProductById.pending, (state) => {
                state.product = { idle: true };
            })
            .addCase(getProductById.rejected, (state) => {
                state.product = { error: "Something went wrong" };
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.product = action.payload;
            })
            .addCase(getUsers.pending, (state) => {
                state.user = { idle: true };
            })
            .addCase(getUsers.rejected, (state) => {
                state.user = [{ error: "Something went wrong" }];
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getUsersById.pending, (state) => {
                state.user = { idle: true };
            })
            .addCase(getUsersById.rejected, (state) => {
                state.user = [{ error: "Something went wrong" }];
            })
            .addCase(getUsersById.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export const selectCategories = (state) => state.api.categories;
export const selectComments = (state) => state.api.comments;
export const selectDeliveries = (state) => state.api.deliveries;
export const selectOrders = (state) => state.api.orders;
export const selectPayments = (state) => state.api.payments;
export const selectProducts = (state) => state.api.products;
export const selectNext = (state) => state.api.products.next;
export const selectPrev = (state) => state.api.products.prev;
export const selectProduct = (state) => state.api.product;
export const selectUser = (state) => state.api.user;

export const {
    start
} = apiSlice.actions;

export default apiSlice.reducer;