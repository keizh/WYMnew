import { Link } from "react-router-dom";

// items-center justify-around

function SideBarNav() {
  return (
    <div
      className="fixed h-[65px] z-[100] w-full bottom-0 left-0 right-0 flex flex-row  sm:static  sm:w-[65px] xl:w-[300px]  bg-zinc-100 xl:bg-transparent  sm:h-full sm:flex sm:flex-col  xl:justify-around  shrink-0  border-r-2 border-zinc-100 overflow-x-hidden overflow-y-auto
   xl:px-[40px] xl:pt-[20px]
  "
    >
      <h1 className=" hidden sm:flex h-[12.5vh]   items-center xl:items-start justify-center xl:justify-normal  text-2xl xl:text-4xl gap-2 xl:mb-10">
        <i className="text-[#FFBB5C] ri-tv-fill"></i>
        <span className="text-white font-bold hidden xl:block">WYM.</span>
      </h1>

      <h1 className="text-white text-xl font-bold mb-8 hidden xl:block ">
        New Feeds
      </h1>

      <nav className=" w-full    sm:h-[62.5vh] text-[#FFBB5C] xl:text-white text-2xl xl:text-xl flex flex-row sm:flex-col items-center xl:items-stretch justify-around  xl:gap-4 xl:justify-normal ">
        <Link
          to="/trending"
          className="block font-bold shrink-0 hover:bg-[#FFBB5C] duration-150  hover:text-black  xl:p-4 rounded "
        >
          <i className="hover:text-red-900 ri-fire-fill xl:mr-4"></i>{" "}
          <span className="hidden xl:inline "> Trending</span>
        </Link>
        <Link
          to="/popular"
          className="block font-bold hover:bg-[#FFBB5C] duration-150  hover:text-black xl:p-4 rounded"
        >
          <i className="ri-bard-fill xl:mr-4"></i>
          <span className=" hidden xl:inline "> Popular</span>
        </Link>
        <Link
          to="/movie"
          className="block font-bold hover:bg-[#FFBB5C] duration-150  hover:text-black xl:p-4 rounded"
        >
          <i className="ri-movie-2-fill xl:mr-4"></i>
          <span className=" hidden xl:inline "> Movies</span>
        </Link>
        <Link
          to="/tv"
          className="block font-bold hover:bg-[#FFBB5C] duration-150  hover:text-black xl:p-4 rounded"
        >
          <i className="ri-tv-2-fill xl:mr-4"></i>
          <span className=" hidden xl:inline ">Tv Shows</span>
        </Link>{" "}
        <Link
          to="/people"
          className="block  font-bold hover:bg-[#FFBB5C] duration-150  hover:text-black xl:p-4 rounded"
        >
          <i className="ri-group-3-line xl:mr-4"></i>
          <span className=" hidden xl:inline ">People</span>
        </Link>
      </nav>

      <hr className="mb-10 w-full mt-4 hidden  xl:block " />
      <h1 className="text-white text-xl font-bold mb-8 hidden xl:block">
        Website Information
      </h1>

      <nav className=" hidden sm:flex  h-[25vh]  text-[#FFBB5C] xl:text-white text-2xl  xl:text-xl flex-col  xl:items-stretch  items-center xl:items-start justify-around xl:justify-normal xl:gap-4">
        <Link className="block font-bold hover:bg-[#FFBB5C] duration-150  hover:text-black xl:p-4 rounded ">
          <i className="ri-information-2-fill xl:mr-4"></i>
          <span className=" hidden xl:inline ">About</span>
        </Link>
        <Link className="block font-bold hover:bg-[#FFBB5C] duration-150  hover:text-black xl:p-4 rounded">
          <i className="ri-phone-fill xl:mr-4"></i>
          <span className=" hidden xl:inline ">Contact</span>
        </Link>
      </nav>
    </div>
  );
}

export default SideBarNav;

// Component made responsive
