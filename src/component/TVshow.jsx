/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import DropDown from "./templates/DropDown";
import Cards from "./templates/Cards";
import { useState, useEffect } from "react";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./templates/Loader";

function TVshow() {
  const [loader, setloader] = useState(true);
  const [category, setCategory] = useState("airing_today");

  const [
    tvshowDataThroughCategorySelection,
    settvshowDataThroughCategorySelection,
  ] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const gettvshowData = async () => {
    try {
      setloader(true);
      setHasMoreData(true);

      const data = await axios(`/tv/${category}?page=${page}`);
      // console.log(data.data.results.length);
      if (data.data.results.length === 0) {
        setHasMoreData(false);
      }
      console.log(data.data);
      settvshowDataThroughCategorySelection((prev) => [
        ...prev,
        ...data.data.results,
      ]);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.log(err.message);
    } finally {
      setloader(false);
    }
  };
  useEffect(() => {
    console.log("useEffect");
    settvshowDataThroughCategorySelection([]);
    setPage(1);
    gettvshowData();
  }, [category]);

  useEffect(() => {
    const topnav = document.querySelector("#topnav");
    const handleScroll = () => {
      if (window.scrollY > 10) {
        topnav.classList.add("active-topnav");
      } else {
        topnav.classList.remove("active-topnav");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return tvshowDataThroughCategorySelection.length ? (
    <div className="min-h-fit w-full bg-[#1F1E24] ">
      <div
        id="topnav"
        className="h-fit mt-[0.1px] gap-6 lg:h-[10vh] flex flex-col lg:flex-row justify-center lg:justify-between items-center py-4 px-8  fixed w-full z-10"
      >
        <h1 className="hidden lg:flex text-xl lg:text-3xl text-white ">
          <i
            onClick={() => navigate("/")}
            className="inline-block ri-arrow-left-line cursor-pointer hover:-translate-x-1 duration:150 mr-6 "
          ></i>
          TVShow's
        </h1>

        <div className="flex lg:hidden justify-between h-fit w-full">
          <h1 className="text-xl lg:text-3xl text-white flex">
            <i
              onClick={() => navigate("/")}
              className="inline-block ri-arrow-left-line cursor-pointer hover:-translate-x-1 duration:150 mr-6 "
            ></i>
            Movie
          </h1>
          <DropDown
            options={["airing_today", "on_the_air", "popular", "top_rated"]}
            Setfunc={(cat) => setCategory(cat)}
            defaultSelectedValue="airing_today"
            defaultSelected="Airing Toady"
            state={category}
          />
        </div>
        <TopNav />
        <div className="hidden lg:flex gap-5">
          <DropDown
            options={["airing_today", "on_the_air", "popular", "top_rated"]}
            Setfunc={(cat) => setCategory(cat)}
            defaultSelectedValue="airing_today"
            defaultSelected="Airing Toady"
            state={category}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={tvshowDataThroughCategorySelection.length}
        next={gettvshowData}
        hasMore={hasMoreData}
        loader={<Loader />}
      >
        {" "}
        <Cards data={tvshowDataThroughCategorySelection} media_type="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
}

export default TVshow;
