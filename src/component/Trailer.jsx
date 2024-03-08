import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Trailer() {
  const [screenWidth, setScreenWidth] = useState(window.innerwidth);
  const [width, setWidth] = useState(640);
  const [height, setHeight] = useState(360);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie")
    ? "MovieDetailsReducer"
    : "TVDetailsReducer";
  const yttrailer = useSelector((state) => state[category].info.videos.key);
  useEffect(() => {
    //   const navigatefn = () => {
    //     navigate(-1);
    //   };

    //   document
    //     .querySelector(".trailerArea")
    //     .addEventListener("click", navigatefn);

    const job = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", job);
    return () => {
      // document
      //   .querySelector(".trailerArea")
      //   .document.removeEventListener("click", navigatefn);
      window.addEventListener("resize", job);
    };
  }, []);

  useEffect(() => {
    if (screenWidth < 700) {
      setHeight(166);
      setWidth(300);
    } else if (screenWidth >= 700) {
      setHeight(360);
      setWidth(640);
    }
  }, [screenWidth]);

  console.log(yttrailer);
  return (
    <div
      style={{ background: `rgb(0,0,0,0.9)` }}
      className="trailerArea fixed z-[100] h-screen w-screen top-0 left-0 flex items-center justify-center"
    >
      <i
        onClick={() => navigate(-1)}
        className="inline-block text-white absolute top-[10%] right-[10%] text-3xl block ri-close-large-line cursor-pointer hover:text-red-500 duration-150 "
      ></i>
      <ReactPlayer
        controls
        height={height}
        width={width}
        url={`https://www.youtube.com/watch?v=${yttrailer}`}
      />
    </div>
  );
}

export default Trailer;
