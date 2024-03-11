/* eslint-disable no-unused-vars */
import axios from "../../utils/axios";
import { loadMovie } from "../reducers/MovieDetails";
export { removeMovie } from "../reducers/MovieDetails";
import { useNavigate } from "react-router-dom";

const Asyncfetchmovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const external_ids = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const providers = await axios.get(`/movie/${id}/watch/providers`);
    const translations = await axios.get(`/movie/${id}/translations`);

    var movieObject = {
      detail: detail.data,
      external_ids: external_ids.data,
      recommendations: recommendations.data.results,
      videos: videos.data.results.find((item) => item.type === "Trailer"),
      similar: similar.data.results,
      providers: providers.data.results.IN,
      translations: translations.data.translations.map(
        (ele) => ele.english_name
      ),
    };

    console.log(movieObject);

    dispatch(loadMovie(movieObject));
  } catch (error) {
    console.log(error.message);
  }
};

export default Asyncfetchmovie;
