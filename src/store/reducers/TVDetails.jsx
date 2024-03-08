/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const TVDetailsSlice = createSlice({
  name: "TVDetails",
  initialState,
  reducers: {
    loadTV: (state, action) => {
      state.info = action.payload;
    },
    removeTV: (state, action) => {
      state.info = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadTV, removeTV } = TVDetailsSlice.actions;
export default TVDetailsSlice.reducer;
