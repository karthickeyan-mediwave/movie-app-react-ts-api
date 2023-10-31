import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Movie } from "../types";
import Layout from "./Layout";
import { deleteMovie, getMovies } from "./apiService";
import Loading from "./loader/Loading";
import { useModal } from "./Checkmodal";
import Modal1 from "./Checkmodal";
const MovieList: React.FC = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMovieId, setLoadingMovieId] = useState<number | null>(null);
  const { isOpen, toggle } = useModal();

  useEffect(() => {
    async function getMoviesFromAPI() {
      setIsLoading(true);
      try {
        const response = await getMovies();
        setMovies(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getMoviesFromAPI();
  }, [refresh]);
  const handleDelete = async (id: number) => {
    setLoadingMovieId(id);

    try {
      await deleteMovie(id);
      console.log("movie deleted:", id);
      toggle();
    } catch (error: any) {
      console.error("Error deleting movie:", error.message);
    } finally {
      setLoadingMovieId(null);
    }
  };
  function handlecancel() {
    setRefresh(true);
    toggle();
    navigate("/");
  }

  return (
    <Layout title="movies">
      <h1>Movies</h1>
      <button onClick={() => navigate("/add")} className="home-add-btn">
        <i className="fa fa-plus kkk"> </i>
      </button>
      {isLoading ? (
        <>
          <Loading></Loading>
        </>
      ) : (
        <>
          <button
            disabled={isLoading}
            onClick={() => setRefresh((prev) => !prev)}
          >
            refresh list
          </button>
          <div className="grid">
            {movies.map((movie) => (
              <div key={movie.id}>
                <article>
                  <h2>movie- {movie.title}</h2>
                  <h3> Year: {movie.year}</h3>
                  <div className="btn-wrap">
                    <button className="edit-btn">
                      <Link to={`/edit/${movie.id}`}>
                        <i className="fa fa-edit"> </i>
                      </Link>
                    </button>

                    {loadingMovieId === movie.id ? (
                      <Loading></Loading>
                    ) : (
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(movie.id)}
                      >
                        <i className="fa fa-trash-o"></i>{" "}
                      </button>
                    )}
                  </div>
                </article>
              </div>
            ))}
          </div>
          <Modal1 isOpen={isOpen} toggle={toggle}>
            <p> movie deleted successfully</p>
            <footer>
              <button onClick={handlecancel}>ok </button>
            </footer>
          </Modal1>
        </>
      )}
    </Layout>
  );
};
export default MovieList;
