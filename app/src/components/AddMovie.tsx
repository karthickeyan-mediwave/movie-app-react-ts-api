import React, { useState } from "react";
import Layout from "./Layout";
import MovieForm from "./MovieForm";
import { Todo1 } from "../types";
import { createMovie } from "./apiService";
import Modal from "./Modal";

const AddMovie: React.FC = () => {
  const [dialog, setDialog] = useState(false);
  const [error, setError] = useState(null);

  const handleMovieAdded = async (movie: Todo1) => {
    try {
      await createMovie(movie);
      console.log("Movie created:", movie);
      setDialog(true);
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
              <a href="/" role="button" className="secondary">
                Cancel
              </a>
            </footer>
          </article>
        </dialog>
      </main>
    );
  }
  return (
    <Layout title="movies/addmovies">
      <h2 className="add-title">Add movie</h2>
      <MovieForm onSubmit={handleMovieAdded} />
      <Modal dialog={dialog} setDialog={setDialog} />
    </Layout>
  );
};

export default AddMovie;
