import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  size: { width: 0, height: 0 },
  activeCard: 0,
  cartGot: false,
};

export const windowSlice = createSlice({
  name: "window",
  initialState: initialState,
  reducers: {
    setCartGot: (state, action) => {
      state.cartGot = action.payload;
    },
    setWindowSize: (state, action) => {
      state.size = action.payload;
    },
    desactiveCard: (state) => {
      state.activeCard = 0;
    },
    activeCard: (state, action) => {
      state.activeCard = action.payload;
    }
  },
});

export const selectWindowSize = (state) => state.window.size;
export const selectActiveCard = (state) => state.window.activeCard;
export const selectCartGot = (state) => state.window.cartGot;

export const { setWindowSize, desactiveCard, activeCard, setCartGot } = windowSlice.actions;

export default windowSlice.reducer;