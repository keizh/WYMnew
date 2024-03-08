/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "../utils/axios";
import Loader from "./templates/Loader";
import SideBarNav from "./templates/SideBarNav";
import TopNav from "./templates/TopNav";
import Header from "./templates/Header";
import HorizontalCard from "./templates/HorizontalCard";
import { Outlet } from "react-router-dom";

function Home() {
  document.title = "WYM Home ";
  // STATE TO STORE ALL TRENDING DATA
  const [trending, setTrending] = useState(null);
  // TO DISPLAY IS LOADING STATE WHEN DATA IS YET TO BE RETRIEVED
  const [isLoading, setIsLoading] = useState(true);
  /* BY DEFAULT WE ARE STORING THE TRENDING CATEGORY , WHEN WE UPDATE CATEGORY THROUGH THE DROPDOWN
  THE DATA IS REFETCHED */
  const [trendingCategory, setTrendingCategory] = useState("all");

  const [trendingCategoryData, setTrendingCategoryData] = useState(null);

  const getTrending = async function () {
    try {
      setIsLoading(true);
      // by default trendingCategory = 'all' which will FETCH trending data irreespective of it being TV , Movie
      // The Header wallpaper is set Dynamically using trending state
      // If the category is changed through dropdown it will react accordingly
      const data = await axios.get(`trending/${trendingCategory}/day`);

      // trending state will be passed to Header component to display trending wallpaper
      // setTrending(
      //   data.data.results[(Math.random() * data.data.results.length).toFixed()]
      // );

      setTrending(data.data.results);

      // trendingCategoryData state for HorizontalCards
      // Depending on DropDown , category will keep on changing
      setTrendingCategoryData(data.data.results);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTrending();
  }, [trendingCategory]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="h-screen w-screen flex overflow-x-hidden overflow-y-hidden bg-[#1F1E24]">
      <SideBarNav />
      <div className="h-150vh w-[100%] pb-[50px] sm:w-[calc(100%-65px)] xl:w-[calc(100%-300px)] shrink-0 overflow-y-auto bg-[#1F1E24]">
        <TopNav />
        <Header trending={trending} />
        <HorizontalCard
          trendingCategoryData={trendingCategoryData}
          trendingCategory={trendingCategory}
          setTrendingCategory={setTrendingCategory}
        />
      </div>
      <Outlet />
    </div>
  );
}
export default Home;

// Home component completed
