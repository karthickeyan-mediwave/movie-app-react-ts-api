import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import MovieForm from "./MovieForm";
import Modal from "./Modal";
import { Todo1 } from "../types";
import { updateMovie, getMovieById } from "./apiService";
import { useParams } from "react-router-dom";

const EditMovie: React.FC = () => {
  const { id } = useParams();
  const [movieTitle, setMovieTitle] = useState("");
  const [dialog, setDialog] = useState(false);
  const [initialMovie, setInitialMovie] = useState<Todo1 | null>(null);

  useEffect(() => {
    if (id) {
      getMovieById(id)
        .then((response) => {
          setMovieTitle(response.title);
          setInitialMovie(response);
          console.log(response);
        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
        });
    }
  }, [id]);

  const handleMovieUpdated = async (movie: Todo1) => {
    try {
      if (id) {
        await updateMovie(id, movie);
        console.log("Movie updated:", movie);
        setDialog(true);
      }
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return (
    <Layout title={`Edit/ ${movieTitle}`}>
      <h2 className="edit-title">Edit movie</h2>
      {initialMovie && (
        <MovieForm onSubmit={handleMovieUpdated} initialMovie={initialMovie} />
      )}
      <Modal dialog={dialog} setDialog={setDialog} />
    </Layout>
  );
};

export default EditMovie;
