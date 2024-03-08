/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function HorizontalCardsComp({
  trendingCategoryData,
  media_type = null,
  poster = false,
  type = "",
}) {
  return (
    <div className="flex gap-6 w-full overflow-x-scroll overflow-y-hidden px-4 ">
      {trendingCategoryData.map((data, index) => (
        <div
          key={index}
          className=" w-[250px]  h-fit shadow-zinc-400 shrink-0 mb-4  "
        >
          <Link
            to={
              type != "seasons"
                ? `/${data.media_type || media_type}/details/${data.id}`
                : ""
            }
          >
            {" "}
            <img
              src={
                data.poster_path || data.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${
                      data.poster_path || data.backdrop_path
                    }`
                  : `https://as2.ftcdn.net/v2/jpg/04/00/24/31/1000_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg`
              }
              alt=""
              className={`${
                data.backdrop_path ? "w-[250px]" : "w-[250px] h-auto"
              }`}
            />
          </Link>

          <h1 className="text-2xl font-bold mt-2 text-white">
            {(
              data.title ||
              data.name ||
              data.original_name ||
              data.original_title
            ).substring(0, 20)}
          </h1>
          <p className="text-white  text-sm ">
            {data.overview.substring(0, 80)}...
            <Link
              className="text-zinc-400"
              to={`/${data.media_type}/details/${data.id}`}
            >
              more
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
}

export default HorizontalCardsComp;
