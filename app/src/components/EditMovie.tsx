import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import MovieForm from "./MovieForm";
import Modal from "./Modal";
import { Movie1 } from "../types";
import { updateMovie, getMovieById } from "./apiService";
import { useParams } from "react-router-dom";

const EditMovie: React.FC = () => {
  const { id } = useParams();
  const [movieTitle, setMovieTitle] = useState("");
  const [dialog, setDialog] = useState(false);
  const [initialMovie, setInitialMovie] = useState<Movie1 | null>(null);

  useEffect(() => {
    async function getMovies() {
      try {
        if (id) {
          const response = await getMovieById(id);
          setMovieTitle(response.title);
          setInitialMovie(response);
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getMovies();
  }, [id]);

  const handleMovieUpdated = async (movie: Movie1) => {
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
