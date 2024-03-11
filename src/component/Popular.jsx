/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav.jsx";
import DropDown from "./templates/DropDown.jsx";
import Cards from "./templates/Cards";
import { useState, useEffect } from "react";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./templates/Loader.jsx";
import NotFound from "./NotFound.jsx";

function Popular() {
  document.title = "WYM Popular";
  // category is set default all
  // by default the drop down box is also selected all
  // but this all has nothing to do with the default value given to the drop down
  const [loader, setloader] = useState(false);
  const [category, setCategory] = useState("movie");
  // this state is used for both category change and duration change
  const [
    popularDataThroughCategorySelection,
    setPopularDataThroughCategorySelection,
  ] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const getpopularData = async () => {
    try {
      setloader(true);
      setHasMoreData(true);
      const data = await axios(`/${category}/popular?page=${page}`);

      if (data.data.results.length === 0) {
        setHasMoreData(false);
      }

      setPopularDataThroughCategorySelection((prev) => [
        ...prev,
        ...data.data.results,
      ]);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.log(err.message);
      setError(true);
      if (error == true) {
        return <NotFound />;
      }
    } finally {
      setloader(false);
    }
  };

  useEffect(() => {
    setPopularDataThroughCategorySelection([]);
    setPage(1);
    getpopularData();
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

  return popularDataThroughCategorySelection.length ? (
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
          Popular
        </h1>

        <div className="flex lg:hidden justify-between h-fit w-full">
          <h1 className="text-xl lg:text-3xl text-white flex">
            <i
              onClick={() => navigate("/")}
              className="inline-block ri-arrow-left-line cursor-pointer hover:-translate-x-1 duration:150 mr-6 "
            ></i>
            Popular
          </h1>
          <DropDown
            options={["movie", "tv"]}
            Setfunc={(cat) => setCategory(cat)}
            defaultSelectedValue="movie"
            defaultSelected="Movie"
            state={category}
          />
        </div>
        <TopNav />
        <div className="hidden lg:flex gap-5">
          <DropDown
            options={["movie", "tv"]}
            Setfunc={(cat) => setCategory(cat)}
            defaultSelectedValue="movie"
            defaultSelected="Movie"
            state={category}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={popularDataThroughCategorySelection.length}
        next={getpopularData}
        hasMore={hasMoreData}
        loader={<Loader />}
      >
        <Cards
          data={popularDataThroughCategorySelection}
          media_type={category}
        />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
}

export default Popular;
