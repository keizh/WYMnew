/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const MovieDetialsSlice = createSlice({
  name: "MovieDetails",
  initialState,
  reducers: {
    loadMovie: (state, action) => {
      state.info = action.payload;
    },
    removeMovie: (state, action) => {
      state.info = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadMovie, removeMovie } = MovieDetialsSlice.actions;

export default MovieDetialsSlice.reducer;
