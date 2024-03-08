/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

function Header({ trending }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [wordcount, setWordCount] = useState(200);
  console.log(trending);
  useEffect(() => {
    const handlescreenResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handlescreenResize);

    return () => {
      window.removeEventListener("resize", handlescreenResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth >= 600) {
      setWordCount(200);
      console.log(200);
    } else {
      setWordCount(100);
      console.log(100);
    }
  }, [screenWidth]);

  return (
    <swiper-container
      className="h-fit w-fit"
      navigation="true"
      loop="true"
      speed="100"
    >
      {trending.map((trend, index) => (
        <swiper-slide className="h-fit w-fit" key={index}>
          <Link
            className="block h-[70vh] xl:h-[60vh] w-full flex flex-col justify-end items-start p-[5%] text-white"
            to={`/${trend.media_type}/details/${trend.id}`}
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)),
               url(https://image.tmdb.org/t/p/original${
                 trend.backdrop_path || trend.poster_path
               })`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h1 className="sm:texl-xl md:text-2xl lg:text-4xl xl:text-5xl font-black mb-[20px] text-white ">
              {trend.title ||
                trend.name ||
                trend.original_name ||
                trend.original_title}
            </h1>
            <p className="w-[40%] font-bold text-[10px]  sm:text-[15px]  ">
              {trend.overview.substring(0, wordcount)}
              <Link
                to={`${trend.media_type}/details/${trend.id}`}
                className="text-blue-500"
              >
                {" "}
                More...
              </Link>
            </p>
            <div className="flex gap-10 text-sm sm:text-2xl text-white mt-6 font-bold">
              <div>
                <i className="ri-megaphone-fill text-[#FFBB5C]  mr-1"></i>{" "}
                <span>{trend.release_date || ""}</span>
              </div>
              <div>
                <i className="ri-play-circle-fill text-[#FFBB5C] mr-1"></i>{" "}
                <span>{trend.media_type || ""}</span>
              </div>
            </div>

            <Link
              to={`/${trend.media_type}/details/${trend.id}/trailer`}
              className="bg-[#FFBB5C] p-5 text-xl sm:text-2xl font-bold rounded mt-6 text-black hover:scale-x-110 duration-150"
            >
              Watch Trailer
            </Link>
          </Link>
        </swiper-slide>
      ))}
    </swiper-container>
  );
}

export default Header;
