import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cart: [],
};

/*
Esperamos que en las actioncreator donde manden producto y cantidad sean mandados
: 
{  id:id prtoducto, qty: cantidad} */

export const chartSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    setItem: (state, action) => {
      if (state.cart.findIndex((a) => a.id === action.payload.id) === -1)
        state.cart.push(action.payload);
      else {
        if (!action.payload.qty)
          state.cart = state.cart.filter((a) => a.id !== action.payload.id);
        else
          state.cart[
            state.cart.findIndex((a) => a.id === action.payload.id)
          ].qty = action.payload.qty;
      }
    },
  },
});

export const selectCart = (state) => state.cart.cart;

export const { setItem } = chartSlice.actions;

export default chartSlice.reducer;
