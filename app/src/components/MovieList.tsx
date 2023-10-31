import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Movie } from "../types";
import Layout from "./Layout";
import { deleteMovie, getMovies } from "./apiService";
import Modal from "./Modal";
import Loading from "./loader/Loading";

const MovieList: React.FC = () => {
  const navigate = useNavigate();
  const [movie, setmovie] = useState<Movie[]>([]);
  const [dialog, setDialog] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    async function getMoviesFromAPI() {
      setIsLoading(true);

      try {
        const response = await getMovies();
        setmovie(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getMoviesFromAPI();
  }, [refresh]);

  const handleDelete = async (id: number) => {
    // setRefresh(true);
    try {
      await deleteMovie(id);
      setIsLoad(true);

      console.log("movie deleted:", id);
      setDialog(true);
    } catch (error: any) {
      console.error("Error deleting movie:", error.message);
    } finally {
      // setRefresh(false);
      // setDialog(false);
      setIsLoad(false);
    }
  };

  return (
    <Layout title="movies">
      <h1>Movies</h1>
      <button onClick={() => navigate("/add")} className="home-add-btn">
        <i className="fa fa-plus kkk"> </i>
      </button>
      <button disabled={isLoading} onClick={() => setRefresh((prev) => !prev)}>
        refresh list
      </button>
      {isLoading ? (
        <>
          <Loading></Loading>
        </>
      ) : (
        <>
          <div className="grid">
            {movie.map((mv) => (
              <div key={mv.id}>
                <article>
                  <h2>movie- {mv.title}</h2>
                  <h3> Year: {mv.year}</h3>

                  <div className="btn-wrap">
                    <button className="edit-btn">
                      <Link to={`/edit/${mv.id}`}>
                        <i className="fa fa-edit"> </i>
                      </Link>
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(mv.id)}
                    >
                      {isLoad ? (
                        <>
                          <Loading></Loading>
                        </>
                      ) : (
                        <>
                          <i className="fa fa-trash-o"></i>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>

          <Modal dialog={dialog} setDialog={setDialog} />
        </>
      )}
    </Layout>
  );
};

export default MovieList;
