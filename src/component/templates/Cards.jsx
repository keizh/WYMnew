/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function Cards({ data, media_type }) {
  return (
    <div className="w-full mt-[200px] lg:mt-20 pl-[20px] sm:px-24 py-8 flex flex-wrap gap-10 ">
      {data.map((show, index) => {
        return (
          <Link
            to={`/${show.media_type || media_type}/details/${show.id}`}
            key={index}
            className="w-[150px] sm:w-[200px] h-fit"
          >
            <div className=" relative w-fit ">
              <img
                src={
                  show.poster_path || show.backdrop_path || show.profile_path
                    ? `https://image.tmdb.org/t/p/original${
                        show.poster_path ||
                        show.backdrop_path ||
                        show.profile_path
                      }`
                    : `https://as2.ftcdn.net/v2/jpg/04/00/24/31/1000_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg`
                }
                alt=""
                className=" h-fit"
              />
              {show.vote_average && (
                <div className="absolute text-black text-bold text-base sm:text-2xl rounded-full bg-[#ffbb5c] top-[0] translate-x-[50%] -translate-y-[50%] right-[50%] sm:right-[0] p-[10px]">
                  <i className="ri-star-s-fill"></i>
                  {show.vote_average.toFixed()}
                </div>
              )}
            </div>
            <h1 className="text-xl xl:text-2xl font-bold text-white ">
              {show.title ||
                show.name ||
                show.original_name ||
                show.original_title}
            </h1>
          </Link>
        );
      })}
    </div>
  );
}

export default Cards;
