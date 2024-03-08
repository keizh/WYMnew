/* eslint-disable no-unused-vars */
import axios from "../../utils/axios";
import { loadPerson } from "../reducers/PersonDetails";
export { removePerson } from "../reducers/PersonDetails";

const Asyncfetchperson = (id) => async (dispatch, getstate) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combinedCredit = await axios.get(`/person/${id}/combined_credits`);
    const tvCredit = await axios.get(`/person/${id}/tv_credits`);
    const movieCredit = await axios.get(`/person/${id}/movie_credits`);

    const object = {
      detail: detail.data,
      externalid: externalid.data,
      combinedCredit: combinedCredit.data,
      movieCredit: movieCredit.data,
      tvCredit: tvCredit.data,
    };
    // console.log(object);
    dispatch(loadPerson(object));
  } catch (error) {
    console.log(error.message);
  }
};

export default Asyncfetchperson;
