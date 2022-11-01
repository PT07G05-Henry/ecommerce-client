import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

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
      if (state.cart.findIndex((a) => a.id === action.payload.id) === -1) {
        return { ...state, cart: [...state.cart, action.payload] };
      }
    },
    updateItemQty: (state, action) => {
      const update = state.cart.map((a)=>{
        if(Number(a.id) === Number(action.payload.id)){
          return {...a, qty:action.payload.qty}          
        }else{
          return {...a}
        }
      })

      return {...state, cart: update};
    },
    deleteItem: (state, action) => {
      const filter = state.cart.filter((e) => e.id !== action.payload.id);
      return { ...state, cart: filter };
    },
  },
});

export const selectCarts = (state) => state.cart.cart;

export const { setItem, deleteItem, updateItemQty } = cartSlice.actions;

export default cartSlice.reducer;
