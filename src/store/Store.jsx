import { configureStore } from "@reduxjs/toolkit";
import MovieDetailsReducer from "./reducers/MovieDetails.jsx";
import PersonDetailsReducer from "./reducers/PersonDetails.jsx";
import TVDetailsReducer from "./reducers/TVDetails.jsx";

const store = configureStore({
  reducer: {
    MovieDetailsReducer: MovieDetailsReducer,
    PersonDetailsReducer: PersonDetailsReducer,
    TVDetailsReducer: TVDetailsReducer,
  },
});

export default store;
