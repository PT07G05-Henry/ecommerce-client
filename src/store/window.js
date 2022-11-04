import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  size: { width: 0, height: 0 },
};

export const windowSlice = createSlice({
  name: "window",
  initialState: initialState,
  reducers: {
    setWindowSize: (state, action)=>{
        state.size=action.payload;
    },
  },
});

export const selectWindowSize = (state) => state.window.size;

export const { setWindowSize } = windowSlice.actions;

export default windowSlice.reducer;