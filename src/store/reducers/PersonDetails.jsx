/* eslint-disable no-unused-vars */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const PersonDetialsSlice = createSlice({
  name: "PersonDetails",
  initialState,
  reducers: {
    loadPerson: (state, action) => {
      state.info = action.payload;
    },
    removePerson: (state, action) => {
      state.info = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadPerson, removePerson } = PersonDetialsSlice.actions;
export default PersonDetialsSlice.reducer;
