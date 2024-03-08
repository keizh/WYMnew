/* eslint-disable no-unused-vars */
import axios from "../../utils/axios";
import { loadTV } from "../reducers/TVDetails";
export { removeTV } from "../reducers/TVDetails";

const Asyncfetchtvshow = (id) => async (dispatch, getstate) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const external_ids = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const providers = await axios.get(`/tv/${id}/watch/providers`);
    const translations = await axios.get(`/tv/${id}/translations`);

    var TVObject = {
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

    console.log(TVObject);

    dispatch(loadTV(TVObject));
  } catch (error) {
    console.log(error.message);
  }
};

export default Asyncfetchtvshow;
