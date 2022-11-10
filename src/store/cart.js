import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { endPoint } from "../lib/api";
import { store } from "./store";
import { selectThisUser } from "./thisUser";

export const initialState = {
  cart: [],
  loadedFromDb: false,
};

export const getCart = createAsyncThunk("cart/getCart", async () => {
  try {
    const response = await api.get(`${endPoint.cart}/${selectThisUser(store.getState()).userDb.id}`);
    return response.data.items;
  } catch (error) {
    console.error(error);
  }
})

export const deleteCart = createAsyncThunk("cart/deleteCart", async () => {
  try {
    const response = await api.delete(endPoint.cart, { data: { userId: selectThisUser(store.getState()).userDb.id } });
    return response.data.items;
  } catch (error) {
    console.error(error);
  }
})

export const postCart = createAsyncThunk("cart/postCart", async (cart) => {
  try {
    const response = await api.post(endPoint.cart, { data: { userId: selectThisUser(store.getState()).userDb.id, products: cart } });
    return response.data.items;
  } catch (error) {
    console.error(error);
  }
})

export const putCart = createAsyncThunk("cart/putCart", async (cart) => {
  try {
    const response = await api.put(endPoint.cart, { data: { userId: selectThisUser(store.getState()).userDb.id, products: cart } });
    return response.data.items;
  } catch (error) {
    console.error(error);
  }
})

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setItem: (state, action) => {
      if (state.cart.length === 0) {
        return { ...state, cart: [...state.cart, action.payload] };
      }
      else {
        return { ...state, cart: [...state.cart.filter(({ id }) => id !== action.payload.id), action.payload] }
      }
    },
    updateItemQty: (state, action) => {
      const update = state.cart.map((a) => {
        if (Number(a.id) === Number(action.payload.id)) {
          return { ...a, qty: action.payload.qty }
        } else {
          return { ...a }
        }
      })

      return { ...state, cart: update };
    },
    deleteItem: (state, action) => {
      const filter = state.cart.filter((e) => e.id !== action.payload.id);
      return { ...state, cart: filter };
    },
    reset: (state) => {
      return { ...state, cart: [] }
    },
    dataBaseValue: (state, action) => {
      return { ...state, cart: action.payload }
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loadedFromDb = true;
      })
      .addCase(deleteCart.fulfilled, (state) => {
        state.cart = [];
      })
      .addCase(postCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(putCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  }
});

export const selectCarts = (state) => state.cart.cart;
export const selectCartLoadedFromDb = (state) => state.cart.loadedFromDb;
export const selectItemsInCart = (state) => state.cart.cart.length ? state.cart.cart.reduce((prev, item) => parseInt(prev) + parseInt(item.qty), 0) : 0;

export const { setCart, loadCart, setItem, deleteItem, updateItemQty, reset, dataBaseValue } = cartSlice.actions;

export default cartSlice.reducer;
