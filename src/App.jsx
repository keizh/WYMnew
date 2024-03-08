import { Route, Routes } from "react-router-dom";
import Home from "./component/Home.jsx";
import Trending from "./component/Trending.jsx";
import Popular from "./component/Popular.jsx";
import Movies from "./component/Movies.jsx";
import MovieDetailsComp from "./component/MovieDetailsComp.jsx";

import TVshow from "./component/TVshow.jsx";
import People from "./component/People.jsx";
import PersonDetailsComp from "./component/PersonDetailsComp.jsx";
import TVDetailsComp from "./component/TVDetailsComp.jsx";
import NotFound from "./component/NotFound.jsx";
import Trailer from "./component/Trailer.jsx";

function App() {
  return (
    <div className="h-screen w-full relative">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/trailer" element={<Trailer />} />
        </Route>
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/movie/details/:id" element={<MovieDetailsComp />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/tv" element={<TVshow />} />
        <Route path="/tv/details/:id" element={<TVDetailsComp />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/people" element={<People />} />
        <Route path="/people/details/:id" element={<PersonDetailsComp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
