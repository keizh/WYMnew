import { useEffect, useState } from "react";
import Asyncfetchmovie from "../store/actions/MovieAction";
import { useSelector, useDispatch } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { removeMovie } from "../store/actions/MovieAction";
import Loader from "./templates/Loader";
import HorizontalCardsComp from "./templates/HorizontalCardsComp";

function MovieDetailsComp() {
  const { info } = useSelector((state) => state.MovieDetailsReducer);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(Asyncfetchmovie(id));
    return () => {
      dispatch(removeMovie());
    };
  }, [id]);

  return info == null ? (
    <div className="h-screen w-screen flex items-center justify-center bg-black font-black text-white text-xl sm:text-5xl">
      <p className="animation">PLEASE WAIT , Loading ... </p>
    </div>
  ) : (
    <div
      className=" relative h-fit pb-[200px] w-full  text-black py-8 px-4 sm:px-10 md:px-12 md:px-16 xl:px-24 overflow-x-hidden overflow-y-auto flex flex-col gap-10"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)),
              url(https://image.tmdb.org/t/p/original${
                info.detail.backdrop_path || info.detail.poster_path
              })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* part 1: external links */}
      <nav className="flex  text-xl md:text-2xl xl:text-3xl text-white gap-4 items-center">
        <i
          onClick={() => navigate("/movie")}
          className="block ri-arrow-left-line cursor-pointer hover:-translate-x-1 duration:150  "
        ></i>
        {info.external_ids.facebook_id && (
          <a
            target="_blank"
            href={`https://www.facebook.com/${info.external_ids.facebook_id}/`}
          >
            <i className="ri-facebook-circle-fill"></i>
          </a>
        )}
        {info.external_ids.imdb_id && (
          <a
            target="_blank"
            href={`https://www.imdb.com/title/${info.external_ids.imdb_id}/`}
          >
            imdB
          </a>
        )}
        {info.external_ids.instagram_id && (
          <a
            target="_blank"
            href={`https://www.instagram.com/${info.external_ids.instagram_id}/`}
          >
            <i className="ri-instagram-fill"></i>
          </a>
        )}
        {info.external_ids.twitter_id && (
          <a
            target="_blank"
            href={`https://www.twitter.com/${info.external_ids.twitter_id}/`}
          >
            <i className="ri-twitter-fill text-white"></i>
          </a>
        )}
        {info.external_ids.wikidata_id && (
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.external_ids.wikidata_id}/`}
          >
            Wiki
          </a>
        )}
      </nav>
      {/* part 2 : poster & Details  */}
      <div className="flex items-center flex-col xl:flex-row gap-8 h-fit ">
        <div className="h-[50vh] w-auto shrink-0">
          <img
            src={
              info.detail.poster_path || info.detail.backdrop_path
                ? `https://image.tmdb.org/t/p/original${
                    info.detail.poster_path || info.detail.backdrop_path
                  }`
                : `https://as2.ftcdn.net/v2/jpg/04/00/24/31/1000_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg`
            }
            alt=""
            className="h-full"
          />
        </div>
        <div className="flex flex-col gap-[15px]">
          <h1 className="text-2xl sm:text-5xl text-white font-black">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}

            <span className="text-xl ml-2 text-[#aaa]">
              ({info.detail.release_date.split("-")[0]})
            </span>
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white">
            {info.detail.vote_average && (
              <h1>
                <span className=" inline-block  px-2 text-[#FFBB5C] text-2xl font-black bg-white rounded mr-2">
                  {(info.detail.vote_average * 10).toFixed()}%
                </span>
                User Score
              </h1>
            )}
            <span>|</span>
            <h1>{info.detail.genres.map((ele) => ele.name).join(" , ")}</h1>
            <span>|</span>
            <h1>{info.detail.runtime} min</h1>
          </div>
          <h1 className="text-center text-sm text-black font-bold bg-white rounded">
            {info.detail.tagline}
          </h1>
          <h1 className="text-xl text-white uppercase font-bold">overview</h1>
          <h1 className="text-sm text-white">{info.detail.overview}</h1>
          <h1 className="text-xl text-white uppercase font-bold">
            Movie Translation
          </h1>
          <h1 className="text-sm text-white">
            {info.translations.join(" , ")}
          </h1>
        </div>
      </div>
      {/* play-trailer */}
      {info.videos && info.videos.key && (
        <div className="w-full h-fit flex justify-center">
          <Link
            to={`${pathname}/trailer`}
            className="py-6 px-4 bg-[#FFBB5C] text-2xl text-bold rounded  hover:scale-x-110 duration-150"
          >
            <i className="ri-play-fill"></i> Play Trailer
          </Link>
        </div>
      )}

      {info.providers && (
        <div className="w-full h-fit flex flex-col lg:flex-row  items-center gap-[40px] lg:gap-0 lg:justify-around ">
          {info.providers.flatrate && info.providers.flatrate.length > 0 && (
            <div className="flex flex-col w-fit h-fit gap-4">
              <h1 className="text-white text-center font-bold text-xl">
                Available on Platforms
              </h1>
              <div className="flex gap-[10px] justify-center">
                {info.providers.flatrate.map((platform, index) => (
                  <img
                    className="shadow-[2px_2px_10px_10px_#fff] w-[40px]"
                    title={`${platform.provider_name}`}
                    key={index}
                    src={`https://image.tmdb.org/t/p/original${platform.logo_path}`}
                  />
                ))}
              </div>
            </div>
          )}
          {info.providers.buy && info.providers.buy.length > 0 && (
            <div className="flex flex-col w-fit h-fit gap-4">
              <h1 className="text-white font-bold text-center text-xl">
                Available to Buy
              </h1>
              <div className="flex gap-[20px] justify-center">
                {info.providers.buy.map((platform, index) => (
                  <img
                    className="shadow-[2px_2px_5px_5px_#fff] w-[40px]"
                    title={`${platform.provider_name}`}
                    key={index}
                    src={`https://image.tmdb.org/t/p/original${platform.logo_path}`}
                  />
                ))}
              </div>
            </div>
          )}
          {info.providers.rent && info.providers.rent.length > 0 && (
            <div className="flex flex-col w-fit h-fit gap-4">
              <h1 className="text-white font-bold text-xl text-center">
                Available to Rent
              </h1>
              <div className="flex gap-[20px] justify-center">
                {info.providers.rent.map((platform, index) => (
                  <img
                    className="shadow-[2px_2px_5px_5px_#fff] w-[40px]"
                    title={`${platform.provider_name}`}
                    key={index}
                    src={`https://image.tmdb.org/t/p/original${platform.logo_path}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {(info.recommendations !== null) & (info.recommendations.length > 0) ? (
        <>
          <div className="flex justify-center">
            <h1 className="text-3xl text-white font-bold">Recommendations</h1>
          </div>
          <HorizontalCardsComp
            media_type="movie"
            trendingCategoryData={info.recommendations}
          />
        </>
      ) : (info.similar !== null) & (info.similar.length > 0) ? (
        <>
          <div className="flex justify-center">
            <h1 className="text-3xl text-white font-bold">Recommendations</h1>
          </div>
          <HorizontalCardsComp
            media_type="movie"
            trendingCategoryData={info.similar}
          />
        </>
      ) : (
        <div></div>
      )}
      <Outlet />
    </div>
  );
}

export default MovieDetailsComp;
