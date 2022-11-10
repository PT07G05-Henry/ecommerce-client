import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export const initialState = {
  cart: [],
};

/*
Esperamos que en las action creator donde manden producto y cantidad sean mandados
: 
{  id:id producto, qty: cantidad} */

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
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
});

export const selectCarts = (state) => state.cart.cart;
export const selectItemsInCart = (state) => state.cart.cart.length ? state.cart.cart.reduce((prev, item) => parseInt(prev) + parseInt(item.qty), 0) : 0;

export const { setItem, deleteItem, updateItemQty, reset, dataBaseValue } = cartSlice.actions;

export default cartSlice.reducer;
