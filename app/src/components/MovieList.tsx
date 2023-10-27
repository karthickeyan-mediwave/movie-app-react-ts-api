import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Todo } from "../types";
import Layout from "./Layout";
import { deleteMovie, getMovies } from "./apiService";
import Modal from "./Modal";

const MovieList: React.FC = () => {
  const navigate = useNavigate();
  const [movie, setmovie] = useState<Todo[]>([]);
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    async function getMoviesFromAPI() {
      try {
        const response = await getMovies();
        setmovie(response);
      } catch (error) {
        console.log(error);
      }
    }
    getMoviesFromAPI();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteMovie(id);
      console.log("movie deleted:", id);
      setDialog(true);
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <Layout title="movies">
      <h1>Movies</h1>
      <button onClick={() => navigate("/add")} className="home-add-btn">
        <i className="fa fa-plus kkk"> </i>
      </button>

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
                  <i className="fa fa-trash-o"></i>
                </button>
              </div>
            </article>
          </div>
        ))}
      </div>

      <Modal dialog={dialog} setDialog={setDialog} />
    </Layout>
  );
};

export default MovieList;
