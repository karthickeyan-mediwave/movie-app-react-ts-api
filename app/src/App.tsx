import { Routes, Route, BrowserRouter } from "react-router-dom";
import MovieList from "./components/MovieList";
import EditMovie from "./components/EditMovie";
import AddMovie from "./components/AddMovie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/add" element={<AddMovie />} />
        <Route path="/edit/:id" element={<EditMovie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
