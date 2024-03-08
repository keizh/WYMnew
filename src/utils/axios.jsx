import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTHO}`,
  },
});

export default instance;

// CUSTOM HOOK AXIOS COMPLETE
// Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
