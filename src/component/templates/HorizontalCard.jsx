/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import DropDown from "./DropDown";
import { Link } from "react-router-dom";
import HorizontalCardsComp from "./HorizontalCardsComp";

function HorizontalCard({
  trendingCategoryData,
  trendingCategory,
  setTrendingCategory,
}) {
  return (
    <div className="w-full h-fit">
      <div className="flex justify-between px-6 py-2 font-bold">
        <h1 className="text-white text-xl sm:text-3xl">Trending</h1>
        <DropDown
          options={["all", "movie", "tv"]}
          Setfunc={setTrendingCategory}
          defaultSelectedValue="all"
          defaultSelected="Category"
        />
      </div>

      {/* <div className="flex gap-4 w-full overflow-x-scroll overflow-y-hidden px-4">
        {trendingCategoryData.map((data, index) => (
          <div
            key={index}
            className=" w-[250px] h-fit shadow-zinc-400 shrink-0 mb-4 "
          >
            <Link to={`/${data.media_type}/details/${data.id}`}>
              {" "}
              <img
                src={
                  data.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
                    : `https://as2.ftcdn.net/v2/jpg/04/00/24/31/1000_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg`
                }
                alt=""
                className={`${
                  data.backdrop_path ? "w-[250px]" : "w-[250px] h-[140px]"
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
      </div> */}
      <HorizontalCardsComp trendingCategoryData={trendingCategoryData} />
    </div>
  );
}

export default HorizontalCard;
