
import React, { useState } from "react";
import { Todo1 } from "../types";

interface MovieFormProps {
  onSubmit: (movie: Todo1) => void;
  initialMovie?: Todo1;
}

const MovieForm: React.FC<MovieFormProps> = ({ onSubmit, initialMovie }) => {
  const [movie, setMovie] = useState<Todo1>(initialMovie || { title: "", year: 0 });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovie({ ...movie, title: e.target.value });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovie({ ...movie, year: Number(e.target.value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(movie);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="edit-form">
        <input
          type="text"
          value={movie.title}
          onChange={handleTitleChange}
          placeholder="Title"
        />
        <input
          type="number"
          value={movie.year}
          onChange={handleYearChange}
          placeholder="Year"
        />
        <button type="submit">
          {initialMovie ? "Update" : "Add movie"}
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
