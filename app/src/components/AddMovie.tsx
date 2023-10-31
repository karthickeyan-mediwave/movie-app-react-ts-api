import React, { useState } from "react";
import Layout from "./Layout";
import MovieForm from "./MovieForm";
import { Movie1 } from "../types";
import { createMovie } from "./apiService";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import Modal1 from "./Checkmodal";
import { useModal } from "./Checkmodal";
const AddMovie: React.FC = () => {
  const navigate = useNavigate();

  const [dialog, setDialog] = useState(false);
  const [error, setError] = useState(null);
  const { isOpen, toggle } = useModal();

  const handleMovieAdded = async (movie: Movie1) => {
    try {
      await createMovie(movie);
      console.log("Movie created:", movie);
      // setDialog(true);
      toggle();
    } catch (error: any) {
      console.error("Error creating movie:", error.message);
      setError(error.message);
    }
  };
  if (error) {
    return (
      <main>
        <dialog open>
          <article>
            <h3>{error}</h3>
            <footer>
              <button onClick={() => navigate("/")}>ok</button>
            </footer>
          </article>
        </dialog>
      </main>
    );
  }
  function handlecancel() {
    setDialog(false);
    toggle();
    navigate("/");
  }
  return (
    <Layout title="movies/addmovies">
      <h2 className="add-title">Add movie</h2>
      <MovieForm onSubmit={handleMovieAdded} />
      <Modal dialog={dialog} setDialog={setDialog} />
      <Modal1 isOpen={isOpen} toggle={toggle}>
        <p> movie added successfully</p>
        <footer>
          <button onClick={handlecancel}>ok </button>
        </footer>
      </Modal1>
      <button onClick={() => navigate("/")} className="home-add-btn">
        Back
      </button>
    </Layout>
  );
};

export default AddMovie;
