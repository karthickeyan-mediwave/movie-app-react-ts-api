import { Routes, Route, BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
const AddMovie = lazy(() => import("./components/AddMovie"));
const EditMovie = lazy(() => import("./components/EditMovie"));
const MovieList = lazy(() => import("./components/MovieList"));
import Loading from "./components/loader/Loading";
function Load() {
  return <Loading></Loading>;
}

function App() {
  return (
    <Suspense fallback={<Load />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="/edit/:id" element={<EditMovie />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
