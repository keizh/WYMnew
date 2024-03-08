/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import DropDown from "./templates/DropDown";
import Cards from "./templates/Cards";
import { useState, useEffect } from "react";
import axios from "../utils/axios";
import Loader from "./templates/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

function People() {
  document.title = "WYM Actor's";
  // category is set default Movie
  // by default the drop down box is also selected now_playing
  const [loader, setloader] = useState(true);
  const [people, setPeople] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const getPeopleData = async () => {
    try {
      setloader(true);
      setHasMoreData(true);
      const data = await axios(`/person/popular?page=${page}`);
      if (data.data.results.length === 0) {
        setHasMoreData(false);
      }
      setPeople((prev) => [...prev, ...data.data.results]);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.log(err.message);
    } finally {
      setloader(false);
    }
  };

  useEffect(() => {
    setPeople([]);
    setPage(1);
    getPeopleData();
  }, []);

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
  return people.length > 0 ? (
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
          Actor
        </h1>

        <div className="flex lg:hidden justify-between h-fit w-full">
          <h1 className="text-xl lg:text-3xl text-white flex">
            <i
              onClick={() => navigate("/")}
              className="inline-block ri-arrow-left-line cursor-pointer hover:-translate-x-1 duration:150 mr-6 "
            ></i>
            Actor
          </h1>
        </div>
        <TopNav />
      </div>
      <InfiniteScroll
        dataLength={people.length}
        next={getPeopleData}
        hasMore={hasMoreData}
        loader={<Loader />}
      >
        <Cards data={people} media_type={"people"} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
}

export default People;
