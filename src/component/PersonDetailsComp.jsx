/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Asyncfetchperson from "../store/actions/PersonAction";
import { useSelector, useDispatch } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { removePerson } from "../store/actions/PersonAction";
import Loader from "./templates/Loader";
import HorizontalCardsComp from "./templates/HorizontalCardsComp";
import DropDown from "./templates/DropDown";

function PersonDetailsComp() {
  const { info } = useSelector((state) => state.PersonDetailsReducer);
  console.log(info);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  useEffect(() => {
    dispatch(Asyncfetchperson(id));

    return () => {
      dispatch(removePerson());
    };
  }, [id]);

  return info != null ? (
    <div className="relative h-fit bg-[#1F1E24] pb-[200px] w-full  text-black py-8 px-4 sm:px-10 md:px-12 md:px-16 xl:px-24 overflow-x-hidden  flex flex-col gap-10">
      {/* Navigation */}
      <nav className="flex  text-xl md:text-2xl xl:text-3xl text-white gap-4 items-center">
        <i
          onClick={() => navigate("/people")}
          className="block ri-arrow-left-line cursor-pointer hover:-translate-x-1 duration:150  "
        ></i>
      </nav>

      <div className="w-full h-fit flex gap-10 flex-col items-center lg:flex-row lg:items-start">
        {/* Left |  Poster and Details */}
        <div className="Left w-[250px] md:w-[300px] h-fit shrink-0  ">
          <img
            src={
              info.detail.profile_path
                ? `https://image.tmdb.org/t/p/original${info.detail.profile_path}`
                : `https://as2.ftcdn.net/v2/jpg/04/00/24/31/1000_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg`
            }
            alt=""
            className="w-full  shrink-0 "
          />
          <h1 className="font-black text-2xl text-center text-[#ddd] lg:hidden">
            {info.detail.name}
          </h1>
          <hr className="mt-10" />
          <div className="flex justify-between w-full  text-white text-3xl pt-4">
            {info.externalid.facebook_id && (
              <a
                target="_blank"
                href={`https://www.facebook.com/${info.externalid.facebook_id}/`}
              >
                <i className="ri-facebook-circle-fill"></i>
              </a>
            )}
            {info.externalid.instagram_id && (
              <a
                target="_blank"
                href={`https://www.instagram.com/${info.externalid.instagram_id}/`}
              >
                <i className="ri-instagram-fill"></i>
              </a>
            )}
            {info.externalid.twitter_id && (
              <a
                target="_blank"
                href={`https://www.twitter.com/${info.externalid.twitter_id}/`}
              >
                <i className="ri-twitter-fill text-white"></i>
              </a>
            )}
            {info.externalid.wikidata_id && (
              <a
                target="_blank"
                href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}/`}
              >
                Wiki
              </a>
            )}
          </div>

          <div className=" w-full  text-3xl text-[#ddd] font-bold my-6">
            <h1>Person Info</h1>
          </div>

          <div className=" w-full text-[#ddd]  mb-4">
            <h1 className="text-2xl font-semibold">Known for</h1>
            <h1 className="text-xl">{info.detail.known_for_department}</h1>
          </div>
          <div className=" w-full text-[#ddd]  mb-4">
            <h1 className="text-2xl font-semibold">Gender</h1>
            <h1 className="text-xl">
              {info.detail.gender == 2 ? "Male" : "Female"}
            </h1>
          </div>

          <div className=" w-full text-[#ddd]  mb-4">
            <h1 className="text-2xl font-semibold">Birthday</h1>
            <h1 className="text-xl">{info.detail.birthday}</h1>
          </div>
          <div className=" w-full text-[#ddd]  mb-4">
            <h1 className="text-2xl font-semibold">Deathday</h1>
            <h1 className="text-xl">
              {info.detail.deathday == null
                ? "Alive and Kicking"
                : info.detail.deathday}
            </h1>
          </div>
          <div className=" w-full text-[#ddd]  mb-4">
            <h1 className="text-2xl font-semibold">Place Of Birth</h1>
            <h1 className="text-xl">{info.detail.place_of_birth}</h1>
          </div>
          <div className=" w-full text-[#ddd]  mb-4">
            <h1 className="text-2xl font-semibold">Also Known as</h1>
            <h1 className="text-xl">{info.detail.also_known_as}</h1>
          </div>
        </div>
        <div className="Right w-full  lg:w-[calc(100%-300px)] h-fit flex flex-col gap-6">
          <h1 className="font-black text-5xl text-[#ddd]">
            {info.detail.name}
          </h1>

          <div className=" w-full text-[#ddd]  mb-4 flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Biography</h1>
            <h1 className="text-xl">{info.detail.biography}</h1>
          </div>

          <div className=" w-full text-[#ddd]  mb-4 flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Biography</h1>
            <HorizontalCardsComp
              trendingCategoryData={info.combinedCredit.cast}
            />
          </div>

          <div className=" w-full text-[#ddd]  mb-4 flex flex-col gap-4">
            <div className=" w-full flex flex-row justify-between">
              <h1 className="text-2xl font-semibold">Acting</h1>
              <DropDown
                options={["movie", "tv"]}
                state={category}
                Setfunc={setCategory}
              />
            </div>
            <div className="list-disc h-[60vh] w-full shadow-[0px_0px_10px_5px_white] p-4 overflow-y-scroll flex flex-col gap-6">
              {info[category + "Credit"].cast.map((item, index) => (
                <Link
                  key={index}
                  className=""
                  to={`/${category}/details/${item.id}`}
                >
                  <li>
                    <span>
                      {item.name ||
                        item.title ||
                        item.original_name ||
                        item.original_title}
                    </span>
                    <br />
                    <span className="ml-6">Character : {item.character}</span>
                  </li>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black font-black text-white text-xl sm:text-5xl">
      <p className="animation">PLEASE WAIT , Loading ... </p>
      <p className="text-base">API is Free,HenceForth SLOW</p>
    </div>
  );
}

export default PersonDetailsComp;
