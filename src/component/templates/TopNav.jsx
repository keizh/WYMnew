/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "../../utils/axios";

function TopNav({ width = "full", widthofinputandresultbelowBox = `50%` }) {
  // query state for storing input tag searched data
  const [query, setQuery] = useState("");
  // for storing the data aquired from api using query state ~ input tag
  const [searchData, setSearchData] = useState(null);
  const search = useRef(null);

  //   api fetch data
  const getSearches = async function () {
    try {
      const data = await axios.get(`/search/multi?query=${query}`);
      setSearchData(data.data.results);
      // console.log(data.data.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  useEffect(() => {
    const handleKeyDown = function (e) {
      if (e.key === "Escape") {
        if (search.current) {
          search.current.blur();
          setSearchData([]);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`relative h-[8vh] w-full  flex gap-[1vw] justify-center items-center text-white py-4 px-2 bg-[#444] lg:bg-transparent rounded-lg`}
    >
      <i className="ri-search-line text-xl  xl:text-3xl cursor-pointer"></i>

      <input
        ref={search}
        type="text"
        className={`bg-transparent w-[80%] xl:w-[70%] text-white text-sm xl:text-2xl p-4 outline-none`}
        placeholder="search anything"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <i
        className={`ri-close-line text-xl  text-3xl mr-6 cursor-pointer ${
          query
            ? `text-white pointer-events-auto`
            : `text-transparent pointer-events-none`
        }`}
        onClick={() => setQuery("")}
      ></i>

      {query && searchData && (
        <div
          className={`absolute z-50 top-[100%] max-h-[60vh] w-[80%] xl:w-[70%] bg-zinc-100  rounded overflow-y-scroll`}
        >
          {searchData &&
            searchData.map((item, index) => (
              <Link
                key={index}
                to={`/${item.media_type}/details/${item.id}`}
                className="inline-block w-full px-2 xl:px-5 h-[100px] xl:h-[200px] flex items-center justify-start text-zinc-700 border-b-2 text-sm xl:text-3xl"
              >
                <img
                  src={
                    item.poster_path || item.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500${
                          item.poster_path || item.backdrop_path
                        }`
                      : `https://as2.ftcdn.net/v2/jpg/04/00/24/31/1000_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg`
                  }
                  alt=""
                  className="mr-4 h-[80px] xl:h-[150px] w-auto"
                />
                <h1 className="font-medium ">
                  {item.title ||
                    item.name ||
                    item.original_name ||
                    item.original_title}
                </h1>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

export default TopNav;
